import {
  UserContainer,
  UserError,
  UserLoading,
  UserProfileDetails,
} from "@/features/users/components/user";
import { prefetchUser } from "@/features/users/prefetch";
import { requireAuth } from "@/lib/auth-util";
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const Page = async () => {
  await requireAuth();
  prefetchUser();

  return (
    <UserContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<UserError></UserError>}>
          <Suspense fallback={<UserLoading></UserLoading>}>
            <UserProfileDetails />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </UserContainer>
  );
};

export default Page;
