"use client";
import type { StockItem } from "../types/sTypes";
import ProgressBar from "./ProgressBar";
import { Trash2, Minus, Plus } from "lucide-react";

type Props = {
  item: StockItem;
  onInc: () => void;
  onDec: () => void;
  onDelete: () => void;
};

export default function StockCard({ item, onInc, onDec, onDelete }: Props) {
  const pct = item.stock === 0 ? 0 : Math.round((item.leftover / item.stock) * 100);

  return (
    <div className="rounded-2xl p-4 bg-white/80 backdrop-blur border border-white/40 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center ring-1 ring-black/5 text-lg">
          {item.icon ?? "🍚"}
        </div>
        <div className="font-semibold">{item.name}</div>
        <button onClick={onDelete} className="ml-auto p-2 rounded-full hover:bg-neutral-100">
          <Trash2 className="w-4 h-4 text-rose-600" />
        </button>
      </div>

      <div className="mt-3 grid grid-cols-2 text-xs text-neutral-500">
        <div>
          <div>Stock</div>
          <div className="text-orange-1 font-medium">
            {item.stock} {item.unit}
          </div>
        </div>
        <div className="text-right">
          <div>Leftover</div>
          <div className="text-purple-1 font-medium">
            {item.leftover} {item.unit}
          </div>
        </div>
      </div>

      <div className="mt-2">
        <ProgressBar pct={pct} />
        <div className="text-[11px] text-neutral-500 mt-1">{pct}%</div>
      </div>

      <div className="mt-3 flex w-full items-center justify-end gap-2">
        <button onClick={onDec} className="p-2 rounded-full bg-neutral-100">
          <Minus className="w-4 h-4" />
        </button>
        <button onClick={onInc} className="p-2 rounded-full bg-neutral-100">
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
