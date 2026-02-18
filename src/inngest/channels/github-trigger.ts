import { channel, topic } from "@inngest/realtime";

export const GITHUB_CHANNEL_NAME = "github-execution";

export const githubTriggerChannel = channel(GITHUB_CHANNEL_NAME).addTopic(
  topic("status").type<{
    nodeId: string;
    status: "loading" | "success" | "error";
  }>(),
);
