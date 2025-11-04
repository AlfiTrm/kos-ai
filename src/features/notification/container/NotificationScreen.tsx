// src/features/notifications/containers/NotificationScreen.tsx
"use client";

// <--- TAMBAHKAN useMemo
import React, { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AppHeader from "@/shared/components/AppHeader";
import { useNotificationStore, NotificationItem } from "@/libs/useNotificationStore";
import { Bell, ArrowRight } from "lucide-react";

// ... (Komponen NotificationCard tetap sama, tidak perlu diubah)
const NotificationCard: React.FC<{ item: NotificationItem; onClick: () => void }> = ({ item, onClick }) => {
  const router = useRouter();
  
  const handleClick = () => {
    onClick();
    if (item.href) {
      router.push(item.href);
    }
  };
  
  const timeAgo = (ts: number) => {
    const diffSec = Math.floor((Date.now() - ts) / 1000);
    if (diffSec < 60) return "Baru saja";
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m lalu`;
    const diffHour = Math.floor(diffMin / 60);
    if (diffHour < 24) return `${diffHour}j lalu`;
    const diffDay = Math.floor(diffHour / 24);
    return `${diffDay}h lalu`;
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full p-4 rounded-2xl border transition-all ${
        item.read
          ? "bg-white/70 border-white/40"
          : "bg-purple-50 border-purple-200 shadow-sm"
      }`}
    >
      <div className="flex gap-3">
        <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
          item.read ? "bg-neutral-100" : "bg-purple-100"
        }`}>
          <Bell className={`w-5 h-5 ${item.read ? "text-neutral-500" : "text-purple-1"}`} />
        </div>
        <div className="flex-1 text-left">
          <p className="text-sm leading-snug">{item.message}</p>
          <p className="text-xs text-neutral-500 mt-1">{timeAgo(item.createdAt)}</p>
        </div>
        {item.href && (
          <div className="shrink-0 self-center">
            <ArrowRight className="w-4 h-4 text-neutral-400" />
          </div>
        )}
      </div>
    </button>
  );
};


// Komponen utama untuk layar notifikasi
export default function NotificationScreen() {
  const router = useRouter();

  // <--- PERUBAHAN DI SINI
  // 1. Ambil state mentah secara terpisah
  const order = useNotificationStore((s) => s.order);
  const notificationsMap = useNotificationStore((s) => s.notifications);

  // 2. Gabungkan state menggunakan useMemo
  const notifications = useMemo(() => {
    return order.map(id => notificationsMap[id]).filter(Boolean);
  }, [order, notificationsMap]); // <-- Hanya akan jalan jika order atau notificationsMap berubah
  // ---> AKHIR PERUBAHAN

  const markAllAsRead = useNotificationStore((s) => s.markAllAsRead);
  const markAsRead = useNotificationStore((s) => s.markAsRead);

  // useEffect untuk menandai semua terbaca (tetap sama)
  useEffect(() => {
    const timer = setTimeout(() => {
      markAllAsRead();
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [markAllAsRead]);

  return (
    <main className="w-full pb-24">
      <AppHeader
        title="Notifications"
        onBack={() => router.back()}
        rightSlot={
          <button onClick={markAllAsRead} className="text-xs text-purple-1 font-medium">
            Tandai semua
          </button>
        }
      />
      
      <div className="px-4 pt-3 space-y-3">
        {notifications.length === 0 ? (
          <p className="text-center text-sm text-neutral-500 pt-10">
            Belum ada notifikasi
          </p>
        ) : (
          notifications.map((item) => (
            <NotificationCard 
              key={item.id} 
              item={item} 
              onClick={() => markAsRead(item.id)} 
            />
          ))
        )}
      </div>
    </main>
  );
}