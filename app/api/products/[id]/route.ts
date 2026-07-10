import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getCloudinary } from "@/lib/cloudinary";

const getPublicIdFromUrl = (url: string): string | null => {
  try {
    const parts = url.split("/");
    const uploadIndex = parts.indexOf("upload");
    if (uploadIndex === -1) return null;

    let remainingParts = parts.slice(uploadIndex + 1);
    
 
    if (remainingParts[0] && /^v\d+$/.test(remainingParts[0])) {
      remainingParts = remainingParts.slice(1);
    }

    const pathWithExtension = remainingParts.join("/");
    const lastDotIndex = pathWithExtension.lastIndexOf(".");
    if (lastDotIndex === -1) return pathWithExtension;
    
    return pathWithExtension.substring(0, lastDotIndex);
  } catch (error) {
    console.error("Failed to parse public ID from URL:", error);
    return null;
  }
};

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
   
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

  
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    
    if (product.imageUrl) {
      const publicId = getPublicIdFromUrl(product.imageUrl);
      if (publicId) {
        try {
          const cloudinaryInstance = getCloudinary();
          await cloudinaryInstance.uploader.destroy(publicId);
        } catch (cloudinaryError) {
    
          console.error("Failed to delete image from Cloudinary:", cloudinaryError);
        }
      }
    }

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Product deletion error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete product" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const affiliateLink = formData.get("affiliateLink") as string;
    const category = formData.get("category") as string;
    const image = formData.get("image") as File | null;
    const priceRaw = formData.get("price") as string | null;
    const price = priceRaw ? parseFloat(priceRaw) : null;

   
    if (!name || !description || !affiliateLink || !category) {
      return NextResponse.json(
        { error: "Name, description, affiliateLink, and category are required." },
        { status: 400 }
      );
    }

    let imageUrl = product.imageUrl;

    if (image && image.size > 0) {
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
          { error: "Failed to upload new image to Cloudinary." },
          { status: 500 }
        );
      }

      imageUrl = uploadResult.secure_url;

      if (product.imageUrl) {
        const oldPublicId = getPublicIdFromUrl(product.imageUrl);
        if (oldPublicId) {
          try {
            await cloudinaryInstance.uploader.destroy(oldPublicId);
          } catch (cloudinaryError) {
            console.error("Failed to delete old image from Cloudinary:", cloudinaryError);
          }
        }
      }
    }


    const tagsRaw = formData.get("tags") as string | null;
    const tags = tagsRaw ? (JSON.parse(tagsRaw) as string[]) : [];

   
    await prisma.productTag.deleteMany({
      where: { productId: id },
    });

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        imageUrl,
        affiliateLink,
        category: category as any,
        price: price !== null && !isNaN(price) ? price : null,
        productTags: {
          create: tags.map((tag) => ({ tag: tag as any })),
        },
      },
      include: {
        productTags: true,
      },
    });

    return NextResponse.json(
      { message: "Product updated successfully", product: updatedProduct },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Product update error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update product" },
      { status: 500 }
    );
  }
}
