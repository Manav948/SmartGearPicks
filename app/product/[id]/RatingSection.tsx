"use client";

import { useState, useEffect } from "react";

interface Review {
  id: string;
  stars: number;
  comment: string;
  name: string;
  date: string;
}

const STORAGE_KEY = (id: string) => `smartygearpicks_ratings_${id}`;

export default function RatingSection({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [hoverStar, setHoverStar] = useState(0);
  const [selectedStar, setSelectedStar] = useState(0);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Load from localStorage
  useEffect(() => {
    let stored = localStorage.getItem(STORAGE_KEY(productId));
    if (!stored) {
      stored = localStorage.getItem(`pickora_ratings_${productId}`);
    }
    if (stored) {
      try {
        setReviews(JSON.parse(stored));
      } catch {}
    }
  }, [productId]);

  const avgRating = reviews.length
    ? reviews.reduce((s, r) => s + r.stars, 0) / reviews.length
    : 0;

  const starCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.stars === star).length,
  }));

  const handleSubmit = () => {
    if (!selectedStar || !name.trim()) return;

    const newReview: Review = {
      id: Date.now().toString(),
      stars: selectedStar,
      comment: comment.trim(),
      name: name.trim(),
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem(STORAGE_KEY(productId), JSON.stringify(updated));
    setSelectedStar(0);
    setComment("");
    setName("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div>
      <h2
        className="text-xl font-medium tracking-tight mb-6"
        style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30", letterSpacing: "-0.02em" }}
      >
        Ratings & Reviews
      </h2>

      {/* Summary */}
      <div
        className="rounded-xl p-5 border mb-6 flex flex-col sm:flex-row gap-6 items-center sm:items-stretch"
        style={{ backgroundColor: "#ffffff", borderColor: "rgba(199,196,215,0.4)" }}
      >
        {/* Big number */}
        <div className="flex flex-col items-center justify-center shrink-0 w-full sm:w-auto pb-6 sm:pb-0 border-b sm:border-b-0 sm:border-r sm:pr-6" style={{ borderColor: "rgba(199,196,215,0.25)" }}>
          <span
            className="text-5xl font-semibold"
            style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30", letterSpacing: "-0.04em" }}
          >
            {avgRating > 0 ? avgRating.toFixed(1) : "–"}
          </span>
          <StarRow rating={avgRating} size={16} />
          <span className="text-xs mt-1" style={{ color: "#767586" }}>
            {reviews.length} review{reviews.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Bar breakdown */}
        <div className="w-full sm:flex-1 flex flex-col gap-2 justify-center">
          {starCounts.map(({ star, count }) => {
            const pct = reviews.length ? (count / reviews.length) * 100 : 0;
            return (
              <div key={star} className="flex items-center gap-2.5 w-full">
                <span className="text-xs w-3 shrink-0" style={{ color: "#767586", fontFamily: "Geist, sans-serif" }}>
                  {star}
                </span>
                <span className="material-symbols-outlined text-[14px] shrink-0" style={{ color: "#f59e0b", fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "#e5eeff" }}>
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%`, backgroundColor: "#f59e0b" }}
                  />
                </div>
                <span className="text-xs w-5 text-right shrink-0" style={{ color: "#767586", fontFamily: "Geist, sans-serif" }}>
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Write a review */}
      <div
        className="rounded-xl p-5 border mb-6"
        style={{ backgroundColor: "#ffffff", borderColor: "rgba(199,196,215,0.4)" }}
      >
        <h3
          className="text-sm font-semibold uppercase tracking-widest mb-4"
          style={{ fontFamily: "Geist, sans-serif", color: "#767586", letterSpacing: "0.05em" }}
        >
          Write a Review
        </h3>

        {/* Star picker */}
        <div className="flex items-center gap-1.5 mb-4">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSelectedStar(s)}
              onMouseEnter={() => setHoverStar(s)}
              onMouseLeave={() => setHoverStar(0)}
              className="transition-transform active:scale-90"
            >
              <span
                className="material-symbols-outlined text-[28px]"
                style={{
                  color: s <= (hoverStar || selectedStar) ? "#f59e0b" : "#e5eeff",
                  fontVariationSettings: s <= (hoverStar || selectedStar) ? "'FILL' 1" : "'FILL' 0",
                  transition: "color 0.15s, transform 0.15s",
                }}
              >
                star
              </span>
            </button>
          ))}
          {selectedStar > 0 && (
            <span className="ml-2.5 text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded" style={{ backgroundColor: "rgba(245,158,11,0.1)", color: "#f59e0b", fontFamily: "Geist, sans-serif" }}>
              {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][selectedStar]}
            </span>
          )}
        </div>

        {/* Name input */}
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-xl px-3.5 py-3 text-sm mb-3 outline-none transition-all focus:border-[#4648d4] focus:ring-1 focus:ring-[#4648d4]/10"
          style={{
            borderColor: "rgba(199,196,215,0.7)",
            color: "#0b1c30",
            backgroundColor: "#f8f9ff",
          }}
        />

        {/* Comment textarea */}
        <textarea
          placeholder="Share your thoughts about this product... (optional)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          className="w-full border rounded-xl px-3.5 py-3 text-sm mb-4 outline-none resize-none transition-all focus:border-[#4648d4] focus:ring-1 focus:ring-[#4648d4]/10"
          style={{
            borderColor: "rgba(199,196,215,0.7)",
            color: "#0b1c30",
            backgroundColor: "#f8f9ff",
          }}
        />

        {submitted ? (
          <div
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium"
            style={{ backgroundColor: "rgba(70,72,212,0.08)", color: "#4648d4", fontFamily: "Geist, sans-serif" }}
          >
            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              check_circle
            </span>
            Review submitted — thank you!
          </div>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!selectedStar || !name.trim()}
            className="px-5 py-3 rounded-xl text-sm font-medium transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm hover:shadow"
            style={{
              backgroundColor: "#0f172a",
              color: "#ffffff",
              fontFamily: "Geist, sans-serif",
              borderTop: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            Submit Review
          </button>
        )}
      </div>

      {/* Reviews list */}
      {reviews.length > 0 ? (
        <div className="flex flex-col gap-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-xl p-5 border"
              style={{ backgroundColor: "#ffffff", borderColor: "rgba(199,196,215,0.4)" }}
            >
              <div className="flex items-start gap-3.5">
                {/* User Avatar Initial */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 select-none"
                  style={{
                    backgroundColor: "rgba(70,72,212,0.08)",
                    color: "#4648d4",
                    fontFamily: "Geist, sans-serif",
                  }}
                >
                  {review.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p
                      className="text-sm font-semibold truncate"
                      style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30" }}
                    >
                      {review.name}
                    </p>
                    <span className="text-xs shrink-0" style={{ color: "#767586", fontFamily: "Geist, sans-serif" }}>
                      {review.date}
                    </span>
                  </div>
                  <StarRow rating={review.stars} size={13} />
                  {review.comment && (
                    <p className="text-sm leading-relaxed mt-2.5" style={{ color: "#464554" }}>
                      {review.comment}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-center py-8" style={{ color: "#767586", fontFamily: "Geist, sans-serif" }}>
          No reviews yet. Be the first to share your experience!
        </p>
      )}
    </div>
  );
}

function StarRow({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5 mt-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          className="material-symbols-outlined"
          style={{
            fontSize: `${size}px`,
            color: s <= Math.round(rating) ? "#f59e0b" : "#e5eeff",
            fontVariationSettings: s <= Math.round(rating) ? "'FILL' 1" : "'FILL' 0",
          }}
        >
          star
        </span>
      ))}
    </div>
  );
}
