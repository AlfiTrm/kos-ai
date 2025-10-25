"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/libs/authStore";

export default function Home() {
  const router = useRouter();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/chatbot");
    } else {
      router.replace("/onboarding/1");
    }
  }, [isLoggedIn, router]);

  return null;
}
