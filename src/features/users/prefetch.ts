import { prefetch, trpc } from "@/trpc/server";

/**
 * Prefetch single user
 */
export const prefetchUser = () => {
  return prefetch(trpc.users.getOne.queryOptions());
};
