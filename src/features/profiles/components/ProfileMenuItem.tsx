"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import { ProfileMenuItemProps } from "../types/prTypes"; 

export const ProfileMenuItem = ({
  icon: Icon,
  label,
  onClick,
  color = "text-gray-800", 
  isLast = false,
}: ProfileMenuItemProps) => {
  const iconColor = color === "text-red-500" ? "text-red-500" : "text-purple-1";

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between w-full px-4 py-4 transition-colors hover:bg-gray-50 ${
        !isLast ? "border-b border-gray-100" : ""
      }`}
    >
      <span className="flex items-center gap-3">
        <Icon size={20} className={iconColor} />
        <span className={`font-medium ${color}`}>{label}</span>
      </span>
      <ChevronRight size={20} className="text-neutral-400" />
    </button>
  );
};
