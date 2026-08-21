import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "../ProductCard";

interface NewArrivalsProps {
  newArrivals: Product[];
  categoryMap: Record<string, string>;
}

export default function NewArrivals({
  newArrivals,
  categoryMap,
}: NewArrivalsProps) {
  if (newArrivals.length === 0) return null;

  const featured = newArrivals[0];
  const remaining = newArrivals.slice(1, 3);

  return (
    <section>
      <div className="flex items-end justify-between mb-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-1 text-[#4648d4]" style={{ letterSpacing: "0.1em" }}>
            New Arrivals
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-[#0b1c30]" style={{ fontFamily: "Geist, sans-serif", letterSpacing: "-0.03em" }}>
            The latest additions to your curated library.
          </h2>
        </div>
        <Link
          href="/dashboard/store"
          className="text-xs font-semibold flex items-center gap-1 transition-colors hover:text-[#4648d4] whitespace-nowrap ml-4 text-[#767586]"
          style={{ fontFamily: "Geist, sans-serif" }}
        >
          View All storefront →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-auto md:h-110">
     
        {featured && (
          <Link
            href={`/product/${featured.id}`}
            className="relative rounded-2xl overflow-hidden group block h-85 md:h-full shadow-md border hover:shadow-xl transition-all duration-500 hover:-translate-y-0.5"
            style={{ borderColor: "rgba(199,196,215,0.35)", position: "relative" }}
          >
            <Image
              src={featured.imageUrl}
              alt={featured.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              unoptimized
            />
           
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, transparent 85%)" }} />
            
            <div className="absolute top-3 left-3 md:top-4 md:left-4">
              <span
                className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest px-2 md:px-2.5 py-0.5 md:py-1 rounded-full"
                style={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.3)",
                  letterSpacing: "0.08em"
                }}
              >
                {categoryMap[featured.category] || featured.category}
              </span>
            </div>
         
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 flex flex-col justify-end">
              <h3 className="text-white font-bold text-lg sm:text-xl md:text-2xl leading-snug mb-1 md:mb-1.5" style={{ fontFamily: "Geist, sans-serif", letterSpacing: "-0.02em" }}>
                {featured.name}
              </h3>
              <p className="text-white/80 text-xs md:text-sm line-clamp-2 mb-3 md:mb-4 max-w-lg" style={{ lineHeight: "1.5" }}>
                {featured.description}
              </p>
              <div className="flex items-center justify-between gap-4">
                {featured.price != null && (
                  <p className="text-white font-bold text-base md:text-xl" style={{ letterSpacing: "-0.02em" }}>
                    ₹{featured.price.toLocaleString("en-IN")}
                  </p>
                )}
                <span
                  className="inline-flex items-center gap-1 px-3 py-1.5 md:px-4.5 md:py-2.5 rounded-lg text-xs font-semibold transition-all group-hover:bg-[#4648d4] group-hover:text-white bg-white text-[#0b1c30]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  View Details
                  <span className="text-[14px]">→</span>
                </span>
              </div>
            </div>
          </Link>
        )}

        <div className="flex flex-col gap-4 md:gap-5 h-auto md:h-full justify-between">
          {remaining.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="relative rounded-2xl overflow-hidden group block h-45 sm:h-50 md:h-52.5 shadow-md border hover:shadow-xl transition-all duration-500 hover:-translate-y-0.5"
              style={{ borderColor: "rgba(199,196,215,0.35)", position: "relative" }}
            >
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                unoptimized
              />
             
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 60%, transparent 90%)" }} />
           
              <div className="absolute top-3 left-3 md:top-4 md:left-4">
                <span
                  className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 md:py-1 rounded-full"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.2)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.3)",
                    letterSpacing: "0.08em"
                  }}
                >
                  {categoryMap[product.category] || product.category}
                </span>
              </div>
           
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                <h3 className="text-white font-bold text-base md:text-lg leading-snug mb-1" style={{ fontFamily: "Geist, sans-serif", letterSpacing: "-0.015em" }}>
                  {product.name}
                </h3>
                <div className="flex items-center justify-between gap-4">
                  {product.price != null && (
                    <p className="text-white/90 text-xs md:text-sm font-semibold">
                      ₹{product.price.toLocaleString("en-IN")}
                    </p>
                  )}
                  <span className="text-white/80 text-xs font-semibold group-hover:text-white transition-colors flex items-center gap-1">
                    View Details <span className="text-[13px]">→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
