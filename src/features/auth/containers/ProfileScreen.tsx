"use client";
import ProfileForm from "@/features/auth/components/profile/ProfileForm";

export default function ProfileScreen() {
  return (
    <main className="px-5 pt-10 pb-10 bg-slate-50">
      <h1 className="text-2xl font-extrabold mb-1">Your Profile</h1>
      <p className="text-sm text-neutral-600 mb-5">
        Introduce yourself to others in your profile
      </p>
      <ProfileForm />
    </main>
  );
}
