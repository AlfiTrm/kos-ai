"use client";
import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
    useChatStore,
    autoTitleFrom,
    makeUserMsg,
    makeBotMsg,
} from "../hooks/useChatStore";

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

export type ChatEngineOptions = {
    thinkingDelay?: number;
    charPerTick?: number;
    tickMs?: number;
    emptyIntroCount?: number;
    replyEngine: (text: string) => string;
};

export function useChatEngine(chatId?: string, opts?: Partial<ChatEngineOptions>) {
    const {
        thinkingDelay = 400,
        charPerTick = 2,
        tickMs = 18,
        emptyIntroCount = 0,
        replyEngine,
    } = { ...opts } as ChatEngineOptions;

    const router = useRouter();
    const chat = useChatStore(s => (chatId ? s.chats[chatId] : undefined));
    const setCurrent = useChatStore(s => s.setCurrent);
    const append = useChatStore(s => s.appendMessage);
    const update = useChatStore(s => s.updateMessage);
    const rename = useChatStore(s => s.renameChat);

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chat) { router.replace("/chatbot"); return; }
        setCurrent(chat.id);
    }, [chat, router, setCurrent]);

    useEffect(() => {
        const el = scrollRef.current;
        if (el) el.scrollTop = el.scrollHeight;
    }, [chat?.messages.length]);

    const cancelRef = useRef(false);
    useEffect(() => {
        cancelRef.current = false;
        return () => { cancelRef.current = true; };
    }, [chatId]);

    const onSend = useCallback(async (text: string) => {
        if (!chat) return;

        const isFirstUser = chat.messages.every(m => m.role !== "user");
        if (isFirstUser) rename(chat.id, autoTitleFrom(text));

        append(chat.id, makeUserMsg(text));

        const placeholder = makeBotMsg("", "typing");
        append(chat.id, placeholder);

        await sleep(thinkingDelay);
        if (cancelRef.current) return;

        const final = replyEngine(text);

        let i = 0;
        while (i < final.length && !cancelRef.current) {
            i = Math.min(i + charPerTick, final.length);
            update(chat.id, placeholder.id, { text: final.slice(0, i) });
            requestAnimationFrame(() => {
                const el = scrollRef.current;
                if (el) el.scrollTop = el.scrollHeight;
            });
            await sleep(tickMs);
        }
        if (!cancelRef.current) {
            update(chat.id, placeholder.id, { status: "done" });
        }
    }, [append, chat, rename, replyEngine, thinkingDelay, charPerTick, tickMs, update]);

    const isEmptyIntro = (chat?.messages.length ?? 0) <= emptyIntroCount;

    return {
        chat,
        onSend,
        scrollRef,
        isEmptyIntro,
    };
}
