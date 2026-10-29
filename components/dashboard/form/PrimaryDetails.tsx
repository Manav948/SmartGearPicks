import React from "react";
import {
  CATEGORIES,
  TAGS,
  LABEL_STYLE,
  SECTION_TITLE_STYLE,
  INPUT_BASE,
} from "./constants";

interface PrimaryDetailsProps {
  name: string;
  setName: (val: string) => void;
  affiliateLink: string;
  setAffiliateLink: (val: string) => void;
  price: string;
  setPrice: (val: string) => void;
  category: string;
  setCategory: (val: string) => void;
  selectedTags: string[];
  handleTagToggle: (tag: string) => void;
}

export default function PrimaryDetails({
  name,
  setName,
  affiliateLink,
  setAffiliateLink,
  price,
  setPrice,
  category,
  setCategory,
  selectedTags,
  handleTagToggle,
}: PrimaryDetailsProps) {
  return (
    <section
      className="rounded-xl p-6 border transition-shadow hover:shadow-sm"
      style={{ backgroundColor: "#FAF8F4", borderColor: "rgba(229,225,218,0.4)" }}
    >
      <h2
        className="pb-2 mb-5 border-b"
        style={{ ...SECTION_TITLE_STYLE, borderColor: "rgba(229,225,218,0.3)" }}
      >
        Primary Details
      </h2>
      <div className="flex flex-col gap-5">
        <div className="relative group">
          <label htmlFor="product-name" style={LABEL_STYLE} className="block mb-1.5">
            Product Name
          </label>
          <input
            id="product-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name..."
            className={INPUT_BASE}
            style={{
              borderColor: "#E5E1DA",
              color: "#151515",
              fontSize: "22px",
              fontFamily: "Geist, sans-serif",
              fontWeight: 500,
              letterSpacing: "-0.02em",
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-2">
          <div className="md:col-span-2">
            <label htmlFor="affiliate-link" style={LABEL_STYLE} className="block mb-1.5">
              Affiliate URL
            </label>
            <div
              className="flex items-center border rounded-lg overflow-hidden transition-all focus-within:border-[#7c6853] focus-within:ring-1 focus-within:ring-[#7c6853]"
              style={{ borderColor: "#E5E1DA" }}
            >
              <div
                className="px-3 py-3 border-r flex items-center"
                style={{ borderColor: "#E5E1DA", backgroundColor: "#F0EDE7" }}
              >
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ color: "#6B6B6B", fontVariationSettings: "'FILL' 0" }}
                >
                  link
                </span>
              </div>
              <input
                id="affiliate-link"
                type="url"
                required
                value={affiliateLink}
                onChange={(e) => setAffiliateLink(e.target.value)}
                placeholder="https://amazon.com/dp/..."
                className="flex-1 bg-transparent border-0 outline-none px-4 py-3 text-sm placeholder:text-[#6B6B6B]/60"
                style={{ color: "#151515" }}
              />
            </div>
          </div>

          <div>
            <label htmlFor="product-price" style={LABEL_STYLE} className="block mb-1.5">
              Price (optional)
            </label>
            <div
              className="flex items-center border rounded-lg overflow-hidden transition-all focus-within:border-[#7c6853] focus-within:ring-1 focus-within:ring-[#7c6853]"
              style={{ borderColor: "#E5E1DA" }}
            >
              <div
                className="px-3 py-3 border-r flex items-center shrink-0"
                style={{ borderColor: "#E5E1DA", backgroundColor: "#F0EDE7" }}
              >
                <span
                  className="text-sm font-semibold select-none"
                  style={{ color: "#7c6853", fontFamily: "Geist, sans-serif" }}
                >
                  ₹
                </span>
              </div>
              <input
                id="product-price"
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                className="flex-1 bg-transparent border-0 outline-none px-4 py-3 text-sm placeholder:text-[#6B6B6B]/60"
                style={{ color: "#151515" }}
              />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <label htmlFor="product-category" style={LABEL_STYLE} className="block mb-1.5">
            Category
          </label>
          <div className="relative">
            <select
              id="product-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full appearance-none border rounded-lg px-4 py-3 text-sm outline-none transition-all focus:border-[#7c6853] focus:ring-1 focus:ring-[#7c6853] bg-transparent"
              style={{ borderColor: "#E5E1DA", color: "#151515" }}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
            <span
              className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "#6B6B6B", fontVariationSettings: "'FILL' 0" }}
            >
              expand_more
            </span>
          </div>
        </div>

        <div className="mt-5">
          <label style={LABEL_STYLE} className="block mb-2.5">
            Product Tags / Badges
          </label>
          <div className="flex flex-wrap gap-2">
            {TAGS.map((t) => {
              const isSelected = selectedTags.includes(t.value);
              return (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => handleTagToggle(t.value)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 cursor-pointer"
                  style={{
                    fontFamily: "Geist, sans-serif",
                    backgroundColor: isSelected ? "rgba(124, 104, 83, 0.08)" : "#FAF8F4",
                    color: isSelected ? "#7c6853" : "#6B6B6B",
                    borderColor: isSelected ? "#7c6853" : "rgba(229, 225, 218, 0.5)",
                  }}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
