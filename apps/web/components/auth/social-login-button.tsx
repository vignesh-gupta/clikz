"use client";

import { Button } from "@clikz/ui/components/ui/button";
import { BuiltInProviderType } from "next-auth/providers";
import { LiteralUnion, signIn } from "next-auth/react";
import { IconType } from "react-icons";

type SocialLoginButtonProps = {
  provider: LiteralUnion<BuiltInProviderType>;
  label: string;
  Icon: IconType;
};

const SocialLoginButton = ({ Icon, provider, label }: SocialLoginButtonProps) => {
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

export default SocialLoginButton;
