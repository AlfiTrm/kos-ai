"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";


export interface Txn {
  id: string;
  category: string;
  amount: number;
  createdAt: string;
}

interface KosAIState {
  txns: Txn[];
  addCustomExpense: (amount: number, category: string) => void;
  addIncome: (amount: number, category: string) => void;
  resetBudget: () => void;
  getTotalBalance: () => number;
  getTotalIncome: () => number;
  getTotalExpense: () => number;
}

export const useKosAIStore = create<KosAIState>()(
  persist(
    (set, get) => ({
      txns: [],

      addCustomExpense: (amount, category) =>
        set((s) => ({
          txns: [
            {
              id: nanoid(),
              amount: -Math.abs(amount),
              category,
              createdAt: new Date().toISOString(),
            },
            ...s.txns,
          ],
        })),

      addIncome: (amount, category = "income") =>
        set((s) => ({
          txns: [
            {
              id: nanoid(),
              amount: Math.abs(amount),
              category,
              createdAt: new Date().toISOString(),
            },
            ...s.txns,
          ],
        })),


      resetBudget: () =>
        set(() => ({
          txns: [],
        })),

      getTotalBalance: () => {
        return get().txns.reduce((acc, txn) => acc + txn.amount, 0);
      },

      getTotalIncome: () => {
        return get()
          .txns.filter((t) => t.amount > 0)
          .reduce((acc, t) => acc + t.amount, 0);
      },

      getTotalExpense: () => {
        return get()
          .txns.filter((t) => t.amount < 0)
          .reduce((acc, t) => acc + Math.abs(t.amount), 0);
      },
    }),
    { name: "kosai-finance" }
  )
);