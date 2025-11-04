import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";

export interface NotificationItem {
    id: string;
    message: string;
    href?: string;
    read: boolean;
    createdAt: number;
}

interface NotificationState {
    notifications: Record<string, NotificationItem>;
    order: string[];

    addNotification: (data: { message: string; href?: string }) => void;
    markAsRead: (id: string) => void;
    markAllAsRead: () => void;
    getUnreadCount: () => number;
    getAllSorted: () => NotificationItem[];
}

export const useNotificationStore = create<NotificationState>()(
    persist(
        (set, get) => ({
            notifications: {},
            order: [],

            addNotification: ({ message, href }) => {
                const id = nanoid();
                const now = Date.now();
                const item: NotificationItem = {
                    id,
                    message,
                    href,
                    read: false,
                    createdAt: now,
                };
                set((s) => ({
                    notifications: { ...s.notifications, [id]: item },
                    order: [id, ...s.order],
                }));
            },

            markAsRead: (id) =>
                set((s) => {
                    const item = s.notifications[id];
                    if (!item || item.read) return s;
                    return {
                        notifications: {
                            ...s.notifications,
                            [id]: { ...item, read: true },
                        },
                    };
                }),

            markAllAsRead: () =>
                set((s) => {
                    const nextState = { ...s.notifications };
                    s.order.forEach((id) => {
                        if (!nextState[id].read) {
                            nextState[id] = { ...nextState[id], read: true };
                        }
                    });
                    return { notifications: nextState };
                }),

            getUnreadCount: () => {
                return get().order.filter((id) => !get().notifications[id]?.read).length;
            },

            getAllSorted: () => {
                return get().order.map(id => get().notifications[id]).filter(Boolean);
            }
        }),
        { name: "kosai-notifications" }
    )
);