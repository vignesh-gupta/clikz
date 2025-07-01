import { NextRequest, NextResponse } from "next/server";

import Stripe from "stripe";

import { getPlanByName } from "@clikz/utils/constants";

import {
  ClikzApiError,
  handleAndReturnNextErrorResponse,
} from "~/lib/backend/error";
import { db } from "~/lib/db";
import { stripeMetadataSchema } from "~/lib/zod/schemas/stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  const { sessionId } = await request.json();

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json({
        success: false,
        error: "Payment not completed",
      });
    }

    const { success, data } = stripeMetadataSchema.safeParse(session.metadata);

    if (!success) {
      throw new ClikzApiError({
        code: "bad_request",
        message: "Invalid session",
      });
    }

    const { workspaceSlug, plan } = data;

    const plansDetails = getPlanByName(plan);

    if (!plansDetails) {
      throw new ClikzApiError({
        code: "bad_request",
        message: "Invalid plan name",
      });
    }

    // TODO: Move this to webhooks
    await db.workspace.update({
      where: { slug: workspaceSlug },
      data: {
        plan,
        linksLimit: plansDetails.maxLinks,
        usersLimit: plansDetails.maxUsers,
        domainsLimit: plansDetails.maxDomains,
      },
    });

    return NextResponse.json({ session, success: true });
  } catch (error) {
    return handleAndReturnNextErrorResponse(error);
  }
}
