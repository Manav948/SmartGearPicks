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
        orderBy: { clicks: "desc" }, // order by clicks for the chart
      }),
    ]);
  } catch {
    // DATABASE_URL not configured
  }

  const totalClicks = products.reduce((sum: number, p: any) => sum + (p.clicks || 0), 0);

  // Top 7 products by clicks for the bar chart
  const chartProducts = products.slice(0, 7);
  const maxClicks = Math.max(...chartProducts.map((p: any) => p.clicks || 0), 1);

  // Top trending (most clicks)
  const topTrending = products.slice(0, 3);

  return (
    <div className="flex flex-col md:flex-row min-h-screen" style={{ backgroundColor: "#f8f9ff", color: "#0b1c30" }}>
      {/* ── Sidebar ──────────────────────────────────── */}
      <Sidebar />

      {/* ── Main Content ──────────────────────────────── */}
      <main className="flex-1 min-h-screen p-4 sm:p-6 md:p-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8 md:mb-12 pt-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tighter" style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30", letterSpacing: "-0.04em" }}>
              Overview
            </h1>
            <p className="mt-2 text-base md:text-lg" style={{ color: "#464554" }}>
              Here&apos;s what&apos;s happening with your curations.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div
              className="text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full border"
              style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30", backgroundColor: "#d3e4fe", borderColor: "rgba(199,196,215,0.3)", letterSpacing: "0.05em" }}
            >
              All Time
            </div>
            <LogoutButton />
          </div>
        </header>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Total Products */}
          <div
            className="rounded-xl p-6 flex flex-col justify-between border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] group"
            style={{ backgroundColor: "#ffffff", borderColor: "rgba(199,196,215,0.35)" }}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 rounded-lg" style={{ backgroundColor: "rgba(70,72,212,0.1)", color: "#4648d4" }}>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>inventory_2</span>
              </div>
            </div>
            <div>
              <h3 className="text-sm mb-1" style={{ color: "#767586" }}>Total Products</h3>
              <p className="text-4xl font-semibold" style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30", letterSpacing: "-0.02em" }}>
                {totalProducts}
              </p>
            </div>
            {/* Sparkline based on real data */}
            <div className="mt-4 h-8 flex items-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
              {(products.length > 0 ? products.slice(0, 6) : Array(6).fill({ clicks: 0 })).map((p: any, i: number) => {
                const h = maxClicks > 0 ? Math.max(10, (p.clicks / maxClicks) * 100) : 15;
                return (
                  <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, backgroundColor: `rgba(70,72,212,${0.2 + i * 0.12})` }} />
                );
              })}
            </div>
          </div>

          {/* Total Clicks */}
          <div
            className="rounded-xl p-6 flex flex-col justify-between border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] group"
            style={{ backgroundColor: "#ffffff", borderColor: "rgba(199,196,215,0.35)" }}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 rounded-lg" style={{ backgroundColor: "rgba(86,94,116,0.12)", color: "#565e74" }}>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>touch_app</span>
              </div>
            </div>
            <div>
              <h3 className="text-sm mb-1" style={{ color: "#767586" }}>Total Clicks</h3>
              <p className="text-4xl font-semibold" style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30", letterSpacing: "-0.02em" }}>
                {totalClicks > 1000 ? `${(totalClicks / 1000).toFixed(1)}k` : totalClicks}
              </p>
            </div>
            <div className="mt-4 h-8 flex items-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
              {(products.length > 0 ? products.slice(0, 6) : Array(6).fill({ clicks: 0 })).map((p: any, i: number) => {
                const h = maxClicks > 0 ? Math.max(10, (p.clicks / maxClicks) * 100) : 20;
                return (
                  <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, backgroundColor: `rgba(86,94,116,${0.15 + i * 0.12})` }} />
                );
              })}
            </div>
          </div>

          {/* Top Performer */}
          <div
            className="rounded-xl p-6 flex flex-col justify-between border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] relative overflow-hidden"
            style={{ backgroundColor: "#ffffff", borderColor: "rgba(199,196,215,0.35)" }}
          >
            <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl" style={{ backgroundColor: "rgba(211,228,254,0.5)" }} />
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="p-2 rounded-lg" style={{ backgroundColor: "#d3e4fe", color: "#767586" }}>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>trending_up</span>
              </div>
            </div>
            <div className="relative z-10">
              <h3 className="text-sm mb-1" style={{ color: "#767586" }}>Top Products by Clicks</h3>
              <p className="text-4xl font-semibold" style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30", letterSpacing: "-0.02em" }}>
                {topTrending.length}
              </p>
            </div>
            <div className="mt-4 flex flex-col gap-2 relative z-10">
              {topTrending.length > 0 ? topTrending.map((p: any) => (
                <div key={p.id} className="flex items-center justify-between text-sm">
                  <span className="truncate w-36" style={{ color: "#767586" }}>{p.name}</span>
                  <span className="font-semibold" style={{ color: "#4648d4" }}>↑ {p.clicks}</span>
                </div>
              )) : (
                <span className="text-xs" style={{ color: "#c7c4d7" }}>No products yet</span>
              )}
            </div>
          </div>
        </section>

        {/* Click Performance Chart (Real Data) */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Real Bar Chart */}
          <div className="lg:col-span-2 rounded-xl p-6 border flex flex-col" style={{ backgroundColor: "#ffffff", borderColor: "rgba(199,196,215,0.35)" }}>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-xl font-medium tracking-tight" style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30", letterSpacing: "-0.02em" }}>
                  Click Performance
                </h2>
                <p className="text-sm mt-1" style={{ color: "#767586" }}>Top products by affiliate clicks</p>
              </div>
            </div>

            {chartProducts.length === 0 ? (
              <div className="flex-1 flex items-center justify-center min-h-[200px]">
                <p className="text-sm" style={{ color: "#c7c4d7" }}>No data yet — add products to see clicks here.</p>
              </div>
            ) : (
              <div className="flex-1 relative min-h-[240px]">
                {/* Chart bars */}
                <div className="flex items-end gap-3 h-[200px] pb-0">
                  {chartProducts.map((p: any, i: number) => {
                    const pct = maxClicks > 0 ? Math.max(4, (p.clicks / maxClicks) * 100) : 4;
                    return (
                      <div key={p.id} className="flex-1 flex flex-col items-center gap-1 group/bar">
                        {/* Click count tooltip */}
                        <span
                          className="text-xs font-semibold opacity-0 group-hover/bar:opacity-100 transition-opacity"
                          style={{ fontFamily: "Geist, sans-serif", color: "#4648d4" }}
                        >
                          {p.clicks}
                        </span>
                        <Link href={`/product/${p.id}`} className="w-full" title={p.name}>
                          <div
                            className="w-full rounded-t-md transition-all duration-300 cursor-pointer"
                            style={{
                              height: `${(pct / 100) * 160}px`,
                              minHeight: "8px",
                              backgroundColor: i === 0 ? "#4648d4" : `rgba(70,72,212,${0.7 - i * 0.08})`,
                            }}
                            title={`${p.name}: ${p.clicks} clicks`}
                          />
                        </Link>
                      </div>
                    );
                  })}
                </div>
                {/* X-axis labels */}
                <div className="flex gap-3 mt-2">
                  {chartProducts.map((p: any) => (
                    <div key={p.id} className="flex-1 text-center">
                      <span
                        className="text-[10px] leading-tight block truncate"
                        style={{ color: "#767586", fontFamily: "Geist, sans-serif" }}
                        title={p.name}
                      >
                        {p.name.split(" ").slice(0, 2).join(" ")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Stats Panel */}
          <div className="rounded-xl p-6 border flex flex-col" style={{ backgroundColor: "#ffffff", borderColor: "rgba(199,196,215,0.35)" }}>
            <h2 className="text-xl font-medium tracking-tight mb-6" style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30", letterSpacing: "-0.02em" }}>
              Quick Stats
            </h2>
            <div className="flex flex-col gap-4">
              {[
                { label: "Products Published", value: totalProducts, icon: "inventory_2", color: "#4648d4" },
                { label: "Total Affiliate Clicks", value: totalClicks, icon: "touch_app", color: "#565e74" },
                { label: "Avg Clicks / Product", value: totalProducts > 0 ? Math.round(totalClicks / totalProducts) : 0, icon: "analytics", color: "#595c5e" },
              ].map(({ label, value, icon, color }) => (
                <div key={label} className="flex items-center gap-4 p-4 rounded-xl" style={{ backgroundColor: "#f8f9ff", border: "1px solid rgba(199,196,215,0.3)" }}>
                  <div className="p-2 rounded-lg shrink-0" style={{ backgroundColor: `${color}18`, color }}>
                    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>{icon}</span>
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: "#767586" }}>{label}</p>
                    <p className="text-2xl font-semibold" style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30", letterSpacing: "-0.02em" }}>
                      {value.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products Table — only real uploaded products */}
        <section className="rounded-xl border p-6" style={{ backgroundColor: "#ffffff", borderColor: "rgba(199,196,215,0.35)" }}>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-medium tracking-tight" style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30", letterSpacing: "-0.02em" }}>
                Affiliate Item Catalog
              </h2>
              <p className="text-sm mt-0.5" style={{ color: "#767586" }}>
                {totalProducts} product{totalProducts !== 1 ? "s" : ""} published
              </p>
            </div>
            <Link
              href="/dashboard/add-product"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all active:scale-95"
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
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b text-xs font-semibold uppercase tracking-wider" style={{ borderColor: "rgba(199,196,215,0.4)", color: "#767586", fontFamily: "Geist, sans-serif", letterSpacing: "0.05em" }}>
                    <th className="pb-3 pr-4">Product</th>
                    <th className="pb-3 pr-4">Category</th>
                    <th className="pb-3 pr-4">Clicks</th>
                    <th className="pb-3 pr-4">Affiliate Link</th>
                    <th className="pb-3">Added On</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-sm" style={{ borderColor: "rgba(199,196,215,0.2)" }}>
                  {/* Show ALL real products sorted by clicks */}
                  {[...products].sort((a: any, b: any) => b.clicks - a.clicks).map((product: any) => (
                    <tr key={product.id} className="hover:bg-[#f8f9ff] transition-colors">
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded-lg border overflow-hidden shrink-0" style={{ borderColor: "rgba(199,196,215,0.4)", backgroundColor: "#eff4ff" }}>
                            <Image src={product.imageUrl} alt={product.name} fill sizes="40px" className="object-cover" />
                          </div>
                          <div>
                            <Link
                              href={`/product/${product.id}`}
                              className="font-medium text-sm hover:text-[#4648d4] transition-colors"
                              style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30" }}
                            >
                              {product.name}
                            </Link>
                            <p className="text-xs mt-0.5 truncate max-w-[160px]" style={{ color: "#767586" }}>
                              {product.description.slice(0, 50)}…
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 pr-4">
                        <span
                          className="text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded-full"
                          style={{ fontFamily: "Geist, sans-serif", backgroundColor: "rgba(70,72,212,0.08)", color: "#4648d4", letterSpacing: "0.05em" }}
                        >
                          {CATEGORY_MAP[product.category] || product.category}
                        </span>
                      </td>
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-semibold" style={{ color: "#4648d4" }}>{product.clicks}</span>
                          {product.clicks > 0 && (
                            <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full" style={{ backgroundColor: "rgba(70,72,212,0.08)", color: "#4648d4" }}>
                              ↑ active
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 pr-4 max-w-[180px] truncate text-xs font-mono" style={{ color: "#767586" }}>
                        <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-[#4648d4] transition-colors">
                          {product.affiliateLink.replace(/^https?:\/\//, "").slice(0, 35)}…
                        </a>
                      </td>
                      <td className="py-4 text-xs font-mono" style={{ color: "#767586" }}>
                        {new Date(product.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <div className="pb-16" />
      </main>
    </div>
  );
}
