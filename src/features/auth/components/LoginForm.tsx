"use client";

import React from "react";
import { Eye, EyeOff } from "lucide-react";
import { GradientButton, OutlineButton } from "@/shared/components/Button";
import { useLoginForm } from "../hooks/useLoginForm";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const { form, errors, setField, toggleShowPassword, submit, forgotPassword } =
    useLoginForm();
  const router = useRouter();

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="space-y-2 bg-white p-4 rounded-2xl">
        <label className="text-xs font-medium">Email</label>
        <div
          className={`rounded-2xl bg-neutral-100 p-2 ${
            errors.email ? "ring-1 ring-red-400/40" : ""
          }`}
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={(e) => setField("email", e.target.value)}
            className="w-full rounded-xl px-3 py-3 text-sm  outline-none focus:border-neutral-300"
          />
        </div>
        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
      </div>

      <div className="space-y-2 bg-white p-4 rounded-2xl">
        <label className="text-xs font-medium">Password</label>
        <div
          className={`rounded-2xl bg-neutral-100 p-2 ${
            errors.password ? "ring-1 ring-red-400/40" : ""
          }`}
        >
          <div className="relative">
            <input
              type={form.showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setField("password", e.target.value)}
              className="w-full rounded-xl px-3 py-3 pr-10 text-sm focus:border-neutral-300"
            />
            <button
              type="button"
              aria-label={form.showPassword ? "Hide password" : "Show password"}
              onClick={toggleShowPassword}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-neutral-500"
            >
              {form.showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        {errors.password && (
          <p className="text-xs text-red-500">{errors.password}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.remember}
            onChange={(e) => setField("remember", e.target.checked)}
          />
          Remember me
        </label>
        <button
          type="button"
          onClick={forgotPassword}
          className="text-sm text-rose-400"
        >
          Forgot password
        </button>
      </div>

      <GradientButton type="submit" className="mt-2">
        Sign in
      </GradientButton>

      <OutlineButton
        type="button"
        onClick={() => router.push("/register")}
        className="mt-2"
      >
        Sign up
      </OutlineButton>
    </form>
  );
}
