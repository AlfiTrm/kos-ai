"use client";

import AuthHeader from "../components/AuthHeader";
import LoginForm from "../components/LoginForm";
import AuthSocialList from "../components/AuthSocialList";

export default function LoginScreen() {
  return (
    <main className="min-h-screen bg-slate-50 px-5 pt-10 pb-10 max-w-[480px] mx-auto flex flex-col overflow-hidden">
      <AuthHeader
        title="Sign in"
        subtitle="We're thrilled to have you back. Let's dive in and get updated news for you!"
      />
      <LoginForm />
      <AuthSocialList />
      <p className="mt-auto text-xs text-neutral-400 text-center px-3 overflow-y-hidden">
        By signing up you acknowledge and agree to KosAI{" "}
        <a
          className="gradient-text"
          href="#"
          onClick={(e) => e.preventDefault()}
        >
          General Terms of Use
        </a>
        {" "}and {" "}
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
