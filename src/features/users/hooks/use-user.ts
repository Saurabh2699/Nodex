import { useTRPC } from "@/trpc/client";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useSuspenseUser = () => {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.users.getOne.queryOptions());
};

export const useUpdateUser = () => {
  const trpc = useTRPC();
  return useMutation(
    trpc.users.updateUser.mutationOptions({
      onSuccess: (data) => {
        toast.success("User updated successfully");
      },
      onError: (error) => {
        toast.error("Failed to update user");
      },
    }),
  );
};
