"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ProductForm from "@/components/dashboard/ProductForm";

interface ProductWithTags {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  affiliateLink: string;
  category: string;
  price: number | null;
  productTags: { tag: string }[];
}

export default function EditProductFormWrapper({
  product,
}: {
  product: ProductWithTags;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    const toastId = toast.loading("Updating product details...");

    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: "PUT",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to update product");

      toast.success("Product updated successfully!", { id: toastId });
      router.push("/dashboard");
      router.refresh();
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to update product.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductForm
      initialData={product}
      onSubmit={handleSubmit}
      submitLabel="Save Changes"
      loading={loading}
    />
  );
}
