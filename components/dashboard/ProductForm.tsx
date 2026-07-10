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

const TAGS = [
  { value: "TRENDING", label: "Trending" },
  { value: "BEST_SELLER", label: "Best Seller" },
  { value: "HOT_DEAL", label: "Hot Deal" },
  { value: "RECOMMENDED", label: "Recommended" },
  { value: "EDITORS_PICK", label: "Editor's Pick" },
  { value: "NEW_ARRIVAL", label: "New Arrival" },
  { value: "LIMITED_TIME", label: "Limited Time" },
  { value: "PREMIUM", label: "Premium" },
  { value: "BUDGET_FRIENDLY", label: "Budget Friendly" },
  { value: "TOP_RATED", label: "Top Rated" },
  { value: "MOST_POPULAR", label: "Most Popular" },
  { value: "FEATURED", label: "Featured" },
  { value: "AMAZON_CHOICE", label: "Amazon's Choice" },
  { value: "GIFT_IDEA", label: "Gift Idea" },
  { value: "CREATOR_FAVORITE", label: "Creator Favorite" },
  { value: "STUDENT_PICK", label: "Student Pick" },
  { value: "WORK_FROM_HOME", label: "Work From Home" },
  { value: "TRAVEL_FRIENDLY", label: "Travel Friendly" },
  { value: "GAMING_ESSENTIAL", label: "Gaming Essential" },
  { value: "SMART_HOME", label: "Smart Home" },
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

interface ProductFormProps {
  initialData?: {
    name: string;
    description: string;
    affiliateLink: string;
    category: string;
    price: number | null;
    imageUrl: string;
    productTags: { tag: string }[];
  };
  onSubmit: (formData: FormData) => Promise<void>;
  submitLabel: string;
  loading: boolean;
}

export default function ProductForm({
  initialData,
  onSubmit,
  submitLabel,
  loading,
}: ProductFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [affiliateLink, setAffiliateLink] = useState(initialData?.affiliateLink || "");
  const [category, setCategory] = useState(initialData?.category || "ELECTRONICS");
  const [price, setPrice] = useState(initialData?.price ? String(initialData.price) : "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.imageUrl || null);
  const [featured, setFeatured] = useState(
    initialData?.productTags.some((pt) => pt.tag === "FEATURED") || false
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(
    initialData?.productTags.map((pt) => pt.tag) || []
  );
  const router = useRouter();

  const handleTagToggle = (tagVal: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagVal) ? prev.filter((t) => t !== tagVal) : [...prev, tagVal]
    );
  };

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
    if (!name || !description || !affiliateLink || !category) {
      toast.error("Please fill out all required fields.");
      return;
    }
    if (!initialData && !imageFile) {
      toast.error("Please select a product image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("affiliateLink", affiliateLink);
    formData.append("category", category);
    
    if (imageFile) {
      formData.append("image", imageFile);
    }
    
    formData.append("price", price);

    let finalTags = [...selectedTags];
    if (featured && !finalTags.includes("FEATURED")) {
      finalTags.push("FEATURED");
    } else if (!featured && finalTags.includes("FEATURED")) {
      finalTags = finalTags.filter((t) => t !== "FEATURED");
    }
    formData.append("tags", JSON.stringify(finalTags));

    await onSubmit(formData);
  };

  const selectedCategoryLabel = CATEGORIES.find((c) => c.value === category)?.label || "Uncategorized";

  return (
    <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
    
      <div className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
         
          <div className="lg:col-span-8 flex flex-col gap-5">
         
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
                    style={{ borderColor: "#c7c4d7", color: "#0b1c30", fontSize: "22px", fontFamily: "Geist, sans-serif", fontWeight: 500, letterSpacing: "-0.02em" }}
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

     
          <div className="lg:col-span-4 flex flex-col gap-5 lg:sticky lg:top-28">
          
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
               
                <div
                  className="relative aspect-4/5 overflow-hidden"
                  style={{ backgroundColor: "#e5eeff" }}
                >
                  {imagePreview ? (
                
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

               
                <div className="p-4">
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <h3
                      className="text-base font-medium leading-snug line-clamp-1"
                      style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30", letterSpacing: "-0.01em" }}
                    >
                      {name || "Product Name"}
                    </h3>
                    <span
                      className="material-symbols-outlined text-[18px] shrink-0"
                      style={{ color: "rgba(118,117,134,0.4)", fontVariationSettings: "'FILL' 0" }}
                    >
                      open_in_new
                    </span>
                  </div>
               
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    <span
                      className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        fontFamily: "Geist, sans-serif",
                        letterSpacing: "0.02em",
                        backgroundColor: "rgba(70,72,212,0.07)",
                        color: "#4648d4",
                        border: "1px solid rgba(70,72,212,0.14)",
                      }}
                    >
                      {selectedCategoryLabel}
                    </span>
                    {selectedTags.map((tagVal) => {
                      const tagLabel = TAGS.find((t) => t.value === tagVal)?.label || tagVal;
                      return (
                        <span
                          key={tagVal}
                          className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
                          style={{
                            fontFamily: "Geist, sans-serif",
                            letterSpacing: "0.02em",
                            backgroundColor: "#f4f4f8",
                            color: "#5c5c72",
                            border: "1px solid #e2e2ec",
                          }}
                        >
                          {tagLabel}
                        </span>
                      );
                    })}
                  </div>
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
          Ready to save: <strong style={{ color: "#0b1c30" }}>{name || "Untitled Product"}</strong>
        </p>
        <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            disabled={loading}
            className="px-4 py-2.5 text-sm font-medium transition-colors disabled:opacity-60 cursor-pointer"
            style={{ fontFamily: "Geist, sans-serif", color: "#767586" }}
          >
            Cancel
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
            {loading ? "Saving…" : submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
}
