"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { GradientButton, OutlineButton } from "@/shared/components/Button";
import Confetti from "react-confetti";

const useSimpleWindowSize = () => {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
};

const SuccessPage = () => {
  const router = useRouter();
  const { width, height } = useSimpleWindowSize();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const canShowConfetti = showConfetti && width > 0 && height > 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 pt-10 pb-20">
      {canShowConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.1}
          tweenDuration={10000}
          colors={[
            "#FFC700",
            "#FF3F8E",
            "#2EBAFF",
            "#5A3DFF",
            "#30E3CA",
            "#FF9A00",
          ]}
        />
      )}

      <div className="relative w-40 h-40 rounded-full bg-green-100 flex items-center justify-center mb-8">
        <CheckCircle2 size={80} className="text-green-500" />
      </div>

      <h1 className="text-2xl font-bold mb-2">Budget Completed!</h1>
      <p className="text-neutral-600 mb-8 max-w-sm">
        All done! Your budget is ready, so you can start managing your money
      </p>

      <div className="w-full max-w-xs space-y-3 relative z-29">
        <GradientButton onClick={() => router.push("/budget")}>
          Continue
        </GradientButton>
        <OutlineButton onClick={() => router.push("/budget/add")}>
          Add More
        </OutlineButton>
      </div>
    </div>
  );
};

export default SuccessPage;
