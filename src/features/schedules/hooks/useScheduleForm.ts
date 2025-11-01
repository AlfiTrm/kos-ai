"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useScheduleStore, TaskFormData } from "./useScheduleStore";

const getToday = () => new Date().toISOString().split("T")[0];

export function useScheduleForm() {
  const router = useRouter();
  const addTask = useScheduleStore((s) => s.addTask);

  const [form, setForm] = useState<TaskFormData>({
    title: "",
    date: getToday(),
    startTime: "",
    endTime: "",
    priority: "Medium",
    description: "",
  });

  const [errors, setErrors] = useState<{ title?: string }>({});

  const setField = <K extends keyof TaskFormData>(
    field: K,
    value: TaskFormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors.title) {
      setErrors({});
    }
  };

  const validate = () => {
    if (!form.title.trim()) {
      setErrors({ title: "Judul tidak boleh kosong" });
      return false;
    }
    return true;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    console.log("Menyimpan task:", form);
    addTask(form);

    router.push(`/schedule/calendar?date=${form.date}`);
  };

  return { form, errors, setField, submit };
}