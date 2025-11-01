"use client";
import type { ScheduleTask, Subtask } from "../types/scTypes";
import { CheckCircle2, Circle } from "lucide-react";

function formatTime(time: string) {
  const [hour, minute] = time.split(":");
  return `${hour}.${minute}`;
}

const SubtaskItem = ({ subtask }: { subtask: Subtask }) => (
  <div className="flex items-center gap-2">
    {subtask.isDone ? (
      <CheckCircle2 size={16} className="text-pink-400" />
    ) : (
      <Circle size={16} className="text-neutral-400" />
    )}
    <span
      className={`text-sm ${
        subtask.isDone ? "text-neutral-400 line-through" : "text-neutral-700"
      }`}
    >
      {subtask.title}
    </span>
  </div>
);

export default function DailyTaskRow({ task }: { task: ScheduleTask }) {
  
  if (!task.startTime) {
    return null;
  }

  const hasSubtasks = task.subtasks && task.subtasks.length > 0;

  return (
    <div className="flex gap-3">
      <div className="w-12 text-sm font-semibold text-neutral-700 pt-1">
        {formatTime(task.startTime)}
      </div>

      <div
        className={`flex-1 p-4 rounded-2xl ${
          hasSubtasks
            ? "bg-white" 
            : "bg-pink-100 bg-opacity-50"
        }`}
      >
        <p className="font-semibold text-neutral-900">{task.title}</p>
        {task.description && (
          <p className="text-xs text-neutral-500">{task.description}</p>
        )}

        {hasSubtasks && (
          <div className="mt-3 space-y-2">
            {task.subtasks.map((sub) => (
              <SubtaskItem key={sub.id} subtask={sub} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}