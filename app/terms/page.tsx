import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LegalHero } from "@/components/legal/LegalHero";
import { LegalSidebar, LegalSectionItem } from "@/components/legal/LegalSidebar";
import { LegalSection } from "@/components/legal/LegalSection";
import { LegalHighlightBox } from "@/components/legal/LegalHighlightBox";
import { LegalContactCard } from "@/components/legal/LegalContactCard";
import PublicMotionProvider from "@/components/PublicMotionProvider";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "SmartGearPicks Terms of Service governing platform usage, curated product recommendations, merchant transaction boundaries, and affiliate disclosures.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsOfServicePage() {
  const lastUpdated = "November 3, 2026";

  const sections: LegalSectionItem[] = [
    { id: "acceptance", label: "1. Acceptance of Terms", iconName: "filecheck" },
    { id: "services-description", label: "2. Description of Services", iconName: "sparkles" },
    { id: "merchant-boundary", label: "3. Merchant Transactions & Orders", iconName: "alert" },
    { id: "pricing-availability", label: "4. Pricing & Availability", iconName: "scale" },
    { id: "affiliate-disclosure", label: "5. Affiliate Links & Relationships", iconName: "link" },
    { id: "intellectual-property", label: "6. Intellectual Property", iconName: "lock" },
    { id: "acceptable-use", label: "7. User Conduct & Acceptable Use", iconName: "check" },
    { id: "warranty-disclaimer", label: "8. Warranty Disclaimer", iconName: "shieldalert" },
    { id: "limitation-liability", label: "9. Limitation of Liability", iconName: "shield" },
    { id: "contact-us", label: "10. Contact Information", iconName: "mail" },
  ];

  return (
    <PublicMotionProvider>
      <div className="min-h-screen flex flex-col font-sans bg-[#F6F4EF] text-[#22231F]">
        <Navbar />

        <LegalHero
          title="Terms of Service"
          subtitle="Please read these terms carefully before accessing SmartGearPicks. They govern your use of our product discovery platform and external merchant referral links."
          category="Terms & Conditions"
          lastUpdated={lastUpdated}
          iconName="scale"
        />

        <main className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 flex-1 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <LegalSidebar
              sections={sections}
              badgeTitle="Editorial Platform Terms"
              badgeDescription="Compliant with affiliate disclosure regulations, platform publishing rules, and third-party retailer standards."
            />

            <div className="lg:col-span-8 space-y-8 leading-relaxed text-[#6B6B66]">
              {/* Section 1 */}
              <LegalSection id="acceptance" title="1. Acceptance of Terms" iconName="filecheck">
                <p>
                  By accessing or browsing <strong>SmartGearPicks</strong> (&quot;the Website,&quot; &quot;we,&quot;
                  &quot;our,&quot; or &quot;us&quot;), you acknowledge that you have read, understood, and agree to be bound
                  by these Terms of Service. If you do not agree to all terms stated herein, you must cease use of the Website immediately.
                </p>
              </LegalSection>

              {/* Section 2 */}
              <LegalSection id="services-description" title="2. Description of Services" iconName="sparkles">
                <p>
                  SmartGearPicks is an online product discovery, review, and curation platform. We highlight standout technology
                  gear, everyday carry items, workspace tools, and lifestyle accessories. We publish editorial reviews, specifications,
                  and outbound links to external merchant platforms (such as Amazon and direct brand online stores).
                </p>
              </LegalSection>

              {/* Section 3 */}
              <LegalSection id="merchant-boundary" title="3. Merchant Transactions & Third-Party Orders" iconName="alert">
                <p>
                  SmartGearPicks is <strong>not</strong> an online retailer, direct seller, or dropshipper. We do not process payments,
                  maintain physical product inventory, or manage shipping and fulfillment.
                </p>
                <LegalHighlightBox title="Independent Merchant Boundary" iconName="alert">
                  When you click an outbound link on SmartGearPicks, you are directed to an independent third-party retailer website.
                  All orders, billing, shipping, product warranties, customer service, and returns are solely governed by the terms
                  and conditions of the respective retailer.
                </LegalHighlightBox>
              </LegalSection>

              {/* Section 4 */}
              <LegalSection id="pricing-availability" title="4. Pricing & Product Availability" iconName="scale">
                <p>
                  Prices displayed on SmartGearPicks are approximate reference guide prices noted during editorial curation. Retailer
                  prices and stock levels fluctuate constantly due to retailer sales, dynamic pricing, and inventory updates.
                </p>
                <p>
                  We make no guarantee that a listed price remains current upon checkout. Always confirm the final price, shipping costs,
                  and return policies directly on the retailer&apos;s product page before purchasing.
                </p>
              </LegalSection>

              {/* Section 5 */}
              <LegalSection id="affiliate-disclosure" title="5. Affiliate Links & Financial Relationships" iconName="link">
                <p>
                  SmartGearPicks participates in affiliate marketing programs, notably the Amazon Services LLC Associates Program.
                  We may receive an advertising commission when users click our outbound referral links and complete qualifying purchases
                  on retailer websites.
                </p>
                <p>
                  This commission comes at zero additional expense to the consumer. Our editorial curations are guided by product quality
                  and utility, not commission rates.
                </p>
              </LegalSection>

              {/* Section 6 */}
              <LegalSection id="intellectual-property" title="6. Intellectual Property Rights" iconName="lock">
                <p>
                  The original editorial content, website design, text, logos, selection criteria, software architecture, and compilation
                  on SmartGearPicks are the intellectual property of SmartGearPicks and are protected under copyright and trademark laws.
                </p>
                <p className="text-xs">
                  Third-party product names, manufacturer trademarks, and product photos displayed for identification purposes remain
                  the exclusive property of their respective trademark and copyright holders.
                </p>
              </LegalSection>

              {/* Section 7 */}
              <LegalSection id="acceptable-use" title="7. User Conduct & Acceptable Use" iconName="check">
                <p>While using SmartGearPicks, you agree not to:</p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>Use automated web crawlers or scrapers to extract site data without prior written authorization.</li>
                  <li>Interfere with platform operations, attempt denial-of-service attacks, or bypass security firewalls.</li>
                  <li>Engage in programmatic or fraudulent clicking of affiliate links.</li>
                  <li>Misrepresent affiliations with SmartGearPicks or impersonate any individual or entity.</li>
                </ul>
              </LegalSection>

              {/* Section 8 */}
              <LegalSection id="warranty-disclaimer" title="8. Warranty Disclaimer" iconName="shieldalert">
                <p>
                  SMARTGEARPICKS AND ITS CONTENT ARE PROVIDED ON AN &quot;AS-IS&quot; AND &quot;AS-AVAILABLE&quot; BASIS. WE DISCLAIM ALL
                  WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO MERCHANTABILITY, FITNESS FOR A PARTICULAR
                  PURPOSE, AND NON-INFRINGEMENT.
                </p>
              </LegalSection>

              {/* Section 9 */}
              <LegalSection id="limitation-liability" title="9. Limitation of Liability" iconName="shield">
                <p>
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, SMARTGEARPICKS AND ITS OPERATORS SHALL NOT BE LIABLE FOR ANY DIRECT, INDIRECT,
                  INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES ARISING FROM YOUR ACCESS TO OR INABILITY TO ACCESS THE WEBSITE, OR FROM
                  ANY PRODUCT PURCHASES COMPLETED ON THIRD-PARTY MERCHANT SITES.
                </p>
              </LegalSection>

              {/* Section 10 */}
              <LegalSection id="contact-us" title="10. Contact Information" iconName="mail">
                <LegalContactCard
                  officeName="SmartGearPicks Legal &amp; Editorial Operations"
                  email="legal@smartgearpicks.com"
                  buttonLabel="Email Legal Team"
                  description="For questions or legal notices regarding these Terms of Service, please reach out directly to our operations team."
                />
              </LegalSection>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </PublicMotionProvider>
  );
}
