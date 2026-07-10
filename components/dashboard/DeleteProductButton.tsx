"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface DeleteProductButtonProps {
  productId: string;
  productName: string;
}

export default function DeleteProductButton({
  productId,
  productName,
}: DeleteProductButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    setShowConfirm(false);

    const toastId = toast.loading(`Deleting "${productName}"...`);

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete product");
      }

      toast.success(`"${productName}" deleted successfully`, { id: toastId });
      router.refresh();
    } catch (error: any) {
      console.error("Delete product error:", error);
      toast.error(error.message || "Failed to delete product", { id: toastId });
    } finally {
      setIsDeleting(false);
    }
  };

  if (showConfirm) {
    return (
      <div className="flex items-center gap-1.5 animation-fadeIn">
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="flex items-center justify-center p-1.5 rounded-lg text-white bg-[#ba1a1a] hover:bg-[#961212] transition-all active:scale-[0.93] disabled:opacity-50"
          title="Confirm Delete"
        >
          <span className="material-symbols-outlined text-[16px] font-bold">
            check
          </span>
        </button>
        <button
          onClick={() => setShowConfirm(false)}
          disabled={isDeleting}
          className="flex items-center justify-center p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all active:scale-[0.93]"
          title="Cancel"
        >
          <span className="material-symbols-outlined text-[16px]">
            close
          </span>
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      disabled={isDeleting}
      className="flex items-center justify-center p-1.5 rounded-lg text-[#767586] bg-transparent border border-transparent hover:border-[#ba1a1a]/20 hover:bg-[#ba1a1a]/08 hover:text-[#ba1a1a] transition-all active:scale-[0.93] disabled:opacity-50"
      title="Delete Product"
    >
      <span className="material-symbols-outlined text-[18px]">
        delete
      </span>
    </button>
  );
}
