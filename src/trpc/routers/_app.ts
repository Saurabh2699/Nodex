import { workflowsRouter } from "@/features/workflows/server/routers";
import { createTRPCRouter } from "../init";
import { credentialsRouter } from "@/features/credentials/server/routers";
import { executionsRouter } from "@/features/executions/server/routers";
import { userRouter } from "@/features/users/router";

export const appRouter = createTRPCRouter({
  workflows: workflowsRouter,
  credentials: credentialsRouter,
  executions: executionsRouter,
  users: userRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;
