import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { 
  FileText, 
  ShieldCheck, 
  Scale, 
  AlertTriangle, 
  HelpCircle, 
  Mail, 
  Phone, 
  ArrowLeft, 
  CheckCircle2 
} from 'lucide-react';
import { contactData } from '../data/mock';

const SECTIONS = [
  { id: 'acceptance', title: '1. Acceptance of Terms & Eligibility' },
  { id: 'services', title: '2. Description of Services' },
  { id: 'intellectual-property', title: '3. Intellectual Property Rights' },
  { id: 'visualization-disclaimer', title: '4. Architectural Visualization Disclaimers' },
  { id: 'acceptable-use', title: '5. Acceptable Use & Restrictions' },
  { id: 'commercial-proposals', title: '6. Commercial Inquiries & Demo Licenses' },
  { id: 'third-party', title: '7. Third-Party Integrations' },
  { id: 'uptime-service', title: '8. Service Level & Availability' },
  { id: 'warranties', title: '9. Disclaimer of Warranties' },
  { id: 'liability', title: '10. Limitation of Liability' },
  { id: 'governing-law', title: '11. Governing Law & Dispute Resolution' },
  { id: 'contact', title: '12. Contact & Notices' },
];

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Terms of Service | Flik Explorer';
  }, []);

  return (
    <div className="bg-[#0a0a0b] text-gray-200 min-h-screen flex flex-col selection:bg-emerald-500/20 selection:text-emerald-400">
      <Header />

      <main className="flex-1 pt-32 pb-24">
        {/* Hero Header */}
        <section className="relative px-6 lg:px-8 max-w-5xl mx-auto mb-16">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link 
              to="/" 
              className="inline-flex items-center gap-1.5 text-gray-400 hover:text-emerald-400 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-gray-300 font-medium">Terms of Service</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium uppercase tracking-wider mb-6">
            <Scale className="w-3.5 h-3.5" />
            Terms of Service · Legal Framework
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            Terms of Service
          </h1>

          <p className="text-lg text-gray-400 leading-relaxed max-w-3xl mb-8">
            These Terms of Service govern your access to and use of Flik Explorer (“Flik”, “we”, “our”), 
            including our official website at <span className="text-emerald-400 font-medium">flik.in</span>, 
            interactive real-time 3D property visualization software, and related digital sales tools.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5 text-xs text-gray-400">
            <div>
              <span className="block text-gray-500 mb-1">Effective Date</span>
              <span className="text-white font-medium">October 1, 2026</span>
            </div>
            <div>
              <span className="block text-gray-500 mb-1">Last Updated</span>
              <span className="text-white font-medium">October 6, 2026</span>
            </div>
            <div>
              <span className="block text-gray-500 mb-1">Provider</span>
              <span className="text-white font-medium">Flik Explorer</span>
            </div>
            <div>
              <span className="block text-gray-500 mb-1">Jurisdiction</span>
              <span className="text-white font-medium">Mumbai, India</span>
            </div>
          </div>
        </section>

        {/* Content Container */}
        <div className="max-w-5xl mx-auto px-6 lg:px-8 grid lg:grid-cols-4 gap-12 items-start">
          
          {/* Sticky Table of Contents (Desktop) */}
          <aside className="hidden lg:block lg:col-span-1 sticky top-28 space-y-2 p-5 rounded-2xl bg-white/[0.015] border border-white/5 text-xs">
            <div className="text-white font-semibold uppercase tracking-wider mb-3 flex items-center gap-1.5 text-gray-300">
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              Sections
            </div>
            <nav className="space-y-1.5 max-h-[calc(100vh-180px)] overflow-y-auto pr-1">
              {SECTIONS.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className="block py-1 px-2 rounded-md text-gray-400 hover:text-emerald-400 hover:bg-white/[0.03] transition-colors truncate"
                >
                  {sec.title}
                </a>
              ))}
            </nav>
          </aside>

          {/* Main Legal Content */}
          <div className="lg:col-span-3 space-y-12 text-sm leading-relaxed text-gray-300">

            {/* Overview Banner */}
            <div className="p-6 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/20 space-y-3">
              <h2 className="text-base font-semibold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Key Summary
              </h2>
              <p className="text-xs text-gray-300">
                Flik Explorer is a B2B sales conversion and spatial visualization technology platform for Indian real estate developers and buyers. By visiting <span className="text-white font-medium">flik.in</span> or interacting with our 3D modules, you agree to these Terms. Please read them thoroughly.
              </p>
            </div>

            {/* Section 1 */}
            <section id="acceptance" className="space-y-4 pt-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">1.</span> Acceptance of Terms & Eligibility
              </h2>
              <p>
                By accessing, browsing, or utilizing <a href="https://flik.in" className="text-emerald-400 hover:underline">flik.in</a>, you enter into a legally binding agreement with Flik Explorer. If you are accepting these Terms on behalf of an enterprise entity (such as a real estate developer, marketing agency, or channel partner), you represent and warrant that you possess full legal authorization to bind that entity.
              </p>
              <p>
                You must be at least eighteen (18) years of age and legally competent to enter into contracts under the Indian Contract Act, 1872.
              </p>
            </section>

            {/* Section 2 */}
            <section id="services" className="space-y-4 pt-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">2.</span> Description of Services
              </h2>
              <p>
                Flik Explorer licenses and provides real-time 3D spatial visualization and sales conversion technology. Key platform capabilities include:
              </p>
              <ul className="space-y-2 list-disc list-inside pl-2 text-gray-400">
                <li><strong className="text-gray-200">Interactive Digital Twin Navigation:</strong> Real-time walk-throughs of under-construction residential and commercial properties powered by Unreal Engine 5.</li>
                <li><strong className="text-gray-200">Custom Unit & Floor Configuration:</strong> Interactive selection of layouts, balcony sightlines, daylight/sun-path toggles, and finish palettes.</li>
                <li><strong className="text-gray-200">Cloud Pixel Streaming:</strong> Low-latency delivery of 3D environments accessible via standard web browsers across mobile devices, desktop screens, and physical sales gallery video walls.</li>
                <li><strong className="text-gray-200">Sales Intelligence & Telemetry:</strong> Engagement tracking and CRM synchronization for developer sales teams.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section id="intellectual-property" className="space-y-4 pt-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">3.</span> Intellectual Property Rights
              </h2>
              <p>
                All proprietary software, algorithms, graphical user interfaces, custom shaders, trademarks, logos, audio tracks, and interactive 3D pipelines accessible on <code className="text-emerald-400">flik.in</code> are the exclusive property of Flik Explorer and protected under the Indian Copyright Act, 1957, the Trade Marks Act, 1999, and international intellectual property conventions.
              </p>
              <p>
                Architectural drawings, CAD/BIM models, project trademarks, and brand collaterals supplied by real estate developer partners remain the intellectual property of their respective owners.
              </p>
            </section>

            {/* Section 4 */}
            <section id="visualization-disclaimer" className="space-y-4 pt-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">4.</span> Architectural Visualization Disclaimers
              </h2>
              <p>
                Flik Explorer produces photorealistic, real-time spatial representations designed to aid buyers and developers in visualizing under-construction properties. However:
              </p>
              <ul className="space-y-2 list-disc list-inside pl-2 text-gray-400">
                <li>Visualizations, materials, room dimensions, views, and lighting simulations are artistic and architectural representations subject to minor site-level construction adjustments.</li>
                <li>Purchases of real estate units are governed solely by the developer’s formal registered Agreement for Sale, sanction plans, specifications, and disclosures filed under the Real Estate (Regulation and Development) Act, 2016 (RERA).</li>
                <li>Flik Explorer is not a real estate developer, broker, or legal conveyancer, and disclaims liability for developer project delays, construction variations, or statutory non-compliance.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section id="acceptable-use" className="space-y-4 pt-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">5.</span> Acceptable Use & Restrictions
              </h2>
              <p>When accessing Flik Explorer, you agree strictly not to:</p>
              <ul className="space-y-2 list-disc list-inside pl-2 text-gray-400">
                <li>Reverse-engineer, decompile, disassemble, or extract 3D polygon meshes, textures, or source code from our web applications.</li>
                <li>Utilize automated crawlers, scrapers, or bots to harvest property assets or contact databases without express prior written consent.</li>
                <li>Attempt to bypass security measures, probe network vulnerabilities, or execute denial-of-service (DoS) attacks.</li>
                <li>Transmit misleading, defamatory, or fraudulent lead inquiries via our contact forms.</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section id="commercial-proposals" className="space-y-4 pt-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">6.</span> Commercial Inquiries & Demo Licenses
              </h2>
              <p>
                Demonstrations provided via <span className="text-emerald-400">flik.in</span> are non-exclusive evaluation licenses intended solely for evaluating potential platform deployment. Commercial software deployments, custom tower digitization, and sales gallery touch installations are subject to separate Master Services Agreements (MSA) and Statement of Work (SOW) documents executed directly between Flik and developer partners.
              </p>
            </section>

            {/* Section 7 */}
            <section id="third-party" className="space-y-4 pt-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">7.</span> Third-Party Integrations
              </h2>
              <p>
                Our platform may contain links or integrations with third-party software, including CRM systems (e.g., Salesforce, LeadSquared), WhatsApp messaging, and cloud rendering hosts. Flik Explorer exercises no control over third-party terms or privacy practices and accepts no liability for third-party service outages or policy changes.
              </p>
            </section>

            {/* Section 8 */}
            <section id="uptime-service" className="space-y-4 pt-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">8.</span> Service Level & Availability
              </h2>
              <p>
                We strive for continuous, uninterrupted availability of our web properties and strive to maintain a 99.9% uptime standard on global edge networks. However, temporary service interruptions may occasionally occur due to scheduled maintenance, cloud infrastructure updates, or internet routing events beyond our reasonable control.
              </p>
            </section>

            {/* Section 9 */}
            <section id="warranties" className="space-y-4 pt-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">9.</span> Disclaimer of Warranties
              </h2>
              <p className="text-gray-400 text-xs">
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, FLIK EXPLORER IS PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING WITHOUT LIMITATION WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>
            </section>

            {/* Section 10 */}
            <section id="liability" className="space-y-4 pt-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">10.</span> Limitation of Liability
              </h2>
              <p className="text-gray-400 text-xs">
                IN NO EVENT SHALL FLIK EXPLORER, ITS FOUNDERS, DIRECTORS, OR EMPLOYEES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, OR PUNITIVE DAMAGES (INCLUDING LOSS OF PROFITS, DATA, BUSINESS INTERRUPTION, OR PROPERTY PURCHASE DECISIONS) ARISING OUT OF OR RELATING TO YOUR USE OF THE PLATFORM.
              </p>
            </section>

            {/* Section 11 */}
            <section id="governing-law" className="space-y-4 pt-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">11.</span> Governing Law & Dispute Resolution
              </h2>
              <p>
                These Terms shall be governed by, interpreted, and construed in accordance with the substantive laws of the Republic of India. Any legal dispute, controversy, or claim arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the competent courts situated in Mumbai, Maharashtra, India.
              </p>
            </section>

            {/* Section 12 */}
            <section id="contact" className="space-y-4 pt-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">12.</span> Contact & Legal Notices
              </h2>
              <p>
                For questions, clarifications, or formal notices regarding these Terms of Service, please reach out to our legal and operations team:
              </p>

              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
                <div>
                  <h3 className="text-base font-semibold text-white">Legal & Compliance Office</h3>
                  <p className="text-xs text-gray-400">Flik Explorer · India Operations</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 text-xs">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <span className="block text-gray-500 text-[10px] uppercase tracking-wider">Email</span>
                      <a href="mailto:Contact@flik.in" className="text-white hover:text-emerald-400 transition-colors">
                        Contact@flik.in
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <span className="block text-gray-500 text-[10px] uppercase tracking-wider">Phone</span>
                      <a href={`tel:+${contactData.phoneRaw}`} className="text-white hover:text-emerald-400 transition-colors">
                        {contactData.phone}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-xs text-gray-400 border-t border-white/5">
                  <span className="text-gray-300 font-medium">Headquarters:</span> Mumbai, Maharashtra, India.
                </div>
              </div>
            </section>

            {/* Back button */}
            <div className="pt-8 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 hover:bg-emerald-500/10 text-white text-sm font-medium transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4" />
                Return to Flik Explorer
              </Link>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-xs text-gray-400 hover:text-emerald-400 transition-colors"
              >
                ↑ Back to top
              </button>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;
