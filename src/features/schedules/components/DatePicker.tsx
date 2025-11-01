"use client";
import React, { useRef, useLayoutEffect } from "react";

export type DayInMonth = {
  dateStr: string;
  dayNum: string;
  dayName: string;
};

type Props = {
  days: DayInMonth[];
  selectedDate: string;
  onSelectDate: (dateStr: string) => void;
};

export default function DatePicker({
  days,
  selectedDate,
  onSelectDate,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!scrollRef.current) return;
    const el = scrollRef.current.querySelector(
      `[data-date="${selectedDate}"]`
    ) as HTMLButtonElement;

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [selectedDate, days]);

  return (
    <div
      ref={scrollRef}
      className="flex relative z-20 gap-2 overflow-x-auto pb-3 mb-4 -mx-4 px-4"
    >
      {days.map((day) => {
        const isActive = day.dateStr === selectedDate;
        return (
          <button
            key={day.dateStr}
            data-date={day.dateStr}
            onClick={() => onSelectDate(day.dateStr)}
            className={`flex flex-col items-center justify-center p-2 rounded-2xl w-12 h-16 transition-all flex-shrink-0 ${
              isActive
                ? "bg-gradient-to-r from-purple-1 to-orange-1 text-white shadow-lg"
                : "bg-white text-neutral-800"
            }`}
          >
            <span className="text-lg font-bold">{day.dayNum}</span>
            <span className="text-xs font-medium">{day.dayName}</span>
          </button>
        );
      })}
    </div>
  );
}
