import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getCloudinary } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate session
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse form data
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const affiliateLink = formData.get("affiliateLink") as string;
    const category = formData.get("category") as string;
    const image = formData.get("image") as File | null;
    const priceRaw = formData.get("price") as string | null;
    const price = priceRaw ? parseFloat(priceRaw) : null;

    // 3. Validate fields
    if (!name || !description || !affiliateLink || !category || !image) {
      return NextResponse.json(
        { error: "All fields are required, including an image file." },
        { status: 400 }
      );
    }

    // 4. Upload image buffer to Cloudinary
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const cloudinaryInstance = getCloudinary();

    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinaryInstance.uploader.upload_stream(
        { folder: "store-products" },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      ).end(buffer);
    });

    if (!uploadResult || !uploadResult.secure_url) {
      return NextResponse.json(
        { error: "Failed to upload image to Cloudinary." },
        { status: 500 }
      );
    }

    const imageUrl = uploadResult.secure_url;

    // 5. Create product in DB
    const product = await prisma.product.create({
      data: {
        name,
        description,
        imageUrl,
        affiliateLink,
        category: category as any,
        ...(price !== null && !isNaN(price) ? { price } : {}),
      },
    });

    return NextResponse.json(
      { message: "Product created successfully", product },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Product creation error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create product" },
      { status: 500 }
    );
  }
}
