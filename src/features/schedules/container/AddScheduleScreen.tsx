"use client";
import AppHeader from "@/shared/components/AppHeader";
import { useRouter } from "next/navigation";
import { useScheduleForm } from "../hooks/useScheduleForm";
import ScheduleForm from "../components/ScheduleForm";

export default function AddScheduleScreen() {
  const router = useRouter();
  
  const { form, errors, setField, submit } = useScheduleForm();

  return (
    <main className="min-h-screen bg-neutral-50 pb-10">
      <AppHeader
        title="Add New Task"
        centerVariant="pill"
        onBack={() => router.back()}
      />
      
      <ScheduleForm
        form={form}
        errors={errors}
        onFieldChange={setField}
        onSubmit={submit}
      />
    </main>
  );
}