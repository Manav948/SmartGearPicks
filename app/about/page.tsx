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
  title: "About Us",
  description:
    "Learn about SmartGearPicks, an independent product discovery platform curating dependable tech, lifestyle, and workspace gear.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us | SmartGearPicks",
    description:
      "We discover and curate products across tech, workspace, lifestyle, and home categories. Learn how SmartGearPicks helps you find reliable gear.",
    url: "/about",
    type: "website",
  },
};

export default function AboutPage() {
  const lastUpdated = "November 3, 2026";

  const sections: LegalSectionItem[] = [
    { id: "who-we-are", label: "1. Who We Are", iconName: "users" },
    { id: "our-mission", label: "2. Our Mission", iconName: "compass" },
    { id: "how-we-curate", label: "3. How We Curate", iconName: "search" },
    { id: "editorial-independence", label: "4. Editorial Independence", iconName: "shield" },
    { id: "affiliate-model", label: "5. How We Earn", iconName: "link" },
    { id: "what-we-are-not", label: "6. What We Are Not", iconName: "info" },
    { id: "our-values", label: "7. Our Values", iconName: "heart" },
    { id: "contact", label: "8. Get in Touch", iconName: "mail" },
  ];

  return (
    <PublicMotionProvider>
      <div className="min-h-screen flex flex-col font-sans bg-[#F6F4EF] text-[#22231F]">
        <Navbar />

        <LegalHero
          title="About Us"
          subtitle="SmartGearPicks is an independent product discovery platform. We research, evaluate, and index practical products so you can find dependable gear without endless browsing."
          category="About SmartGearPicks"
          lastUpdated={lastUpdated}
          iconName="users"
        />

        <main className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 flex-1 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <LegalSidebar
              sections={sections}
              title="Page Navigation"
              badgeTitle="Independent & Transparent"
              badgeDescription="SmartGearPicks operates as an independent editorial platform with transparent affiliate partnerships."
            />

            <div className="lg:col-span-8 space-y-8 leading-relaxed text-[#6B6B66]">
              {/* Section 1 */}
              <LegalSection id="who-we-are" title="1. Who We Are" iconName="users">
                <p>
                  SmartGearPicks is an online product discovery and recommendation catalog. We research and
                  evaluate products across multiple categories, including technology, workspace tools,
                  lifestyle accessories, home and kitchen essentials, apparel, travel gear, and outdoor
                  equipment, helping readers discover practical items without sifting through thousands of
                  unfiltered listings.
                </p>
                <p>
                  Our platform is built for anyone who values straightforward, well-organized product
                  recommendations. Whether you are setting up a home workspace, upgrading your daily carry,
                  or looking for dependable accessories, SmartGearPicks indexes products chosen for build
                  quality and everyday utility.
                </p>
              </LegalSection>

              {/* Section 2 */}
              <LegalSection id="our-mission" title="2. Our Mission" iconName="compass">
                <p>
                  Our mission is straightforward: make product discovery clear, reliable, and efficient.
                  Finding quality products online often requires reading dozens of contradictory reviews,
                  comparing technical specifications, and navigating promotional listings.
                </p>
                <p>
                  SmartGearPicks simplifies this process by organizing products that combine functional
                  design, durable materials, and verified user satisfaction into structured collections.
                </p>
                <LegalHighlightBox title="Our Core Objectives" iconName="target">
                  <ul className="list-disc pl-4 space-y-1.5">
                    <li>Help readers find durable, functional gear efficiently.</li>
                    <li>Present objective product descriptions without promotional hype.</li>
                    <li>Organize recommendations so browsing is clear and intuitive.</li>
                    <li>Maintain transparent affiliate disclosures across every page.</li>
                  </ul>
                </LegalHighlightBox>
              </LegalSection>

              {/* Section 3 */}
              <LegalSection id="how-we-curate" title="3. How We Curate" iconName="search">
                <p>
                  Every product featured on SmartGearPicks is evaluated under consistent editorial criteria.
                  We select items that meet documented standards for build quality, materials, and everyday
                  utility.
                </p>
                <p>Our curation process involves:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong className="text-[#22231F]">Category Research:</strong> We monitor product
                    releases, category updates, and established brands across major retail platforms to
                    identify notable equipment.
                  </li>
                  <li>
                    <strong className="text-[#22231F]">Review Analysis:</strong> We analyze verified customer
                    feedback, long-term durability reports, and user satisfaction patterns to evaluate
                    real-world reliability.
                  </li>
                  <li>
                    <strong className="text-[#22231F]">Design &amp; Utility Evaluation:</strong> We evaluate
                    material choices, functional ergonomics, repairability, and aesthetic longevity before
                    adding an item to our index.
                  </li>
                  <li>
                    <strong className="text-[#22231F]">Value Assessment:</strong> We compare price points
                    relative to material quality and feature sets to confirm fair retail value.
                  </li>
                </ul>
                <p>
                  Our goal is to maintain a focused catalog of evaluated products. When an item appears on
                  SmartGearPicks, it is because it meets our criteria for durability and practical daily use.
                </p>
              </LegalSection>

              {/* Section 4 */}
              <LegalSection id="editorial-independence" title="4. Editorial Independence" iconName="shield">
                <p>
                  SmartGearPicks maintains complete editorial independence. Product selections are made by our
                  editorial team based on research, specifications, and customer feedback. We do not accept
                  payment from brands or manufacturers in exchange for product placement or favorable coverage.
                </p>
                <p>
                  While we participate in affiliate programs (described below), products are selected prior to
                  affiliate links being applied.
                </p>
                <LegalHighlightBox title="Editorial Commitment" iconName="check">
                  Affiliate commissions never determine which products we choose to feature. Recommendations
                  are based on objective evaluation, not referral compensation.
                </LegalHighlightBox>
              </LegalSection>

              {/* Section 5 */}
              <LegalSection id="affiliate-model" title="5. How We Earn Revenue" iconName="link">
                <p>
                  SmartGearPicks is free to browse. We fund our operations through affiliate partnerships. When
                  you click a product link on our site and make a purchase on a merchant website (such as
                  Amazon), we may receive a commission at no additional cost to you.
                </p>
                <LegalHighlightBox title="Amazon Associates Program Statement" iconName="link">
                  SmartGearPicks is a participant in the Amazon Services LLC Associates Program, an affiliate
                  advertising program designed to provide a means for sites to earn advertising fees by
                  advertising and linking to Amazon.com.
                </LegalHighlightBox>
                <p>
                  All affiliate relationships are disclosed transparently across the website, including in our{" "}
                  <a href="/privacy" className="font-semibold text-[#354538] underline">
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a href="/disclaimer" className="font-semibold text-[#354538] underline">
                    Disclaimer
                  </a>.
                </p>
                <p>
                  Purchasing through an affiliate link does not increase your purchase price. Commissions are paid
                  by the retailer out of standard referral marketing budgets.
                </p>
              </LegalSection>

              {/* Section 6 */}
              <LegalSection id="what-we-are-not" title="6. What We Are Not" iconName="info">
                <p>
                  To set clear boundaries, here is what SmartGearPicks is <strong className="text-[#22231F]">not</strong>:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong className="text-[#22231F]">We are not a retailer.</strong> We do not sell, stock,
                    ship, or handle physical products. All purchases take place directly on third-party merchant
                    websites.
                  </li>
                  <li>
                    <strong className="text-[#22231F]">We are not a real-time price comparison tool.</strong>{" "}
                    Prices displayed on our site are reference guide prices noted during curation and may change
                    on the retailer platform. Always verify the current price on the merchant checkout page.
                  </li>
                  <li>
                    <strong className="text-[#22231F]">We do not provide certified professional advice.</strong>{" "}
                    Our content is informational and editorial. It is not a substitute for certified technical,
                    medical, or financial advice.
                  </li>
                  <li>
                    <strong className="text-[#22231F]">We do not control inventory availability.</strong> Product
                    stock levels and delivery terms are determined exclusively by the respective merchants.
                  </li>
                </ul>
              </LegalSection>

              {/* Section 7 */}
              <LegalSection id="our-values" title="7. Our Values" iconName="heart">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
                  <div className="bg-[#FFFFFF] border border-[#DDDCD3] rounded-sm p-4 shadow-2xs">
                    <h4 className="font-semibold text-xs mb-1 text-[#22231F]">Objectivity</h4>
                    <p className="text-xs text-[#6B6B66]">
                      We describe products accurately based on verifiable specifications and customer feedback.
                    </p>
                  </div>
                  <div className="bg-[#FFFFFF] border border-[#DDDCD3] rounded-sm p-4 shadow-2xs">
                    <h4 className="font-semibold text-xs mb-1 text-[#22231F]">Transparency</h4>
                    <p className="text-xs text-[#6B6B66]">
                      We disclose how our platform is funded and maintain clear policies regarding data and cookies.
                    </p>
                  </div>
                  <div className="bg-[#FFFFFF] border border-[#DDDCD3] rounded-sm p-4 shadow-2xs">
                    <h4 className="font-semibold text-xs mb-1 text-[#22231F]">Curatorial Focus</h4>
                    <p className="text-xs text-[#6B6B66]">
                      We prioritize a focused collection of durable items over an unmanageable volume of listings.
                    </p>
                  </div>
                  <div className="bg-[#FFFFFF] border border-[#DDDCD3] rounded-sm p-4 shadow-2xs">
                    <h4 className="font-semibold text-xs mb-1 text-[#22231F]">Clear Presentation</h4>
                    <p className="text-xs text-[#6B6B66]">
                      Our website is designed for straightforward browsing, with fast loading and responsive navigation.
                    </p>
                  </div>
                </div>
              </LegalSection>

              {/* Section 8 */}
              <LegalSection id="contact" title="8. Get in Touch" iconName="mail">
                <p>
                  We welcome questions, product suggestions, and feedback from our readers.
                </p>
                <LegalContactCard
                  officeName="SmartGearPicks Editorial Team"
                  email="contact@smartgearpicks.com"
                  buttonLabel="Send Us an Email"
                  description="Have a question, suggestion, or feedback? Reach out directly to our editorial team."
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
