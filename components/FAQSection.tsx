"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "What is SmartGearPicks?",
    answer:
      "SmartGearPicks is an independent affiliate product-discovery platform. We research, curate, and index products across technology, workspace tools, lifestyle accessories, and home essentials, organizing them with direct merchant pricing and specifications.",
  },
  {
    question: "How do you select products?",
    answer:
      "We select products based on design clarity, everyday utility, material durability, and reliable customer feedback. Our curations prioritize items that deliver practical daily value rather than fleeting trends.",
  },
  {
    question: "Where do I purchase the products?",
    answer:
      "All purchases are completed directly on third-party retailer websites, such as Amazon or official brand stores. When you click a product link, you are redirected to the merchant checkout page to complete your order securely.",
  },
  {
    question: "Do I purchase directly from SmartGearPicks?",
    answer:
      "No. SmartGearPicks is a discovery catalog and curation service, not a retailer. We do not process payments, fulfill orders, maintain physical inventory, or manage shipping directly.",
  },
  {
    question: "Are product prices updated automatically?",
    answer:
      "Prices displayed on SmartGearPicks are approximate reference guide prices noted during curation. Retailer prices, discounts, and inventory fluctuate frequently, so please verify the exact current price on the merchant's checkout page.",
  },
  {
    question: "How does SmartGearPicks earn money?",
    answer:
      "We earn referral commissions through affiliate partnerships, including the Amazon Associates program. When you click our links and make a qualifying purchase, we may receive a commission from the retailer at zero additional cost to you.",
  },
  {
    question: "Are product recommendations sponsored?",
    answer:
      "No. Our recommendations are editorially independent. We do not accept paid promotions, sponsored placements, or advertising payments to feature products in our index.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      data-scroll-reveal
      className="border-b border-[#DDDCD3] bg-[#FFFFFF] py-16 sm:py-20 md:py-24"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div data-scroll-reveal-item className="mb-12 text-center">
          <div className="mb-2 flex items-center justify-center gap-1.5">
            <HelpCircle size={14} className="text-[#B66F52]" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B66F52]">
              COMMON QUESTIONS
            </p>
          </div>
          <h2
            id="faq-heading"
            className="font-display text-3xl font-medium tracking-tight text-[#22231F] sm:text-4xl"
          >
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#6B6B66]">
            Clear, honest answers about how SmartGearPicks operates, curates, and earns.
          </p>
        </div>

        {/* Accordion Container */}
        <div data-scroll-reveal-item className="divide-y divide-[#DDDCD3] border-y border-[#DDDCD3]">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            const contentId = `faq-content-${index}`;
            const buttonId = `faq-button-${index}`;

            return (
              <div key={faq.question} className="py-4 sm:py-5">
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() => toggleIndex(index)}
                  className="flex w-full items-center justify-between gap-4 text-left font-display text-base sm:text-lg font-medium text-[#22231F] transition-colors hover:text-[#354538] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#354538] cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#DDDCD3] transition-transform duration-200 ${
                      isOpen ? "rotate-180 border-[#B66F52] text-[#B66F52] bg-[#F6F4EF]" : "text-[#6B6B66]"
                    }`}
                  >
                    <ChevronDown size={15} aria-hidden="true" />
                  </span>
                </button>

                <div
                  id={contentId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-xs sm:text-sm leading-relaxed text-[#6B6B66] max-w-3xl pr-6">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
