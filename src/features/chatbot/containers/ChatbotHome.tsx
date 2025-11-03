"use client";
import { useRouter } from "next/navigation";
import ChatListItem from "../components/ChatListItem";
import { useChatStore } from "../hooks/useChatStore";
import { useAuthStore } from "@/libs/authStore";
import "@/styles/globals.css";
import { Sparkles } from "lucide-react";
import { OutlineButton } from "@/shared/components/Button";

export default function ChatbotHome() {
  const router = useRouter();
  const chatOrder = useChatStore((s) => s.chatOrder);
  const chats = useChatStore((s) => s.chats);
  const createChat = useChatStore((s) => s.createChat);
  const user = useAuthStore((s) => s.user);

  const start = () => {
    const id = createChat("Hello, I'm KosAI. What can I do for you?");
    router.push(`/chatbot/${id}`);
  };

  return (
    <>
      <main className="pb-24 relative z-10 min-h-screen">
        <section className="px-4 pt-4 pb-3 ">
          <div className="text-3xl font-black leading-8">
            <h1>
              Hi
              <span className="gradient-text">
                {user?.fullName ? `, ${user.fullName.split(" ")[0]}!` : "!"}
              </span>
            </h1>
            Your Smarter Journey <br /> Begins Now!
          </div>

          <div className="mt-10 w-full p-4 rounded-xl bg-white border-neutral-100 border flex flex-col gap-2 justify-center ">
            <div className="p-2 bg-slate-50 w-fit rounded-full shadow">
              <Sparkles
                strokeWidth={1}
                className="gradient-text text-purple-1"
              />
            </div>
            <h2 className="font-bold text-base">Kos AI Chatbot</h2>
            <p className="text-sm">Bring Your Imagination to Life with AI.</p>
            <OutlineButton onClick={start} className="mt-1">
              Start Now
            </OutlineButton>
          </div>
        </section>

        <section className="px-4 mt-4 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <p className="font-medium">Suggest for you</p>
            <span className="text-neutral-500">See All</span>
          </div>

          {chatOrder.length === 0 ? (
            <p className="text-sm text-neutral-500">
              No chats yet. Start your first chat!
            </p>
          ) : (
            chatOrder.map((id) => <ChatListItem key={id} chat={chats[id]} />)
          )}
        </section>
      </main>
    </>
  );
}
