"use client";

import React from "react";
import { useRouter } from "next/navigation";
import AppHeader from "@/shared/components/AppHeader";
import { FAQ_DATA } from "../data/prData";
import { AccordionItem } from "../components/AccordionItem";

export default function FaqsScreen() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-neutral-50 pb-10">
      <AppHeader
        title="FAQs"
        centerVariant="pill"
        onBack={() => router.back()}
      />

      <div className="px-4 py-3">
        <h1 className="text-xl font-bold text-gray-900 mb-4">
          Frequently asked questions
        </h1>

        <div className="space-y-3 relative z-20">
          {FAQ_DATA.map((item) => (
            <AccordionItem
              key={item.question}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
