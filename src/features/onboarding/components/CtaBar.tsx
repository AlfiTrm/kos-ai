"use client";
import { GradientButton, OutlineButton } from "@/shared/components/Button";

export default function CtaBar({
  primaryText,
  onPrimary,
  onSkip,
  showSkip = true,
}: {
  primaryText: string;
  onPrimary: () => void;
  onSkip: () => void;
  showSkip?: boolean;
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white pt-3 pb-6 px-5">
      <div className="max-w-[480px] mx-auto space-y-3">
        <GradientButton onClick={onPrimary}>{primaryText}</GradientButton>
        {showSkip && <OutlineButton onClick={onSkip}>Skip</OutlineButton>}
      </div>
    </div>
  );
}
