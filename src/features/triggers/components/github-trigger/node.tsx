import { NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseTriggerNode } from "../base-trigger-node";
import { GithubTriggerDialog } from "./dialog";
import { useNodeStatus } from "@/features/executions/hooks/use-node-status";
import { GITHUB_CHANNEL_NAME} from "@/inngest/channels/github-trigger";
import { fetchGithubTriggerRealtimeToken } from "./actions";

export const GithubTriggerNode = memo((props: NodeProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const nodeStatus = useNodeStatus({
    nodeId: props.id,
    channel: GITHUB_CHANNEL_NAME,
    topic: "status",
    refreshToken: fetchGithubTriggerRealtimeToken,
  }); 

  const handleOpenSettings = () => setDialogOpen(true);

  return (
    <>
      <GithubTriggerDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      <BaseTriggerNode
        {...props}
        icon="/logos/github.svg"
        name="Github"
        description="When any event occurs in repo"
        status={nodeStatus}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      />
    </>
  );
});
