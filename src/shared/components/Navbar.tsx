"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LineChart,
  CalendarCheck2,
  Archive,
  LayoutDashboard,
} from "lucide-react";

type Item = {
  key: string;
  label: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  match?: (path: string) => boolean;
};

const ITEMS: Item[] = [
  {
    key: "chatbot",
    label: "Chatbot",
    href: "/chatbot",
    icon: LayoutDashboard,
    match: (p) => p.startsWith("/chatbot") || p === "/user",
  },
  {
    key: "budget",
    label: "Budget",
    href: "/budget",
    icon: LineChart,
    match: (p) => p.startsWith("/budget"),
  },
  {
    key: "schedule",
    label: "Schedule",
    href: "/schedule",
    icon: CalendarCheck2,
    match: (p) => p.startsWith("/schedule"),
  },
  {
    key: "stock",
    label: "Stock",
    href: "/stock",
    icon: Archive,
    match: (p) => p.startsWith("/stock"),
  },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-white rounded-t-4xl">
      <ul className="mx-auto max-w-[480px] grid grid-cols-4 gap-1 px-3 py-2">
        {ITEMS.map((it) => {
          const active = it.match ? it.match(pathname) : pathname === it.href;
          const Icon = it.icon;

          return (
            <li key={it.key} className="flex items-center justify-center">
              <Link
                href={it.href}
                className="flex flex-col items-center gap-1 rounded-xl px-2 py-1 text-[11px] font-medium"
                aria-current={active ? "page" : undefined}
              >
                <span className="relative h-10 w-10 flex items-center justify-center">
                  <span
                    className={
                      "absolute -translate-y-4 inset-0 rounded-full" +
                      "transition-all duration-300 ease-in-out " +
                      (active ? "opacity-100 scale-150 bg-white shadow-xs rounded-full rotate-180" : "opacity-0 scale-75")
                    }
                  />
                  <Icon
                    className={
                      "relative z-10 w-5 h-5 transition-all duration-300 ease-in-out " +
                      (active
                        ? "text-purple-1 scale-150 -translate-y-4"
                        : "text-neutral-500")
                    }
                  />
                </span>

                <span
                  className={
                    "transition-all duration-300 ease-in-out " +
                    (active
                      ? "bg-gradient-to-r from-purple-1 to-orange-1 bg-clip-text scale-110 -translate-y-2 text-transparent"
                      : "text-neutral-500")
                  }
                >
                  {it.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
