"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const CATEGORIES = [
  { value: "ELECTRONICS", label: "Electronics" },
  { value: "FASHION", label: "Fashion" },
  { value: "BEAUTY_PERSONAL_CARE", label: "Beauty & Care" },
  { value: "HEALTH_FITNESS", label: "Health & Fitness" },
  { value: "BOOKS_EDUCATION", label: "Books & Education" },
  { value: "HOME_KITCHEN", label: "Home & Kitchen" },
  { value: "GAMING", label: "Gaming" },
  { value: "SPORTS_OUTDOORS", label: "Sports & Outdoors" },
  { value: "TOYS_KIDS", label: "Toys & Kids" },
  { value: "AUTOMOTIVE", label: "Automotive" },
  { value: "OFFICE_PRODUCTIVITY", label: "Office & Productivity" },
  { value: "PET_SUPPLIES", label: "Pet Supplies" },
  { value: "FOOD_BEVERAGES", label: "Food & Beverages" },
  { value: "GIFT_CATEGORIES", label: "Gifts" },
  { value: "TRAVEL", label: "Travel" },
  { value: "CREATOR_ESSENTIALS", label: "Creator Gear" },
];

const LABEL_STYLE: React.CSSProperties = {
  fontFamily: "Geist, sans-serif",
  fontSize: "10px",
  fontWeight: 600,
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  color: "#767586",
};

const SECTION_TITLE_STYLE: React.CSSProperties = {
  fontFamily: "Geist, sans-serif",
  fontSize: "10px",
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#767586",
};

const INPUT_BASE =
  "w-full bg-transparent border-0 border-b py-3 text-sm outline-none transition-colors placeholder:text-[#767586]/60 focus:border-[#4648d4]";

export default function AddProductForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [affiliateLink, setAffiliateLink] = useState("");
  const [category, setCategory] = useState("ELECTRONICS");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [featured, setFeatured] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || !affiliateLink || !category || !imageFile) {
      toast.error("Please fill out all fields and select an image.");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Uploading image and creating product...");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("affiliateLink", affiliateLink);
      formData.append("category", category);
      formData.append("image", imageFile);
      if (price) formData.append("price", price);

      const res = await fetch("/api/products", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to create product");

      toast.success("Product created successfully!", { id: toastId });
      router.push("/dashboard");
      router.refresh();
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to create product.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const selectedCategoryLabel = CATEGORIES.find((c) => c.value === category)?.label || "Uncategorized";

  return (
    <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
      {/* ── Content Grid ──────────────────────────── */}
      <div className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-5">
            {/* Primary Details */}
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
                {/* Product Name */}
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
                    style={{ borderColor: "#c7c4d7", color: "#0b1c30", fontSize: "22px", fontFamily: "Geist, sans-serif", fontWeight: 500, letterSpacing: "-0.02em" }}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-2">
                  {/* Affiliate Link */}
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

                  {/* Price */}
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

                {/* Category — full row */}
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

              </div>
            </section>

            {/* Visual Assets */}
            <section
              className="rounded-xl p-6 border transition-shadow hover:shadow-sm"
              style={{ backgroundColor: "#ffffff", borderColor: "rgba(199,196,215,0.4)" }}
            >
              <h2
                className="pb-2 mb-5 border-b"
                style={{ ...SECTION_TITLE_STYLE, borderColor: "rgba(199,196,215,0.3)" }}
              >
                Visual Assets
              </h2>

              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all"
                style={{ borderColor: imagePreview ? "#4648d4" : "rgba(199,196,215,0.6)" }}
                onMouseEnter={(e) => {
                  if (!imagePreview) (e.currentTarget as HTMLElement).style.borderColor = "rgba(70,72,212,0.5)";
                }}
                onMouseLeave={(e) => {
                  if (!imagePreview) (e.currentTarget as HTMLElement).style.borderColor = "rgba(199,196,215,0.6)";
                }}
              >
                {imagePreview ? (
                  <div className="w-full flex flex-col items-center gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-[200px] object-contain rounded-xl border"
                      style={{ borderColor: "rgba(199,196,215,0.4)" }}
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setImageFile(null);
                        setImagePreview(null);
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                      style={{ backgroundColor: "rgba(186,26,26,0.08)", color: "#ba1a1a", border: "1px solid rgba(186,26,26,0.2)" }}
                    >
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <>
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                      style={{ backgroundColor: "#e5eeff" }}
                    >
                      <span
                        className="material-symbols-outlined text-[32px]"
                        style={{ color: "#4648d4", fontVariationSettings: "'FILL' 0" }}
                      >
                        cloud_upload
                      </span>
                    </div>
                    <p className="text-sm font-medium" style={{ color: "#0b1c30", fontFamily: "Geist, sans-serif" }}>
                      Drag & drop high-res image
                    </p>
                    <p className="text-xs mt-1" style={{ color: "#767586" }}>
                      PNG, JPG or WEBP (Max 5MB)
                    </p>
                    <div
                      className="mt-4 px-4 py-2 rounded-lg text-sm font-medium"
                      style={{
                        backgroundColor: "#dae2fd",
                        color: "#0b1c30",
                        fontFamily: "Geist, sans-serif",
                      }}
                    >
                      Browse Files
                    </div>
                  </>
                )}
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </section>

            {/* Curator Notes & Links */}
            <section
              className="rounded-xl p-6 border transition-shadow hover:shadow-sm"
              style={{ backgroundColor: "#ffffff", borderColor: "rgba(199,196,215,0.4)" }}
            >
              <h2
                className="pb-2 mb-5 border-b"
                style={{ ...SECTION_TITLE_STYLE, borderColor: "rgba(199,196,215,0.3)" }}
              >
                Curator Notes & Links
              </h2>
              <div className="relative">
                <label
                  htmlFor="product-description"
                  className="absolute left-3 -top-2 px-1 text-[10px] font-semibold uppercase tracking-wider z-10"
                  style={{ backgroundColor: "#ffffff", color: "#767586", fontFamily: "Geist, sans-serif", letterSpacing: "0.05em" }}
                >
                  Editorial Description
                </label>
                <textarea
                  id="product-description"
                  required
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Why do you recommend this? Share your authentic thoughts..."
                  className="w-full border rounded-lg px-4 py-3 text-sm outline-none transition-all resize-y placeholder:text-[#767586]/60 focus:border-[#4648d4] focus:ring-1 focus:ring-[#4648d4]"
                  style={{ borderColor: "#c7c4d7", color: "#0b1c30", backgroundColor: "transparent" }}
                />
              </div>
            </section>
          </div>

          {/* Right Column (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-5 lg:sticky lg:top-28">
            {/* Feature Toggle */}
            <section
              className="rounded-xl p-5 border flex items-center justify-between"
              style={{ backgroundColor: "#ffffff", borderColor: "rgba(199,196,215,0.4)" }}
            >
              <div>
                <p className="text-sm font-medium" style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30" }}>
                  Feature on Profile
                </p>
                <p className="text-xs mt-0.5" style={{ color: "#767586" }}>
                  Pin this item to the top of your grid.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                />
                <div
                  className="w-11 h-6 rounded-full transition-all peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"
                  style={{ backgroundColor: featured ? "#4648d4" : "#d3e4fe" }}
                />
              </label>
            </section>

            {/* Live Preview */}
            <section>
              <h2
                className="mb-3 flex items-center gap-1.5"
                style={SECTION_TITLE_STYLE}
              >
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 0" }}>
                  visibility
                </span>
                Live Grid Preview
              </h2>

              <div
                className="rounded-xl overflow-hidden border group shadow-sm"
                style={{ backgroundColor: "#ffffff", borderColor: "rgba(199,196,215,0.4)" }}
              >
                {/* Image preview area */}
                <div
                  className="relative aspect-[4/5] overflow-hidden"
                  style={{ backgroundColor: "#e5eeff" }}
                >
                  {imagePreview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span
                        className="material-symbols-outlined text-[64px]"
                        style={{ color: "#c7c4d7", fontVariationSettings: "'FILL' 0" }}
                      >
                        imagesmode
                      </span>
                    </div>
                  )}

                  {/* Featured badge */}
                  {featured && (
                    <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full shadow-sm border text-[10px] font-semibold uppercase"
                      style={{
                        backgroundColor: "rgba(248,249,255,0.9)",
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)",
                        borderColor: "rgba(255,255,255,0.5)",
                        color: "#4648d4",
                        fontFamily: "Geist, sans-serif",
                        letterSpacing: "0.05em",
                      }}
                    >
                      <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                      Featured
                    </div>
                  )}

                  {/* Hover quick-add */}
                  <div
                    className="absolute inset-x-0 bottom-0 p-4 flex justify-end transition-all duration-300 opacity-0 group-hover:opacity-100"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)" }}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: "#ffffff", color: "#0b1c30" }}
                    >
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>
                        shopping_bag
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card content */}
                <div className="p-4">
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <h3
                      className="text-base font-medium leading-snug line-clamp-1"
                      style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30", letterSpacing: "-0.01em" }}
                    >
                      {name || "New Product Name"}
                    </h3>
                    <span
                      className="material-symbols-outlined text-[18px] shrink-0"
                      style={{ color: "rgba(118,117,134,0.4)", fontVariationSettings: "'FILL' 0" }}
                    >
                      open_in_new
                    </span>
                  </div>
                  <p
                    className="text-[11px] font-semibold uppercase tracking-wider mb-2"
                    style={{ fontFamily: "Geist, sans-serif", color: "#767586", letterSpacing: "0.05em" }}
                  >
                    {selectedCategoryLabel}
                  </p>
                  <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "#767586" }}>
                    {description || "Your editorial description will appear here, giving context to why you picked this item."}
                  </p>
                  {price && (
                    <div className="mt-3 flex items-baseline gap-1.5">
                      <span
                        className="text-xl font-bold tracking-tight"
                        style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30" }}
                      >
                        ₹{parseFloat(price).toLocaleString("en-IN")}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Sticky submit footer */}
      <div
        className="sticky bottom-0 z-30 border-t py-4 px-4 sm:px-8 flex flex-col sm:flex-row gap-3 sm:gap-0 items-center justify-between"
        style={{
          backgroundColor: "rgba(248,249,255,0.9)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderColor: "rgba(199,196,215,0.4)",
        }}
      >
        <p className="text-sm text-center sm:text-left" style={{ color: "#767586" }}>
          {name ? (
            <span>
              Ready to publish: <strong style={{ color: "#0b1c30" }}>{name}</strong>
            </span>
          ) : (
            "Fill in the details above to publish your pick."
          )}
        </p>
        <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            disabled={loading}
            className="px-4 py-2.5 text-sm font-medium transition-colors disabled:opacity-60 cursor-pointer"
            style={{ fontFamily: "Geist, sans-serif", color: "#767586" }}
          >
            Discard
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all active:scale-95 disabled:opacity-60 cursor-pointer"
            style={{
              backgroundColor: "#0b1c30",
              color: "#ffffff",
              fontFamily: "Geist, sans-serif",
              borderTop: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            }}
          >
            {loading ? "Publishing…" : "Publish Pick"}
          </button>
        </div>
      </div>
    </form>
  );
}
