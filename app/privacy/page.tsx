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
import PublicMotionProvider from "@/components/PublicMotionProvider";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "SmartGearPicks Privacy Policy detailing data collection practices, Google AdSense and third-party advertising cookies, affiliate disclosures, and user privacy rights.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "November 3, 2026";

  const sections: LegalSectionItem[] = [
    { id: "overview", label: "1. Overview & Scope", iconName: "shield" },
    { id: "information-collected", label: "2. Information We Collect", iconName: "eye" },
    { id: "cookies", label: "3. Cookies & Tracking", iconName: "cookie" },
    { id: "adsense-advertising", label: "4. Google AdSense & Advertising", iconName: "sparkles" },
    { id: "affiliate-disclosure", label: "5. Affiliate Links & Attribution", iconName: "link" },
    { id: "how-we-use-data", label: "6. How We Use Information", iconName: "file" },
    { id: "social-integrations", label: "7. Social & Third-Party Platforms", iconName: "share" },
    { id: "data-security", label: "8. Data Security & Retention", iconName: "lock" },
    { id: "user-rights", label: "9. User Rights (GDPR & CCPA)", iconName: "database" },
    { id: "contact-us", label: "10. Contact Information", iconName: "mail" },
  ];

  return (
    <PublicMotionProvider>
      <div className="min-h-screen flex flex-col font-sans bg-[#F6F4EF] text-[#22231F]">
        <Navbar />

        <LegalHero
          title="Privacy Policy"
          subtitle="SmartGearPicks values your privacy. This document outlines how we collect, use, and protect your information, including our advertising and affiliate disclosures."
          category="Legal & Trust Compliance"
          lastUpdated={lastUpdated}
          iconName="shield"
        />

        <main className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 flex-1 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <LegalSidebar sections={sections} />

            <div className="lg:col-span-8 space-y-8 leading-relaxed text-[#6B6B66]">
              {/* Section 1 */}
              <LegalSection id="overview" title="1. Overview & Scope" iconName="shield">
                <p>
                  SmartGearPicks (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates the digital platform
                  available at <strong>smartgearpicks.com</strong>. We provide curated product recommendations,
                  gear discovery, and links to external merchant platforms.
                </p>
                <p>
                  This Privacy Policy describes how we collect, process, and disclose information when you visit our
                  website, engage with our curated picks, or interact with connected services and advertising partners.
                </p>
              </LegalSection>

              {/* Section 2 */}
              <LegalSection id="information-collected" title="2. Information We Collect" iconName="eye">
                <p>
                  We collect information necessary to maintain website functionality, ensure security, and improve
                  curated content:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong className="text-[#22231F]">Technical &amp; Log Data:</strong> Browser type, operating
                    system, Internet Protocol (IP) address, referring URL, pages viewed, device characteristics,
                    and timestamp of visits.
                  </li>
                  <li>
                    <strong className="text-[#22231F]">Aggregated Engagement Data:</strong> Click interactions with
                    product catalog listings, search filter queries, and category navigations.
                  </li>
                  <li>
                    <strong className="text-[#22231F]">Voluntarily Provided Information:</strong> Name and email
                    address when you submit inquiries through our contact form or subscribe to our newsletter.
                  </li>
                </ul>
              </LegalSection>

              {/* Section 3 */}
              <LegalSection id="cookies" title="3. Cookies & Tracking Technologies" iconName="cookie">
                <p>
                  Cookies are small data files placed on your device to enable website operations and analytical
                  measurement. We classify cookies on SmartGearPicks as follows:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
                  <div className="bg-[#FFFFFF] border border-[#DDDCD3] rounded-sm p-4 shadow-2xs">
                    <h4 className="font-semibold text-xs mb-1 text-[#22231F]">Essential &amp; Operational Cookies</h4>
                    <p className="text-xs text-[#6B6B66]">
                      Required for basic navigation, security enforcement, and session routing.
                    </p>
                  </div>
                  <div className="bg-[#FFFFFF] border border-[#DDDCD3] rounded-sm p-4 shadow-2xs">
                    <h4 className="font-semibold text-xs mb-1 text-[#22231F]">Affiliate Attribution Cookies</h4>
                    <p className="text-xs text-[#6B6B66]">
                      Set by merchant partners (e.g., Amazon Associates) to attribute qualifying referrals upon redirection.
                    </p>
                  </div>
                </div>
                <p className="text-xs">
                  You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However,
                  some features of the site may function with limited efficiency if cookies are disabled.
                </p>
              </LegalSection>

              {/* Section 4: Google AdSense and Third-Party Advertising */}
              <LegalSection id="adsense-advertising" title="4. Google AdSense & Third-Party Advertising" iconName="sparkles">
                <p>
                  We may serve digital advertisements on SmartGearPicks through third-party advertising networks,
                  including <strong>Google AdSense</strong>.
                </p>

                <LegalHighlightBox title="Mandatory Google Advertising Disclosure" iconName="sparkles">
                  <ul className="list-disc pl-4 space-y-1.5">
                    <li>
                      Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits
                      to this website or other websites across the Internet.
                    </li>
                    <li>
                      Google&apos;s use of advertising cookies enables it and its partners to serve ads to users based on
                      their visits to SmartGearPicks and/or other sites on the Internet.
                    </li>
                    <li>
                      Users may opt out of personalized advertising by visiting{" "}
                      <a
                        href="https://adssettings.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[#354538] underline"
                      >
                        Google Ads Settings
                      </a>.
                    </li>
                    <li>
                      Alternatively, users can opt out of a third-party vendor&apos;s use of cookies for personalized advertising
                      by visiting{" "}
                      <a
                        href="https://www.aboutads.info"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[#354538] underline"
                      >
                        www.aboutads.info
                      </a>.
                    </li>
                  </ul>
                </LegalHighlightBox>

                <p>
                  These third-party ad servers or ad networks use technology in the advertisements and links that appear on
                  SmartGearPicks, sent directly to your browser. They automatically receive your IP address when this occurs.
                  SmartGearPicks has no access to or control over these cookies that are used by third-party advertisers.
                </p>
              </LegalSection>

              {/* Section 5: Affiliate Links Disclosure */}
              <LegalSection id="affiliate-disclosure" title="5. Affiliate Links & Commission Attribution" iconName="link">
                <p>
                  SmartGearPicks is an affiliate-supported product discovery engine. Many outbound links on our site are affiliate
                  links. When you click an affiliate link to an external merchant (such as Amazon) and complete a qualifying
                  purchase, we may earn an affiliate commission.
                </p>
                <LegalHighlightBox title="Amazon Associates Program Statement" iconName="link">
                  SmartGearPicks is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program
                  designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.
                </LegalHighlightBox>
                <p>
                  Purchasing through an affiliate link incurs no additional cost to you. We curate products independently based on
                  utility, build quality, and verified customer feedback.
                </p>
              </LegalSection>

              {/* Section 6 */}
              <LegalSection id="how-we-use-data" title="6. How We Use Information" iconName="file">
                <p>We use information collected on SmartGearPicks for legitimate business purposes:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>To provide, operate, and maintain our product catalog and discovery features.</li>
                  <li>To analyze aggregate trends, popular product categories, and platform traffic patterns.</li>
                  <li>To prevent abusive bots, malicious traffic, and fraudulent affiliate click inflation.</li>
                  <li>To respond to user messages, inquiries, and legal correspondence.</li>
                </ul>
              </LegalSection>

              {/* Section 7 */}
              <LegalSection id="social-integrations" title="7. Social & Third-Party Platforms" iconName="share">
                <p>
                  Our site may include social sharing capabilities or metadata tags (including Pinterest integration features).
                  When you use these features to share or save products, third-party platforms may collect data in accordance
                  with their own terms and privacy practices.
                </p>
                <p>
                  We encourage you to review the privacy policies of any third-party social platforms you interact with.
                </p>
              </LegalSection>

              {/* Section 8 */}
              <LegalSection id="data-security" title="8. Data Security & Retention" iconName="lock">
                <p>
                  We implement industry-standard technical, organizational, and physical safeguards. All communication between
                  your device and SmartGearPicks is encrypted using modern Transport Layer Security (TLS/HTTPS).
                </p>
                <p>
                  Server log data is retained only for standard diagnostic and security audit windows before being aggregated or purged.
                </p>
              </LegalSection>

              {/* Section 9 */}
              <LegalSection id="user-rights" title="9. User Rights (GDPR & CCPA Compliance)" iconName="database">
                <p>
                  Depending on your geographic location, you hold statutory rights under applicable privacy legislation,
                  including the European General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA):
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li><strong className="text-[#22231F]">Right of Access:</strong> Request confirmation and copies of personal data stored.</li>
                  <li><strong className="text-[#22231F]">Right to Rectification:</strong> Request correction of inaccurate information.</li>
                  <li><strong className="text-[#22231F]">Right to Erasure:</strong> Request permanent deletion of your contact data.</li>
                  <li><strong className="text-[#22231F]">Right to Opt-Out:</strong> Exercise opt-out choices for analytical cookies or advertising identifiers.</li>
                </ul>
              </LegalSection>

              {/* Section 10 */}
              <LegalSection id="contact-us" title="10. Contact Information" iconName="mail">
                <LegalContactCard
                  officeName="SmartGearPicks Privacy &amp; Compliance Team"
                  email="privacy@smartgearpicks.com"
                  buttonLabel="Email Privacy Office"
                  description="For questions, data access requests, or regulatory compliance inquiries, contact our dedicated privacy compliance team."
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
