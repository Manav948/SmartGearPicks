"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ProductForm from "@/components/dashboard/ProductForm";

export default function AddProductFormWrapper() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    const toastId = toast.loading("Creating product curation...");

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to create product");

      toast.success("Product created successfully!", { id: toastId });
      router.push("/dashboard");
      router.refresh();
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to create product.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductForm
      onSubmit={handleSubmit}
      submitLabel="Publish Pick"
      loading={loading}
    />
  );
}
