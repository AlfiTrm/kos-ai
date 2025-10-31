"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { GradientButton, OutlineButton } from "@/shared/components/Button";

const SuccessPage = () => {
  const router = useRouter();

  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <CheckCircle2 size={80} className="text-green-500 mb-6 animate-pulse" />

      <h1 className="text-2xl font-bold mb-2">Transaction Saved!</h1>
      <p className="text-neutral-600 mb-8">
        Your transaction has been successfully recorded.
      </p>

      <div className="w-full max-w-xs space-y-3">
        <GradientButton onClick={() => router.replace("/budget")}>
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