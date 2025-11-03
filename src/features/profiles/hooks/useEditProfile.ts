// src/features/profile/hooks/useEditProfileForm.ts
"use client";
import { useState, useMemo } from "react";
import type { ProfileErrors, ProfileState } from "@/features/auth/types/aType"; // <-- Kita REUSE tipe dari auth
import { useAuthStore } from "@/libs/authStore";
import { useRouter } from "next/navigation";

export function useEditProfileForm() {
    const router = useRouter();
    const user = useAuthStore((s) => s.user);
    const updateProfile = useAuthStore((s) => s.updateProfile); // <-- Panggil fungsi baru

    // Inisialisasi form dengan data user yang ada
    const [form, setForm] = useState<ProfileState>({
        fullName: user?.fullName || "",
        phone: user?.phone || "",
        gender: user?.gender || "Male",
        dob: user?.dob || "",
        address: user?.address || "",
    });
    const [errors, setErrors] = useState<ProfileErrors>({});

    const setField = <K extends keyof ProfileState>(k: K, v: ProfileState[K]) =>
        setForm((s) => ({ ...s, [k]: v }));

    const validate = () => {
        const e: ProfileErrors = {};
        if (!form.fullName.trim()) e.fullName = "Nama wajib diisi";
        if (!form.phone.trim()) e.phone = "Nomor wajib diisi";
        if (!form.dob) e.dob = "Tanggal lahir wajib diisi";
        if (!form.address.trim()) e.address = "Alamat wajib diisi";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const canSubmit = useMemo(
        () => !!(form.fullName && form.phone && form.dob && form.address),
        [form]
    );

    const submit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!validate()) return;

        updateProfile({
            fullName: form.fullName,
            phone: form.phone,
            gender: form.gender,
            dob: form.dob,
            address: form.address,
            avatarUrl: user?.avatarUrl, // <-- Bawa avatarUrl yang lama
        });
        alert("Profil berhasil diperbarui!");
        router.back(); // Kembali ke halaman profil
    };

    return { form, errors, setField, submit, canSubmit, email: user?.email };
}