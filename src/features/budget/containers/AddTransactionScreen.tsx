"use client";

import React from "react";
import { useRouter } from "next/navigation";
import AppHeader from "@/shared/components/AppHeader";
import TransactionForm from "../components/TransactionForm";
import { useTransactionForm } from "../hooks/useTransactionForm";
import CategoryPicker from "../components/CategoryPicker";
import type { CategoryItem } from "../data/bData";

export default function AddTransactionScreen() {
  const router = useRouter();
  const {
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
  } = useTransactionForm();

  const [isCategoryPickerOpen, setCategoryPickerOpen] = React.useState(false);
  const [selectedCat, setSelectedCat] = React.useState<CategoryItem | null>(
    null
  );

  return (
    <main className="min-h-screen bg-neutral-50 pb-10">
      <AppHeader
        title="Add new transaction"
        centerVariant="pill"
        onBack={() => router.back()}
      />

      <TransactionForm
        form={form}
        errors={errors}
        onTypeChange={setTransactionType}
        onAmountChange={handleAmountChange}
        onDateChange={setDate}
        onCategoryClick={() => setCategoryPickerOpen(true)}
        onNoteChange={setNote}
        onToggleRepeat={toggleRepeat}
        onSubmit={submit}
        canSubmit={canSubmit}
      />

      <CategoryPicker
        isOpen={isCategoryPickerOpen}
        onClose={() => setCategoryPickerOpen(false)}
        selectedId={selectedCat?.id}
        onSelect={(cat) => {
          setSelectedCat(cat);
          setCategory({
            id: cat.id,
            name: cat.name,
            icon: cat.id,
          });
          setCategoryPickerOpen(false);
        }}
      />
    </main>
  );
}
