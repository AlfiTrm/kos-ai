"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/libs/authStore"; // <-- AMBIL DARI ZUSTAND

export const useProfile = () => {
    const router = useRouter();

    const user = useAuthStore((s) => s.user);
    const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
    const logout = useAuthStore((s) => s.logout);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!isLoggedIn) {
            router.replace("/login");
        } else if (!user) {
            router.replace("/profile");
        } else {
            setIsLoading(false);
        }
    }, [isLoggedIn, user, router]);


    const handleGoBack = () => {
        router.back();
    };

    const handleLogout = () => {
        logout(); 
        router.replace("/login"); 
    };

    const handleGoToAccountInfo = () => router.push("/userprofile/edit");
    const handleGoToPassword = () => alert("Ke halaman Password!");
    const handleGoToFAQs = () => router.push("userprofile/faq");

    return {
        user,
        isLoading,
        handleGoBack,
        handleLogout,
        handleGoToAccountInfo,
        handleGoToPassword,
        handleGoToFAQs,
    };
};