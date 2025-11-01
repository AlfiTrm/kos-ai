"use client";
import type { ScheduleTask } from "../types/scTypes";
import { Clock } from "lucide-react";

function formatTime(time: string) {
  const [hour, minute] = time.split(":");
  const h = parseInt(hour, 10);
  const period = h >= 12 ? "Pm" : "Am";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}.${minute} ${period}`;
}

export default function TodayTaskCard({ task }: { task: ScheduleTask }) {
  const timeRange =
    task.startTime && task.endTime
      ? `${formatTime(task.startTime)} - ${formatTime(task.endTime)}`
      : task.startTime
      ? formatTime(task.startTime)
      : "All day";

  const priorityClass =
    task.priority === "High"
      ? "bg-rose-100 text-rose-600"
      : "bg-amber-100 text-amber-700";

  const statusClass =
    task.status === "On Progress" ? "text-blue-600" : "text-neutral-500";

  return (
    <div className="p-4 rounded-2xl bg-white shadow-sm border border-neutral-100">
      <p className="font-semibold text-sm">{task.title}</p>
      <p className="text-xs text-neutral-400 mb-3">{task.description}</p>

      <div className="flex items-center gap-2 text-xs text-neutral-500 mb-3">
        <Clock size={14} />
        <span>{timeRange}</span>
      </div>

      <div className="flex justify-between items-center text-xs">
        <span className={`px-3 py-1 rounded-full font-medium ${priorityClass}`}>
          {task.priority}
        </span>
        <span className={`font-medium ${statusClass}`}>{task.status}</span>
      </div>
    </div>
  );
}
