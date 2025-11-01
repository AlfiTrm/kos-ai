"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ScheduleTask, TaskPriority } from "../types/scTypes";
import { nanoid } from "nanoid";

const getToday = () => new Date().toISOString().split("T")[0];

export type TaskFormData = {
  title: string;
  date: string;
  startTime?: string;
  endTime?: string;
  priority: TaskPriority;
  description?: string;
};

interface ScheduleState {
  tasks: Record<string, ScheduleTask>;
  taskOrder: string[];
  addTask: (data: TaskFormData) => void;
  getDailyTasksByDate: (date: string) => ScheduleTask[];
  getAllTasks: () => ScheduleTask[]; 
  getSummaryCounts: () => { todayCount: number; totalCount: number }; 
}

export const useScheduleStore = create<ScheduleState>()(
  persist(
    (set, get) => ({
      tasks: {}, 
      taskOrder: [], 

      addTask: (data) => {
        const id = nanoid();
        const now = Date.now();
        
        const newTask: ScheduleTask = {
          ...data,
          id,
          createdAt: now,
          subtasks: [],
          status: "Todo",
          date: data.date || getToday(),
          priority: data.priority || "Medium",
        };

        set((s) => ({
          tasks: { ...s.tasks, [id]: newTask },
          taskOrder: [id, ...s.taskOrder],
        }));
      },

      getDailyTasksByDate: (date: string) => {
        return get()
          .taskOrder.map((id) => get().tasks[id])
          .filter((t) => t.date === date);
      },

      getAllTasks: () => {
        return get().taskOrder.map((id) => get().tasks[id]);
      },


      getSummaryCounts: () => {
        const todayTasks = get().getDailyTasksByDate(getToday());
        const totalCount = get().taskOrder.length;
        return {
          todayCount: todayTasks.length,
          totalCount: totalCount,
        };
      },
    }),
    { name: "kosai-schedule" }
  )
);