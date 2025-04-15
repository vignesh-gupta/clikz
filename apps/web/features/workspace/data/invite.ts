import { redirect } from "next/navigation";

import { generateOTP } from "@clikz/utils/functions";

import { auth } from "~/auth";
import { db } from "~/lib/db";

export const generatePasscode = async (email: string) => {
  const passcode = generateOTP();

  await db.passcode.deleteMany({
    where: {
      email,
    },
  });

  return await db.passcode.create({
    data: {
      email,
      otp: passcode,
      expiresAt: new Date(Date.now() + 1000 * 60 * 10), // 10 minutes
    },
  });
};

export async function validateInviteToken(token: string) {
  const session = await auth();

  if (!session || !session.user || !session.user.email) {
    redirect("/sign-in");
  }

  const invitation = await db.invite.findFirst({
    where: {
      token,
      email: session.user.email,
      expires: {
        gte: new Date(),
      },
    },
    include: {
      Workspace: {
        select: {
          slug: true,
          name: true,
        },
      },
    },
  });

  if (!invitation) {
    return { isValid: false };
  }

  // In a real app, you would return the actual data from your database
  return {
    isValid: true,
    workspaceSlug: invitation.Workspace.slug,
    workspaceName: invitation.Workspace.name,
  };
}
