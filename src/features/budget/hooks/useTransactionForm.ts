"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type {
  TransactionFormState,
  TransactionType,
  Category,
  TransactionFormErrors,
} from "../types/bTypes";
import { useKosAIStore } from "@/libs/store";

const getTodayDateString = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

const parseRupiah = (value: string): number => {
  return Number(value.replace(/[^0-9]/g, "")) || 0;
};

export function useTransactionForm() {
  const router = useRouter();
  const addExpense = useKosAIStore((s) => s.addCustomExpense);
  const addIncome = useKosAIStore((s) => s.addIncome);

  const [form, setForm] = useState<TransactionFormState>({
    type: "Expense",
    amount: 0,
    amountDisplay: "",
    date: getTodayDateString(),
    category: null,
    note: "",
    repeat: false,
  });

  const [errors, setErrors] = useState<TransactionFormErrors>({});

  const setField = <K extends keyof TransactionFormState>(
    field: K,
    value: TransactionFormState[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof TransactionFormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleAmountChange = (displayValue: string) => {
    const numericValue = parseRupiah(displayValue);
    const formattedDisplay = new Intl.NumberFormat("id-ID").format(numericValue);
    setField("amount", numericValue);
    setField("amountDisplay", formattedDisplay === "0" ? "" : formattedDisplay);
  };

  const setTransactionType = (type: TransactionType) => {
    setField("type", type);
  };

  const setCategory = (category: Category | null) => {
    setField("category", category);
  };

  const setDate = (date: string) => {
    setField("date", date);
  };

  const setNote = (note: string) => {
    setField("note", note);
  };

  const toggleRepeat = () => {
    setField("repeat", !form.repeat);
  };

  const validate = (): boolean => {
    const newErrors: TransactionFormErrors = {};
    if (form.amount <= 0) {
      newErrors.amount = "Jumlah harus lebih dari 0";
    }
    if (!form.category) {
      newErrors.category = "Kategori wajib dipilih";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!validate()) return;

    if (!form.category) {
      console.error("Category not selected");
      return;
    }

    if (form.type === "Expense") {
      addExpense(form.amount, form.category.name);
      console.log("Expense added:", form);
      router.push("/budget/success");
    } else if (form.type === "Income") {
      if (addIncome) {
        addIncome(form.amount, form.category.name);
        console.log("Income added:", form);
        router.push("/budget/success");
      } else {
        console.error("Fungsi addIncome tidak ditemukan di store!");
      }
    } else {
      console.log("Transaction details (unhandled type):", form);
    }
  };

  const canSubmit = form.amount > 0 && form.category !== null;

  return {
    form,
    errors,
    setTransactionType,
    handleAmountChange,
    setDate,
    setCategory,
    setNote,
    toggleRepeat,
    submit,
    canSubmit,
  };
}