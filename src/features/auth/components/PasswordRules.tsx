"use client";
import { Check } from "lucide-react";
import { usePasswordRules } from "../hooks/usePasswordRules";

export default function PasswordRules({ password, email }:{
  password: string; email: string;
}) {
  const { rules } = usePasswordRules({ password, email });

  return (
    <div className="bg-white p-4 rounded-2xl text-xs space-y-2">
      {rules.map((r) => (
        <div key={r.id} className="flex items-center gap-2">
          <span className={[
            "inline-flex h-4 w-4 items-center justify-center rounded-full border transition-all",
            r.valid
              ? "border-transparent bg-gradient-to-r from-purple-1 to-orange-1"
              : "border-neutral-300 bg-neutral-200",
          ].join(" ")}>
            {r.valid ? <Check size={12} className="text-white" /> : null}
          </span>
          <p className={r.valid ? "text-neutral-800" : "text-neutral-600"}>{r.text}</p>
        </div>
      ))}
    </div>
  );
}
