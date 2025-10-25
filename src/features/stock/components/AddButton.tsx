"use client";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

export default function AddButton({
  href = "/stock/new-stock",
}: {
  href?: string;
}) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(href)}
      className="fixed bottom-24 right-4 p-4 rounded-full shadow-lg bg-gradient-to-br from-pink-400 to-orange-300 text-white"
      aria-label="Add"
    >
      <Plus className="w-5 h-5" />
    </button>
  );
}
