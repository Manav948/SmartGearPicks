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
      style={{ backgroundColor: "#ffffff", borderColor: "rgba(199,196,215,0.4)" }}
    >
      <h2
        className="pb-2 mb-5 border-b"
        style={{ ...SECTION_TITLE_STYLE, borderColor: "rgba(199,196,215,0.3)" }}
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
              borderColor: "#c7c4d7",
              color: "#0b1c30",
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
              className="flex items-center border rounded-lg overflow-hidden transition-all focus-within:border-[#4648d4] focus-within:ring-1 focus-within:ring-[#4648d4]"
              style={{ borderColor: "#c7c4d7" }}
            >
              <div
                className="px-3 py-3 border-r flex items-center"
                style={{ borderColor: "#c7c4d7", backgroundColor: "#eff4ff" }}
              >
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ color: "#767586", fontVariationSettings: "'FILL' 0" }}
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
                className="flex-1 bg-transparent border-0 outline-none px-4 py-3 text-sm placeholder:text-[#767586]/60"
                style={{ color: "#0b1c30" }}
              />
            </div>
          </div>

          <div>
            <label htmlFor="product-price" style={LABEL_STYLE} className="block mb-1.5">
              Price (optional)
            </label>
            <div
              className="flex items-center border rounded-lg overflow-hidden transition-all focus-within:border-[#4648d4] focus-within:ring-1 focus-within:ring-[#4648d4]"
              style={{ borderColor: "#c7c4d7" }}
            >
              <div
                className="px-3 py-3 border-r flex items-center shrink-0"
                style={{ borderColor: "#c7c4d7", backgroundColor: "#eff4ff" }}
              >
                <span
                  className="text-sm font-semibold select-none"
                  style={{ color: "#4648d4", fontFamily: "Geist, sans-serif" }}
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
                className="flex-1 bg-transparent border-0 outline-none px-4 py-3 text-sm placeholder:text-[#767586]/60"
                style={{ color: "#0b1c30" }}
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
              className="w-full appearance-none border rounded-lg px-4 py-3 text-sm outline-none transition-all focus:border-[#4648d4] focus:ring-1 focus:ring-[#4648d4] bg-transparent"
              style={{ borderColor: "#c7c4d7", color: "#0b1c30" }}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
            <span
              className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "#767586", fontVariationSettings: "'FILL' 0" }}
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
                    backgroundColor: isSelected ? "rgba(70, 72, 212, 0.08)" : "#ffffff",
                    color: isSelected ? "#4648d4" : "#767586",
                    borderColor: isSelected ? "#4648d4" : "rgba(199, 196, 215, 0.5)",
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
