import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Sidebar from "@/components/dashboard/Sidebar";
import ProductGrid from "@/components/ProductGrid";

export const revalidate = 0;

export default async function AdminStorePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  let products: any[] = [];
  try {
    products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        description: true,
        imageUrl: true,
        affiliateLink: true,
        category: true,
        productTags: {
          select: {
            tag: true,
          },
        },
      },
    });
  } catch (e) {
    console.error("Prisma error in dashboard store page:", e);
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full max-w-full overflow-x-hidden" style={{ backgroundColor: "#f8f9ff", color: "#0b1c30" }}>
      {/* ── Sidebar ──────────────────────────────────── */}
      <Sidebar />

      {/* ── Main Content ──────────────────────────────── */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 md:p-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8 md:mb-12 pt-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tighter" style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30", letterSpacing: "-0.04em" }}>
              Storefront Preview
            </h1>
            <p className="mt-2 text-base md:text-lg" style={{ color: "#464554" }}>
              Visual rendering of all published curations.
            </p>
          </div>
        </header>

        {/* Product Grid */}
        <div className="w-full">
          <ProductGrid initialProducts={products} />
        </div>

        <div className="pb-16" />
      </main>
    </div>
  );
}
