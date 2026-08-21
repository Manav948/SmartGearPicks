"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import PrimaryDetails from "./form/PrimaryDetails";
import VisualAssets from "./form/VisualAssets";
import CuratorNotes from "./form/CuratorNotes";
import FeatureToggle from "./form/FeatureToggle";
import LivePreview from "./form/LivePreview";
import { CATEGORIES } from "./form/constants";

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

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
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
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          <div className="lg:col-span-8 flex flex-col gap-5">
            <PrimaryDetails
              name={name}
              setName={setName}
              affiliateLink={affiliateLink}
              setAffiliateLink={setAffiliateLink}
              price={price}
              setPrice={setPrice}
              category={category}
              setCategory={setCategory}
              selectedTags={selectedTags}
              handleTagToggle={handleTagToggle}
            />

            <VisualAssets
              imagePreview={imagePreview}
              handleImageChange={handleImageChange}
              removeImage={handleRemoveImage}
            />

            <CuratorNotes
              description={description}
              setDescription={setDescription}
            />
          </div>

          <div className="lg:col-span-4 flex flex-col gap-5 lg:sticky lg:top-28">
            <FeatureToggle
              featured={featured}
              setFeatured={setFeatured}
            />

            <LivePreview
              name={name}
              imagePreview={imagePreview}
              featured={featured}
              selectedCategoryLabel={selectedCategoryLabel}
              selectedTags={selectedTags}
              description={description}
              price={price}
            />
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
