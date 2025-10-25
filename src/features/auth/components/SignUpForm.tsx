"use client";
import { Eye, EyeOff } from "lucide-react";
import { DisableButton, GradientButton } from "@/shared/components/Button";
import { useSignUpForm } from "../hooks/useSignUpForm";
import PasswordRules from "./PasswordRules";
import { usePasswordRules } from "../hooks/usePasswordRules";

export default function SignUpForm() {
  const {
    form,
    errors,
    setField,
    submit,
    toggleShowPassword,
    toggleShowConfirm,
  } = useSignUpForm();
  const { allValid } = usePasswordRules({
    password: form.password,
    email: form.email
  });

  const canContinue =
    !!form.email.trim() &&
    allValid &&
    form.confirm === form.password;

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
            className="w-full rounded-xl px-3 py-3 text-sm outline-none"
            autoComplete="email"
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
              className="w-full rounded-xl px-3 py-3 pr-10 text-sm"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-neutral-500"
              aria-label={form.showPassword ? "Hide password" : "Show password"}
            >
              {form.showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        {errors.password && (
          <p className="text-xs text-red-500">{errors.password}</p>
        )}
      </div>

      <div className="space-y-2 bg-white p-4 rounded-2xl">
        <label className="text-xs font-medium">Confirm password</label>
        <div
          className={`rounded-2xl bg-neutral-100 p-2 ${
            errors.confirm ? "ring-1 ring-red-400/40" : ""
          }`}
        >
          <div className="relative">
            <input
              type={form.showConfirm ? "text" : "password"}
              placeholder="Enter your password"
              value={form.confirm}
              onChange={(e) => setField("confirm", e.target.value)}
              className="w-full rounded-xl px-3 py-3 pr-10 text-sm"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={toggleShowConfirm}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-neutral-500"
              aria-label={form.showConfirm ? "Hide password" : "Show password"}
            >
              {form.showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        {errors.confirm && (
          <p className="text-xs text-red-500">{errors.confirm}</p>
        )}
      </div>

      <PasswordRules
        password={form.password}
        email={form.email}
      />
      {canContinue ? (
        <GradientButton type="submit">Continue</GradientButton>
      ) : (
        <DisableButton>Continue</DisableButton>
      )}
    </form>
  );
}
