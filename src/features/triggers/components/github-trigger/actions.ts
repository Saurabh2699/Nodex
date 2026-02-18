"use server";

import { githubTriggerChannel } from "@/inngest/channels/github-trigger";
import { inngest } from "@/inngest/client";
import { getSubscriptionToken, Realtime } from "@inngest/realtime";

export type GithubTriggerToken = Realtime.Token<
  typeof githubTriggerChannel,
  ["status"]
>;

export async function fetchGithubTriggerRealtimeToken(): Promise<GithubTriggerToken> {
  const token = await getSubscriptionToken(inngest, {
    channel: githubTriggerChannel(),
    topics: ["status"],
  });
  return token;
}
