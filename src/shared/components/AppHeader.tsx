"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, MoreHorizontal } from "lucide-react";

type MenuItem = {
  label: string;
  onClick: () => void;
  destructive?: boolean;
};

type AppHeaderProps = {
  title?: string;
  subtitle?: string;
  centerVariant?: "plain" | "pill";
  onBack?: () => void;
  rightSlot?: React.ReactNode;
  menuItems?: MenuItem[];
  sticky?: boolean;
  transparent?: boolean;
};

export default function AppHeader({
  title = "",
  subtitle,
  centerVariant = "plain",
  onBack,
  rightSlot,
  menuItems,
  sticky = true,
  transparent = true,
}: AppHeaderProps) {
  const [open, setOpen] = useState(false);
  const popRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!popRef.current) return;
      if (!popRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) {
      document.addEventListener("mousedown", onClick);
      document.addEventListener("keydown", onKey);
    }
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={[
        "z-40 px-3 h-14 flex items-center gap-2",
        sticky ? "sticky top-0" : "",
        transparent
          ? "bg-white/50 backdrop-blur supports-[backdrop-filter]:bg-white/30"
          : "bg-white",
        "border-b border-white/20",
      ].join(" ")}
    >
      <div className="min-w-8 flex items-center">
        {onBack ? (
          <button
            onClick={onBack}
            className="p-2 rounded-full bg-white/60 hover:bg-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        ) : null}
      </div>

      <div className="flex-1 flex flex-col items-center">
        {centerVariant === "pill" ? (
          <div className="px-4 py-1 rounded-full bg-white/60 text-sm font-medium text-black">
            {title}
          </div>
        ) : (
          <>
            <div className="text-base font-semibold leading-none">{title}</div>
            {subtitle ? (
              <div className="text-[11px] text-neutral-500 leading-none mt-[2px]">
                {subtitle}
              </div>
            ) : null}
          </>
        )}
      </div>

      <div
        className="min-w-8 flex items-center justify-end relative"
        ref={popRef}
      >
        {rightSlot ? (
          rightSlot
        ) : menuItems && menuItems.length > 0 ? (
          <>
            <button
              aria-haspopup="menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="p-2 rounded-full bg-white/60 hover:bg-white transition"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
            {open && (
              <div
                role="menu"
                className="absolute right-0 top-10 w-44 rounded-lg border bg-white shadow-lg z-50"
              >
                {menuItems.map((it, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setOpen(false);
                      it.onClick();
                    }}
                    className={`w-full text-left text-sm px-3 py-2 hover:bg-neutral-50 ${
                      it.destructive ? "text-rose-600" : ""
                    }`}
                  >
                    {it.label}
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <span className="w-8" />
        )}
      </div>
    </header>
  );
}
