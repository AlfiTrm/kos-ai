"use client";
import Image from "next/image";
import { OutlineButton } from "./Button";

export default function SocialButton({
  icon,
  label,
  onClick,
}: {
  icon: string;
  label: string;
  onClick?: () => void;
}) {
  return (
    <OutlineButton
      onClick={onClick}
      className="flex items-center justify-center gap-2"
    >
      <Image src={icon} alt="" width={18} height={18} />
      {label}
    </OutlineButton>
  );
}
