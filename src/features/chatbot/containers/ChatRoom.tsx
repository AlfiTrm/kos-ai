"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import AppHeader from "@/shared/components/AppHeader";
import ChatInput from "../components/ChatInput";
import ChatMessage from "../components/ChatMessage";
import { useChatEngine } from "../hooks/useChatEngine";
import chatbotLogo from "../../../../public/logo/chatbot-logo.png";
import { useKosAiEngine } from "../hooks/useKosAiEngine";
import QuickChips from "../components/QuickChips";
import { suggestion } from "../data/dummySuggestion";

export default function ChatRoom() {
  const { chat: chatId } = useParams<{ chat: string }>();
  const router = useRouter();

  const { replyEngine } = useKosAiEngine();

  const { chat, onSend, scrollRef, isEmptyIntro } = useChatEngine(chatId, {
    thinkingDelay: 1000,
    charPerTick: 2,
    tickMs: 16,
    emptyIntroCount: 1,
    replyEngine,
  });

  if (!chat) return null;

  return (
    <main className="flex w-full flex-col h-[70vh]">
      <AppHeader
        title={chat.title || "New Chat"}
        onBack={() => router.back()}
        menuItems={[
          { label: "Rename", onClick: () => {} },
          { label: "Delete", destructive: true, onClick: () => {} },
        ]}
      />
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 pb-2 space-y-2 relative"
      >
        {isEmptyIntro ? (
          <div className="w-full mt-6 flex flex-col items-center justify-center gap-4 text-center">
            <Image
              src={chatbotLogo}
              width={160}
              height={160}
              alt="Chatbot Logo"
              className="w-32 h-32 object-contain mb-2 animate-pulse"
              priority
            />
            <p className="font-bold text-[18px] leading-relaxed">
              Hello, I&apos;m Kosai
              <br />
              What can I do for you?
            </p>
          </div>
        ) : (
          chat.messages.map((m) => <ChatMessage key={m.id} m={m} />)
        )}
      </div>
      {isEmptyIntro && (
        <div className="fixed left-0 right-0 bottom-40 mx-auto max-w-[480px] w-full z-10">
          <QuickChips items={suggestion} onPick={onSend} />
        </div>
      )}
      <ChatInput onSend={onSend} />
    </main>
  );
}
