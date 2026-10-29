import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import LogoutButton from "../dashboard/LogoutButton";
import Sidebar from "@/components/dashboard/Sidebar";
import StatCards from "@/components/dashboard/StatCards";
import NewArrivals from "@/components/dashboard/NewArrivals";
import TopPicks from "@/components/dashboard/TopPicks";
import PerformanceMetrics from "@/components/dashboard/PerformanceMetrics";
import ProductsTable from "@/components/dashboard/ProductsTable";

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
  const avgClicksPerProduct = totalProducts > 0 ? Math.round(totalClicks / totalProducts) : 0;
  
  const chartProducts = [...products].sort((a, b) => b.clicks - a.clicks).slice(0, 7);
  const maxClicks = Math.max(...chartProducts.map((p: any) => p.clicks || 0), 1);

  const newArrivals = products.slice(0, 3);
  
  const topPicks = [...products].sort((a, b) => b.clicks - a.clicks).slice(0, 4);

  const catBreakdown: Record<string, number> = {};
  products.forEach((p: any) => {
    catBreakdown[p.category] = (catBreakdown[p.category] || 0) + 1;
  });

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full max-w-full overflow-x-hidden" style={{ backgroundColor: "#F7F6F2", color: "#151515" }}>
      <Sidebar />

      <main className="flex-1 min-w-0 md:ml-64 p-4 sm:p-6 md:p-8 space-y-10">
      
        <header className="relative flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 pt-4">
          {/* Decorative blob */}
          <div
            className="absolute -top-6 -left-4 w-64 h-64 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(124,104,83,0.06) 0%, transparent 70%)",
              zIndex: 0,
            }}
          />
          <div className="relative z-10">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3 text-[10px] font-bold uppercase tracking-widest"
              style={{
                backgroundColor: "rgba(124,104,83,0.08)",
                color: "#7c6853",
                border: "1px solid rgba(124,104,83,0.15)",
                letterSpacing: "0.1em",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#7c6853] inline-block"
                style={{ boxShadow: "0 0 5px #7c6853" }}
              />
              CURATION WORKSPACE
            </div>
            <h1
              className="text-4xl md:text-5xl font-bold tracking-tighter"
              style={{ fontFamily: "Geist, sans-serif", color: "#151515", letterSpacing: "-0.045em" }}
            >
              Curation Studio
            </h1>
            <p className="mt-2 text-sm text-[#6B6B6B]">
              A clear view of your catalog, clicks, and latest additions.
            </p>
          </div>
          <div className="relative z-10 flex items-center gap-3">
            <span
              className="text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-[#FAF8F4] text-[#151515]"
              style={{
                fontFamily: "Geist, sans-serif",
                letterSpacing: "0.06em",
                border: "1px solid rgba(229,225,218,0.35)",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              }}
            >
              ◎ All Time
            </span>
            <LogoutButton />
          </div>
        </header>

       
        <StatCards
          totalProducts={totalProducts}
          totalClicks={totalClicks}
          avgClicksPerProduct={avgClicksPerProduct}
          categoriesCount={Object.keys(catBreakdown).length}
        />

      
        <NewArrivals newArrivals={newArrivals} />

     
        <TopPicks topPicks={topPicks} />

     
        <PerformanceMetrics
          chartProducts={chartProducts}
          maxClicks={maxClicks}
          catBreakdown={catBreakdown}
          totalProducts={totalProducts}
          categoryMap={CATEGORY_MAP}
        />

        <ProductsTable products={products} categoryMap={CATEGORY_MAP} />

        <div className="pb-10" />
      </main>
    </div>
  );
}


