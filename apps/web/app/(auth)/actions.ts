"use server";

import { sendOtpEmail } from "~/lib/email";
import { prisma } from "~/lib/prisma";
import { saltAndHash } from "~/lib/utils";

export const signIn = async (email: string, password: string) => {
  const hashedPassword = await saltAndHash(password);

  const user = await prisma.user.findFirst({
    where: {
      email,
      password: hashedPassword,
    },
  });
  if (!user) return null;

  return user;
};

export const signUp = async (email: string, password: string) => {
  const hashedPassword = await saltAndHash(password);

  const existingUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (existingUser) return null;

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  sendOtpEmail(email);

  return user;
};
