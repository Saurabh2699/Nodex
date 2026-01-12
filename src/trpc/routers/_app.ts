import { inngest } from "@/inngest/client";
import { baseProcedure, createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  testAi: baseProcedure.mutation(async () => {
    await inngest.send({
      name: "execute/ai",
    });
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
