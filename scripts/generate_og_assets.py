"""Generate Flik OG image (1200x630) and any extra favicon sizes.

OG image: branded card — large "flik" wordmark in #22E55A on solid black,
with a tagline + URL underneath. Matches the in-app logo style.
"""

from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

OUT = Path("/app/frontend/public")
OUT.mkdir(parents=True, exist_ok=True)

GREEN = (34, 229, 90, 255)
WHITE = (255, 255, 255, 255)
GRAY = (160, 165, 175, 255)
BLACK = (10, 10, 11, 255)
FONT_BOLD = "/usr/share/fonts/truetype/freefont/FreeSansBold.ttf"
FONT_REG = "/usr/share/fonts/truetype/freefont/FreeSans.ttf"


def render_wordmark(draw, font, x, y, text="flik"):
    """Draw the 'flik' wordmark + wifi arc above the 'i'. Returns bbox of full mark."""
    draw.text((x, y), text, font=font, fill=GREEN)
    bbox = draw.textbbox((x, y), text, font=font)
    th = bbox[3] - bbox[1]

    # Wifi arc above 'i'
    prefix_w = draw.textbbox((0, 0), "fli", font=font)[2]
    i_w = draw.textbbox((0, 0), "i", font=font)[2]
    i_center_x = x + prefix_w - (i_w / 2)
    arc_w = int(th * 0.45)
    arc_h = int(th * 0.32)
    arc_thickness = max(4, int(th * 0.08))
    arc_y = bbox[1] - int(th * 0.28)
    draw.arc(
        [
            int(i_center_x - arc_w / 2),
            arc_y,
            int(i_center_x + arc_w / 2),
            arc_y + arc_h,
        ],
        start=200,
        end=340,
        fill=GREEN,
        width=arc_thickness,
    )
    return bbox


def render_favicon_192():
    """Generate the 192x192 favicon — wordmark only, no tagline."""
    size = 192
    img = Image.new("RGBA", (size, size), BLACK)
    draw = ImageDraw.Draw(img)

    font_size = int(size * 0.55)
    font = ImageFont.truetype(FONT_BOLD, font_size)
    text = "flik"
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    x = (size - tw) / 2 - bbox[0]
    y = (size - th) / 2 - bbox[1] + size * 0.04
    render_wordmark(draw, font, x, y, text)

    path = OUT / "favicon-192x192.png"
    img.save(path, "PNG")
    print(f"  wrote {path}  ({path.stat().st_size} B)")


def render_og_image():
    """Generate 1200x630 OG card — wordmark + tagline + URL on solid black."""
    W, H = 1200, 630
    img = Image.new("RGBA", (W, H), BLACK)
    draw = ImageDraw.Draw(img)

    # subtle vignette: emerald glow top-right corner
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    for r, alpha in [(700, 22), (500, 32), (300, 40)]:
        glow_draw.ellipse(
            [W - r, -int(r * 0.5), W + int(r * 0.5), r],
            fill=(34, 229, 90, alpha),
        )
    img.alpha_composite(glow)

    # Wordmark
    font_word = ImageFont.truetype(FONT_BOLD, 220)
    word_bbox = draw.textbbox((0, 0), "flik", font=font_word)
    word_w = word_bbox[2] - word_bbox[0]
    word_x = (W - word_w) / 2 - word_bbox[0]
    word_y = 130
    render_wordmark(draw, font_word, word_x, word_y, "flik")

    # Tagline
    font_tag = ImageFont.truetype(FONT_BOLD, 38)
    tagline = "Real-time architecture intelligence"
    tag_bbox = draw.textbbox((0, 0), tagline, font=font_tag)
    tag_w = tag_bbox[2] - tag_bbox[0]
    tag_x = (W - tag_w) / 2 - tag_bbox[0]
    draw.text((tag_x, 430), tagline, font=font_tag, fill=WHITE)

    # Sub-tagline
    font_sub = ImageFont.truetype(FONT_REG, 26)
    sub = "Immersive 3D visualization for premium residential developers in India"
    sub_bbox = draw.textbbox((0, 0), sub, font=font_sub)
    sub_w = sub_bbox[2] - sub_bbox[0]
    sub_x = (W - sub_w) / 2 - sub_bbox[0]
    draw.text((sub_x, 490), sub, font=font_sub, fill=GRAY)

    # URL pill
    font_url = ImageFont.truetype(FONT_BOLD, 24)
    url = "flik.in"
    url_bbox = draw.textbbox((0, 0), url, font=font_url)
    url_w = url_bbox[2] - url_bbox[0]
    pill_pad_x, pill_pad_y = 28, 12
    pill_w = url_w + pill_pad_x * 2
    pill_h = (url_bbox[3] - url_bbox[1]) + pill_pad_y * 2
    pill_x = (W - pill_w) / 2
    pill_y = 555
    draw.rounded_rectangle(
        [pill_x, pill_y, pill_x + pill_w, pill_y + pill_h],
        radius=int(pill_h / 2),
        fill=(34, 229, 90, 40),
        outline=(34, 229, 90, 180),
        width=2,
    )
    draw.text(
        (pill_x + pill_pad_x - url_bbox[0], pill_y + pill_pad_y - url_bbox[1]),
        url,
        font=font_url,
        fill=GREEN,
    )

    path = OUT / "og-image.png"
    img.convert("RGB").save(path, "PNG", optimize=True)
    print(f"  wrote {path}  ({path.stat().st_size} B)")


if __name__ == "__main__":
    render_favicon_192()
    render_og_image()
