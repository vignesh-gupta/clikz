import { Resend } from "resend";
import { BASE_URL } from "./constants";

// eslint-disable-next-line turbo/no-undeclared-env-vars
export const resend = new Resend(process.env.AUTH_RESEND_KEY);

const MAIL_SENDER = "clikz <clikz@vigneshgupta.tech>";

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${BASE_URL}/verify?to=${email}&code=${token}`;

  await resend.emails.send({
    from: MAIL_SENDER,
    to: email,
    subject: "Verify your email address",
    html: `<p>Hi there,</p><p>Please verify your email address by clicking on the link below:</p><p><a href="${confirmLink}">Click here</a></p>`,
  });
};

export const sendWorkspaceInvite = async (
  email: string,
  inviteCode: string,
) => {
  const workspaceLink = `${BASE_URL}/invite/${inviteCode}`;

  await resend.emails.send({
    from: MAIL_SENDER,
    to: email,
    subject: "You've been invited to a workspace",
    html: `<p>Hi there,</p><p>You've been invited to a workspace. Click on the link below to join:</p><p><a href="${workspaceLink}">Click here</a></p>`,
  });
};
