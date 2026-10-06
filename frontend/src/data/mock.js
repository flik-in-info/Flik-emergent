// Flik Explore Landing Page Data

// Numeric constants for the hero "live inventory" widget
const HERO_LIVE_UNITS = 847;
const HERO_LIVE_TOWERS = 12;

export const heroData = {
  headline: [
    "Real-time architecture.",
    "Real-time intelligence.",
    "Real-time sales."
  ],
  subheadline: "Flik Explore transforms architectural visualization into a live sales ecosystem—powered by Unreal Engine 5, designed for real estate that moves at the speed of decision.",
  primaryCta: "Explore the Platform",
  secondaryCta: "Watch Live Demo",
  floatingStats: {
    label: "Live inventory",
    units: HERO_LIVE_UNITS,
    towers: HERO_LIVE_TOWERS,
    sync: "Real-time sync"
  }
};

export const navItems = [
  { label: "3D Twin", href: "/#experience" },
  { label: "50 3D Elements", href: "/#capabilities" },
  { label: "Capital Economics", href: "/#economics" },
  { label: "Technology", href: "/#technology" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" }
];

export const platformSection = {
  label: "The Platform",
  headline: ["Beyond visualization.", "A decision-making environment."],
  body: "Flik Explore is not a rendering service. It is a real-time platform where architecture, sales intelligence, and immersive technology converge. Every view, every interaction, every unit selection happens live—updating inventory, tracking engagement, and empowering teams to close faster.",
  features: [
    {
      title: "Real-Time Exploration",
      description: "Navigate photorealistic environments with zero lag. Sun paths. Weather. Seasons. Lighting that responds to time of day. Architecture that feels alive."
    },
    {
      title: "Sales Intelligence",
      description: "See what buyers see. Track which units are explored, how long they stay, what features drive interest. Turn attention into data. Data into strategy."
    },
    {
      title: "Global Access",
      description: "One link. Any device. Mobile. Desktop. Large-format screens. VR headsets. Secure. Scalable. Always accessible."
    }
  ]
};

export const visualizationSection = {
  label: "Experience",
  headline: ["Photorealism that responds.", "Architecture that adapts."],
  body: "Powered by Unreal Engine 5, every environment is rendered in real-time with cinematic fidelity. Adjust lighting. Change weather. Walk through lobbies. Stand on balconies. Rotate towers. Zoom into finishes. This is architecture as experience.",
  features: [
    {
      title: "Real-Time Rendering",
      description: "Photorealistic quality without pre-baked frames. Every pixel generated live."
    },
    {
      title: "Dynamic Lighting",
      description: "Simulate sun paths, shadows, time of day, and seasonal variations in real-time."
    },
    {
      title: "Atmospheric Simulation",
      description: "Rain. Fog. Sunset. Noon. Weather and ambiance that shifts on command."
    },
    {
      title: "360° & VR Ready",
      description: "Immersive panoramic views and full VR compatibility for next-level engagement."
    }
  ]
};

export const intelligenceSection = {
  label: "Sales Intelligence",
  headline: ["Every click is insight.", "Every view is a signal."],
  body: "Flik Explore doesn't just show units—it tracks them. Which floors attract the most attention. Which views drive engagement. Which layouts convert. Transform exploration into intelligence. Intelligence into revenue.",
  leftFeatures: [
    {
      title: "Live Inventory Management",
      description: "Real-time status of every unit. Available. Sold. Blocked. Reserved. Synced across all teams and touchpoints."
    },
    {
      title: "Interactive Unit Selection",
      description: "Click a tower. Select a floor. Explore a unit. Drill down from master plan to interior finishes in three taps."
    },
    {
      title: "Heatmap Analytics",
      description: "Visual overlays showing demand density, view popularity, exploration frequency, and user attention patterns."
    }
  ],
  rightFeatures: [
    {
      title: "Client Interaction Tracking",
      description: "Monitor how long prospects spend in each space, which features they revisit, and where interest peaks."
    },
    {
      title: "Engagement Scoring",
      description: "AI-powered scoring that ranks leads based on interaction depth, time spent, and unit exploration behavior."
    },
    {
      title: "CRM Integration",
      description: "Automatic lead capture, activity logging, and seamless sync with your existing sales infrastructure."
    }
  ]
};

export const technologySection = {
  label: "Technology",
  headline: ["Enterprise-grade.", "Globally accessible.", "Infinitely scalable."],
  body: "Built on Unreal Engine 5 and cloud infrastructure designed for performance at scale. Flik Explore delivers photorealistic experiences to thousands of concurrent users without compromise.",
  capabilities: [
    {
      title: "Unreal Engine 5",
      description: "Industry-leading real-time rendering. Nanite geometry. Lumen lighting. Cinematic quality at interactive speeds."
    },
    {
      title: "Cloud-Native Architecture",
      description: "Global CDN delivery. Sub-second load times. Infinite scalability. Enterprise SLA guarantees."
    },
    {
      title: "Multi-Device Optimization",
      description: "Adaptive streaming across mobile, tablet, desktop, large-format displays, and VR—without rebuilding."
    },
    {
      title: "AI Performance Layer",
      description: "Intelligent asset streaming, predictive caching, and dynamic quality adjustment for flawless experiences."
    },
    {
      title: "Security & Compliance",
      description: "End-to-end encryption. SOC 2 Type II certified. Role-based access. Audit trails. GDPR compliant."
    },
    {
      title: "API & Integration",
      description: "RESTful APIs for CRM, ERP, marketing automation, and custom workflows. Webhook support. Real-time data sync."
    }
  ]
};

export const teamsSection = {
  label: "Who It's For",
  headline: ["One platform.", "Three transformations."],
  teams: [
    {
      title: "Developers",
      description: "Launch projects with confidence. Showcase architecture before construction begins. Update inventory in real-time. Reduce sales cycle friction. Accelerate presales."
    },
    {
      title: "Sales Teams",
      description: "Engage prospects anywhere. Track every interaction. Identify high-intent buyers. Personalize presentations. Close faster with data-backed confidence."
    },
    {
      title: "Architects & Designers",
      description: "Communicate vision with clarity. Walk clients through unbuilt spaces. Test design variations live. Collaborate globally. Reduce revision cycles."
    }
  ]
};

export const metricsSection = {
  label: "Results",
  headline: ["Measurable outcomes.", "Proven velocity."],
  metrics: [
    { value: "67%", label: "Faster", description: "Average reduction in sales cycle length from first tour to contract signing." },
    { value: "3.2x", label: "Engagement", description: "Increase in prospect interaction time compared to traditional presentations." },
    { value: "89%", label: "Accuracy", description: "Lead scoring precision in predicting high-intent buyers based on exploration behavior." },
    { value: "Real-Time", label: "Sync", description: "Zero latency between inventory updates and buyer-facing availability across all channels." }
  ]
};

export const differenceSection = {
  label: "Why Flik",
  headline: ["Not software.", "A sales operating system."],
  body: "Flik Explore integrates visualization, intelligence, and operations into a single unified platform. It's not a tool your team uses occasionally—it's infrastructure they depend on daily.",
  comparison: [
    { traditional: "Pre-rendered videos", flik: "Real-time interaction" },
    { traditional: "Static presentations", flik: "Dynamic exploration" },
    { traditional: "No usage data", flik: "Full analytics layer" },
    { traditional: "One-way communication", flik: "Two-way intelligence" },
    { traditional: "Offline files", flik: "Cloud-native access" },
    { traditional: "Device-specific exports", flik: "Universal compatibility" }
  ]
};

export const closingSection = {
  headline: ["See architecture move.", "Watch intelligence flow.", "Feel the difference."],
  subheadline: "Request a personalized demonstration of Flik Explore with your project data.",
  primaryCta: "Request Demo",
  secondaryCta: "Contact Sales",
  trustIndicators: [
    "Enterprise Security",
    "SOC 2 Certified",
    "99.9% Uptime SLA",
    "Global Infrastructure"
  ]
};

export const contactData = {
  email: "Contact@flik.in",
  phone: "+91 96861 11327",
  phoneRaw: "919686111327", // for tel: and wa.me links (no plus, no spaces)
  whatsappMessage: "Hi Flik team, I'd like to know more about Flik Explore.",
  socials: {
    linkedin: "https://www.linkedin.com/company/flink.in/",
    instagram: "https://www.instagram.com/_flik.in_"
  }
};

export const footerData = {
  tagline: "Real-time architecture intelligence for the world's leading developers.",
  copyright: "© 2026 Flik. All rights reserved.",
  platform: [
    { label: "Live 3D Console", href: "/#experience" },
    { label: "Capital Economics", href: "/#economics" },
    { label: "Spatial Capabilities", href: "/#capabilities" },
    { label: "UE5 System Architecture", href: "/#technology" },
    { label: "Enterprise FAQ", href: "/#faq" }
  ],
  company: [
    { label: "About Flik Explorer", href: "/#experience" },
    { label: "Developer Partnerships", href: "/#contact" },
    { label: "Sales & Inquiries", href: "/#contact" }
  ],
  resources: [
    { label: "Frequently Asked Questions", href: "/#faq" },
    { label: "Request Executive Walkthrough", href: "/#contact" }
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "Cookie Policy", href: "/privacy-policy#cookies-telemetry" }
  ],
  bottomBar: "Enterprise-grade real-time visualization and sales intelligence · Powered by Unreal Engine 5"
};

export const images = {
  hero: "https://customer-assets.emergentagent.com/job_archviz-sales/artifacts/x2v0cq1i_Generate_a_photo_4k_202601081339.jpeg",
  environment: "https://customer-assets.emergentagent.com/job_4c3ce507-c661-4a16-8fad-c5fafa30e942/artifacts/oxgdjfg9_Ultrarealistic_product_feature_2k_2026011515.jpeg",
  devices: "https://customer-assets.emergentagent.com/job_4c3ce507-c661-4a16-8fad-c5fafa30e942/artifacts/c3tyk0z9_Ultrarealistic_visualization_of_2k_202601191.jpeg",
  intelligence: "https://customer-assets.emergentagent.com/job_4c3ce507-c661-4a16-8fad-c5fafa30e942/artifacts/czx4ykai_Google_earth_studiostyle_2k_202601191025.jpeg",
  showroom: "https://customer-assets.emergentagent.com/job_14e408c1-3c7e-48f7-a8ad-989309c5d4e5/artifacts/qmndvwhi_IMG_0752.jpeg",
  logo: "https://customer-assets.emergentagent.com/job_archviz-sales/artifacts/c72tdypv_flik999.png"
};