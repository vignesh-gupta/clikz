"use client";

import React from "react";

import { signOut } from "next-auth/react";

import { Button } from "@clikz/ui/components/ui/button";

const SignOut = () => {
  return <Button onClick={() => signOut()}>Sign Out</Button>;
};

export default SignOut;
