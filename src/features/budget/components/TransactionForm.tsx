"use client";

import React from "react";
import type {
  TransactionFormState,
  TransactionType,
  TransactionFormErrors,
} from "../types/bTypes";
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Repeat,
} from "lucide-react";
import { GradientButton } from "@/shared/components/Button";
import { CATEGORY_ICONS } from "../data/bData";

interface TransactionFormProps {
  form: TransactionFormState;
  errors: TransactionFormErrors;
  onTypeChange: (type: TransactionType) => void;
  onAmountChange: (value: string) => void;
  onDateChange: (date: string) => void;
  onCategoryClick: () => void;
  onNoteChange: (note: string) => void;
  onToggleRepeat: () => void;
  onSubmit: (e?: React.FormEvent) => void;
  canSubmit: boolean;
}

const TypeButton: React.FC<{
  label: TransactionType;
  active: boolean;
  onClick: () => void;
}> = ({ label, active, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-4 py-1.5 text-sm rounded-full transition-all ${
      active
        ? "bg-gradient-to-r from-purple-1 to-orange-1 text-white shadow-md"
        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
    }`}
  >
    {label}
  </button>
);

const DateDisplay: React.FC<{ date: string; onClick: () => void }> = ({
  date,
  onClick,
}) => {
  const displayDate = new Date(date + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const isToday = date === new Date().toISOString().split("T")[0];

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-between text-left p-3 bg-neutral-100 rounded-xl"
    >
      <span className="flex items-center gap-2">
        <Calendar size={18} className="text-neutral-500" />
        <span className="text-sm font-medium">
          {isToday ? "Today" : displayDate}
        </span>
      </span>
      <span className="flex items-center gap-1">
        <ChevronLeft size={16} className="text-neutral-400" />
        <ChevronRight size={16} className="text-neutral-400" />
      </span>
    </button>
  );
};

export default function TransactionForm({
  form,
  errors,
  onTypeChange,
  onAmountChange,
  onDateChange,
  onCategoryClick,
  onNoteChange,
  onToggleRepeat,
  onSubmit,
  canSubmit,
}: TransactionFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4 px-4 py-3">
      <div className="flex justify-around items-center bg-neutral-100 p-1 rounded-full">
        <TypeButton
          label="Expense"
          active={form.type === "Expense"}
          onClick={() => onTypeChange("Expense")}
        />
        <TypeButton
          label="Income"
          active={form.type === "Income"}
          onClick={() => onTypeChange("Income")}
        />
      </div>

      <div className="text-center bg-white/70 backdrop-blur rounded-2xl p-4 shadow-sm border border-white/30">
        <label className="text-xs text-neutral-500">Amount</label>
        <div className="flex items-center justify-center mt-1">
          <span className="text-xl font-semibold text-neutral-500 mr-1">
            Rp
          </span>
          <input
            type="text"
            inputMode="decimal" 
            value={form.amountDisplay}
            onChange={(e) => onAmountChange(e.target.value)}
            placeholder="0"
            className="text-4xl font-bold text-center bg-transparent outline-none w-full max-w-[200px]" 
          />
        </div>
        {errors.amount && (
          <p className="text-xs text-red-500 mt-1">{errors.amount}</p>
        )}
      </div>

      <div className="bg-white/70 backdrop-blur rounded-2xl p-3 shadow-sm border border-white/30 space-y-1">
        <label className="text-xs text-neutral-500 px-1">Date</label>
        <DateDisplay date={form.date} onClick={() => alert("Buka Kalender!")} />
        <input
          type="date"
          value={form.date}
          onChange={(e) => onDateChange(e.target.value)}
          className="opacity-50 text-xs ml-1" 
        />
      </div>

      <div className="bg-white/70 backdrop-blur rounded-2xl p-3 shadow-sm border border-white/30 space-y-1">
        <label className="text-xs text-neutral-500 px-1">Category</label>

        {(() => {
          const Icon = form.category
            ? CATEGORY_ICONS[form.category.icon as keyof typeof CATEGORY_ICONS]
            : null;

          return (
            <button
              type="button"
              onClick={onCategoryClick}
              className="w-full flex items-center justify-between text-left p-3 bg-neutral-100 rounded-xl"
            >
              <span className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-purple-100 text-purple-700">
                  {Icon ? <Icon className="w-4 h-4" /> : "?"}
                </span>
                <span
                  className={`text-sm font-medium ${
                    form.category ? "text-black" : "text-neutral-500"
                  }`}
                >
                  {form.category ? form.category.name : "Select category"}
                </span>
              </span>
              <ChevronDown size={18} className="text-neutral-500" />
            </button>
          );
        })()}

        {errors.category && (
          <p className="text-xs text-red-500 mt-1 px-1">{errors.category}</p>
        )}
      </div>

      <div className="bg-white/70 backdrop-blur rounded-2xl p-3 shadow-sm border border-white/30 space-y-1">
        <label className="text-xs text-neutral-500 px-1">Note</label>
        <input
          type="text"
          value={form.note}
          onChange={(e) => onNoteChange(e.target.value)}
          placeholder="Enter note"
          className="w-full p-3 bg-neutral-100 rounded-xl text-sm outline-none"
        />
      </div>

      <div className="flex items-center justify-between bg-white/70 backdrop-blur rounded-2xl p-3 shadow-sm border border-white/30">
        <span className="flex items-center gap-2 text-sm font-medium">
          <Repeat size={18} className="text-neutral-500" />
          Repeat
        </span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={form.repeat}
            onChange={onToggleRepeat}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-neutral-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-1 peer-checked:to-orange-1"></div>
        </label>
      </div>

      <div className="pt-4">
        <GradientButton type="submit" disabled={!canSubmit}>
          Save
        </GradientButton>
      </div>
    </form>
  );
}
