"use server";

import { AuthError } from "next-auth";
import { z } from "zod";

import { getUserByEmail } from "~/data/user";
import { sendOtpEmail, sendVerificationEmail } from "~/lib/email";
import { prisma } from "~/lib/prisma";
import { generatePasscode } from "~/lib/token";
import { saltAndHash } from "~/lib/utils";
import { signInSchema } from "~/lib/zod-schemas";
import { DEFAULT_LOGIN_REDIRECT } from "~/routes";
import { signIn } from "~/auth";

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

export const login = async (
  values: z.infer<typeof signInSchema>,
  callback?: string | null,
) => {
  const validatedFields = signInSchema.parse(values);

  if (!validatedFields) return { error: "Invalid fields" };

  const { email, password } = validatedFields;
  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generatePasscode(email);

    await sendVerificationEmail(verificationToken.email, verificationToken.otp);

    return { success: "Confirmation email sent again!" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callback || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};
