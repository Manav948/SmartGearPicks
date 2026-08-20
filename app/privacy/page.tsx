import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LegalHero } from "@/components/legal/LegalHero";
import { LegalSidebar, LegalSectionItem } from "@/components/legal/LegalSidebar";
import { LegalSection } from "@/components/legal/LegalSection";
import { LegalHighlightBox } from "@/components/legal/LegalHighlightBox";
import { LegalContactCard } from "@/components/legal/LegalContactCard";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy – SmartGearPicks",
  description:
    "SmartGearPicks Privacy Policy detailing data collection practices, cookies, third-party affiliate disclosures, Pinterest API integration compliance, and user privacy rights.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "August 19, 2026";

  const sections: LegalSectionItem[] = [
    { id: "overview", label: "1. Overview & Scope", iconName: "shield" },
    { id: "information-collected", label: "2. Information We Collect", iconName: "eye" },
    { id: "pinterest-api", label: "3. Pinterest & Social Disclosures", iconName: "share" },
    { id: "cookies", label: "4. Cookies & Tracking", iconName: "cookie" },
    { id: "how-we-use-data", label: "5. How We Use Information", iconName: "file" },
    { id: "affiliate-disclosure", label: "6. Affiliate & External Links", iconName: "link" },
    { id: "data-security", label: "7. Data Security & Storage", iconName: "lock" },
    { id: "user-rights", label: "8. User Rights & Data Deletion", iconName: "database" },
    { id: "contact-us", label: "9. Contact Information", iconName: "mail" },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-zinc-900 flex flex-col font-sans selection:bg-zinc-200 selection:text-black">
      <Navbar />

     
      <LegalHero
        title="Privacy Policy"
        subtitle="SmartGearPicks values your trust. This document details how we handle user data, cookies, affiliate links, and compliance with platform requirements including Pinterest developer guidelines."
        category="Legal & Trust Compliance"
        lastUpdated={lastUpdated}
        iconName="shield"
      />

     
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
          <LegalSidebar sections={sections} />

         
          <div className="lg:col-span-8 space-y-8 text-zinc-700 leading-relaxed">
           
            <LegalSection id="overview" title="1. Overview & Scope" iconName="shield">
              <p>
                SmartGearPicks (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates the digital platform hosted at this domain. We are dedicated to providing curated product recommendations, tech gear reviews, and creator tool showcases.
              </p>
              <p>
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, interact with our curated links, or use connected platform tools and social integrations (including Pinterest and affiliate partners).
              </p>
            </LegalSection>

            <LegalSection id="information-collected" title="2. Information We Collect" iconName="eye">
              <p>
                We collect information to deliver a smooth browsing experience, verify traffic authenticity, and track aggregate product interactions:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-zinc-700">
                <li>
                  <strong className="text-zinc-900">Automatically Collected Log Data:</strong> IP address, browser type, operating system, device details, referring URLs, pages viewed, timestamp, and exit links.
                </li>
                <li>
                  <strong className="text-zinc-900">Interaction & Click Analytics:</strong> Click counts on product listings, search queries, and referral link redirects.
                </li>
                <li>
                  <strong className="text-zinc-900">Voluntarily Provided Information:</strong> Email address provided during newsletter subscription or support inquiries.
                </li>
              </ul>
            </LegalSection>

           
            <LegalSection id="pinterest-api" title="3. Pinterest & Social Disclosures" iconName="share">
              <p>
                SmartGearPicks integrates social sharing features, including Pinterest API features, Pinterest Save buttons, and metadata tags designed to facilitate product pin creation on Pinterest.
              </p>

              <LegalHighlightBox title="Pinterest Platform Terms Compliance" iconName="share">
                When you interact with Pinterest features or save our curated products to your Pinterest boards, Pinterest may collect information directly from your browser. We adhere to the Pinterest Developer & API Terms of Service. We do not sell user data obtained through Pinterest APIs to third parties, nor do we attempt to re-identify Pinterest users.
              </LegalHighlightBox>

              <p>
                For more details on how Pinterest processes data, please inspect the official{" "}
                <a
                  href="https://policy.pinterest.com/en/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black font-semibold underline hover:text-zinc-600 inline-flex items-center gap-1"
                >
                  Pinterest Privacy Policy <ArrowUpRight className="w-3 h-3" />
                </a>.
              </p>
            </LegalSection>

          
            <LegalSection id="cookies" title="4. Cookies & Tracking Technologies" iconName="cookie">
              <p>
                Cookies are small text files stored on your browser. We use first-party and third-party cookies for essential functionality, performance measurement, and affiliate link attribution.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
                <div className="bg-white border border-zinc-200 p-4 rounded-xl shadow-xs">
                  <h4 className="font-semibold text-zinc-900 text-xs mb-1">Essential Cookies</h4>
                  <p className="text-xs text-zinc-600">Necessary for website operation, session state, and security routing.</p>
                </div>
                <div className="bg-white border border-zinc-200 p-4 rounded-xl shadow-xs">
                  <h4 className="font-semibold text-zinc-900 text-xs mb-1">Affiliate Attribution Cookies</h4>
                  <p className="text-xs text-zinc-600">Placed by partner networks (such as Amazon Associates) to attribute successful merchant referrals.</p>
                </div>
              </div>
            </LegalSection>

          
            <LegalSection id="how-we-use-data" title="5. How We Use Information" iconName="file">
              <p>We use collected information for the following business purposes:</p>
              <ul className="list-disc pl-5 space-y-2 text-zinc-700">
                <li>To operate, maintain, and optimize our curated product platform.</li>
                <li>To measure click-through rates and optimize curated recommendations based on audience engagement.</li>
                <li>To maintain platform security, detect fraudulent clicks, and protect against cyber threats.</li>
                <li>To comply with regulatory obligations and API partner policies (e.g., Pinterest Developer guidelines).</li>
              </ul>
            </LegalSection>

           
            <LegalSection id="affiliate-disclosure" title="6. Affiliate & External Links Disclosure" iconName="link">
              <p>
                SmartGearPicks is a participant in affiliate advertising programs (including the Amazon Services LLC Associates Program and partner affiliate networks). Our product recommendations contain affiliate links. When you click an outbound link and make a purchase on a merchant site, we may earn a referral commission at no extra cost to you.
              </p>
            </LegalSection>

          
            <LegalSection id="data-security" title="7. Data Security & Retention" iconName="lock">
              <p>
                We implement administrative, technical, and physical security controls to protect your data. All data transmitted between your browser and our site is encrypted using Transport Layer Security (TLS/HTTPS).
              </p>
            </LegalSection>

           
            <LegalSection id="user-rights" title="8. User Rights & Data Deletion" iconName="database">
              <p>
                Under applicable privacy laws (GDPR, CCPA), you have rights regarding access, deletion, and restriction of personal data.
              </p>

              <LegalHighlightBox title="Data Deletion Requests" iconName="database">
                You may request complete deletion of any stored logs or contact data associated with your interaction by emailing our privacy compliance officer.
              </LegalHighlightBox>
            </LegalSection>

          
            <LegalSection id="contact-us" title="9. Contact Information" iconName="mail">
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
