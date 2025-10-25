"use client";
import { useState } from "react";
import AppHeader from "@/shared/components/AppHeader";
import { useRouter } from "next/navigation";
import { useStockStore } from "../hooks/useStockStore";
import type { UnitName } from "../types/sTypes";

const units: UnitName[] = ["pcs", "kg", "g", "l", "ml"];

export default function AddStockcreen() {
  const router = useRouter();
  const addItem = useStockStore(s => s.addItem);

  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [amount, setAmount] = useState(1);
  const [unit, setUnit] = useState<UnitName>("pcs");

  const submit = () => {
    if (!name.trim() || amount <= 0) return;
    addItem({ name: name.trim(), icon, unit, amount });
    router.push("/stock");
  };

  return (
    <main className="min-h-[100svh] container">
      <AppHeader title="Add new item" centerVariant="pill" onBack={() => router.back()} />

      <div className="px-4 py-3 space-y-3">
        <div className="rounded-2xl bg-white/80 backdrop-blur p-3">
          <div className="text-xs text-neutral-500 mb-1">Item</div>
          <input
            value={name}
            onChange={(e)=>setName(e.target.value)}
            placeholder="ex: noodle"
            className="w-full rounded-xl bg-neutral-100 px-3 py-3 text-sm outline-none"
          />
        </div>

        <div className="rounded-2xl bg-white/80 backdrop-blur p-3">
          <div className="text-xs text-neutral-500 mb-1">Icon</div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center text-lg">{icon}</div>
            <input
              value={icon}
              onChange={(e)=>setIcon(e.target.value)}
              className="flex-1 rounded-xl bg-neutral-100 px-3 py-2 text-sm outline-none"
              placeholder="emoji or short text"
            />
          </div>
        </div>

        <div className="rounded-2xl bg-white/80 backdrop-blur p-3">
          <div className="text-xs text-neutral-500 mb-1">Stock amount</div>
          <div className="flex items-center gap-2">
            <button onClick={()=>setAmount(a=>Math.max(1,a-1))} className="px-3 py-2 rounded-full bg-neutral-100">-</button>
            <div className="min-w-[48px] text-center font-semibold">{amount}</div>
            <button onClick={()=>setAmount(a=>a+1)} className="px-3 py-2 rounded-full bg-neutral-100">+</button>
          </div>
        </div>

        <div className="rounded-2xl bg-white/80 backdrop-blur p-3">
          <div className="text-xs text-neutral-500 mb-1">Unit name</div>
          <select
            value={unit}
            onChange={(e)=>setUnit(e.target.value as UnitName)}
            className="w-full rounded-xl bg-neutral-100 px-3 py-3 text-sm outline-none"
          >
            {units.map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>

        <button
          onClick={submit}
          disabled={!name.trim() || amount <= 0}
          className="w-full mt-4 rounded-full py-3 text-white disabled:opacity-40
                     bg-gradient-to-r from-pink-400 to-orange-300"
        >
          Submit
        </button>
      </div>
    </main>
  );
}
