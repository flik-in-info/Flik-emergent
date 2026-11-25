import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Linkedin, Instagram } from 'lucide-react';
import { footerData, contactData, images } from '../data/mock';
import AdminAuthModal, { isAdminAuthenticated } from './AdminAuthModal';

const SOCIAL_LINKS = [
  { id: 'linkedin', label: 'LinkedIn', href: contactData.socials.linkedin, icon: Linkedin },
  { id: 'instagram', label: 'Instagram', href: contactData.socials.instagram, icon: Instagram },
];

const NvidiaIcon = () => (
  <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M8.948 8.798v-1.43a6.7 6.7 0 0 1 .424-.018c3.922-.124 6.493 3.374 6.493 3.374s-2.774 3.851-5.75 3.851c-.398 0-.787-.062-1.158-.185v-4.346c1.528.185 1.837.857 2.747 2.385l2.04-1.714s-1.492-1.952-4-1.952a6.016 6.016 0 0 0-.796.035m0-4.735v2.138l.424-.027c5.45-.185 9.01 4.47 9.01 4.47s-4.08 4.964-8.33 4.964c-.37 0-.733-.035-1.095-.097v1.325c.3.035.61.062.91.062 3.957 0 6.82-2.023 9.593-4.408.459.371 2.34 1.263 2.73 1.652-2.633 2.208-8.772 3.984-12.253 3.984-.335 0-.653-.018-.971-.053v1.864H24V4.063zm0 10.326v1.131c-3.657-.654-4.673-4.46-4.673-4.46s1.758-1.944 4.673-2.262v1.237H8.94c-1.528-.186-2.73 1.245-2.73 1.245s.68 2.412 2.739 3.11M2.456 10.9s2.164-3.197 6.5-3.533V6.201C4.153 6.59 0 10.653 0 10.653s2.35 6.802 8.948 7.42v-1.237c-4.84-.6-6.492-5.936-6.492-5.936z" />
  </svg>
);

const AwsIcon = () => (
  <svg className="w-full h-auto" viewBox="0 0 24 20" fill="none" aria-hidden="true">
    <path fill="currentColor" d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167z"/>
    <path fill="#22E55A" d="M21.698 16.207c-2.626 1.94-6.442 2.969-9.722 2.969-4.598 0-8.74-1.7-11.87-4.526-.247-.223-.024-.527.272-.351 3.384 1.963 7.559 3.153 11.877 3.153 2.914 0 6.114-.607 9.06-1.852.439-.2.814.287.383.607z"/>
    <path fill="#22E55A" d="M22.792 14.961c-.336-.43-2.22-.207-3.074-.103-.255.032-.295-.192-.063-.36 1.5-1.053 3.967-.75 4.254-.399.287.36-.08 2.826-1.485 4.007-.215.184-.423.088-.327-.151.32-.79 1.03-2.57.695-2.994z"/>
  </svg>
);

const ClaudeIcon = () => (
  <svg className="w-full h-full shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z"/>
  </svg>
);

const ElevenLabsIcon = () => (
  <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M4.6035 0v24h4.9317V0zm9.8613 0v24h4.9317V0z" />
  </svg>
);

const STARTUP_PROGRAMS = [
  {
    id: 'nvidia',
    name: 'NVIDIA Inception',
    subname: 'Official Member',
    category: 'Spatial GPU',
    Icon: NvidiaIcon,
    href: 'https://www.nvidia.com/en-us/startups/',
    metric: 'DLSS 3.5 & RTX',
    description: 'Accelerated GPU compute, neural radiance caching, DLSS 3.5 AI reconstruction, and live RTX cloud rendering.',
  },
  {
    id: 'aws',
    name: 'AWS Activate',
    subname: 'Startups Program',
    category: 'Cloud Edge',
    Icon: AwsIcon,
    href: 'https://aws.amazon.com/startups/',
    metric: 'AWS CLOUDFRONT',
    description: 'Amazon CloudFront global edge delivery, multi-region low latency streaming, and high-availability cloud infrastructure.',
  },
  {
    id: 'claude',
    name: 'Claude Startups',
    subname: 'Anthropic Program',
    category: 'Frontier AI',
    Icon: ClaudeIcon,
    href: 'https://www.anthropic.com/',
    metric: 'CLAUDE 3.7 SONNET',
    description: 'Anthropic reasoning models, floorplan intelligence, multi-property synthesis, and conversational buyer context.',
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs Grants',
    subname: 'Startup Grants Recipient',
    category: 'Voice AI',
    Icon: ElevenLabsIcon,
    href: 'https://elevenlabs.io/startups',
    metric: '29+ LANGUAGES',
    description: 'Low latency multilingual AI architectural narration, guiding international buyers through residences in 29+ languages.',
  },
];

const SocialIcons = () => (
  <div className="flex items-center gap-2.5 mt-6" data-testid="footer-socials">
    {SOCIAL_LINKS.map(({ id, label, href, icon: Icon }) => (
      <a
        key={id}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-testid={`footer-social-${id}`}
        aria-label={label}
        className="w-9 h-9 rounded-lg bg-black text-white hover:bg-[#22E55A] hover:text-black flex items-center justify-center transition-colors"
      >
        <Icon className="w-4 h-4" />
      </a>
    ))}
  </div>
);

const FooterLinkColumn = ({ title, links }) => (
  <>
    <h4 className="text-black font-semibold text-sm mb-4 font-display">{title}</h4>
    <ul className="space-y-2.5">
      {links.map((link) => {
        const isInternal = link.href.startsWith('/') && !link.href.includes('#');
        return (
          <li key={link.label}>
            {isInternal ? (
              <Link
                to={link.href}
                className="text-neutral-600 hover:text-black hover:underline decoration-[#22E55A] decoration-2 underline-offset-4 transition-colors text-sm"
              >
                {link.label}
              </Link>
            ) : (
              <a
                href={link.href}
                className="text-neutral-600 hover:text-black hover:underline decoration-[#22E55A] decoration-2 underline-offset-4 transition-colors text-sm"
              >
                {link.label}
              </a>
            )}
          </li>
        );
      })}
    </ul>
  </>
);

const FooterBrand = () => (
  <div className="lg:col-span-2">
    <Link to="/" className="inline-flex items-center mb-3 bg-black px-3 py-1.5 rounded-lg">
      <img
        src={images.logo}
        alt="Flik Explorer"
        loading="lazy"
        decoding="async"
        className="h-7 w-auto"
      />
    </Link>
    <div className="text-xs font-mono text-black font-semibold tracking-tight mb-2.5 block">
      Hastok Enterprise Pvt. Ltd.
    </div>
    <p className="text-neutral-600 text-sm leading-relaxed max-w-sm">{footerData.tagline}</p>

    <div className="mt-4 space-y-1 text-sm">
      <a
        href={`mailto:${contactData.email}`}
        data-testid="footer-email"
        className="block text-black font-medium hover:underline decoration-[#22E55A] decoration-2 underline-offset-4 transition-colors"
      >
        {contactData.email}
      </a>
      <a
        href={`tel:+${contactData.phoneRaw}`}
        data-testid="footer-phone"
        className="block text-black font-medium hover:underline decoration-[#22E55A] decoration-2 underline-offset-4 transition-colors"
      >
        {contactData.phone}
      </a>
    </div>

    <SocialIcons />

    <p className="text-neutral-500 text-xs mt-6">{footerData.copyright}</p>
  </div>
);

const Footer = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const navigate = useNavigate();

  const handleAdminClick = (e) => {
    e.preventDefault();
    if (isAdminAuthenticated()) {
      navigate('/pulse');
    } else {
      setIsAdminOpen(true);
    }
  };

  return (
    <footer className="bg-white pt-4 pb-6 px-3 sm:px-6 border-t border-neutral-100">
      <div className="max-w-[1380px] mx-auto rounded-[24px] sm:rounded-[32px] overflow-hidden border border-neutral-200 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.12)] bg-dot-panel">
        {/* Global Startup Accelerator & Grant Programs */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-12 pb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <h3 className="text-2xl sm:text-3xl font-medium text-black tracking-[-0.025em]">
              Backed by global startup and accelerator programs.
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 max-w-md leading-relaxed">
              Official member of NVIDIA Inception, AWS Activate, and Claude Startups, alongside an ElevenLabs Startup Grant award.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STARTUP_PROGRAMS.map(({ id, name, subname, category, Icon, href, metric, description }) => (
              <a
                key={id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 rounded-2xl bg-white border border-neutral-200 hover:border-black transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-black text-white group-hover:text-[#22E55A] flex items-center justify-center p-2.5 transition-colors">
                      <Icon />
                    </div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">
                      {category}
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-semibold text-black tracking-tight">
                    {name}
                  </h4>
                  <span className="text-xs font-mono text-neutral-500 block mt-0.5">
                    {subname}
                  </span>

                  <p className="text-xs text-neutral-600 mt-3 leading-relaxed">
                    {description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-neutral-700 font-medium">{metric}</span>
                  <span className="bg-[#22E55A] text-black px-1.5 py-0.5 rounded font-semibold">VERIFIED</span>
                </div>
              </a>
            ))}
          </div>

          {/* Pedigree Endorsement */}
          <div className="mt-6 pt-4 border-t border-neutral-200 text-xs text-neutral-600">
            Flik Explorer, developed by{' '}
            <span className="text-black font-semibold">Hastok Enterprise Pvt. Ltd.</span>, participates in NVIDIA Inception, AWS Activate, Claude Startups, and ElevenLabs Grants.
          </div>
        </div>

        {/* 5-Column Navigation Grid (In the end) */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-10 pb-8 border-t border-neutral-200">
          <div className="grid lg:grid-cols-5 gap-8">
            <FooterBrand />

            <div>
              <FooterLinkColumn title="Platform" links={footerData.platform} />
            </div>

            <div>
              <FooterLinkColumn title="Company" links={footerData.company} />
            </div>

            <div>
              <div className="mb-6">
                <FooterLinkColumn title="Resources" links={footerData.resources} />
              </div>
              <FooterLinkColumn title="Legal" links={footerData.legal} />
            </div>
          </div>
        </div>

        {/* Monochrome Flik Skyline Horizon Showcase (Black / White / Flik Green ONLY) */}
        <div
          className="relative pt-14 sm:pt-20 overflow-hidden"
          style={{
            background:
              'linear-gradient(180deg, rgba(244,244,245,0) 0%, #27272a 35%, #000000 100%)',
          }}
        >
          <div className="relative flex justify-center items-end leading-none px-4 pt-6 pb-8 sm:pb-12">
            <span
              aria-hidden="true"
              className="font-display font-semibold tracking-[-0.045em] text-[clamp(4.75rem,17vw,14rem)] leading-[0.78] select-none translate-y-4 sm:translate-y-6"
            >
              <span className="text-white">flik</span>
              <span className="text-[#22E55A]">.in</span>
            </span>
          </div>

          {/* Solid Black Architectural Silhouette Horizon Sill */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="w-full h-14 sm:h-20 block relative z-10 -mt-10 sm:-mt-14"
          >
            <path
              d="M0,78 C320,16 680,10 1040,46 C1220,64 1340,70 1440,52 L1440,120 L0,120 Z"
              fill="#000000"
            />
          </svg>

          {/* Jet Black Legal & Admin Bar */}
          <div className="bg-black px-5 sm:px-8 lg:px-10 py-6 text-neutral-400">
            <div className="max-w-7xl mx-auto space-y-3">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-neutral-300 text-center sm:text-left">
                  {footerData.bottomBar}
                </p>
                <button
                  onClick={handleAdminClick}
                  data-testid="footer-admin-btn"
                  className="text-neutral-400 hover:text-[#22E55A] text-xs font-mono transition-colors tracking-widest lowercase hover:underline"
                  title="Flik Admin Access"
                >
                  admin
                </button>
              </div>
              <p className="text-[11px] text-neutral-500 text-center sm:text-left leading-relaxed">
                © 2026 NVIDIA, the NVIDIA logo, DLSS, NVIDIA Inception, and NVIDIA RTX are trademarks and/or registered trademarks of NVIDIA Corporation in the U.S. and other countries. Amazon Web Services, AWS, and AWS Activate are trademarks of Amazon.com, Inc. Anthropic and Claude are trademarks of Anthropic PBC. ElevenLabs is a trademark of ElevenLabs Inc.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Passcode Modal */}
      <AdminAuthModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </footer>
  );
};

export default Footer;
