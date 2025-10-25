"use client";
import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";

type Props = {
  onSend: (text: string) => void;
  placeholder?: string;
  maxHeight?: number;
};

export default function ChatInput({
  onSend,
  placeholder = "Got questions...",
  maxHeight = 160,
}: Props) {
  const [text, setText] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null);

  const resize = () => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    const h = Math.min(el.scrollHeight, maxHeight);
    el.style.height = h + "px";
    el.style.overflowY = el.scrollHeight > maxHeight ? "auto" : "hidden";
  };

  useEffect(resize, [text, maxHeight]);

  const send = () => {
    const t = text.trim();
    if (!t) return;
    onSend(t);
    setText("");
    const el = ref.current;
    if (el) {
      el.style.height = "auto";
      el.style.overflowY = "hidden";
    }
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="fixed left-0 right-0 bottom-20 mx-auto max-w-[480px] w-full p-4 bg-white/10 backdrop-blur-sm">
      <div className="flex items-end gap-2">
        <textarea
          ref={ref}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          rows={1}
          className="flex-1 resize-none rounded-2xl bg-neutral-700 px-4 py-3 text-sm text-white
                     outline-none placeholder:text-neutral-300 min-h-[44px] max-h-[40vh]"
          style={{ overflowY: "hidden" }}
        />
        <button
          onClick={send}
          disabled={!text.trim()}
          className="shrink-0 rounded-full p-3 bg-gradient-to-r from-purple-1 to-orange-1 text-white
                     active:opacity-90 disabled:opacity-40"
          aria-label="Send"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
      <div className="pb-[env(safe-area-inset-bottom)]" />
    </div>
  );
}
