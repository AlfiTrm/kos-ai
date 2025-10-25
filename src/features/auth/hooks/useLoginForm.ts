"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { AuthErrors, AuthFormState } from "@/features/auth/types/aType";
import { useAuthStore } from "@/libs/authStore";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function useLoginForm() {
    const router = useRouter();
    const loginLocal = useAuthStore((s) => s.loginLocal);
    const [form, setForm] = useState<AuthFormState>({
        email: "",
        password: "",
        remember: false,
        showPassword: false,
    });
    const [errors, setErrors] = useState<AuthErrors & { general?: string }>({});

    const setField = <K extends keyof AuthFormState>(k: K, v: AuthFormState[K]) =>
        setForm((s) => ({ ...s, [k]: v }));

    const toggleShowPassword = () => setField("showPassword", !form.showPassword);

    const validate = () => {
        const e: AuthErrors = {};
        if (!form.email.trim()) e.email = "Email wajib diisi";
        else if (!emailRegex.test(form.email)) e.email = "Format email tidak valid";
        if (!form.password) e.password = "Password wajib diisi";
        else if (form.password.length < 6) e.password = "Minimal 6 karakter";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const submit = (ev?: React.FormEvent) => {
        ev?.preventDefault();
        if (!validate()) return;
        const ok = loginLocal(form.email, form.password);
        if (!ok) {
            setErrors({ general: "Email atau password salah" });
            return;
        }
        console.log("login ->", { email: form.email, remember: form.remember });
        router.replace("/chatbot");
    };

    const forgotPassword = () => {
        alert("Forgot password — coming soon");
    };

    const oauth = (provider: string) => {
        alert(`OAuth ${provider} — placeholder`);
    };

    return {
        form,
        errors,
        setField,
        toggleShowPassword,
        submit,
        forgotPassword,
        oauth,
    };
}
