export type TaskPriority = "High" | "Medium" | "Low";
export type TaskStatus = "On Progress" | "Todo" | "Done";

export interface Subtask {
    id: string;
    title: string;
    isDone: boolean;
}

export interface ScheduleTask {
    id: string;
    title: string;
    createdAt: number;

    date: string;
    startTime?: string;
    endTime?: string;
    priority: TaskPriority;
    status: TaskStatus;
    description?: string;
    subtasks: Subtask[];
}