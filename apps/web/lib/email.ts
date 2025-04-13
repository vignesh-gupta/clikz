import { Resend } from "resend";

import { InviteMember } from "@clikz/emails/invite-member";
import VerifyEmail from "@clikz/emails/verify-email";
import { APP_URL } from "@clikz/utils/constants";

// eslint-disable-next-line turbo/no-undeclared-env-vars
export const resend = new Resend(process.env.AUTH_RESEND_KEY || "re_123");

const AUTH_MAIL_SENDER =
  process.env.RESEND_EMAIL_SENDER || "Clikz <auth@clikz.live>";

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${APP_URL}/verify?to=${email}&code=${token}`;

  await resend.emails.send({
    from: AUTH_MAIL_SENDER,
    to: email,
    subject: "Verify your email address",
    react: VerifyEmail({
      name: email,
      verificationCode: token,
      verificationLink: confirmLink,
    }),
  });
};

export const sendWorkspaceInvite = async (
  email: string,
  inviteCode: string,
  workspaceImage: string
) => {
  return await resend.emails.send({
    from: AUTH_MAIL_SENDER,
    to: email,
    subject: "You've been invited to a workspace",
    react: InviteMember({
      inviteeName: email,
      teamName: "Clikz",
      acceptUrl: `${APP_URL}/invite/${inviteCode}`,
      teamImageUrl: workspaceImage,
    }),
  });
};
