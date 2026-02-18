import { sendWorkflowExecution } from "@/inngest/utils";
import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";

function validateGitHubWebhookSecret(
  payload: string,
  signature: string | null,
): boolean {
  const secret = process.env.GITHUB_WEBHOOK_SECRET;

  if (!secret) {
    console.error("GITHUB_WEBHOOK_SECRET is not configured");
    return false;
  }

  if (!signature) {
    console.error("Missing GitHub webhook signature");
    return false;
  }

  // GitHub sends signature as "sha256=<hash>"
  const [algorithm, hash] = signature.split("=");

  if (algorithm !== "sha256") {
    console.error("Invalid signature algorithm");
    return false;
  }

  const expectedHash = createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  // Use constant-time comparison to prevent timing attacks
  return hash === expectedHash;
}

export async function POST(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const workflowId = url.searchParams.get("workflowId");

    if (!workflowId) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required query parameter: workflowId",
        },
        { status: 400 },
      );
    }

    // Get the raw body for signature validation
    const payload = await request.text();

    // Get GitHub signature from headers
    const signature = request.headers.get("x-hub-signature-256");

    // Validate webhook secret
    if (!validateGitHubWebhookSecret(payload, signature)) {
      console.error("GitHub webhook signature validation failed");
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized: Invalid webhook signature",
        },
        { status: 401 },
      );
    }

    // Parse the body now that it's validated
    const body = JSON.parse(payload);

    // Trigger an inngest job
    await sendWorkflowExecution({
      workflowId,
      initialData: {
        github: body,
      },
    });

    return NextResponse.json(
      {
        success: true,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Github webhook error: ", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process GitHub webhook",
      },
      { status: 500 },
    );
  }
}
