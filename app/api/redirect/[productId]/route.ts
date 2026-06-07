import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params;

    // Find the product to get the affiliate link
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Increment click count
    await prisma.product.update({
      where: { id: productId },
      data: {
        clicks: {
          increment: 1,
        },
      },
    });

    // Clean redirect to Amazon
    return NextResponse.redirect(product.affiliateLink, 302);
  } catch (error) {
    console.error("Redirect tracking error:", error);
    return NextResponse.json(
      { error: "Failed to process redirect" },
      { status: 500 }
    );
  }
}
