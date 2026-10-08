import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { 
  Shield, 
  Lock, 
  Eye, 
  FileText, 
  Server, 
  Globe2, 
  UserCheck, 
  Mail, 
  Phone, 
  ArrowLeft, 
  ExternalLink,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { contactData } from '../data/mock';

const SECTIONS = [
  { id: 'introduction', title: '1. Introduction & Company Identity' },
  { id: 'definitions', title: '2. Definitions' },
  { id: 'data-collection', title: '3. Information We Collect' },
  { id: 'legal-basis', title: '4. Legal Basis for Processing' },
  { id: 'how-we-use', title: '5. How We Use Your Information' },
  { id: 'cookies-telemetry', title: '6. Cookies & Telemetry' },
  { id: 'data-sharing', title: '7. Data Sharing & Third-Party Processors' },
  { id: 'cross-border', title: '8. Cross-Border Transfers & NRI Data' },
  { id: 'data-security', title: '9. Data Security & Storage' },
  { id: 'retention', title: '10. Data Retention Policy' },
  { id: 'your-rights', title: '11. Your Rights as a Data Principal' },
  { id: 'children', title: '12. Children’s Privacy' },
  { id: 'grievance', title: '13. Grievance Redressal & Contact' },
  { id: 'updates', title: '14. Amendments & Policy Updates' },
];

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Privacy Policy | Flik Explorer';
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
            <span className="text-gray-300 font-medium">Privacy Policy</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium uppercase tracking-wider mb-6">
            <Shield className="w-3.5 h-3.5" />
            Legal & Compliance · DPDP Act 2023 & GDPR Aligned
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            Privacy Policy
          </h1>

          <p className="text-lg text-gray-400 leading-relaxed max-w-3xl mb-8">
            At Flik Explorer (“Flik”, “we”, “us”, or “our”), we are deeply committed to protecting 
            your personal data and maintaining full transparency. This Privacy Policy details how we 
            collect, use, disclose, and protect your information when you visit <span className="text-emerald-400 font-medium">flik.in</span> or 
            engage with our real-time architectural visualization platform.
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
              <span className="block text-gray-500 mb-1">Entity</span>
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
              Navigation
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

            {/* Quick Summary Callout */}
            <div className="p-6 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/20 space-y-3">
              <h2 className="text-base font-semibold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Key Privacy Highlights
              </h2>
              <ul className="space-y-2 text-xs text-gray-300 list-disc list-inside">
                <li><strong className="text-white">Zero Data Sales:</strong> We do not sell, rent, or trade your personal data with third-party advertisers or brokers.</li>
                <li><strong className="text-white">Strict Purpose Limitation:</strong> Information gathered through enquiry forms is strictly utilized to provide live demos, technical architecture proposals, and customer support.</li>
                <li><strong className="text-white">Full DPDP Act (India) Compliance:</strong> We honor data principal rights including access, rectification, erasure, and formal grievance redressal.</li>
                <li><strong className="text-white">Enterprise Security:</strong> All web traffic and data transmissions are encrypted using industry-standard TLS protocols.</li>
              </ul>
            </div>

            {/* Section 1 */}
            <section id="introduction" className="space-y-4 pt-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">1.</span> Introduction & Company Identity
              </h2>
              <p>
                Flik Explorer (“Flik”, “we”, “our”, or “us”) operates the B2B PropTech and architectural visualization platform accessible at <a href="https://www.flik.in/" className="text-emerald-400 hover:underline">flik.in</a>. Our platform empowers premier real estate developers, sales teams, and channel partners to deliver photorealistic, real-time 3D property experiences for under-construction residential and commercial developments.
              </p>
              <p>
                This Privacy Policy applies to personal data collected via our website, interactive web demos, lead capture forms, WhatsApp/telephonic customer outreach, and digital sales tools. By accessing or using our platform, you acknowledge the terms set forth herein.
              </p>
            </section>

            {/* Section 2 */}
            <section id="definitions" className="space-y-4 pt-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">2.</span> Definitions
              </h2>
              <p>For the purposes of this Privacy Policy:</p>
              <ul className="space-y-2.5 list-disc list-inside pl-2 text-gray-400">
                <li><strong className="text-gray-200">“Data Principal” / “User”:</strong> Refers to any individual (prospective property buyer, developer representative, broker, or site visitor) whose personal data is processed by Flik.</li>
                <li><strong className="text-gray-200">“Data Fiduciary” / “Controller”:</strong> Refers to Flik Explorer, which determines the purpose and means of personal data processing.</li>
                <li><strong className="text-gray-200">“Personal Data”:</strong> Any data about an individual who is identifiable by or in relation to such data under the Digital Personal Data Protection Act, 2023 (DPDP Act) and applicable global data protection laws.</li>
                <li><strong className="text-gray-200">“Platform”:</strong> Refers to the Flik Explorer website, interactive Unreal Engine streaming tools, 3D tour viewers, and client outreach portals.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section id="data-collection" className="space-y-4 pt-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">3.</span> Information We Collect
              </h2>
              <p>We collect information in two primary ways: information you directly provide, and information collected automatically through technological telemetry.</p>
              
              <div className="space-y-4 mt-3">
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                  <h3 className="text-white font-medium flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-emerald-400" />
                    A. Information You Voluntarily Provide
                  </h3>
                  <ul className="space-y-1.5 list-disc list-inside text-gray-400 text-xs">
                    <li><strong className="text-gray-300">Contact Details:</strong> Full name, corporate email address, and telephone/mobile number.</li>
                    <li><strong className="text-gray-300">Commercial & Project Details:</strong> Company/developer firm name, project typology (e.g. high-rise luxury, township, commercial), city location, and specific visualization requirements.</li>
                    <li><strong className="text-gray-300">Inquiry Messages:</strong> Custom notes, timeline preferences, or specific units/towers requested for 3D modeling.</li>
                    <li><strong className="text-gray-300">Direct Inquiries:</strong> Communications sent via email to <code className="text-emerald-400 bg-emerald-500/10 px-1 py-0.5 rounded">Contact@flik.in</code> or WhatsApp conversations initiated through our official links.</li>
                  </ul>
                </div>

                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                  <h3 className="text-white font-medium flex items-center gap-2">
                    <Eye className="w-4 h-4 text-emerald-400" />
                    B. Information Automatically Collected (Telemetry & Usage)
                  </h3>
                  <ul className="space-y-1.5 list-disc list-inside text-gray-400 text-xs">
                    <li><strong className="text-gray-300">Technical Device Data:</strong> IP address, device type (mobile, tablet, desktop, large-format interactive screen), operating system, browser type, and viewport resolution.</li>
                    <li><strong className="text-gray-300">Platform Analytics:</strong> Pages visited, scroll depth, session durations, and referral headers.</li>
                    <li><strong className="text-gray-300">3D Interaction Telemetry:</strong> Anonymized interaction metrics (such as unit clicks, camera orbit duration, sun-path lighting toggles) utilized strictly to optimize streaming latency and rendering fidelity.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section id="legal-basis" className="space-y-4 pt-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">4.</span> Legal Basis for Processing
              </h2>
              <p>We process personal data only when an authorized legal basis exists:</p>
              <ul className="space-y-2 list-disc list-inside pl-2 text-gray-400">
                <li><strong className="text-gray-200">Consent:</strong> When you voluntarily submit a contact inquiry, request a live platform demonstration, or opt into direct WhatsApp/email correspondence.</li>
                <li><strong className="text-gray-200">Performance of a Contract:</strong> When processing is necessary to prepare formal developer proposals, fulfill software licenses, or execute service level agreements.</li>
                <li><strong className="text-gray-200">Legitimate Interests:</strong> To maintain platform security, prevent automated spam submissions, improve 3D streaming performance, and protect our proprietary intellectual property.</li>
                <li><strong className="text-gray-200">Legal Compliance:</strong> To satisfy statutory, tax, or regulatory mandates under Indian law.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section id="how-we-use" className="space-y-4 pt-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">5.</span> How We Use Your Information
              </h2>
              <p>We utilize the collected information strictly for legitimate commercial and operational purposes, including:</p>
              <ul className="space-y-2 list-disc list-inside pl-2 text-gray-400">
                <li>Fulfilling demonstration requests and coordinating live walk-through sessions of Flik Explorer.</li>
                <li>Preparing project estimates, ROI calculations on physical sample flat replacement, and technical onboarding blueprints.</li>
                <li>Delivering technical customer support and responding to inquiries submitted to <span className="text-emerald-400">Contact@flik.in</span>.</li>
                <li>Optimizing real-time Unreal Engine 5 pixel streaming and mobile responsiveness across varying network conditions.</li>
                <li>Preventing malicious bot attacks, fraudulent requests, and unauthorized system access.</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section id="cookies-telemetry" className="space-y-4 pt-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">6.</span> Cookies & Telemetry
              </h2>
              <p>
                Flik uses minimal cookies and browser local storage mechanisms to deliver a seamless browsing experience. These include:
              </p>
              <ul className="space-y-2 list-disc list-inside pl-2 text-gray-400">
                <li><strong className="text-gray-200">Strictly Necessary Cookies:</strong> Essential for site routing, dialog states, security, and loading cached assets.</li>
                <li><strong className="text-gray-200">Performance & Analytics Telemetry:</strong> Aggregated, non-personally identifiable diagnostic metrics to evaluate loading speeds and visual frame rates.</li>
              </ul>
              <p className="text-xs text-gray-400">
                You may configure your browser to block or alert you about cookies; however, certain visual interactivity and 3D preview features may not operate as intended if local storage is restricted.
              </p>
            </section>

            {/* Section 7 */}
            <section id="data-sharing" className="space-y-4 pt-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">7.</span> Data Sharing & Third-Party Processors
              </h2>
              <p>
                <strong className="text-white">Flik does not sell, lease, or monetize personal information.</strong> We only disclose information to vetted enterprise service providers who perform critical infrastructure functions under strict confidentiality:
              </p>
              <div className="space-y-3 mt-3">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs space-y-1">
                  <span className="font-semibold text-white">Global Edge Hosting & CDN (Vercel Inc.)</span>
                  <p className="text-gray-400">Houses our front-end deployment, ensuring low-latency delivery, edge caching, and SSL/TLS encryption.</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs space-y-1">
                  <span className="font-semibold text-white">Secure Form Processing (Web3Forms)</span>
                  <p className="text-gray-400">Encrypts and routes website contact enquiries directly to our designated corporate inbox without storing persistent public databases.</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs space-y-1">
                  <span className="font-semibold text-white">Cloud GPU & 3D Streaming Infrastructure</span>
                  <p className="text-gray-400">High-performance tier-1 cloud compute instances that run Unreal Engine instances for interactive unit tours.</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs space-y-1">
                  <span className="font-semibold text-white">Legal & Regulatory Mandates</span>
                  <p className="text-gray-400">We may disclose information if required to do so by applicable Indian statutes, lawful law enforcement orders, or to protect the vital rights and security of Flik.</p>
                </div>
              </div>
            </section>

            {/* Section 8 */}
            <section id="cross-border" className="space-y-4 pt-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">8.</span> Cross-Border Transfers & NRI Data
              </h2>
              <p>
                Flik Explorer frequently serves Non-Resident Indian (NRI) property buyers and international real estate stakeholders located across the UAE, Singapore, the United States, the United Kingdom, and the European Union.
              </p>
              <p>
                Personal data collected from overseas users is transferred and processed on secure servers located in India and through global cloud edge infrastructure (such as Vercel). When cross-border transfers occur, we implement appropriate safeguards in line with the DPDP Act 2023, standard contractual protections, and GDPR-equivalent standards to ensure an adequate level of data protection.
              </p>
            </section>

            {/* Section 9 */}
            <section id="data-security" className="space-y-4 pt-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">9.</span> Data Security & Storage
              </h2>
              <p>
                We employ comprehensive technical and organizational safeguards designed to protect personal information against unauthorized access, loss, alteration, or disclosure:
              </p>
              <ul className="space-y-2 list-disc list-inside pl-2 text-gray-400">
                <li><strong className="text-gray-200">Encryption in Transit:</strong> All HTTP traffic to <code className="text-emerald-400">flik.in</code> is secured with HTTPS utilizing SHA-256 and TLS 1.3 encryption.</li>
                <li><strong className="text-gray-200">Strict Access Controls:</strong> Only authorized personnel who require data to fulfill customer inquiries are granted administrative access.</li>
                <li><strong className="text-gray-200">Continuous Monitoring:</strong> Routine vulnerability audits, edge rate-limiting, and bot-mitigation safeguards.</li>
              </ul>
              <p className="text-xs text-gray-500">
                While we enforce industry-standard security measures, no electronic transmission over the internet can be guaranteed as 100% impenetrable. Users transmit data at their own discretion.
              </p>
            </section>

            {/* Section 10 */}
            <section id="retention" className="space-y-4 pt-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">10.</span> Data Retention Policy
              </h2>
              <p>
                We retain personal data only for as long as necessary to fulfill the purposes outlined in this Privacy Policy:
              </p>
              <ul className="space-y-2 list-disc list-inside pl-2 text-gray-400">
                <li><strong className="text-gray-200">Inquiry & Sales Leads:</strong> Retained for the duration of the commercial evaluation cycle and up to 24 months thereafter to facilitate ongoing project discussions, unless a deletion request is received.</li>
                <li><strong className="text-gray-200">Contractual & Billing Records:</strong> Retained for the statutory duration required by Indian corporate, tax, and accounting regulations.</li>
                <li><strong className="text-gray-200">Technical Logs:</strong> Routine server access and error logs are automatically overwritten or purged within 90 days.</li>
              </ul>
            </section>

            {/* Section 11 */}
            <section id="your-rights" className="space-y-4 pt-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">11.</span> Your Rights as a Data Principal
              </h2>
              <p>
                Under the Indian Digital Personal Data Protection Act, 2023 (DPDP Act) and international data privacy laws (including the GDPR), you hold distinct enforceable rights:
              </p>

              <div className="grid sm:grid-cols-2 gap-3 mt-3">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <h4 className="font-semibold text-white mb-1">Right to Access</h4>
                  <p className="text-xs text-gray-400">Request confirmation whether your personal data is being processed, and obtain a summary of such data.</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <h4 className="font-semibold text-white mb-1">Right to Correction</h4>
                  <p className="text-xs text-gray-400">Request the correction, completion, or updating of inaccurate or outdated personal data.</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <h4 className="font-semibold text-white mb-1">Right to Erasure</h4>
                  <p className="text-xs text-gray-400">Request the deletion of your personal data when it is no longer required for the original purpose.</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <h4 className="font-semibold text-white mb-1">Right to Withdraw Consent</h4>
                  <p className="text-xs text-gray-400">Withdraw consent previously granted for outreach communications at any time without retroactive penalty.</p>
                </div>
              </div>

              <p className="text-xs text-gray-400 pt-2">
                To exercise any of these rights, please email your request to <a href="mailto:Contact@flik.in" className="text-emerald-400 underline">Contact@flik.in</a>. We will verify your identity and respond within thirty (30) days.
              </p>
            </section>

            {/* Section 12 */}
            <section id="children" className="space-y-4 pt-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">12.</span> Children’s Privacy
              </h2>
              <p>
                Flik Explorer is an enterprise commercial platform intended exclusively for adult professionals and property buyers aged 18 and older. We do not knowingly solicit or collect personal information from minors. If you believe a minor has submitted personal information through our platform, please notify us immediately at <a href="mailto:Contact@flik.in" className="text-emerald-400">Contact@flik.in</a>, and we will promptly erase such records.
              </p>
            </section>

            {/* Section 13 */}
            <section id="grievance" className="space-y-4 pt-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">13.</span> Grievance Redressal & Contact Information
              </h2>
              <p>
                In compliance with the Digital Personal Data Protection Act, 2023 and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, the details of our designated Grievance Officer are provided below:
              </p>

              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
                <div>
                  <h3 className="text-base font-semibold text-white">Grievance & Data Protection Officer</h3>
                  <p className="text-xs text-gray-400">Flik Explorer · Legal & Data Compliance</p>
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
                  <span className="text-gray-300 font-medium">Headquarters / Operational Base:</span> Mumbai, Maharashtra, India.
                </div>
              </div>
            </section>

            {/* Section 14 */}
            <section id="updates" className="space-y-4 pt-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">14.</span> Amendments & Policy Updates
              </h2>
              <p>
                Flik reserves the right to amend this Privacy Policy periodically to reflect technological enhancements, operational changes, or statutory developments. When revisions occur, the “Last Updated” date at the top of this document will be amended accordingly. We encourage users to review this page periodically to remain informed about our privacy safeguards.
              </p>
            </section>

            {/* Back to top CTA */}
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

export default PrivacyPolicy;
