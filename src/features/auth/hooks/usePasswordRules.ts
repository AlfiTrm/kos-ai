"use client";
import { useMemo } from "react";

const hasSymbolOrNumber = (s: string) => /[\d\W]/.test(s);

export function usePasswordRules({
  password,
  email,
}: { password: string; email: string }) {
  return useMemo(() => {
    const pwdLower   = (password || "").toLowerCase();
    const emailUser  = (email || "").split("@")[0]?.trim().toLowerCase() ?? "";

    const hasUserStr  = emailUser.length >= 3;
    const containsEmail = hasUserStr && pwdLower.includes(emailUser);

    const rules = [
      {
        id: "length",
        text: "Must be at least 8 characters",
        valid: password.length >= 8,
      },
      {
        id: "noNameEmail",
        text: "Can’t include your name or email address",
        valid: !( containsEmail),
      },
      {
        id: "symbolOrNumber",
        text: "Must have at least a symbol or number",
        valid: hasSymbolOrNumber(password),
      },
    ] as const;

    const allValid = rules.every(r => r.valid);
    return { rules, allValid };
  }, [password, email]);
}
