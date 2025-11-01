"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import { useScheduleStore } from "../hooks/useScheduleStore";
import { Calendar, CheckSquare } from "lucide-react";
import TodayTaskCard from "../components/TodayTaskCard";
import AddButton from "@/features/stock/components/AddButton";

const SummaryCard = ({
  title,
  count,
  icon: Icon,
  colorClass,
}: {
  title: string;
  count: number;
  icon: React.ComponentType<{ size: number }>;
  colorClass: string;
}) => (
  <div
    className={`p-4 rounded-2xl flex-1 ${colorClass} bg-opacity-80 backdrop-blur-sm`}
  >
    <Icon size={24} />
    <p className="text-xl font-bold">{count}</p>
    <p className="text-sm font-medium">{title}</p>
  </div>
);

export default function ScheduleScreen() {
  const getAllTasksFn = useScheduleStore((s) => s.getAllTasks);
  const getSummaryCountsFn = useScheduleStore((s) => s.getSummaryCounts);
  const tasks = useScheduleStore((s) => s.tasks);
  const taskOrder = useScheduleStore((s) => s.taskOrder);

  const { todayCount, totalCount } = useMemo(
    () => getSummaryCountsFn(),
    [getSummaryCountsFn, tasks, taskOrder]
  );

  const allTasks = useMemo(
    () => getAllTasksFn(),
    [getAllTasksFn, tasks, taskOrder]
  );

  return (
    <main className="w-full pb-24">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Overview</h1>
        <Link
          href="/schedule/calendar"
          className="p-2 rounded-full bg-white shadow-sm border border-neutral-100"
        >
          <Calendar size={18} className="text-neutral-600" />
        </Link>
      </div>

      <div className="flex gap-3 mb-6">
        <SummaryCard
          title="Today's Tasks"
          count={todayCount}
          icon={Calendar}
          colorClass="bg-red-300 text-red-900"
        />
        <SummaryCard
          title="Total Tasks"
          count={totalCount}
          icon={CheckSquare}
          colorClass="bg-orange-300 text-orange-900"
        />
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">All Tasks</h2>
          <Link href="/schedule/calendar" className="text-sm text-neutral-500">
            See Calendar
          </Link>
        </div>

        <div className="space-y-3">
          {allTasks.length > 0 ? (
            allTasks
              .slice(0, 5)
              .map((task) => <TodayTaskCard key={task.id} task={task} />)
          ) : (
            <p className="text-sm text-neutral-500 text-center py-4">
              Belum ada task. Yuk, buat satu!
            </p>
          )}
        </div>
      </div>

      <AddButton href="/schedule/add" />
    </main>
  );
}
