"use client";

import Link from "next/link";
import Image from "next/image";
import { Bell } from "lucide-react";
import { useAuthStore } from "@/libs/authStore";

function Initials({ name }: { name?: string }) {
  const init =
    name
      ?.trim()
      ?.split(/\s+/)
      .slice(0, 2)
      .map((s) => s[0]?.toUpperCase())
      .join("") || "U";
  return (
    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-neutral-200 text-xs font-semibold">
      {init}
    </span>
  );
}

export default function Topbar() {
  const user = useAuthStore((s) => s.user);

  return (
    <header className="fixed top-0 left-0 mx-auto w-full z-40 bg-transparent">
      <div className="mx-auto max-w-[480px] px-4 pt-3 pb-2">
        <div className="flex items-center justify-between">
          <Link href="/chatbot" className="shrink-0">
            <Image
              src={"/logo/chatbot-logo.png"}
              width={500}
              height={500}
              alt="chatbot-image"
              className="w-10 h-10 object-contain p-2 bg-gray-100 rounded-full shadow"
            />
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/user/notifications"
              aria-label="Notifications"
              className="relative inline-flex items-center justify-center w-9 h-9 rounded-full "
            >
              <Bell className="w-4 h-4 text-neutral-700" />
              <span className="absolute top-2.5 right-3 h-1 w-1  rounded-full bg-rose-500 leading-4">
                
              </span>
            </Link>

            <Link
              href="/userprofile"
              className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-neutral-100 overflow-hidden"
              aria-label="Profile"
            >
              {user?.avatarUrl ? (
                <Image
                  src={user.avatarUrl}
                  alt={user.fullName || "User"}
                  width={36}
                  height={36}
                  className="w-9 h-9 object-cover"
                />
              ) : user?.fullName ? (
                <Initials name={user.fullName} />
              ) : (
                <Initials name="User" />
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
