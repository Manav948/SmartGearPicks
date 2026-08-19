import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LegalHero } from "@/components/legal/LegalHero";
import { LegalSidebar, LegalSectionItem } from "@/components/legal/LegalSidebar";
import { LegalSection } from "@/components/legal/LegalSection";
import { LegalHighlightBox } from "@/components/legal/LegalHighlightBox";
import { LegalContactCard } from "@/components/legal/LegalContactCard";
import {
  ShieldCheck,
  Lock,
  Eye,
  FileText,
  Cookie,
  Share2,
  Database,
  Mail,
  ArrowUpRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy – SmartGearPicks",
  description:
    "SmartGearPicks Privacy Policy detailing data collection practices, cookies, third-party affiliate disclosures, Pinterest API integration compliance, and user privacy rights.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "August 19, 2026";

  const sections: LegalSectionItem[] = [
    { id: "overview", label: "1. Overview & Scope", icon: ShieldCheck },
    { id: "information-collected", label: "2. Information We Collect", icon: Eye },
    { id: "pinterest-api", label: "3. Pinterest & Social Disclosures", icon: Share2 },
    { id: "cookies", label: "4. Cookies & Tracking", icon: Cookie },
    { id: "how-we-use-data", label: "5. How We Use Information", icon: FileText },
    { id: "affiliate-disclosure", label: "6. Affiliate & External Links", icon: ArrowUpRight },
    { id: "data-security", label: "7. Data Security & Storage", icon: Lock },
    { id: "user-rights", label: "8. User Rights & Data Deletion", icon: Database },
    { id: "contact-us", label: "9. Contact Information", icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      <Navbar />

      {/* Clean Modular Hero Banner */}
      <LegalHero
        title="Privacy Policy"
        subtitle="SmartGearPicks values your trust. This document details how we handle user data, cookies, affiliate links, and compliance with platform requirements including Pinterest developer guidelines."
        category="Legal & Trust Compliance"
        lastUpdated={lastUpdated}
        icon={ShieldCheck}
        badgeColor="indigo"
      />

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Sticky Table of Contents Sidebar */}
          <LegalSidebar sections={sections} />

          {/* Policy Detail Sections */}
          <div className="lg:col-span-8 space-y-8 text-zinc-300 leading-relaxed">
            {/* Section 1 */}
            <LegalSection id="overview" title="1. Overview & Scope" icon={ShieldCheck} iconColor="indigo">
              <p>
                SmartGearPicks (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates the digital platform hosted at this domain. We are dedicated to providing curated product recommendations, tech gear reviews, and creator tool showcases.
              </p>
              <p>
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, interact with our curated links, or use connected platform tools and social integrations (including Pinterest and affiliate partners).
              </p>
            </LegalSection>

            {/* Section 2 */}
            <LegalSection id="information-collected" title="2. Information We Collect" icon={Eye} iconColor="purple">
              <p>
                We collect information to deliver a smooth browsing experience, verify traffic authenticity, and track aggregate product interactions:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-zinc-300">
                <li>
                  <strong className="text-zinc-100">Automatically Collected Log Data:</strong> IP address, browser type, operating system, device details, referring URLs, pages viewed, timestamp, and exit links.
                </li>
                <li>
                  <strong className="text-zinc-100">Interaction & Click Analytics:</strong> Click counts on product listings, search queries, and referral link redirects.
                </li>
                <li>
                  <strong className="text-zinc-100">Voluntarily Provided Information:</strong> Email address provided during newsletter subscription or support inquiries.
                </li>
              </ul>
            </LegalSection>

            {/* Section 3: Pinterest */}
            <LegalSection id="pinterest-api" title="3. Pinterest & Social Disclosures" icon={Share2} iconColor="rose">
              <p>
                SmartGearPicks integrates social sharing features, including Pinterest API features, Pinterest Save buttons, and metadata tags designed to facilitate product pin creation on Pinterest.
              </p>

              <LegalHighlightBox title="Pinterest Platform Terms Compliance" variant="rose" icon={Share2}>
                When you interact with Pinterest features or save our curated products to your Pinterest boards, Pinterest may collect information directly from your browser. We adhere to the Pinterest Developer & API Terms of Service. We do not sell user data obtained through Pinterest APIs to third parties, nor do we attempt to re-identify Pinterest users.
              </LegalHighlightBox>

              <p>
                For more details on how Pinterest processes data, please inspect the official{" "}
                <a
                  href="https://policy.pinterest.com/en/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rose-400 hover:underline font-medium inline-flex items-center gap-1"
                >
                  Pinterest Privacy Policy <ArrowUpRight className="w-3 h-3" />
                </a>.
              </p>
            </LegalSection>

            {/* Section 4 */}
            <LegalSection id="cookies" title="4. Cookies & Tracking Technologies" icon={Cookie} iconColor="amber">
              <p>
                Cookies are small text files stored on your browser. We use first-party and third-party cookies for essential functionality, performance measurement, and affiliate link attribution.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
                <div className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-xl">
                  <h4 className="font-semibold text-white text-xs mb-1">Essential Cookies</h4>
                  <p className="text-xs text-zinc-400">Necessary for website operation, session state, and security routing.</p>
                </div>
                <div className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-xl">
                  <h4 className="font-semibold text-white text-xs mb-1">Affiliate Attribution Cookies</h4>
                  <p className="text-xs text-zinc-400">Placed by partner networks (such as Amazon Associates) to attribute successful merchant referrals.</p>
                </div>
              </div>
            </LegalSection>

            {/* Section 5 */}
            <LegalSection id="how-we-use-data" title="5. How We Use Information" icon={FileText} iconColor="blue">
              <p>We use collected information for the following business purposes:</p>
              <ul className="list-disc pl-5 space-y-2 text-zinc-300">
                <li>To operate, maintain, and optimize our curated product platform.</li>
                <li>To measure click-through rates and optimize curated recommendations based on audience engagement.</li>
                <li>To maintain platform security, detect fraudulent clicks, and protect against cyber threats.</li>
                <li>To comply with regulatory obligations and API partner policies (e.g., Pinterest Developer guidelines).</li>
              </ul>
            </LegalSection>

            {/* Section 6 */}
            <LegalSection id="affiliate-disclosure" title="6. Affiliate & External Links Disclosure" icon={ArrowUpRight} iconColor="emerald">
              <p>
                SmartGearPicks is a participant in affiliate advertising programs (including the Amazon Services LLC Associates Program and partner affiliate networks). Our product recommendations contain affiliate links. When you click an outbound link and make a purchase on a merchant site, we may earn a referral commission at no extra cost to you.
              </p>
            </LegalSection>

            {/* Section 7 */}
            <LegalSection id="data-security" title="7. Data Security & Retention" icon={Lock} iconColor="indigo">
              <p>
                We implement administrative, technical, and physical security controls to protect your data. All data transmitted between your browser and our site is encrypted using Transport Layer Security (TLS/HTTPS).
              </p>
            </LegalSection>

            {/* Section 8 */}
            <LegalSection id="user-rights" title="8. User Rights & Data Deletion" icon={Database} iconColor="teal">
              <p>
                Under applicable privacy laws (GDPR, CCPA), you have rights regarding access, deletion, and restriction of personal data.
              </p>

              <LegalHighlightBox title="Data Deletion Requests" variant="indigo" icon={Database}>
                You may request complete deletion of any stored logs or contact data associated with your interaction by emailing our privacy compliance officer.
              </LegalHighlightBox>
            </LegalSection>

            {/* Section 9 */}
            <LegalSection id="contact-us" title="9. Contact Information" icon={Mail} iconColor="indigo">
              <LegalContactCard
                officeName="SmartGearPicks Privacy Team"
                email="privacy@smartgearpicks.com"
                buttonLabel="Contact Privacy Office"
              />
            </LegalSection>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
