import { ReactNode } from "react";
import { Resend } from "resend";
import { APP_URL } from "./constants";
import InviteMember from "./emails/invite-member";
import VerifyEmail from "./emails/verify-email";

export const resend = new Resend(process.env.AUTH_RESEND_KEY || "re_123");

const MAIL_SENDER =
  process.env.RESEND_EMAIL_SENDER || "Clikz <hello@clikz.live>";

export const sendEmail = async ({
  email,
  subject,
  react,
}: {
  email: string;
  subject: string;
  react: ReactNode;
}) => {
  return await resend.emails.send({
    from: MAIL_SENDER,
    to: email,
    replyTo: "vighneshgupta32@gmail.com",
    subject,
    react,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${APP_URL}/verify?to=${email}&code=${token}`;

  return await sendEmail({
    email,
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
  workspaceImage: string,
) => {
  return await sendEmail({
    email,
    subject: "You've been invited to a workspace",
    react: InviteMember({
      inviteeName: email,
      teamName: "Clikz",
      acceptUrl: `${APP_URL}/invite/${inviteCode}`,
      teamImageUrl: workspaceImage,
    }),
  });
};
