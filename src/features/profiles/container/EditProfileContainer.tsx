"use client";
import AppHeader from "@/shared/components/AppHeader";
import { useRouter } from "next/navigation";
import EditProfileForm from "../components/EditProfileForm";

export default function EditProfileContainer() {
  const router = useRouter();

  return (
    <main className="px-5 pt-10 pb-10 bg-slate-50 min-h-screen">
      <AppHeader
        title="Personal Information"
        onBack={() => router.back()}
        centerVariant="pill"
        sticky={false}
        transparent={false}
      />
      <EditProfileForm />
    </main>
  );
}
