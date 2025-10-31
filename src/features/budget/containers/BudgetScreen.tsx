"use client";

import React from "react";
import { useKosAIStore } from "@/libs/store";
import AddButton from "@/features/stock/components/AddButton";
import BudgetSummaryChart from "../components/BudgetSummaryChart";
import ActivityList from "../components/ActivityList";

export default function BudgetScreen() {
  const txns = useKosAIStore((s) => s.txns);

  const sortedTxns = [...txns].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <main className="w-full pb-24">
      <BudgetSummaryChart />
      <ActivityList transactions={sortedTxns} limit={5} />

      <AddButton href="/budget/add" />
    </main>
  );
}
