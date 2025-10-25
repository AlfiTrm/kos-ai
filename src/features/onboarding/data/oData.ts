import type { OnboardingPage } from "../types/oTypes";

export const ONBOARDING_PAGES: OnboardingPage[] = [
    {
        variant: "splash",
        image: "/logo/logo.png",
        imageClass: "w-20 animate-left",
    },
    {
        variant: "content",
        title: "Manage Your Finances as a Student",
        subtitle: "Track your income and expenses daily, and discover how to manage your budget to keep your wallet full!",
        image: "/onboard/onboard2.png",
        cta: "Continue",
    },
    {
        variant: "content",
        title: "Ibu Kos AI Ready to Help",
        subtitle: "Chatbot with the personality of a strict, talkative, but caring “ibu kos.” Try it out, it’s fun!",
        image: "/onboard/onboard3.png",
        cta: "Next",
    },
    {
        variant: "content",
        title: "Rent and Important Task Reminders",
        subtitle: "KOSAI reminds you to pay your rent and other important tasks, so you don’t have to worry about forgetting.",
        image: "/onboard/onboard4.png",
        cta: "Next",
    },
    {
        variant: "auth",
        title: "Welcome to KosAI",
        subtitle:
            "Get a daily overview of your spending and savings, personalized just for you inside the app.",
        image: "/logo/logo.png",
    },
];
