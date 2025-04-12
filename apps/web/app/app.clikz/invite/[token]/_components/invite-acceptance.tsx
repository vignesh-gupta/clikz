"use client";

import Link from "next/link";
import { useState } from "react";

import {
  AlertTriangleIcon,
  ArrowRight,
  Check,
  HandshakeIcon,
  ThumbsDown,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

import { BubbleIcon } from "@clikz/ui/components/bubble-icon";
import { Button } from "@clikz/ui/components/ui/button";

import { LINK_QUERY_PARAM } from "~/features/link/hooks/use-link-modal";
import { useInvitesAction } from "~/features/workspace/api/invite/use-invite-action";
import { DEFAULT_LOGIN_REDIRECT } from "~/routes";

type ViewState = "initial" | "accepted" | "declined" | "invalid";

interface InviteAcceptanceProps {
  isValidToken: boolean;
  workspaceName?: string;
  workspaceSlug?: string;
  token: string;
}

export default function InviteAcceptance({
  token,
  isValidToken,
  workspaceName = "some",
  workspaceSlug = DEFAULT_LOGIN_REDIRECT.slice(1),
}: InviteAcceptanceProps) {
  const [viewState, setViewState] = useState<ViewState>(
    isValidToken ? "initial" : "invalid"
  );

  const { mutateAsync: inviteAction, isPending } = useInvitesAction();

  const handleAction = (action: "accept" | "decline") => {
    const res = inviteAction({
      action,
      token,
    });

    toast.promise(res, {
      loading: `Processing ${action}...`,
      success: () => {
        setViewState(action === "accept" ? "accepted" : "declined");
        return action === "accept"
          ? "Invitation Accepted!"
          : "Invitation Declined!";
      },
      error: (error) => {
        setViewState("initial");
        return error.message ?? `Failed to ${action} invitation`;
      },
    });
  };

  if (viewState === "initial")
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center max-w-md text-center"
      >
        <BubbleIcon>
          <HandshakeIcon className="text-gray-700 size-10" />
        </BubbleIcon>

        <h1 className="my-4 text-4xl font-bold text-gray-800">Invitation</h1>

        <p className="mb-8 text-lg text-gray-600">
          You have been invited to collaborate on link management for{" "}
          <span className="font-medium">"{workspaceName}"</span> workspace.
          Would you like to accept this invitation?
        </p>

        <div className="flex flex-col justify-center w-full gap-4 sm:flex-row">
          <Button
            disabled={isPending}
            onClick={() => handleAction("accept")}
            className="flex items-center gap-2 px-8 py-2 text-white bg-black rounded hover:bg-gray-800"
          >
            <Check className="w-4 h-4" /> Accept Invitation
          </Button>

          <Button
            disabled={isPending}
            onClick={() => handleAction("decline")}
            variant="outline"
            className="flex items-center gap-2 px-8 py-2 text-gray-800 bg-white border border-gray-300 rounded hover:bg-gray-50"
          >
            <X className="w-4 h-4" /> Decline
          </Button>
        </div>
      </motion.div>
    );

  if (viewState === "accepted")
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center max-w-md text-center"
      >
        <BubbleIcon>
          <Check className="w-10 h-10 text-green-600" />
        </BubbleIcon>

        <h1 className="my-4 text-4xl font-bold text-gray-800">
          Invitation Accepted!
        </h1>

        <p className="mb-8 text-lg text-gray-600">
          You now have access to manage links for{" "}
          <span className="font-medium">"{workspaceName}" workspace</span>. Get
          started by exploring the dashboard or creating your first link.
        </p>

        <div className="flex flex-col justify-center w-full gap-4 sm:flex-row">
          <Button
            disabled={isPending}
            className="flex items-center gap-2 px-8 py-2 text-white bg-black rounded hover:bg-gray-800"
            asChild
          >
            <Link href={`/${workspaceSlug}`}>
              Go to Dashboard <ArrowRight className="size-4" />
            </Link>
          </Button>

          <Button
            disabled={isPending}
            variant="outline"
            className="px-8 py-2 text-gray-800 bg-white border border-gray-300 rounded hover:bg-gray-50"
            asChild
          >
            <Link href={`/${workspaceSlug}?${LINK_QUERY_PARAM}=new`}>
              Create Link
            </Link>
          </Button>
        </div>
      </motion.div>
    );

  if (viewState === "declined")
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center max-w-md text-center"
      >
        <BubbleIcon>
          <ThumbsDown className="w-10 h-10 text-gray-700" />
        </BubbleIcon>

        <h1 className="my-4 text-4xl font-bold text-gray-800">
          Invitation Declined
        </h1>

        <p className="mb-8 text-lg text-gray-600">
          No worries! The invitation has been declined. If you change your mind,
          you can always request a new invitation from.
        </p>

        <div className="relative w-full max-w-xs mx-auto mb-8">
          <div className="absolute inset-0 transform rounded-lg bg-gradient-to-r from-red-100 to-blue-100 rotate-1"></div>
          <div className="absolute inset-0 transform rounded-lg bg-gradient-to-l from-yellow-100 to-green-100 -rotate-1"></div>
          <div className="relative p-6 bg-white rounded-lg shadow-sm">
            <p className="font-medium text-gray-800">
              "The best way to predict the future is to create it."
            </p>
            <p className="mt-2 text-sm text-gray-500">— Peter Drucker</p>
          </div>
        </div>

        <Button
          disabled={isPending}
          onClick={() => setViewState("initial")}
          className="px-8 py-2 text-white bg-black rounded hover:bg-gray-800"
        >
          Reconsider
        </Button>
      </motion.div>
    );

  if (viewState === "invalid")
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center max-w-md text-center"
      >
        <BubbleIcon>
          <AlertTriangleIcon className="w-10 h-10 text-amber-500" />
        </BubbleIcon>

        <h1 className="my-4 text-4xl font-bold text-gray-800">
          Invalid Invitation
        </h1>

        <p className="mb-8 text-lg text-gray-600">
          This invitation link is invalid or has expired. Please contact the
          person who invited you to request a new invitation.
        </p>

        <div className="flex flex-col justify-center w-full gap-4 sm:flex-row">
          <Button
            disabled={isPending}
            className="px-8 py-2 text-white bg-black rounded hover:bg-gray-800"
            asChild
          >
            <Link href="/">Try Clikz</Link>
          </Button>

          <Button
            disabled={isPending}
            variant="outline"
            className="px-8 py-2 text-gray-800 bg-white border border-gray-300 rounded hover:bg-gray-50"
            asChild
          >
            <Link href="/help/invitations">Learn More</Link>
          </Button>
        </div>
      </motion.div>
    );
}
