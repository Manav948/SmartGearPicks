import React from "react";
import { SECTION_TITLE_STYLE } from "./constants";

interface VisualAssetsProps {
  imagePreview: string | null;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: () => void;
}

export default function VisualAssets({
  imagePreview,
  handleImageChange,
  removeImage,
}: VisualAssetsProps) {
  return (
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
              className="max-h-50 object-contain rounded-xl border"
              style={{ borderColor: "rgba(199,196,215,0.4)" }}
            />
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                removeImage();
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
              style={{
                backgroundColor: "rgba(186,26,26,0.08)",
                color: "#ba1a1a",
                border: "1px solid rgba(186,26,26,0.2)",
              }}
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
  );
}
