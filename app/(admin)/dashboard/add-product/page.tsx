import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import AddProductForm from "./AddProductForm";
import Sidebar from "@/components/dashboard/Sidebar";

export default async function AddProductPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full max-w-full overflow-x-hidden" style={{ backgroundColor: "#f8f9ff", color: "#0b1c30" }}>
      {/* ── Sidebar ──────────────────────────────────── */}
      <Sidebar />

      {/* ── Main Area ──────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 md:ml-64">
        {/* Top Action Bar */}
        <header
          className="sticky top-0 z-30 border-b px-4 md:px-8 py-4 flex justify-between items-center"
          style={{
            backgroundColor: "rgba(248,249,255,0.85)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderColor: "rgba(199,196,215,0.35)",
          }}
        >
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="flex items-center justify-center w-8 h-8 rounded-full transition-colors"
              style={{ color: "#0b1c30" }}
            >
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>
                arrow_back
              </span>
            </Link>
            <div>
              <h1
                className="text-xl font-medium tracking-tight"
                style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30", letterSpacing: "-0.02em" }}
              >
                Curate Item
              </h1>
              <p className="text-xs mt-0.5" style={{ color: "#767586" }}>
                Add a new product to your Storefront.
              </p>
            </div>
          </div>
          <Link
            href="/dashboard"
            className="text-sm font-medium transition-colors hover:opacity-70 hidden sm:block"
            style={{ fontFamily: "Geist, sans-serif", color: "#767586" }}
          >
            ← Back to Dashboard
          </Link>
        </header>

        {/* Form takes the rest of the space */}
        <AddProductForm />
      </div>
    </div>
  );
}
