"use client";
import { useState, useMemo } from "react";
import type { ProfileErrors, ProfileState } from "../types/aType";
import { useAuthStore } from "@/libs/authStore";
import { useRouter } from "next/navigation";

export function useProfileForm() {
  const router = useRouter();
  const completeProfile = useAuthStore((s) => s.completeProfile);
  const tempEmail = useAuthStore((s) => s.tempEmail);

  const [form, setForm] = useState<ProfileState>({
    fullName: "",
    phone: "",
    gender: "Male",
    dob: "",
    address: "",
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

  const canContinue = useMemo(
    () => !!(form.fullName && form.phone && form.dob && form.address),
    [form]
  );

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!validate()) return;
    completeProfile({
      fullName: form.fullName,
      phone: form.phone,
      gender: form.gender,
      dob: form.dob,
      address: form.address,
    });
    router.replace("/chatbot");
  };

  return { form, errors, setField, submit, canContinue, tempEmail };
}
