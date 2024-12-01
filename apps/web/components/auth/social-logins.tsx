"use client";

import { FaDiscord, FaGithub, FaGoogle } from "react-icons/fa";

import SocialLoginButton from "./social-login-button";

const SocialLogins = () => {
  return (
    <div className="grid grid-cols-3 gap-3">
      <SocialLoginButton provider="github" label="Github" Icon={FaGithub} />
      <SocialLoginButton provider="google" label="Google" Icon={FaGoogle} />
      <SocialLoginButton provider="discord" label="Discord" Icon={FaDiscord} />
    </div>
  );
};

export default SocialLogins;
