"use client";

import { Button } from "@clikz/ui/components/ui/button";
import { signOut } from "next-auth/react";
import React from "react";

const SignOut = () => {
  return <Button onClick={() => signOut()}>Sign Out</Button>;
};

export default SignOut;
