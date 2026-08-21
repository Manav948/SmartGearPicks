import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LegalHero } from "@/components/legal/LegalHero";
import { LegalSidebar, LegalSectionItem } from "@/components/legal/LegalSidebar";
import { LegalSection } from "@/components/legal/LegalSection";
import { LegalHighlightBox } from "@/components/legal/LegalHighlightBox";
import { LegalContactCard } from "@/components/legal/LegalContactCard";

export const metadata: Metadata = {
  title: "Terms of Service – SmartGearPicks",
  description:
    "SmartGearPicks Terms of Service governing platform usage, curated product links, affiliate disclosures, and intellectual property rights.",
};

export default function TermsOfServicePage() {
  const lastUpdated = "August 19, 2026";

  const sections: LegalSectionItem[] = [
    { id: "acceptance", label: "1. Acceptance of Terms", iconName: "filecheck" },
    { id: "services-description", label: "2. Description of Services", iconName: "sparkles" },
    { id: "intellectual-property", label: "3. Intellectual Property", iconName: "lock" },
    { id: "affiliate-disclosure", label: "4. Affiliate & External Links", iconName: "link" },
    { id: "acceptable-use", label: "5. User Conduct & Acceptable Use", iconName: "check" },
    { id: "disclaimer", label: "6. Warranty Disclaimer", iconName: "alert" },
    { id: "limitation-liability", label: "7. Limitation of Liability", iconName: "shieldalert" },
    { id: "governing-law", label: "8. Governing Law", iconName: "scale" },
    { id: "contact-us", label: "9. Contact Information", iconName: "mail" },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans" style={{ backgroundColor: "#f8f9ff", color: "#0b1c30" }}>
      <Navbar />

      {/* Clean Modular Hero Banner */}
      <LegalHero
        title="Terms of Service"
        subtitle="Please review these Terms of Service governing your access to and use of SmartGearPicks, our product recommendations, and platform features."
        category="Terms & Conditions"
        lastUpdated={lastUpdated}
        iconName="scale"
      />

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Table of Contents Sidebar */}
          <LegalSidebar
            sections={sections}
            badgeTitle="Standard SaaS Terms"
            badgeDescription="Compliant with platform publishing guidelines, affiliate link rules, and user agreement standards."
          />

          {/* Policy Detail Sections */}
          <div className="lg:col-span-8 space-y-8 leading-relaxed" style={{ color: "#464554" }}>
            {/* Section 1 */}
            <LegalSection id="acceptance" title="1. Acceptance of Terms" iconName="filecheck">
              <p>
                By accessing or using SmartGearPicks (&quot;Site,&quot; &quot;Platform,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), you confirm that you have read, understood, and agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to all of these Terms, you are expressly prohibited from using the Site and must discontinue use immediately.
              </p>
            </LegalSection>

            {/* Section 2 */}
            <LegalSection id="services-description" title="2. Description of Services" iconName="sparkles">
              <p>
                SmartGearPicks provides an online catalog and discovery engine for curated tech gear, lifestyle products, creator tools, and workspace equipment. We publish editorial recommendations, product details, price metadata, and referral links to third-party e-commerce platforms.
              </p>
            </LegalSection>

            {/* Section 3 */}
            <LegalSection id="intellectual-property" title="3. Intellectual Property Rights" iconName="lock">
              <p>
                Unless otherwise indicated, the Site source code, database architecture, functionality, software, website designs, text, photographs, and graphics on the Site (collectively, the &quot;Content&quot;) are owned or controlled by SmartGearPicks or licensed to us.
              </p>
              <p className="text-xs" style={{ color: "#767586" }}>
                Product images and brand names referenced on the Site belong to their respective copyright and trademark owners and are displayed for identification and recommendation purposes.
              </p>
            </LegalSection>

            {/* Section 4 */}
            <LegalSection id="affiliate-disclosure" title="4. Affiliate & Outbound Links Disclosure" iconName="link">
              <p>
                The Site contains outbound links to third-party merchant websites (such as Amazon.com). As a participant in affiliate marketing programs, SmartGearPicks receives referral commissions for qualifying purchases made via outbound links.
              </p>
              <LegalHighlightBox title="Merchant Transactions Disclaimer" iconName="link">
                SmartGearPicks is not a direct merchant or manufacturer of the products listed. All purchases, payments, shipping, and returns are handled exclusively by the respective third-party merchant.
              </LegalHighlightBox>
            </LegalSection>

            {/* Section 5 */}
            <LegalSection id="acceptable-use" title="5. User Conduct & Acceptable Use" iconName="check">
              <p>You agree not to access or use the Site for any purpose other than that for which we make the Site available. Prohibited activities include:</p>
              <ul className="list-disc pl-5 space-y-2" style={{ color: "#464554" }}>
                <li>Systematically retrieving data or catalog content without written permission.</li>
                <li>Attempting to bypass rate limits, server security, or administrative access controls.</li>
                <li>Engaging in unauthorized framing of or linking to the Site.</li>
              </ul>
            </LegalSection>

            {/* Section 6 */}
            <LegalSection id="disclaimer" title="6. Warranty Disclaimer" iconName="alert">
              <p>
                THE SITE AND CATALOG ARE PROVIDED ON AN &quot;AS-IS&quot; AND &quot;AS-AVAILABLE&quot; BASIS. YOU AGREE THAT YOUR USE OF THE SITE SERVICES WILL BE AT YOUR SOLE RISK.
              </p>
            </LegalSection>

            {/* Section 7 */}
            <LegalSection id="limitation-liability" title="7. Limitation of Liability" iconName="shieldalert">
              <p>
                IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY INDIRECT, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SITE.
              </p>
            </LegalSection>

            {/* Section 8 */}
            <LegalSection id="governing-law" title="8. Governing Law" iconName="scale">
              <p>
                These Terms shall be governed by and defined following applicable laws. Courts shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
              </p>
            </LegalSection>

            {/* Section 9 */}
            <LegalSection id="contact-us" title="9. Contact Information" iconName="mail">
              <LegalContactCard
                officeName="SmartGearPicks Legal Operations"
                email="terms@smartgearpicks.com"
                buttonLabel="Contact Legal Team"
                description="For legal inquiries or questions regarding these Terms of Service, please reach out to our legal operations department."
              />
            </LegalSection>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
