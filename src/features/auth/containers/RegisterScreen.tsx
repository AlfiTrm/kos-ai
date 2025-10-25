"use client";

import AuthHeader from "../components/AuthHeader";
import SignUpForm from "../components/SignUpForm";

export default function RegisterScreen() {
  return (
    <main className="min-h-screen bg-slate-50 px-5 pt-10 pb-10 max-w-[480px] mx-auto flex flex-col overflow-hidden">
      <AuthHeader
        title="Sign up"
        subtitle="It’s free, updated and covers the most trending and accurate digital news in the world."
      />
      <SignUpForm />
    </main>
  );
}
