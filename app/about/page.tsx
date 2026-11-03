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
    "Learn about SmartGearPicks — an independent product discovery platform that curates standout tech, lifestyle, and everyday gear so you can skip the endless scrolling.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us | SmartGearPicks",
    description:
      "We discover and curate standout products across tech, workspace, lifestyle, and home categories. Learn how SmartGearPicks helps you find gear worth owning.",
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
          subtitle="SmartGearPicks is an independent product discovery platform. We find, evaluate, and curate products worth your attention — so you spend less time scrolling and more time enjoying great gear."
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
                  SmartGearPicks is an online product discovery and recommendation platform. We browse,
                  research, and evaluate products across multiple categories — including technology,
                  workspace tools, lifestyle accessories, home and kitchen essentials, fashion, travel
                  gear, and sports equipment — so our readers can discover standout items without sifting
                  through thousands of listings.
                </p>
                <p>
                  Our platform is built for anyone who values their time and wants honest, well-organized
                  product recommendations. Whether you&apos;re setting up a home office, upgrading your
                  daily carry, or searching for a thoughtful gift, SmartGearPicks helps you find products
                  that are genuinely worth considering.
                </p>
              </LegalSection>

              {/* Section 2 */}
              <LegalSection id="our-mission" title="2. Our Mission" iconName="compass">
                <p>
                  Our mission is straightforward: make product discovery easier and more enjoyable. The
                  online marketplace is enormous, and finding quality products often means reading dozens
                  of reviews, comparing specifications, and navigating confusing listings.
                </p>
                <p>
                  SmartGearPicks exists to simplify that process. We aim to surface products that combine
                  thoughtful design, practical utility, and genuine value — the kind of gear you&apos;d
                  recommend to a friend.
                </p>
                <LegalHighlightBox title="What Drives Us" iconName="target">
                  <ul className="list-disc pl-4 space-y-1.5">
                    <li>Help people discover useful, well-made products efficiently.</li>
                    <li>Present products with honest descriptions — no hype, no exaggeration.</li>
                    <li>Organize recommendations so browsing is intuitive, not overwhelming.</li>
                    <li>Maintain editorial transparency about how we operate and earn revenue.</li>
                  </ul>
                </LegalHighlightBox>
              </LegalSection>

              {/* Section 3 */}
              <LegalSection id="how-we-curate" title="3. How We Curate" iconName="search">
                <p>
                  Every product featured on SmartGearPicks goes through a deliberate selection process.
                  We don&apos;t list everything — we choose items that meet a standard of quality, design,
                  and usefulness.
                </p>
                <p>Our curation process involves:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong className="text-[#22231F]">Category Research:</strong> We monitor product
                    releases, trending categories, and emerging brands across major retail platforms to
                    identify what deserves attention.
                  </li>
                  <li>
                    <strong className="text-[#22231F]">Review Analysis:</strong> We analyze customer
                    reviews, ratings, and feedback patterns to assess real-world product satisfaction —
                    not just marketing claims.
                  </li>
                  <li>
                    <strong className="text-[#22231F]">Design & Utility Evaluation:</strong> We consider
                    build quality, materials, practical functionality, and aesthetic appeal when
                    selecting products for our catalog.
                  </li>
                  <li>
                    <strong className="text-[#22231F]">Value Assessment:</strong> We look at price
                    relative to quality and utility. Expensive doesn&apos;t always mean better, and
                    affordable products can be excellent.
                  </li>
                </ul>
                <p>
                  Our goal is to present a focused, manageable selection of products — not an exhaustive
                  database. If a product appears on SmartGearPicks, it&apos;s because we believe it&apos;s
                  worth a closer look.
                </p>
              </LegalSection>

              {/* Section 4 */}
              <LegalSection id="editorial-independence" title="4. Editorial Independence" iconName="shield">
                <p>
                  SmartGearPicks maintains editorial independence. Product selections are made by our
                  team based on research, analysis, and editorial judgment. We do not accept payment
                  from brands or manufacturers in exchange for product placement or favorable
                  descriptions.
                </p>
                <p>
                  While we participate in affiliate programs (described below), our curation decisions
                  are made independently. Products are selected before affiliate links are applied, not
                  the other way around.
                </p>
                <LegalHighlightBox title="Our Editorial Commitment" iconName="check">
                  We never let affiliate commissions influence which products we choose to feature.
                  Our recommendations are based on genuine evaluation, not financial incentive.
                </LegalHighlightBox>
              </LegalSection>

              {/* Section 5 */}
              <LegalSection id="affiliate-model" title="5. How We Earn Revenue" iconName="link">
                <p>
                  SmartGearPicks is a free platform. We earn revenue through affiliate partnerships.
                  When you click a product link on our site and make a purchase on the merchant&apos;s
                  website (such as Amazon), we may receive a small commission at no extra cost to you.
                </p>
                <LegalHighlightBox title="Amazon Associates Program" iconName="link">
                  SmartGearPicks is a participant in the Amazon Services LLC Associates Program, an
                  affiliate advertising program designed to provide a means for sites to earn
                  advertising fees by advertising and linking to Amazon.com.
                </LegalHighlightBox>
                <p>
                  We may also participate in other affiliate networks as our platform grows. All
                  affiliate relationships are disclosed transparently across the website, including
                  in our{" "}
                  <a href="/privacy" className="font-semibold text-[#354538] underline">
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a href="/disclaimer" className="font-semibold text-[#354538] underline">
                    Disclaimer
                  </a>.
                </p>
                <p>
                  Importantly, purchasing through our links costs you nothing extra. Affiliate
                  commissions are paid by the merchant, not by you.
                </p>
              </LegalSection>

              {/* Section 6 */}
              <LegalSection id="what-we-are-not" title="6. What We Are Not" iconName="info">
                <p>
                  To set clear expectations, here is what SmartGearPicks is <strong className="text-[#22231F]">not</strong>:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong className="text-[#22231F]">We are not a retailer.</strong> We do not sell,
                    ship, or handle any products. All purchases are made directly on the merchant&apos;s
                    website (e.g., Amazon).
                  </li>
                  <li>
                    <strong className="text-[#22231F]">We are not a price comparison tool.</strong>{" "}
                    Prices shown on our site are indicative guide prices and may change. Always verify
                    the current price on the merchant&apos;s website before purchasing.
                  </li>
                  <li>
                    <strong className="text-[#22231F]">We do not provide professional advice.</strong>{" "}
                    Our content is informational and editorial. It is not a substitute for professional
                    purchasing, technical, medical, or financial advice.
                  </li>
                  <li>
                    <strong className="text-[#22231F]">We do not guarantee product availability.</strong>{" "}
                    Product availability, pricing, and specifications are controlled by the respective
                    merchants and may change without notice.
                  </li>
                </ul>
              </LegalSection>

              {/* Section 7 */}
              <LegalSection id="our-values" title="7. Our Values" iconName="heart">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
                  <div className="bg-[#FFFFFF] border border-[#DDDCD3] rounded-sm p-4 shadow-2xs">
                    <h4 className="font-semibold text-xs mb-1 text-[#22231F]">Honesty</h4>
                    <p className="text-xs text-[#6B6B66]">
                      We describe products accurately. No inflated claims, no fake reviews, no
                      misleading language.
                    </p>
                  </div>
                  <div className="bg-[#FFFFFF] border border-[#DDDCD3] rounded-sm p-4 shadow-2xs">
                    <h4 className="font-semibold text-xs mb-1 text-[#22231F]">Transparency</h4>
                    <p className="text-xs text-[#6B6B66]">
                      We disclose how we earn revenue and maintain clear policies about data,
                      cookies, and advertising.
                    </p>
                  </div>
                  <div className="bg-[#FFFFFF] border border-[#DDDCD3] rounded-sm p-4 shadow-2xs">
                    <h4 className="font-semibold text-xs mb-1 text-[#22231F]">Quality Over Quantity</h4>
                    <p className="text-xs text-[#6B6B66]">
                      We feature a curated selection rather than an overwhelming catalog. Every
                      product earns its place.
                    </p>
                  </div>
                  <div className="bg-[#FFFFFF] border border-[#DDDCD3] rounded-sm p-4 shadow-2xs">
                    <h4 className="font-semibold text-xs mb-1 text-[#22231F]">User-First Design</h4>
                    <p className="text-xs text-[#6B6B66]">
                      Our website is designed for ease of use — clean navigation, fast loading, and
                      a pleasant browsing experience.
                    </p>
                  </div>
                </div>
              </LegalSection>

              {/* Section 8 */}
              <LegalSection id="contact" title="8. Get in Touch" iconName="mail">
                <p>
                  We welcome questions, feedback, and suggestions. If you&apos;d like to reach us,
                  you can use our contact page or email us directly.
                </p>
                <LegalContactCard
                  officeName="SmartGearPicks Editorial Team"
                  email="contact@smartgearpicks.com"
                  buttonLabel="Send Us an Email"
                  description="Have a question, suggestion, or feedback? We'd love to hear from you."
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

