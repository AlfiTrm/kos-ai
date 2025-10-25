"use client";

import Divider from "@/shared/components/Divider";
import SocialButton from "@/shared/components/SocialButton";
import { OAUTH_PROVIDERS } from "../data/aData";
import { useLoginForm } from "../hooks/useLoginForm";

export default function AuthSocialList() {
  const { oauth } = useLoginForm();
  return (
    <>
      <div className="my-4">
        <Divider text="or sign up with" />
      </div>
      <div className="space-y-3">
        {OAUTH_PROVIDERS.map((p) => (
          <SocialButton
            key={p.key}
            icon={p.icon}
            label={p.label}
            onClick={() => oauth(p.key)}
          />
        ))}
      </div>
    </>
  );
}
