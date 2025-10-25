"use client";

import { useParams, useRouter } from "next/navigation";
import OnboardingScreen from "@/features/onboarding/container/OnBoardingScreen";
import { useOnboardingNav } from "@/features/onboarding/hooks/useOnboardingNav";

export default function OnboardingStepPage() {
  const { step } = useParams<{ step: string }>();
  const router = useRouter();
  const { page, isLast, goNext, skipAll } = useOnboardingNav(step, router);

  const s = Number(step || 1);
  const progressIndex = s >= 2 && s <= 4 ? s - 2 : -1;

  return (
    <OnboardingScreen
      page={page}
      step={s}
      progressIndex={progressIndex}
      onNext={isLast ? () => skipAll() : () => goNext()}
      onSkip={skipAll}
      isLast={isLast}
      total={0}
    />
  );
}
