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
  deleteTask: (taskId: string) => void;
  findTask: (name: string, dateMatcher?: string) => ScheduleTask | undefined;
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

      deleteTask: (taskId) => {
        set((s) => {
          const { [taskId]: _, ...rest } = s.tasks;
          const newOrder = s.taskOrder.filter((id) => id !== taskId);
          return {
            tasks: rest,
            taskOrder: newOrder,
          };
        });
      },

      findTask: (name, dateMatcher) => {
        const tasks = get().getAllTasks();
        const lowerName = name.toLowerCase();
        
        const candidates = tasks.filter((task) =>
          task.title.toLowerCase().includes(lowerName)
        );

        if (!dateMatcher) {
          return candidates[0];
        }

        const specificTask = candidates.find((t) =>
          t.date.endsWith(dateMatcher)
        );
        
        return specificTask || candidates[0]; 
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