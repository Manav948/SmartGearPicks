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
  title: "Disclaimer",
  description:
    "SmartGearPicks Disclaimer — affiliate earnings disclosure, product information accuracy, external links, and limitations of liability.",
  alternates: {
    canonical: "/disclaimer",
  },
  openGraph: {
    title: "Disclaimer | SmartGearPicks",
    description:
      "Important disclaimers about affiliate earnings, product pricing accuracy, external links, and the scope of information provided by SmartGearPicks.",
    url: "/disclaimer",
    type: "website",
  },
};

export default function DisclaimerPage() {
  const lastUpdated = "November 3, 2026";

  const sections: LegalSectionItem[] = [
    { id: "general", label: "1. General Disclaimer", iconName: "alert" },
    { id: "affiliate-disclosure", label: "2. Affiliate Earnings Disclosure", iconName: "link" },
    { id: "not-a-retailer", label: "3. We Are Not a Retailer", iconName: "info" },
    { id: "product-accuracy", label: "4. Product Information Accuracy", iconName: "eye" },
    { id: "pricing", label: "5. Pricing & Availability", iconName: "file" },
    { id: "external-links", label: "6. External Links", iconName: "globe" },
    { id: "no-professional-advice", label: "7. No Professional Advice", iconName: "shield-alert" },
    { id: "limitation-of-liability", label: "8. Limitation of Liability", iconName: "scale" },
    { id: "changes", label: "9. Changes to This Disclaimer", iconName: "filecheck" },
    { id: "contact", label: "10. Contact Information", iconName: "mail" },
  ];

  return (
    <PublicMotionProvider>
      <div className="min-h-screen flex flex-col font-sans bg-[#F6F4EF] text-[#22231F]">
        <Navbar />

        <LegalHero
          title="Disclaimer"
          subtitle="This page outlines important disclaimers regarding the information, affiliate relationships, product data, and external links presented on SmartGearPicks."
          category="Legal Disclaimer"
          lastUpdated={lastUpdated}
          iconName="alert"
        />

        <main className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 flex-1 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <LegalSidebar
              sections={sections}
              title="Document Navigation"
              badgeTitle="Full Transparency"
              badgeDescription="SmartGearPicks maintains transparent affiliate disclosures in compliance with FTC guidelines and Amazon Associates Program requirements."
            />

            <div className="lg:col-span-8 space-y-8 leading-relaxed text-[#6B6B66]">
              {/* Section 1 */}
              <LegalSection id="general" title="1. General Disclaimer" iconName="alert">
                <p>
                  The information provided on SmartGearPicks (smartgearpicks.com) is for general
                  informational and product discovery purposes only. While we strive to present
                  accurate, up-to-date, and useful information, we make no representations or
                  warranties of any kind — express or implied — about the completeness, accuracy,
                  reliability, suitability, or availability of the information, products, services,
                  or related content on this website.
                </p>
                <p>
                  Any reliance you place on information from SmartGearPicks is strictly at your own
                  risk. We encourage readers to independently verify product details, specifications,
                  and pricing before making purchasing decisions.
                </p>
              </LegalSection>

              {/* Section 2 */}
              <LegalSection id="affiliate-disclosure" title="2. Affiliate Earnings Disclosure" iconName="link">
                <LegalHighlightBox title="FTC Affiliate Disclosure" iconName="alert">
                  <p>
                    SmartGearPicks earns revenue through affiliate partnerships. When you click on
                    product links on our website and make a qualifying purchase on the
                    merchant&apos;s website, we may earn a commission. This does not increase the
                    price you pay — affiliate commissions are paid by the merchant, not the buyer.
                  </p>
                </LegalHighlightBox>

                <LegalHighlightBox title="Amazon Associates Program Disclosure" iconName="link">
                  <p>
                    SmartGearPicks is a participant in the Amazon Services LLC Associates Program,
                    an affiliate advertising program designed to provide a means for sites to earn
                    advertising fees by advertising and linking to Amazon.com and affiliated
                    websites.
                  </p>
                </LegalHighlightBox>

                <p>
                  We may also participate in other affiliate programs and networks. All product
                  recommendations are made independently based on research and editorial
                  evaluation. Affiliate relationships do not influence which products we choose to
                  feature, nor do they affect the content of our descriptions or evaluations.
                </p>
                <p>
                  For complete details on how we handle affiliate links and tracking, please refer
                  to our{" "}
                  <a href="/privacy" className="font-semibold text-[#354538] underline">
                    Privacy Policy
                  </a>.
                </p>
              </LegalSection>

              {/* Section 3 */}
              <LegalSection id="not-a-retailer" title="3. We Are Not a Retailer" iconName="info">
                <p>
                  SmartGearPicks is a product discovery and recommendation platform.{" "}
                  <strong className="text-[#22231F]">
                    We do not sell, manufacture, ship, store, or handle any physical products.
                  </strong>
                </p>
                <p>
                  All purchases are made directly on third-party merchant websites (such as
                  Amazon.com or other retail partners). When you click a product link on
                  SmartGearPicks, you are redirected to the merchant&apos;s website where the
                  transaction takes place under that merchant&apos;s own terms and conditions.
                </p>
                <p>
                  SmartGearPicks has no involvement in or responsibility for:
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>Order processing or fulfilment</li>
                  <li>Payment processing or billing</li>
                  <li>Product shipping, delivery, or logistics</li>
                  <li>Returns, refunds, or exchanges</li>
                  <li>Product warranties or guarantees</li>
                  <li>Customer service related to purchased products</li>
                </ul>
                <p>
                  For any issues related to a product you purchased, please contact the merchant or
                  retailer where you completed the transaction.
                </p>
              </LegalSection>

              {/* Section 4 */}
              <LegalSection id="product-accuracy" title="4. Product Information Accuracy" iconName="eye">
                <p>
                  We make every effort to present accurate product descriptions, specifications,
                  images, and details on SmartGearPicks. However, product information is sourced
                  from third-party merchants and publicly available data, and may contain
                  inaccuracies or become outdated.
                </p>
                <p>
                  <strong className="text-[#22231F]">Product details that may change without notice include:</strong>
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>Product names, descriptions, and specifications</li>
                  <li>Product images and visual representations</li>
                  <li>Features, colors, sizes, and dimensions</li>
                  <li>Customer ratings and review counts</li>
                  <li>Brand names and model numbers</li>
                </ul>
                <p>
                  Always verify current product details on the merchant&apos;s website before
                  making a purchase. SmartGearPicks is not responsible for discrepancies between the
                  information displayed on our site and the actual product listing on the
                  merchant&apos;s website.
                </p>
              </LegalSection>

              {/* Section 5 */}
              <LegalSection id="pricing" title="5. Pricing & Availability" iconName="file">
                <LegalHighlightBox title="Important Pricing Notice" iconName="alert">
                  <p>
                    Prices displayed on SmartGearPicks are{" "}
                    <strong className="text-[#22231F]">indicative guide prices</strong> at the time
                    of publication and may not reflect the current price on the merchant&apos;s
                    website. Prices can change at any time due to promotions, stock levels, currency
                    fluctuations, or merchant policy changes.
                  </p>
                </LegalHighlightBox>
                <p>
                  Product availability is determined entirely by the respective merchant. A product
                  listed on SmartGearPicks may become unavailable, discontinued, or out of stock on
                  the merchant&apos;s platform at any time.
                </p>
                <p>
                  SmartGearPicks does not guarantee that any product listed on our website is
                  currently available for purchase or that the displayed price is accurate at the
                  time of your visit. Always confirm the final price and availability on the
                  merchant&apos;s checkout page.
                </p>
              </LegalSection>

              {/* Section 6 */}
              <LegalSection id="external-links" title="6. External Links" iconName="globe">
                <p>
                  SmartGearPicks contains links to external websites operated by third parties,
                  primarily merchant and retail platforms. These external links are provided for
                  convenience and informational purposes.
                </p>
                <p>
                  We do not control the content, accuracy, privacy policies, or practices of
                  third-party websites. The inclusion of a link to an external website does not
                  imply endorsement of that website&apos;s content, products, or services beyond the
                  specific product being referenced.
                </p>
                <p>
                  SmartGearPicks is not responsible for:
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>The content or accuracy of linked third-party websites</li>
                  <li>The privacy practices of external websites</li>
                  <li>Any losses or damages resulting from interactions with third-party websites</li>
                  <li>Changes to URLs, broken links, or website availability</li>
                </ul>
                <p>
                  We encourage you to review the terms and privacy policies of any third-party
                  website you visit through links on SmartGearPicks.
                </p>
              </LegalSection>

              {/* Section 7 */}
              <LegalSection id="no-professional-advice" title="7. No Professional Advice" iconName="shield-alert">
                <p>
                  The content on SmartGearPicks is editorial and informational in nature. It does
                  not constitute and should not be interpreted as:
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>Professional purchasing or procurement advice</li>
                  <li>Technical, engineering, or safety advice</li>
                  <li>Medical, health, or fitness advice</li>
                  <li>Financial or investment advice</li>
                  <li>Legal advice</li>
                </ul>
                <p>
                  If you require professional guidance in any of these areas, please consult a
                  qualified professional. Product descriptions on SmartGearPicks are intended to
                  help you discover and evaluate products — not to replace expert judgment where
                  applicable.
                </p>
              </LegalSection>

              {/* Section 8 */}
              <LegalSection id="limitation-of-liability" title="8. Limitation of Liability" iconName="scale">
                <p>
                  To the fullest extent permitted by applicable law, SmartGearPicks, its operators,
                  contributors, and affiliates shall not be held liable for any direct, indirect,
                  incidental, special, consequential, or punitive damages arising from:
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>Your use of or inability to use this website</li>
                  <li>Any information or content presented on this website</li>
                  <li>Products purchased through links on this website</li>
                  <li>Actions or omissions of third-party merchants or advertisers</li>
                  <li>Unauthorized access to or alteration of your data</li>
                  <li>Any errors, inaccuracies, or omissions in content</li>
                </ul>
                <p>
                  This limitation applies regardless of whether the damages arise from contract,
                  tort, negligence, strict liability, or any other legal theory, even if
                  SmartGearPicks has been advised of the possibility of such damages.
                </p>
              </LegalSection>

              {/* Section 9 */}
              <LegalSection id="changes" title="9. Changes to This Disclaimer" iconName="filecheck">
                <p>
                  SmartGearPicks reserves the right to update, modify, or replace this Disclaimer
                  at any time without prior notice. Changes become effective immediately upon
                  publication on this page.
                </p>
                <p>
                  The &quot;Last Updated&quot; date at the top of this page indicates when this
                  Disclaimer was most recently revised. We encourage you to review this page
                  periodically.
                </p>
                <p>
                  Your continued use of SmartGearPicks after any changes to this Disclaimer
                  constitutes your acceptance of the updated terms.
                </p>
              </LegalSection>

              {/* Section 10 */}
              <LegalSection id="contact" title="10. Contact Information" iconName="mail">
                <p>
                  If you have questions about this Disclaimer, our affiliate relationships, or any
                  information presented on SmartGearPicks, please contact us:
                </p>
                <LegalContactCard
                  officeName="SmartGearPicks Legal & Compliance"
                  email="legal@smartgearpicks.com"
                  buttonLabel="Email Legal Team"
                  description="For questions about this Disclaimer, affiliate disclosures, or content accuracy concerns, please reach out to our legal and compliance team."
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

