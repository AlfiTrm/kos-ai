"use client";

export default function TypingDots() {
  return (
    <div className="flex items-center gap-1 py-[2px]">
      <span className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce" />
      <span className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce [animation-delay:120ms]" />
      <span className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce [animation-delay:240ms]" />
    </div>
  );
}
