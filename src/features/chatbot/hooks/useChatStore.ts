"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Chat, Message } from "../types/cTypes";

const uid = () => Math.random().toString(36).slice(2);

interface ChatState {
    chats: Record<string, Chat>;
    chatOrder: string[];
    currentId?: string;

    createChat: (initialBotMsg?: string) => string;
    appendMessage: (chatId: string, msg: Message) => void;
    renameChat: (chatId: string, title: string) => void;
    deleteChat: (chatId: string) => void;
    setCurrent: (chatId: string) => void;
    updateMessage: (chatId: string, messageId: string, patch: Partial<Message>) => void;
    getChat: (chatId?: string) => Chat | undefined;
}

export const useChatStore = create<ChatState>()(
    persist(
        (set, get) => ({
            chats: {},
            chatOrder: [],
            currentId: undefined,

            createChat: (initialBotMsg) => {
                const id = uid();
                const now = Date.now();
                const messages: Message[] = initialBotMsg
                    ? [{ id: uid(), role: "ibu", text: initialBotMsg, ts: now }]
                    : [];
                const chat: Chat = {
                    id,
                    title: "New chat",
                    createdAt: now,
                    updatedAt: now,
                    messages,
                    meta: { draft: "" },
                };
                set((s) => ({
                    chats: { ...s.chats, [id]: chat },
                    chatOrder: [id, ...s.chatOrder],
                    currentId: id,
                }));
                return id;
            },

            appendMessage: (chatId, msg) =>
                set((s) => {
                    const c = s.chats[chatId];
                    if (!c) return s;
                    const next: Chat = {
                        ...c,
                        messages: [...c.messages, msg],
                        updatedAt: Date.now(),
                    };
                    const order = [chatId, ...s.chatOrder.filter((x) => x !== chatId)];
                    return { chats: { ...s.chats, [chatId]: next }, chatOrder: order };
                }),

            renameChat: (chatId, title) =>
                set((s) => {
                    const c = s.chats[chatId];
                    if (!c) return s;
                    return { chats: { ...s.chats, [chatId]: { ...c, title } } };
                }),

            deleteChat: (chatId) =>
                set((s) => {
                    const { [chatId]: _, ...rest } = s.chats;
                    const order = s.chatOrder.filter((x) => x !== chatId);
                    const currentId = s.currentId === chatId ? undefined : s.currentId;
                    return { chats: rest, chatOrder: order, currentId };
                }),

            setCurrent: (chatId) => set({ currentId: chatId }),
            getChat: (chatId) => get().chats[chatId ?? get().currentId!],
            updateMessage: (chatId, messageId, patch) =>
                set((s) => {
                    const chat = s.chats[chatId];
                    if (!chat) return s;
                    const messages = chat.messages.map((m) =>
                        m.id === messageId ? { ...m, ...patch } : m
                    );
                    return {
                        chats: {
                            ...s.chats,
                            [chatId]: { ...chat, messages, updatedAt: Date.now() },
                        },
                    };
                }),
        }),

        { name: "kosai-chat" }
    )
);

export const makeUserMsg = (text: string): Message => ({
    id: uid(),
    role: "user",
    text,
    ts: Date.now(),
});
export const makeBotMsg = (text: string, p0: string): Message => ({
    id: uid(),
    role: "ibu",
    text,
    ts: Date.now(),
});

export const autoTitleFrom = (t: string) => {
    const clean = t
        .replace(/\s+/g, " ")
        .replace(/https?:\/\/\S+/g, "")
        .trim();
    if (!clean) return "New chat";
    const words = clean.split(" ").slice(0, 8).join(" ");
    return words.charAt(0).toUpperCase() + words.slice(1);
};
