import { Resend } from "resend";

import { APP_URL } from "./constants";
import { serverEnv } from "./env/server";

// eslint-disable-next-line turbo/no-undeclared-env-vars
export const resend = new Resend(serverEnv.AUTH_RESEND_KEY || "re_123");

const AUTH_MAIL_SENDER = "Clikz <auth@clikz.live>";

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${APP_URL}/verify?to=${email}&code=${token}`;

  await resend.emails.send({
    from: AUTH_MAIL_SENDER,
    to: email,
    subject: "Verify your email address",
    html: `<p>Hi there,</p><p>Please verify your email address by clicking on the link below:</p><p><a href="${confirmLink}">Click here</a></p>`,
  });
};

export const sendWorkspaceInvite = async (
  email: string,
  inviteCode: string
) => {
  const workspaceLink = `${APP_URL}/invite/${inviteCode}`;

  return await resend.emails.send({
    from: AUTH_MAIL_SENDER,
    to: email,
    subject: "You've been invited to a workspace",
    html: `<p>Hi there,</p><p>You've been invited to a workspace. Click on the link below to join:</p><p><a href="${workspaceLink}">Click here</a></p>`,
  });
};
