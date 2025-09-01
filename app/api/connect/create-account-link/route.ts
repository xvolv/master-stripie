import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
  try {
    const { accountId, refreshUrl, returnUrl } = await request.json();

    if (!accountId) {
      return NextResponse.json(
        { error: "accountId is required" },
        { status: 400 }
      );
    }

    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: refreshUrl || `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/onboarding/refresh`,
      return_url: returnUrl || `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/onboarding/return`,
      type: "account_onboarding",
    });

    return NextResponse.json({ url: accountLink.url });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "failed to create account link" },
      { status: 500 }
    );
  }
}
