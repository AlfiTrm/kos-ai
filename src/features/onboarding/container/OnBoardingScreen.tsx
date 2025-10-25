"use client";

import type { OnboardingPage } from "../types/oTypes";
import ProgressBar from "../components/ProgressBar";
import CtaBar from "../components/CtaBar";
import Image from "next/image";
import "@/styles/globals.css";
import SocialButton from "@/shared/components/SocialButton";
import Divider from "@/shared/components/Divider";
import { GradientButton } from "@/shared/components/Button";
import { useRouter } from "next/navigation";

export default function OnboardingScreen({
  page,
  step,
  total,
  progressIndex,
  onNext,
  onSkip,
  isLast,
}: {
  page: OnboardingPage;
  step: number;
  total: number;
  progressIndex: number;
  onNext: () => void;
  onSkip: () => void;
  isLast: boolean;
}) {
  const router = useRouter();
  const primaryText =
    page.variant === "splash"
      ? ""
      : page.cta ?? (isLast ? "Get Started" : "Next");

  if (page.variant === "splash") {
    return (
      <div className="relative min-h-screen overflow-y-hidden">
        <main className="relative h-screen flex items-center gap-5 justify-center">
          <Image
            src={page.image ?? "logo/logo.png"}
            width={70}
            height={70}
            alt="KosAI"
            className={page.imageClass ?? "w-10 h-10 "}
          />
          <div className="gradient-text animate-right">
            <h1 className="font-black text-4xl">KosAI</h1>
          </div>
          <div className="absolute flex items-center -space-x-5 opacity-25">
            <div className="rounded-full p-50 bg-orange-1 blur-3xl"></div>
            <div className="rounded-full p-50 bg-purple-1 blur-3xl"></div>
          </div>
        </main>
      </div>
    );
  }

  if (page.variant === "auth") {
    return (
      <main className="min-h-screen px-5 pt-44 pb-10 flex flex-col justify-center">
        <div className="flex justify-center mb-6 animate-top">
          <Image
            src={page.image ?? "/logo/logo.png"}
            width={28}
            height={28}
            alt="KosAI"
          />
          <span className="ml-2 font-bold text-lg gradient-text">KosAI</span>
        </div>

        <h1 className="text-[28px] leading-8 font-black text-center mb-2 animate-left">
          Welcome to KosAI
        </h1>
        <p className="text-sm text-neutral-600 text-center mb-6 animate-right">
          Get a daily overview of your spending and savings, personalized just
          for you inside the app
        </p>

        <div className="space-y-3 animate-bottom">
          <SocialButton
            icon="/onboard/apple.png"
            label="Sign Up with Apple"
            onClick={() => router.push("/auth/register")}
          />
          <SocialButton
            icon="/onboard/google.png"
            label="Continue with Google"
            onClick={() => router.push("/auth/register")}
          />
          <SocialButton
            icon="/onboard/facebook.png"
            label="Continue with Facebook"
            onClick={() => router.push("/auth/register")}
          />
        </div>

        <div className="my-4 animate-fade-in">
          <Divider text="or sign up with" />
        </div>

        <GradientButton onClick={() => router.push("/login")}>
          Sign In with my account
        </GradientButton>

        <p className="mt-auto mb-10 text-xs text-neutral-400 text-center px-3">
          By signing up you acknowledge and agree to KosAI{" "}
          <a
            className="gradient-text"
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            General Terms of Use
          </a>
          &nbsp;and&nbsp;
          <a
            className="gradient-text"
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            Privacy Policy
          </a>
        </p>
      </main>
    );
  }

  return (
    <main className="pb-24 w-full min-h-screen overflow-hidden">
      {progressIndex >= 0 && <ProgressBar index={progressIndex} />}

      <div className="px-5 pt-6 flex flex-col items-center text-center gap-4">
        {page.title && (
          <h1 className="text-[28px] leading-8 font-black text-left w-full animate-left">
            {page.title}
          </h1>
        )}
        {page.subtitle && (
          <p className="text-sm text-neutral-600 text-left w-full animate-right">
            {page.subtitle}
          </p>
        )}

        {page.image && (
          <div className="w-full flex justify-center pt-2 animate-bottom">
            <Image
              src={page.image}
              width={400}
              height={400}
              alt=""
              className="max-w-[320px] h-auto"
            />
          </div>
        )}
      </div>

      <CtaBar
        primaryText={primaryText}
        onPrimary={onNext}
        onSkip={onSkip}
        showSkip={!isLast}
      />
    </main>
  );
}
