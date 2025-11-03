import React from "react";

export type ProfileMenuItemProps = {
    icon: React.ComponentType<{ size: number; className?: string }>;
    label: string;
    onClick: () => void;
    color?: string;
    isLast?: boolean;
};