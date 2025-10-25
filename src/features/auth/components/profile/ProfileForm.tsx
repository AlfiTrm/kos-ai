"use client";
import { GradientButton } from "@/shared/components/Button";
import { useProfileForm } from "@/features/auth/hooks/useProfileForm";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import GenderSelect from "./GenderSelect";
import DateField from "./DateField";

export default function ProfileForm() {
  const { form, errors, setField, submit, canContinue, tempEmail } =
    useProfileForm();

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="space-y-2 bg-white p-4 rounded-2xl">
        <label className="text-xs font-medium">Full name</label>
        <input
          type="text"
          placeholder="Enter your full name"
          value={form.fullName}
          onChange={(e) => setField("fullName", e.target.value)}
          className="w-full rounded-xl px-3 py-3 text-sm bg-neutral-100 outline-none"
        />
        {errors.fullName && (
          <p className="text-xs text-red-500">{errors.fullName}</p>
        )}
      </div>

      <div className="space-y-2 bg-white p-4 rounded-2xl">
        <label className="text-xs font-medium">Phone number</label>
        <PhoneInput
          country="us"
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
        />

        {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
      </div>

      <GenderSelect
        value={form.gender}
        onChange={(v) => setField("gender", v)}
      />

      <DateField value={form.dob} onChange={(v) => setField("dob", v)} />
      {errors.dob && <p className="text-xs text-red-500">{errors.dob}</p>}
      <div className="space-y-2 bg-white p-4 rounded-2xl">
        <label className="text-xs font-medium">Address</label>
        <textarea
          placeholder="Enter your address"
          value={form.address}
          onChange={(e) => setField("address", e.target.value)}
          className="w-full rounded-xl px-3 py-3 text-sm bg-neutral-100 outline-none min-h-[80px]"
        />
        {errors.address && (
          <p className="text-xs text-red-500">{errors.address}</p>
        )}
      </div>

      <GradientButton type="submit" disabled={!canContinue}>
        Continue
      </GradientButton>

      {tempEmail && (
        <p className="text-[11px] text-neutral-400 text-center">
          Will register with {tempEmail}
        </p>
      )}
    </form>
  );
}
