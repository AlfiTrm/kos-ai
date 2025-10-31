"use client";

import * as React from "react";
import { X } from "lucide-react";
import { CATEGORIES, CategoryItem, CategoryId } from "../data/bData";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (cat: CategoryItem) => void;
  selectedId?: CategoryId;
  title?: string;
  subtitle?: string;
};

export default function CategoryPicker({
  isOpen,
  onClose,
  onSelect,
  selectedId,
  title = "Category",
  subtitle = "Choose a category",
}: Props) {
  const [picked, setPicked] = React.useState<CategoryId | undefined>(selectedId);

  React.useEffect(() => {
    if (isOpen) setPicked(selectedId);
  }, [isOpen, selectedId]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const choose = () => {
    const cat = CATEGORIES.find(c => c.id === picked);
    if (!cat) return;
    onSelect(cat);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60]">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/30 backdrop-blur-[2px] animate-fadeIn"
      />

      <div
        className="absolute inset-x-0 bottom-0 rounded-t-3xl bg-white
                   shadow-2xl border-t border-neutral-200
                   transition-transform duration-300 translate-y-0
                   data-[state=closed]:translate-y-full"
        data-state={isOpen ? "open" : "closed"}
        role="dialog"
        aria-modal="true"
      >
        <div className="px-4 pt-4 pb-2 flex items-center">
          <div className="flex-1">
            <div className="text-base font-semibold">{title}</div>
            <div className="text-xs text-neutral-500">{subtitle}</div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-100"
            aria-label="Close picker"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-4 pb-4 grid grid-cols-4 gap-3">
          {CATEGORIES.map((c) => {
            const Icon = c.icon;
            const active = picked === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setPicked(c.id)}
                className={[
                  "flex flex-col items-center justify-center gap-2 rounded-2xl p-3",
                  "border transition",
                  active
                    ? "border-pink-300 bg-pink-50"
                    : "border-neutral-200 hover:bg-neutral-50",
                ].join(" ")}
              >
                <div
                  className={[
                    "w-12 h-12 rounded-full flex items-center justify-center",
                    active ? "bg-pink-100" : "bg-neutral-100",
                  ].join(" ")}
                >
                  <Icon className="w-6 h-6 text-[#1E2A37]" />
                </div>
                <span className="text-[11px] font-medium text-[#1E2A37]">
                  {c.name}
                </span>
              </button>
            );
          })}
        </div>

        <div className="px-4 pb-6">
          <button
            onClick={choose}
            disabled={!picked}
            className="w-full rounded-full py-3 text-sm font-medium text-white
                       disabled:opacity-40 disabled:cursor-not-allowed
                       bg-pink-300"
          >
            Choose
          </button>
        </div>
      </div>
    </div>
  );
}
