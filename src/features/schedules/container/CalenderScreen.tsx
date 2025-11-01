"use client";
import React, { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AppHeader from "@/shared/components/AppHeader";
import AddButton from "@/features/stock/components/AddButton";
import DatePicker, { DayInMonth } from "../components/DatePicker";
import DailyTaskRow from "../components/DailyTaskRow";
import { useScheduleStore } from "../hooks/useScheduleStore";

const getToday = () => new Date().toISOString().split("T")[0];

const parseDateString = (dateStr: string) => {
  if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return new Date();
  }
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const generateMonthDays = (displayDate: Date): DayInMonth[] => {
  const days = [];
  const year = displayDate.getFullYear();
  const month = displayDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const dateObj = new Date(year, month, day);
    days.push({
      dateStr: dateObj.toISOString().split("T")[0],
      dayNum: dateObj.getDate().toString(),
      dayName: dateObj.toLocaleDateString("id-ID", { weekday: "short" }),
    });
  }
  return days;
};

export default function CalendarScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [displayDate, setDisplayDate] = useState<Date | null>(null);

  useEffect(() => {
    const dateFromQuery = searchParams.get("date");
    const initialDateStr =
      dateFromQuery && /^\d{4}-\d{2}-\d{2}$/.test(dateFromQuery)
        ? dateFromQuery
        : getToday();

    setSelectedDate(initialDateStr);

    const initialDisplayDate = parseDateString(initialDateStr);
    initialDisplayDate.setDate(1);
    setDisplayDate(initialDisplayDate);
  }, [searchParams]);

  const getDailyTasksByDateFn = useScheduleStore((s) => s.getDailyTasksByDate);
  const tasks = useScheduleStore((s) => s.tasks);
  const taskOrder = useScheduleStore((s) => s.taskOrder);

  const dailyTasks = useMemo(
    () =>
      selectedDate
        ? getDailyTasksByDateFn(selectedDate).sort((a, b) =>
            (a.startTime || "00:00").localeCompare(b.startTime || "00:00")
          )
        : [],
    [getDailyTasksByDateFn, selectedDate, tasks, taskOrder]
  );

  const daysForMonth = useMemo(
    () => (displayDate ? generateMonthDays(displayDate) : []),
    [displayDate]
  );

  const handleSelectDate = (dateStr: string) => {
    setSelectedDate(dateStr);
  };

  const goToPrevMonth = () => {
    if (!displayDate) return;
    const newDate = new Date(displayDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setDisplayDate(newDate);
  };

  const goToNextMonth = () => {
    if (!displayDate) return;
    const newDate = new Date(displayDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setDisplayDate(newDate);
  };

  if (!selectedDate || !displayDate) {
    return null;
  }

  const monthName = displayDate.toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
  });

  return (
    <main className="w-full pb-24">
      <AppHeader title="Schedule" onBack={() => router.push("/schedule")} />

      <div className="flex justify-between items-center mt-3 mb-3 px-2">
        <button
          onClick={goToPrevMonth}
          className="p-2 rounded-full hover:bg-neutral-100"
        >
          &lt;
        </button>
        <h3 className="font-semibold text-base">{monthName}</h3>
        <button
          onClick={goToNextMonth}
          className="p-2 rounded-full hover:bg-neutral-100"
        >
          &gt;
        </button>
      </div>

      <DatePicker
        days={daysForMonth}
        selectedDate={selectedDate}
        onSelectDate={handleSelectDate}
      />

      <div>
        <h2 className="text-lg font-semibold mb-3">
          {selectedDate === getToday() ? "Today's activity" : "Activity"}
        </h2>
        <div className="space-y-3">
          {dailyTasks.length > 0 ? (
            dailyTasks.map((task) => <DailyTaskRow key={task.id} task={task} />)
          ) : (
            <p className="text-sm text-neutral-500 text-center py-6">
              Tidak ada aktivitas untuk tanggal ini.
            </p>
          )}
        </div>
      </div>

      <AddButton href="/schedule/add" />
    </main>
  );
}
