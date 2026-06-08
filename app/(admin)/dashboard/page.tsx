import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import LogoutButton from "../dashboard/LogoutButton";
import Sidebar from "@/components/dashboard/Sidebar";

export const revalidate = 0;

const CATEGORY_MAP: Record<string, string> = {
  ELECTRONICS: "Electronics",
  FASHION: "Fashion",
  BEAUTY_PERSONAL_CARE: "Beauty & Care",
  HEALTH_FITNESS: "Health & Fitness",
  BOOKS_EDUCATION: "Books & Education",
  HOME_KITCHEN: "Home & Kitchen",
  GAMING: "Gaming",
  SPORTS_OUTDOORS: "Sports & Outdoors",
  TOYS_KIDS: "Toys & Kids",
  AUTOMOTIVE: "Automotive",
  OFFICE_PRODUCTIVITY: "Office & Productivity",
  PET_SUPPLIES: "Pet Supplies",
  FOOD_BEVERAGES: "Food & Beverages",
  GIFT_CATEGORIES: "Gifts",
  TRAVEL: "Travel",
  CREATOR_ESSENTIALS: "Creator Gear",
};

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  let totalProducts = 0;
  let products: any[] = [];

  try {
    [totalProducts, products] = await Promise.all([
      prisma.product.count(),
      prisma.product.findMany({
        orderBy: { createdAt: "desc" },
        include: { productTags: true },
      }),
    ]);
  } catch (err) {
    console.error("[Dashboard] DB error:", err);
  }

  const totalClicks = products.reduce((sum: number, p: any) => sum + (p.clicks || 0), 0);
  const chartProducts = [...products].sort((a, b) => b.clicks - a.clicks).slice(0, 7);
  const maxClicks = Math.max(...chartProducts.map((p: any) => p.clicks || 0), 1);
  const topTrending = chartProducts.slice(0, 3);

  // New Arrivals — latest 3
  const newArrivals = products.slice(0, 3);
  // Top Picks — most clicked, next 4
  const topPicks = [...products].sort((a, b) => b.clicks - a.clicks).slice(0, 4);
  // Category breakdown
  const catBreakdown: Record<string, number> = {};
  products.forEach((p: any) => {
    catBreakdown[p.category] = (catBreakdown[p.category] || 0) + 1;
  });

  return (
    <div className="flex flex-col md:flex-row min-h-screen" style={{ backgroundColor: "#f4f5fb", color: "#0b1c30" }}>
      <Sidebar />

      <main className="flex-1 min-h-screen p-4 sm:p-6 md:p-8 space-y-10">
        {/* ── Header ── */}
        <header className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 pt-4">
          <div>
            <h1
              className="text-4xl md:text-5xl font-semibold tracking-tighter"
              style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30", letterSpacing: "-0.04em" }}
            >
              Overview
            </h1>
            <p className="mt-2 text-base" style={{ color: "#767586" }}>
              Here&apos;s what&apos;s happening with your curations.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className="text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full border"
              style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30", backgroundColor: "#dae2fd", borderColor: "rgba(199,196,215,0.3)", letterSpacing: "0.05em" }}
            >
              All Time
            </span>
            <LogoutButton />
          </div>
        </header>

        {/* ── Stat Cards ── */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              label: "Total Products",
              value: totalProducts,
              icon: "inventory_2",
              color: "#4648d4",
              bg: "rgba(70,72,212,0.08)",
              sub: `${totalProducts} live`,
            },
            {
              label: "Total Clicks",
              value: totalClicks > 1000 ? `${(totalClicks / 1000).toFixed(1)}k` : String(totalClicks),
              icon: "touch_app",
              color: "#0b7a5e",
              bg: "rgba(11,122,94,0.08)",
              sub: "affiliate traffic",
            },
            {
              label: "Avg Clicks / Product",
              value: totalProducts > 0 ? Math.round(totalClicks / totalProducts) : 0,
              icon: "analytics",
              color: "#c47d00",
              bg: "rgba(196,125,0,0.08)",
              sub: "per listing",
            },
            {
              label: "Categories",
              value: Object.keys(catBreakdown).length,
              icon: "category",
              color: "#6644d4",
              bg: "rgba(102,68,212,0.08)",
              sub: "active categories",
            },
          ].map(({ label, value, icon, color, bg, sub }) => (
            <div
              key={label}
              className="rounded-2xl p-5 border flex flex-col gap-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              style={{ backgroundColor: "#ffffff", borderColor: "rgba(199,196,215,0.3)" }}
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: bg }}>
                  <span className="material-symbols-outlined text-[22px]" style={{ color, fontVariationSettings: "'FILL' 0" }}>
                    {icon}
                  </span>
                </div>
                <span className="text-xs font-medium" style={{ color: "#767586" }}>{sub}</span>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider mb-1" style={{ color: "#767586", letterSpacing: "0.06em" }}>{label}</p>
                <p className="text-3xl font-bold" style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30", letterSpacing: "-0.03em" }}>
                  {value}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* ── New Arrivals — Magazine Layout ── */}
        {newArrivals.length > 0 && (
          <section>
            <div className="flex items-end justify-between mb-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#4648d4", letterSpacing: "0.1em" }}>
                  New Arrivals
                </p>
                <h2 className="text-2xl font-semibold tracking-tight" style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30", letterSpacing: "-0.03em" }}>
                  The latest additions to your curated library.
                </h2>
              </div>
              <Link
                href="/dashboard/add-product"
                className="text-xs font-semibold flex items-center gap-1 transition-colors hover:text-[#4648d4] whitespace-nowrap ml-4"
                style={{ color: "#767586", fontFamily: "Geist, sans-serif" }}
              >
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ height: "420px" }}>
              {/* Large featured card */}
              {newArrivals[0] && (
                <Link
                  href={`/product/${newArrivals[0].id}`}
                  className="relative rounded-2xl overflow-hidden group block"
                  style={{ height: "420px" }}
                >
                  <Image
                    src={newArrivals[0].imageUrl}
                    alt={newArrivals[0].name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    unoptimized
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.2) 45%, transparent 70%)" }} />
                  {/* Category chip */}
                  <div className="absolute top-4 left-4">
                    <span
                      className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: "rgba(255,255,255,0.18)", backdropFilter: "blur(8px)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", letterSpacing: "0.08em" }}
                    >
                      {CATEGORY_MAP[newArrivals[0].category] || newArrivals[0].category}
                    </span>
                  </div>
                  {/* Bottom content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white font-bold text-xl leading-snug mb-1" style={{ fontFamily: "Geist, sans-serif", letterSpacing: "-0.02em" }}>
                      {newArrivals[0].name}
                    </h3>
                    <p className="text-white/70 text-sm line-clamp-2 mb-4" style={{ lineHeight: "1.5" }}>
                      {newArrivals[0].description}
                    </p>
                    {newArrivals[0].price && (
                      <p className="text-white font-bold text-lg mb-3" style={{ letterSpacing: "-0.02em" }}>
                        ₹{newArrivals[0].price.toLocaleString("en-IN")}
                      </p>
                    )}
                    <span
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all"
                      style={{ backgroundColor: "#ffffff", color: "#0b1c30", fontFamily: "Geist, sans-serif" }}
                    >
                      View Details →
                    </span>
                  </div>
                </Link>
              )}

              {/* Two stacked small cards */}
              <div className="flex flex-col gap-4">
                {newArrivals.slice(1, 3).map((product: any) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    className="relative rounded-2xl overflow-hidden group flex-1 block"
                    style={{ minHeight: "196px" }}
                  >
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      unoptimized
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 60%)" }} />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-semibold text-base leading-snug" style={{ fontFamily: "Geist, sans-serif", letterSpacing: "-0.01em" }}>
                        {product.name}
                      </h3>
                      {product.price && (
                        <p className="text-white/80 text-sm font-semibold mt-0.5">
                          ₹{product.price.toLocaleString("en-IN")}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Top Picks — horizontal scroll strip ── */}
        {topPicks.length > 0 && (
          <section>
            <div className="flex items-end justify-between mb-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#4648d4", letterSpacing: "0.1em" }}>
                  Top Picks
                </p>
                <h2 className="text-2xl font-semibold tracking-tight" style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30", letterSpacing: "-0.03em" }}>
                  Your highest performing products.
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {topPicks.map((product: any) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="group block rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{ backgroundColor: "#ffffff", borderColor: "rgba(199,196,215,0.3)" }}
                >
                  <div className="relative overflow-hidden" style={{ height: "180px", backgroundColor: "#e5eeff" }}>
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />
                    {/* Clicks badge */}
                    <div
                      className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold"
                      style={{ backgroundColor: "rgba(255,255,255,0.92)", backdropFilter: "blur(6px)", color: "#4648d4" }}
                    >
                      ↑ {product.clicks}
                    </div>
                  </div>
                  <div className="p-3">
                    <span
                      className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: "rgba(70,72,212,0.08)", color: "#4648d4", letterSpacing: "0.07em" }}
                    >
                      {CATEGORY_MAP[product.category] || product.category}
                    </span>
                    <h3 className="text-sm font-semibold mt-2 line-clamp-1" style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30", letterSpacing: "-0.01em" }}>
                      {product.name}
                    </h3>
                    {product.price && (
                      <p className="text-sm font-bold mt-0.5" style={{ color: "#0b1c30" }}>
                        ₹{product.price.toLocaleString("en-IN")}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── Click Performance Chart + Category Breakdown ── */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bar chart */}
          <div className="lg:col-span-2 rounded-2xl p-6 border flex flex-col" style={{ backgroundColor: "#ffffff", borderColor: "rgba(199,196,215,0.3)" }}>
            <div className="flex justify-between items-center mb-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#767586", letterSpacing: "0.08em" }}>Performance</p>
                <h2 className="text-xl font-semibold tracking-tight" style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30", letterSpacing: "-0.02em" }}>
                  Click Performance
                </h2>
              </div>
            </div>
            {chartProducts.length === 0 ? (
              <div className="flex-1 flex items-center justify-center min-h-[200px]">
                <p className="text-sm" style={{ color: "#c7c4d7" }}>No data yet — add products to see clicks here.</p>
              </div>
            ) : (
              <div className="flex-1">
                <div className="flex items-end gap-3 h-[180px]">
                  {chartProducts.map((p: any, i: number) => {
                    const pct = maxClicks > 0 ? Math.max(4, (p.clicks / maxClicks) * 100) : 4;
                    return (
                      <div key={p.id} className="flex-1 flex flex-col items-center gap-1 group/bar">
                        <span className="text-xs font-semibold opacity-0 group-hover/bar:opacity-100 transition-opacity" style={{ color: "#4648d4" }}>
                          {p.clicks}
                        </span>
                        <Link href={`/product/${p.id}`} className="w-full" title={p.name}>
                          <div
                            className="w-full rounded-t-lg transition-all duration-300 cursor-pointer"
                            style={{
                              height: `${(pct / 100) * 150}px`,
                              minHeight: "8px",
                              backgroundColor: i === 0 ? "#4648d4" : `rgba(70,72,212,${0.65 - i * 0.07})`,
                            }}
                          />
                        </Link>
                      </div>
                    );
                  })}
                </div>
                <div className="flex gap-3 mt-3 border-t pt-3" style={{ borderColor: "rgba(199,196,215,0.3)" }}>
                  {chartProducts.map((p: any) => (
                    <div key={p.id} className="flex-1 text-center">
                      <span className="text-[10px] leading-tight block truncate" style={{ color: "#767586" }} title={p.name}>
                        {p.name.split(" ").slice(0, 2).join(" ")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Category breakdown */}
          <div className="rounded-2xl p-6 border flex flex-col" style={{ backgroundColor: "#ffffff", borderColor: "rgba(199,196,215,0.3)" }}>
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#767586", letterSpacing: "0.08em" }}>Breakdown</p>
              <h2 className="text-xl font-semibold tracking-tight" style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30", letterSpacing: "-0.02em" }}>
                By Category
              </h2>
            </div>
            <div className="flex flex-col gap-3 flex-1">
              {Object.entries(catBreakdown).length === 0 ? (
                <p className="text-sm text-center m-auto" style={{ color: "#c7c4d7" }}>No categories yet</p>
              ) : (
                Object.entries(catBreakdown)
                  .sort((a, b) => b[1] - a[1])
                  .map(([cat, count]) => {
                    const pct = Math.round((count / totalProducts) * 100);
                    return (
                      <div key={cat}>
                        <div className="flex justify-between text-xs mb-1">
                          <span style={{ fontFamily: "Geist, sans-serif", color: "#464554", fontWeight: 500 }}>
                            {CATEGORY_MAP[cat] || cat}
                          </span>
                          <span style={{ color: "#767586" }}>{count} item{count !== 1 ? "s" : ""}</span>
                        </div>
                        <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(199,196,215,0.3)" }}>
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${pct}%`, backgroundColor: "#4648d4" }}
                          />
                        </div>
                      </div>
                    );
                  })
              )}
            </div>
          </div>
        </section>

        {/* ── Products Table ── */}
        <section className="rounded-2xl border overflow-hidden" style={{ backgroundColor: "#ffffff", borderColor: "rgba(199,196,215,0.3)" }}>
          <div className="flex justify-between items-center p-6 border-b" style={{ borderColor: "rgba(199,196,215,0.3)" }}>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#767586", letterSpacing: "0.08em" }}>Catalog</p>
              <h2 className="text-xl font-semibold tracking-tight" style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30", letterSpacing: "-0.02em" }}>
                Affiliate Items
              </h2>
            </div>
            <Link
              href="/dashboard/add-product"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all active:scale-95"
              style={{ backgroundColor: "#0b1c30", color: "#ffffff", fontFamily: "Geist, sans-serif", borderTop: "1px solid rgba(255,255,255,0.12)" }}
            >
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 0" }}>add</span>
              Add Item
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-16">
              <span className="material-symbols-outlined text-[56px] mb-4 block" style={{ color: "#c7c4d7", fontVariationSettings: "'FILL' 0" }}>inventory_2</span>
              <p className="text-sm" style={{ color: "#767586" }}>No products added yet. Click &quot;Add Item&quot; to get started.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-xs font-semibold uppercase tracking-wider border-b" style={{ borderColor: "rgba(199,196,215,0.3)", color: "#767586", letterSpacing: "0.05em" }}>
                    <th className="px-6 py-3">Product</th>
                    <th className="px-6 py-3">Category</th>
                    <th className="px-6 py-3">Price</th>
                    <th className="px-6 py-3">Clicks</th>
                    <th className="px-6 py-3">Added</th>
                  </tr>
                </thead>
                <tbody>
                  {[...products].sort((a: any, b: any) => b.clicks - a.clicks).map((product: any, i: number) => (
                    <tr
                      key={product.id}
                      className="border-b transition-colors hover:bg-[#f8f9ff]"
                      style={{ borderColor: "rgba(199,196,215,0.2)" }}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-11 h-11 rounded-xl border overflow-hidden shrink-0" style={{ borderColor: "rgba(199,196,215,0.35)", backgroundColor: "#eff4ff" }}>
                            <Image src={product.imageUrl} alt={product.name} fill sizes="44px" className="object-cover" unoptimized />
                          </div>
                          <div>
                            <Link
                              href={`/product/${product.id}`}
                              className="font-medium text-sm hover:text-[#4648d4] transition-colors line-clamp-1"
                              style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30" }}
                            >
                              {product.name}
                            </Link>
                            <p className="text-xs mt-0.5 line-clamp-1 max-w-[180px]" style={{ color: "#767586" }}>
                              {product.description.slice(0, 60)}…
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                          style={{ fontFamily: "Geist, sans-serif", backgroundColor: "rgba(70,72,212,0.08)", color: "#4648d4", letterSpacing: "0.05em" }}
                        >
                          {CATEGORY_MAP[product.category] || product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold" style={{ color: "#0b1c30" }}>
                          {product.price ? `₹${product.price.toLocaleString("en-IN")}` : "—"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-bold text-sm" style={{ color: "#4648d4" }}>{product.clicks}</span>
                          {product.clicks > 0 && (
                            <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full" style={{ backgroundColor: "rgba(70,72,212,0.08)", color: "#4648d4" }}>
                              ↑ active
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs font-mono" style={{ color: "#767586" }}>
                        {new Date(product.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <div className="pb-10" />
      </main>
    </div>
  );
}
