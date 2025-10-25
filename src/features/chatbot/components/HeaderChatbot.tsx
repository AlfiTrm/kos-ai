"use client";
import { useRouter } from "next/navigation";

type Props = { title?: string; onNewChat?: () => void; };
export default function HeaderChatbot({ title = "New Chat", onNewChat }: Props) {
  const router = useRouter();
  return (
    <header className="h-14 flex items-center gap-2 px-4">
      <button onClick={() => router.push("/chatbot")} className="text-sm">←</button>
      <h2 className="font-semibold flex-1">{title}</h2>
      {onNewChat && (
        <button onClick={onNewChat} className="text-xs px-3 py-1 rounded-full border">
          New
        </button>
      )}
    </header>
  );
}
