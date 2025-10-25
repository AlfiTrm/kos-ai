"use client";
import Link from "next/link";
import { MoreHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useChatStore } from "../hooks/useChatStore";
import type { Chat } from "../types/cTypes";

function timeAgo(ts: number) {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60) return "just now";
  const m = Math.floor(diff / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

export default function ChatListItem({ chat }: { chat: Chat }) {
  const rename = useChatStore((s) => s.renameChat);
  const del = useChatStore((s) => s.deleteChat);

  const [open, setOpen] = useState(false);
  const popRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!popRef.current) return;
      if (!popRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) {
      document.addEventListener("mousedown", onClick);
      document.addEventListener("keydown", onKey);
    }
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const last = chat.messages.at(-1);

  return (
    <div className="relative rounded-2xl bg-white border border-neutral-100">
      <Link href={`/chatbot/${chat.id}`} className="block p-4 pr-12">
        <p className="font-medium">{chat.title}</p>
        <p className="text-xs text-neutral-500 truncate">
          {last ? last.text : "No messages yet"}
        </p>
      </Link>

      <div className="absolute right-2 top-2" ref={popRef}>
        <button
          type="button"
          aria-haspopup="menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition"
        >
          <MoreHorizontal className="w-4 h-4 text-neutral-700" />
        </button>

        {open && (
          <div
            role="menu"
            className="absolute right-0 mt-2 w-40 rounded-lg border bg-white shadow-lg z-50 overflow-visible"
          >
            <button
              className="w-full text-left text-sm px-3 py-2 hover:bg-neutral-50"
              onClick={() => {
                const t = prompt("Rename chat", chat.title)?.trim();
                if (t) rename(chat.id, t);
                setOpen(false);
              }}
            >
              Rename
            </button>
            <button
              className="w-full text-left text-sm px-3 py-2 text-rose-600 hover:bg-neutral-50"
              onClick={() => {
                del(chat.id);
                setOpen(false);
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="px-4 pb-3 text-[11px] text-neutral-400">
        {timeAgo(chat.updatedAt)}
      </div>
    </div>
  );
}
