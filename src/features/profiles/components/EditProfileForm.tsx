// src/features/profile/components/EditProfileForm.tsx
"use client";
import { GradientButton } from "@/shared/components/Button";
import { useEditProfileForm } from "../hooks/useEditProfile"; // <-- Gunakan hook baru
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// REUSE komponen dari auth
import GenderSelect from "@/features/auth/components/profile/GenderSelect";
import DateField from "@/features/auth/components/profile/DateField";

export default function EditProfileForm() {
  const { form, errors, setField, submit, canSubmit, email } =
    useEditProfileForm(); // <-- Gunakan hook baru

  return (
    <form onSubmit={submit} className="space-y-4">
      {/* Tambahkan Email (Read Only) - Sesuai Desain */}{" "}
      <div className="space-y-2 bg-white p-4 rounded-2xl">
        <label className="text-xs font-medium">Email</label>{" "}
        <input
          type="email"
          value={email}
          readOnly
          className="w-full rounded-xl px-3 py-3 text-sm bg-neutral-200 text-gray-500 outline-none cursor-not-allowed"
        />{" "}
      </div>{" "}
      <div className="space-y-2 bg-white p-4 rounded-2xl">
        <label className="text-xs font-medium">Full name</label>{" "}
        <input
          type="text"
          placeholder="Enter your full name"
          value={form.fullName}
          onChange={(e) => setField("fullName", e.target.value)}
          className="w-full rounded-xl px-3 py-3 text-sm bg-neutral-100 outline-none"
        />{" "}
        {errors.fullName && (
          <p className="text-xs text-red-500">{errors.fullName}</p>
        )}{" "}
      </div>{" "}
      <div className="space-y-2 bg-white p-4 rounded-2xl">
        <label className="text-xs font-medium">Phone number</label>{" "}
        <PhoneInput
          country="id" // Default ke Indonesia
          enableSearch
          placeholder="Enter phone number"
          value={form.phone}
          onChange={(val) => setField("phone", `+${val}`)}
          inputStyle={{
            width: "100%",
            height: "46px",
            borderRadius: "12px",
            backgroundColor: "#f3f4f6",
            border: "none",
            fontSize: "14px",
          }}
          buttonStyle={{ border: "none", background: "transparent" }}
        />{" "}
        {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}{" "}
      </div>{" "}
      <GenderSelect
        value={form.gender}
        onChange={(v) => setField("gender", v)}
      />
      <DateField value={form.dob} onChange={(v) => setField("dob", v)} />{" "}
      {errors.dob && (
        <p className="text-xs text-red-500 -mt-3 pl-1">{errors.dob}</p>
      )}{" "}
      <div className="space-y-2 bg-white p-4 rounded-2xl">
        <label className="text-xs font-medium">Address</label>{" "}
        <textarea
          placeholder="Enter your address"
          value={form.address}
          onChange={(e) => setField("address", e.target.value)}
          className="w-full rounded-xl px-3 py-3 text-sm bg-neutral-100 outline-none min-h-[80px]"
        />{" "}
        {errors.address && (
          <p className="text-xs text-red-500">{errors.address}</p>
        )}{" "}
      </div>{" "}
      <GradientButton type="submit" disabled={!canSubmit}>
        Simpan Perubahan{" "}
      </GradientButton>{" "}
    </form>
  );
}
