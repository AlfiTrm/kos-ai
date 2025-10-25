export interface OnboardingPage {
    title?: string;
    subtitle?: string;
    image?: string;
    cta?: string;
    variant?: "splash" | "content" | "auth";
    bgClass?: string;
    imageClass?: string;
}
