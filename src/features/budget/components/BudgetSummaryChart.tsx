"use client";

import React, { useMemo } from "react";
import { useKosAIStore } from "@/libs/store";

type Props = {
  size?: number;
  stroke?: number;
};

export default function BudgetSummaryChart({ size = 240, stroke = 20 }: Props) {
  const txns = useKosAIStore((s) => s.txns);
  const budget = useKosAIStore((s) => s.budget);

  const { income, expense, pIncome, pExpense, overallPct, circumference, r } =
    useMemo(() => {
      const income = txns
        .filter((t) => t.amount > 0)
        .reduce((a, b) => a + b.amount, 0);
      const expense = txns
        .filter((t) => t.amount < 0)
        .reduce((a, b) => a + Math.abs(b.amount), 0);
      const totalActivity = Math.max(income + expense, 1);
      const pIncome = Math.round((income / totalActivity) * 100);
      const pExpense = 100 - pIncome;

      const overallPct = Math.max(
        0,
        Math.min(
          100,
          Math.round((budget.spent / Math.max(budget.monthly, 1)) * 100)
        )
      );

      const r = (size - stroke) / 2;
      const circumference = 2 * Math.PI * r;
      return {
        income,
        expense,
        pIncome,
        pExpense,
        overallPct,
        circumference,
        r,
      };
    }, [txns, budget, size, stroke]);

  const incLen = (pIncome / 100) * circumference;
  const expLen = (pExpense / 100) * circumference;
  const gap = 8; 
  const startRot = -90;

  return (
    <section className="px-4 pt-4 pb-2">
      <div
        className="relative mx-auto flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <svg width={0} height={0}>
          <defs>
            <linearGradient id="grad-expense" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#fb923c" />
            </linearGradient>
            <linearGradient id="grad-income" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#c4b5fd" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
          </defs>
        </svg>

        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="drop-shadow-sm"
        >
          <g transform={`rotate(${startRot} ${size / 2} ${size / 2})`}>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              stroke="rgba(255,255,255,0.5)"
              strokeWidth={stroke}
              fill="none"
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              stroke="url(#grad-expense)"
              strokeWidth={stroke}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${expLen} ${circumference - expLen}`}
              strokeDashoffset={0}
              className="transition-all duration-500"
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              stroke="url(#grad-income)"
              strokeWidth={stroke}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${incLen} ${circumference - incLen}`}
              strokeDashoffset={-(expLen + gap)}
              className="transition-all duration-500"
            />
          </g>
        </svg>

        <div className="absolute inset-0 grid place-items-center text-center">
          <div>
            <div className="text-4xl font-extrabold">{overallPct}%</div>
            <div className="text-xs text-neutral-600 -mt-1">
              Overall Activity
            </div>
          </div>
        </div>

        <span className="absolute -top-1 left-6 text-[11px] bg-white/80 backdrop-blur px-2 py-1 rounded-full shadow">
          {pIncome}% ↑
        </span>
        <span className="absolute -right-2 bottom-8 text-[11px] bg-white/80 backdrop-blur px-2 py-1 rounded-full shadow">
          {pExpense}% ↓
        </span>
      </div>

      {/* Legend */}
      <div className="mt-3 flex items-center gap-3 justify-center">
        <LegendDot colorFrom="#c4b5fd" colorTo="#a78bfa" label="Income" />
        <LegendDot colorFrom="#f472b6" colorTo="#fb923c" label="Expense" />
      </div>
    </section>
  );
}

function LegendDot({
  colorFrom,
  colorTo,
  label,
}: {
  colorFrom: string;
  colorTo: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 backdrop-blur border border-white/50">
      <span
        className="w-2.5 h-2.5 rounded-full"
        style={{
          background: `linear-gradient(135deg, ${colorFrom}, ${colorTo})`,
        }}
      />
      <span className="text-xs text-neutral-700">{label}</span>
    </div>
  );
}
