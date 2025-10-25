"use client";

import { JSX, useEffect, useRef, useState } from "react";
import { ChevronDown, Mars, Venus } from "lucide-react";

type Gender = "Male" | "Female" | "Other";

const OPTIONS: { value: Gender; label: string; icon: JSX.Element }[] = [
  { value: "Male", label: "Male", icon: <Mars className="w-4 h-4" /> },
  { value: "Female", label: "Female", icon: <Venus className="w-4 h-4" /> },
];

export default function GenderSelect({
  value,
  onChange,
  label = "Gender",
}: {
  value: Gender;
  onChange: (v: Gender) => void;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const current = OPTIONS.find((o) => o.value === value) ?? OPTIONS[0];

  return (
    <div className="space-y-2 bg-white p-4 rounded-2xl" ref={ref}>
      <label className="text-xs font-medium">{label}</label>

      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between bg-neutral-100 rounded-2xl px-3 py-3"
      >
        <span className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-pink-100 text-neutral-800">
            {current.icon}
          </span>
          <span className="text-sm">{current.label}</span>
        </span>
        <ChevronDown
          className={`w-4 h-4 text-neutral-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="mt-2 bg-white rounded-xl border border-neutral-200 shadow-md overflow-hidden"
        >
          {OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              role="option"
              aria-selected={opt.value === value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-3 text-sm hover:bg-neutral-50
                ${opt.value === value ? "bg-neutral-50" : ""}`}
            >
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-pink-100 text-neutral-800">
                {opt.icon}
              </span>
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
