"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { SignUpErrors, SignUpState } from "@/features/auth/types/aType";
import { useAuthStore } from "@/libs/authStore";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const hasSymbolOrNumber = (s: string) => /[\d\W]/.test(s);

export function useSignUpForm() {
    const router = useRouter();
    const setTempEmail = useAuthStore((s) => s.setTempEmail);
    const registerLocal = useAuthStore((s) => s.registerLocal);

    const [form, setForm] = useState<SignUpState>({
        email: "",
        password: "",
        confirm: "",
        showPassword: false,
        showConfirm: false,
    });
    const [errors, setErrors] = useState<SignUpErrors>({});

    const setField = <K extends keyof SignUpState>(k: K, v: SignUpState[K]) =>
        setForm((s) => ({ ...s, [k]: v }));

    const validate = () => {
        const e: SignUpErrors = {};
        if (!form.email.trim()) e.email = "Email wajib diisi";
        else if (!emailRegex.test(form.email)) e.email = "Email tidak valid";

        if (!form.password) e.password = "Password wajib diisi";
        else {
            if (form.password.length < 8) e.password = "Minimal 8 karakter";
            if (form.password.toLowerCase().includes(form.email.split("@")[0].toLowerCase())) {
                e.password = (e.password ? e.password + " • " : "") + "Jangan mengandung nama/email";
            }
            if (!hasSymbolOrNumber(form.password))
                e.password = (e.password ? e.password + " • " : "") + "Harus ada simbol/angka";
        }

        if (form.confirm !== form.password) e.confirm = "Konfirmasi tidak sama";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const canContinue =
        emailRegex.test(form.email) &&
        form.password.length >= 8 &&
        hasSymbolOrNumber(form.password) &&
        form.confirm === form.password;

    const submit = (ev?: React.FormEvent) => {
        ev?.preventDefault();
        if (!validate()) return;
        registerLocal(form.email, form.password);
        setTempEmail(form.email);
        router.push("/profile");
    };

    return {
        form, errors, setField, submit,
        canContinue,
        toggleShowPassword: () => setField("showPassword", !form.showPassword),
        toggleShowConfirm: () => setField("showConfirm", !form.showConfirm),
    };
}
