"use client";

import {
  ChevronLeft,
  UserCircle,
  Lock,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { useProfile } from "../hooks/useProfile";
import { ProfileMenuItem } from "../components/ProfileMenuItem";

const ProfileLoading = () => (
  <main className="mx-auto max-w-[480px] min-h-screen pb-24 bg-gray-50 flex justify-center items-center">
    <p className="text-gray-500">Memuat profil...</p>
  </main>
);

export default function ProfileContainer() {
  const {
    user,
    isLoading,
    handleGoBack,
    handleLogout,
    handleGoToAccountInfo,
    handleGoToPassword,
    handleGoToFAQs,
  } = useProfile();

  if (isLoading || !user) {
    return <ProfileLoading />;
  }

  return (
    <main className="mx-auto max-w-[480px] min-h-screen pb-24 bg-gray-50">
      <div className="p-4 pt-6">
        <div className="flex items-start gap-3 text-left mb-6">
          <button onClick={handleGoBack} className="p-2 -ml-2 text-gray-800">
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Your Profile</h1>
            <p className="text-sm text-gray-600">
              Introduce yourself to others in your profile
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center pt-2 pb-6">
          <img
            src={
              user.avatarUrl ||
              `https://api.dicebear.com/7.x/initials/svg?seed=${user.fullName}`
            }
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
          />
          <h2 className="text-2xl font-bold mt-4 text-gray-900">
            {user.fullName}
          </h2>
          <p className="text-md text-neutral-600">{user.email}</p>
        </div>
      </div>

      <div className="p-4 bg-white -mt-6 rounded-t-2xl">
        <h3 className="text-xs font-semibold text-gray-800 uppercase mb-2 px-2">
          Account settings
        </h3>
        <div className="bg-white relative z-50 rounded-xl  overflow-hidden border shadow-sm border-gray-100">
          <ProfileMenuItem
            icon={UserCircle}
            label="Account information"
            onClick={handleGoToAccountInfo}
          />
          <ProfileMenuItem
            icon={Lock}
            label="Password & Security"
            onClick={handleGoToPassword}
            isLast={true}
          />
        </div>

        <h3 className="text-xs font-semibold text-gray-800 uppercase mt-6 mb-2 px-2">
          Other
        </h3>
        <div className="bg-white relative z-50 rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <ProfileMenuItem
            icon={HelpCircle}
            label="FAQs"
            onClick={handleGoToFAQs}
          />
          <ProfileMenuItem
            icon={LogOut}
            label="Sign out"
            onClick={handleLogout}
            color="text-red-500"
            isLast={true}
          />
        </div>
      </div>
    </main>
  );
}
