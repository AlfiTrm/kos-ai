"use client";
import AppHeader from "@/shared/components/AppHeader";
import { useRouter } from "next/navigation";
import { useStockStore } from "../hooks/useStockStore";
import StockCard from "../components/StockCard";
import AddButton from "../components/AddButton";

export default function StockScreeen() {
  const router = useRouter();
  const items = useStockStore((s) => s.items);
  const order = useStockStore((s) => s.order);
  const inc = useStockStore((s) => s.incLeftover);
  const dec = useStockStore((s) => s.decLeftover);
  const del = useStockStore((s) => s.deleteItem);

  const list = order.map((id) => items[id]).filter(Boolean);

  return (
    <main className="w-[480w] ">
      <AppHeader title="Stock" onBack={() => router.back()} />

      <div className="px-4 pt-3 pb-24 space-y-3">
        <div className="h-11 rounded-full bg-white/70 backdrop-blur px-4 flex items-center text-sm">
          <input
            className="flex-1 bg-transparent outline-none"
            placeholder="Search history"
          />
        </div>

        {list.length === 0 ? (
          <div className="text-center text-sm text-neutral-600 mt-10">
            Belum ada stock nih. Tap tombol <b>+</b> buat nambah item 
          </div>
        ) : (
          list.map((item) => (
            <StockCard
              key={item.id}
              item={item}
              onInc={() => inc(item.id)}
              onDec={() => dec(item.id)}
              onDelete={() => del(item.id)}
            />
          ))
        )}
      </div>

      <AddButton />
    </main>
  );
}
