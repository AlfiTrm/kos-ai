"use client";
import type { Message } from "../types/cTypes";
import TypingDots from "./TypingDots";

export default function ChatMessage({ m }: { m: Message }) {
  const isUser = m.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} px-3`}>
      <div
        className={
          isUser
            ? "max-w-[80%] rounded-2xl rounded-br-sm bg-neutral-900 text-white px-3 py-2 text-sm"
            : "max-w-[80%] rounded-2xl rounded-bl-sm bg-neutral-100  px-3 py-2 text-sm text-black"
        }
      >
        {m.status === "typing" && m.text.length === 0 ? (
          <TypingDots />
        ) : (
          <span>{m.text}</span>
        )}
      </div>
    </div>
  );
}
