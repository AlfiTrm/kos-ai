"use client";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import AppHeader from "@/shared/components/AppHeader";
import ChatInput from "../components/ChatInput";
import ChatMessage from "../components/ChatMessage";
import { useChatEngine } from "../hooks/useChatEngine";
import chatbotLogo from "../../../../public/logo/chatbot-logo.png";

const formatIDR = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);

function replyEngine(text: string): string {
  const t = text.trim().toLowerCase();
  if (/^saldo|sisa/.test(t)) {
    const monthly = 1_000_000,
      spent = 275_000;
    return `Sisa uang bulan ini ${formatIDR(
      monthly - spent
    )} (budget: ${formatIDR(monthly)}, terpakai: ${formatIDR(spent)}).`;
  }
  const m = t.match(/^(tambah|catat)\s+([\d\.]+)\s+(.+)/);
  if (m) {
    const amt = Number(m[2].replace(/\./g, ""));
    const cat = m[3].trim();
    if (!amt) return "Nominalnya kok aneh, Nak. Coba `tambah 12000 makan` ya~";
    return `Siap, Ibu catat ${formatIDR(
      amt
    )} buat **${cat}**. Jangan boros ya 😘`;
  }
  return "Ibu kurang paham, coba `saldo` atau `tambah 12000 makan` ya.";
}

export default function ChatRoom() {
  const { chat: chatId } = useParams<{ chat: string }>();
  const router = useRouter();

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

      <ChatInput onSend={onSend} />
    </main>
  );
}
