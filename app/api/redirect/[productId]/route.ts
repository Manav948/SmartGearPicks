import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params;
    const cookieName = `sgp_clicked_${productId}`;
    const hasClicked = req.cookies.has(cookieName);

    // Find the product to get the affiliate link
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (!hasClicked) {
      // Increment click count
      await prisma.product.update({
        where: { id: productId },
        data: {
          clicks: {
            increment: 1,
          },
        },
      });
    }

    // Create redirect response
    const response = NextResponse.redirect(product.affiliateLink, 302);

    if (!hasClicked) {
      // Set cookie to prevent count duplication for 24 hours
      response.cookies.set({
        name: cookieName,
        value: "true",
        maxAge: 24 * 60 * 60, // 24 hours
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });
    }

    return response;
  } catch (error) {
    console.error("Redirect tracking error:", error);
    return NextResponse.json(
      { error: "Failed to process redirect" },
      { status: 500 }
    );
  }
}
