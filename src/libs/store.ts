"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";

interface Budget {
  monthly: number;
  spent: number;
}

export interface Txn {
  id: string;
  category: string;
  amount: number;
  createdAt: string;
}

interface KosAIState {
  budget: Budget;
  txns: Txn[];
  addCustomExpense: (amount: number, category: string) => void;
  addIncome?: (amount: number, category?: string) => void; 
  setMonthlyBudget: (amount: number) => void;
  resetBudget: () => void;
  remaining?: () => number;
}

export const useKosAIStore = create<KosAIState>()(
  persist(
    (set, get) => ({
      budget: { monthly: 1_000_000, spent: 0 },
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
          budget: {
            ...s.budget,
            spent: s.budget.spent + Math.abs(amount),
          },
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
          budget: { ...s.budget },
        })),

      setMonthlyBudget: (amount) =>
        set((s) => ({
          budget: { ...s.budget, monthly: Math.max(0, Math.floor(amount)) },
        })),

      resetBudget: () =>
        set(() => ({
          budget: { monthly: 1_000_000, spent: 0 },
          txns: [],
        })),

      remaining: () => {
        const { monthly, spent } = get().budget;
        return monthly - spent;
      },
    }),
    { name: "kosai-finance" }
  )
);
