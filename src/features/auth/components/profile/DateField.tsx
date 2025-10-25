"use client";

import { useRef } from "react";
import { Calendar, ChevronDown } from "lucide-react";

export default function DateField({
  value,
  onChange,
  label = "Date of birth",
  placeholder = "Select your birth",
}: {
  value: string;
  onChange: (v: string) => void;
  label?: string;
  placeholder?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const pretty = (() => {
    if (!value) return "";
    const d = new Date(value);
    return d.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  })();

  return (
    <div className="space-y-2 bg-white p-4 rounded-2xl">
      <label className="text-xs font-medium">{label}</label>

      <button
        type="button"
        onClick={() =>
          inputRef.current?.showPicker?.() || inputRef.current?.click()
        }
        className="w-full flex items-center justify-between bg-neutral-100 rounded-2xl px-3 py-3"
      >
        <span className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-pink-100 text-neutral-800">
            <Calendar className="w-4 h-4" />
          </span>
          <span
            className={`text-sm ${
              value ? "text-neutral-900" : "text-neutral-500"
            }`}
          >
            {value ? pretty : placeholder}
          </span>
        </span>
        <ChevronDown className="w-4 h-4 text-neutral-500" />
      </button>

      <input
        ref={inputRef}
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="sr-only"
      />
    </div>
  );
}
