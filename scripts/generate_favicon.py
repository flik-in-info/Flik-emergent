"""Generate Flik favicons.

Creates:
- favicon-16x16.png
- favicon-32x32.png
- favicon-64x64.png
- apple-touch-icon.png (180x180)
- favicon.ico (multi-size)

Brand: green wordmark "flik" in #22E55A on solid black background, with a
small WiFi-style arc above the 'i' to mirror the in-app logo.
"""

from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

OUT = Path("/app/frontend/public")
OUT.mkdir(parents=True, exist_ok=True)

GREEN = (34, 229, 90, 255)
BLACK = (0, 0, 0, 255)
FONT_PATH = "/usr/share/fonts/truetype/freefont/FreeSansBold.ttf"


def render(size: int) -> Image.Image:
    img = Image.new("RGBA", (size, size), BLACK)
    draw = ImageDraw.Draw(img)

    # Pick font size to fill ~62% of the icon height for the wordmark
    font_size = int(size * 0.62)
    font = ImageFont.truetype(FONT_PATH, font_size)

    text = "flik"
    # Measure
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]

    # Center; nudge slightly down to leave room for the wifi arc above the 'i'
    x = (size - tw) / 2 - bbox[0]
    y = (size - th) / 2 - bbox[1] + size * 0.05

    draw.text((x, y), text, font=font, fill=GREEN)

    # WiFi arc above the dot of the 'i' (last character) — only for larger sizes
    if size >= 32:
        # Find 'i' position: width of "fli" minus 'i' offset
        prefix_bbox = draw.textbbox((0, 0), "fli", font=font)
        prefix_w = prefix_bbox[2] - prefix_bbox[0]
        i_char_bbox = draw.textbbox((0, 0), "i", font=font)
        i_w = i_char_bbox[2] - i_char_bbox[0]
        i_center_x = x + prefix_w - (i_w / 2)
        # Place arc above the text top
        arc_y = max(2, int(y + bbox[1] - size * 0.18))
        arc_w = int(size * 0.22)
        arc_h = int(size * 0.18)
        arc_thickness = max(2, int(size * 0.06))

        # Outer arc
        bbox_outer = [
            int(i_center_x - arc_w / 2),
            arc_y,
            int(i_center_x + arc_w / 2),
            arc_y + arc_h,
        ]
        draw.arc(bbox_outer, start=200, end=340, fill=GREEN, width=arc_thickness)

    return img


def main():
    sizes = [16, 32, 64, 180]
    images = {}
    for s in sizes:
        img = render(s)
        images[s] = img

    images[16].save(OUT / "favicon-16x16.png", "PNG")
    images[32].save(OUT / "favicon-32x32.png", "PNG")
    images[64].save(OUT / "favicon-64x64.png", "PNG")
    images[180].save(OUT / "apple-touch-icon.png", "PNG")

    # Multi-size ICO
    images[16].save(
        OUT / "favicon.ico",
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48), (64, 64)],
    )

    for s in sizes:
        path = OUT / f"favicon-{s}x{s}.png"
        if path.exists():
            print(f"  wrote {path}  ({path.stat().st_size} B)")
    print(f"  wrote {OUT / 'apple-touch-icon.png'}")
    print(f"  wrote {OUT / 'favicon.ico'}")


if __name__ == "__main__":
    main()
