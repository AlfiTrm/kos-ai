"use client";

import { useEffect, useMemo, useRef } from "react";
import type { OnboardingPage } from "../types/oTypes";
import { ONBOARDING_PAGES } from "../data/oData";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const STORAGE_KEY = "kosai:onboarding_done";

export function useOnboardingNav(stepParam: string | undefined, router: AppRouterInstance) {
  const step = Math.max(1, Math.min(5, Number(stepParam || 1)));
  const page: OnboardingPage = useMemo(() => ONBOARDING_PAGES[step - 1], [step]);
  const isLast = step === ONBOARDING_PAGES.length;

  const goNext = () => router.push(`/onboarding/${step + 1}`);
  const skipAll = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    router.replace("/onboarding/5");
  };

  const timerRef = useRef<number | null>(null);

  
  useEffect(() => {
    if (page?.variant === "splash") {
      timerRef.current = window.setTimeout(() => goNext(), 2200);
    }
    return () => { if (timerRef.current) window.clearTimeout(timerRef.current); };
  }, [page?.variant, step]); 

  return { step, page, isLast, goNext, skipAll };
}
