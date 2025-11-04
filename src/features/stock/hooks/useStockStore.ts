"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { StockItem, UnitName } from "../types/sTypes";
import { nanoid } from "nanoid";
import { useNotificationStore } from "@/libs/useNotificationStore";

interface StockState {
  items: Record<string, StockItem>;
  order: string[];

  addItem: (data: {
    name: string;
    icon?: string;
    unit: UnitName;
    amount: number;
  }) => string;
  incLeftover: (id: string, n?: number) => void;
  decLeftover: (id: string, n?: number) => void;
  setLeftover: (id: string, val: number) => void;
  deleteItem: (id: string) => void;
  getAllItems: () => StockItem[];
  findItemByName: (name: string) => StockItem | undefined;
}

export const useStockStore = create<StockState>()(
  persist(
    (set, get) => ({
      items: {},
      order: [],

      addItem: ({ name, icon, unit, amount }) => {
        const id = nanoid();
        const now = Date.now();
        const item: StockItem = {
          id, name, icon, unit,
          stock: amount,
          leftover: amount,
          createdAt: now, updatedAt: now,
        };
        set(s => ({
          items: { ...s.items, [id]: item },
          order: [id, ...s.order],
        }));
        return id;
      },

      incLeftover: (id, n = 1) =>
        set(s => {
          const it = s.items[id]; if (!it) return s;
          const left = Math.min(it.leftover + n, it.stock);
          return { items: { ...s.items, [id]: { ...it, leftover: left, updatedAt: Date.now() } } };
        }),

      decLeftover: (id, n = 1) =>
        set(s => {
          const it = s.items[id]; if (!it) return s;
          const left = Math.max(it.leftover - n, 0);

          const pct = it.stock === 0 ? 0 : (left / it.stock) * 100;
          
          const oldPct = it.stock === 0 ? 0 : (it.leftover / it.stock) * 100;
          if (pct < 20 && oldPct >= 20) {
            useNotificationStore.getState().addNotification({
              message: `Stok ${it.name} menipis! Sisa ${left} ${it.unit}.`,
              href: "/stock"
            });
          }

          return { items: { ...s.items, [id]: { ...it, leftover: left, updatedAt: Date.now() } } };
        }),

      setLeftover: (id, val) =>
        set(s => {
          const it = s.items[id]; if (!it) return s;
          const clamped = Math.max(0, Math.min(val, it.stock));
          return { items: { ...s.items, [id]: { ...it, leftover: clamped, updatedAt: Date.now() } } };
        }),

      deleteItem: (id) =>
        set(s => {
          const { [id]: _, ...rest } = s.items;
          return { items: rest, order: s.order.filter(x => x !== id) };
        }),
      
      getAllItems: () => {
        return get().order.map(id => get().items[id]).filter(Boolean);
      },

      findItemByName: (name) => {
        const items = get().getAllItems();
        const lowerName = name.toLowerCase();
        return items.find((item) => 
          item.name.toLowerCase().includes(lowerName)
        );
      }

    }),
    { name: "kosai-stock" }
  )
);