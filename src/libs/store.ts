import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Budget {
  monthly: number;
  spent: number;
}

interface Txn {
  id: string;
  category: string;
  amount: number;
  createdAt: string;
}

interface KosAIState {
  budget: Budget;
  txns: Txn[];
  addCustomExpense: (amount: number, category: string) => void;
  resetBudget: () => void;
}

export const useKosAIStore = create<KosAIState>()(
  persist(
    (set) => ({
      budget: { monthly: 1_000_000, spent: 0 },
      txns: [],

      addCustomExpense: (amount, category) =>
        set((s) => ({
          txns: [
            {
              id: crypto.randomUUID(),
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

      resetBudget: () =>
        set(() => ({
          budget: { monthly: 1_000_000, spent: 0 },
          txns: [],
        })),
    }),
    { name: "kosai-finance" }
  )
);
