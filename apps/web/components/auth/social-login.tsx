"use client";

import { Button } from "@repo/ui/components/ui/button";
import { BuiltInProviderType } from "next-auth/providers";
import { LiteralUnion, signIn } from "next-auth/react";
import { IconType } from "react-icons";

type SocialLoginProps = {
  provider: LiteralUnion<BuiltInProviderType>;
  label: string;
  Icon: IconType;
};

const SocialLogin = ({ Icon, provider, label }: SocialLoginProps) => {
  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={() => signIn(provider)}
    >
      <Icon className="md:mr-2 h-4 w-4" />
      <span className="md:inline hidden">{label}</span>
    </Button>
  );
};

export default SocialLogin;
