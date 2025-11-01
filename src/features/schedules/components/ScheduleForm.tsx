"use client";
import React from "react";
import { GradientButton } from "@/shared/components/Button";
import type { TaskFormData } from "../hooks/useScheduleStore";
import type { TaskPriority } from "../types/scTypes";

type ScheduleFormProps = {
  form: TaskFormData;
  errors: { title?: string };
  onFieldChange: <K extends keyof TaskFormData>(
    field: K,
    value: TaskFormData[K]
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export default function ScheduleForm({
  form,
  errors,
  onFieldChange,
  onSubmit,
}: ScheduleFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4 px-4 py-3">
      <div className="bg-white/70 backdrop-blur rounded-2xl p-3 shadow-sm border border-white/30 space-y-1">
        <label className="text-xs text-neutral-500 px-1">Judul Task</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => onFieldChange("title", e.target.value)}
          placeholder="Mis: Meeting dengan klien"
          className="w-full p-3 bg-neutral-100 rounded-xl text-sm outline-none"
        />
        {errors.title && (
          <p className="text-xs text-red-500 mt-1 px-1">{errors.title}</p>
        )}
      </div>

      <>
        <div className="bg-white/70 backdrop-blur rounded-2xl p-3 shadow-sm border border-white/30 space-y-1">
          <label className="text-xs text-neutral-500 px-1">Tanggal</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => onFieldChange("date", e.target.value)}
            className="w-full p-3 bg-neutral-100 rounded-xl text-sm outline-none"
          />
        </div>

        <div className="flex gap-3">
          <div className="flex-1 bg-white/70 backdrop-blur rounded-2xl p-3 shadow-sm border border-white/30 space-y-1">
            <label className="text-xs text-neutral-500 px-1">Mulai</label>
            <input
              type="time"
              value={form.startTime}
              onChange={(e) => onFieldChange("startTime", e.target.value)}
              className="w-full p-3 bg-neutral-100 rounded-xl text-sm outline-none"
            />
          </div>
          <div className="flex-1 bg-white/70 backdrop-blur rounded-2xl p-3 shadow-sm border border-white/30 space-y-1">
            <label className="text-xs text-neutral-500 px-1">Selesai</label>
            <input
              type="time"
              value={form.endTime}
              onChange={(e) => onFieldChange("endTime", e.target.value)}
              className="w-full p-3 bg-neutral-100 rounded-xl text-sm outline-none"
            />
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur rounded-2xl p-3 shadow-sm border border-white/30 space-y-1">
          <label className="text-xs text-neutral-500 px-1">Prioritas</label>
          <select
            value={form.priority}
            onChange={(e) =>
              onFieldChange("priority", e.target.value as TaskPriority)
            }
            className="w-full p-3 bg-neutral-100 rounded-xl text-sm outline-none"
          >
            <option value="High">Tinggi (High)</option>
            <option value="Medium">Sedang (Medium)</option>
            <option value="Low">Rendah (Low)</option>
          </select>
        </div>
      </>

      <div className="bg-white/70 backdrop-blur rounded-2xl p-3 shadow-sm border border-white/30 space-y-1">
        <label className="text-xs text-neutral-500 px-1">
          Deskripsi (Opsional)
        </label>
        <textarea
          value={form.description}
          onChange={(e) => onFieldChange("description", e.target.value)}
          placeholder="Detail tugas..."
          className="w-full p-3 bg-neutral-100 rounded-xl text-sm outline-none min-h-[80px]"
        />
      </div>

      <div className="pt-4">
        <GradientButton type="submit">Simpan Task</GradientButton>
      </div>
    </form>
  );
}
