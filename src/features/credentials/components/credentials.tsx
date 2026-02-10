"use client";

import {
  EmptyView,
  EntityContainer,
  EntityHeader,
  EntityItem,
  EntityList,
  EntityPagination,
  EntitySearch,
  ErrorView,
  LoadingView,
} from "@/components/entity-components";
import {
  useSuspenseCredentials,
  useRemoveCredential,
} from "../hooks/use-credentials";
import { useRouter } from "next/navigation";
import { useCredentialsParams } from "../hooks/use-credentials-params";
import { useEntitySearch } from "@/hooks/use-entity-search";
import type { Credential } from "@/generated/prisma/client";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";

export const CredentialsList = () => {
  const credentials = useSuspenseCredentials();

  return (
    <EntityList
      items={credentials.data.items}
      getKey={(credential) => credential.id}
      emptyView={<CredentialsEmpty />}
      renderItem={(credential) => (
        <CredentialsListItem credential={credential} />
      )}
    />
  );
};

export const CredentialsHeader = ({ disabled }: { disabled?: boolean }) => {
  return (
    <EntityHeader
      title="Credentials"
      description="Create and manage your credentials"
      newButtonHref="/credentials/new"
      newButtonLabel="New Credential"
      disabled={disabled}
    />
  );
};

export const CredentialsSearch = () => {
  const [params, setParams] = useCredentialsParams();
  const { searchValue, onSearchChange } = useEntitySearch({
    params,
    setParams,
  });

  return (
    <EntitySearch
      value={searchValue}
      onChange={onSearchChange}
      placeholder="Search credentials"
    />
  );
};

export const CredentialsPagination = () => {
  const credentials = useSuspenseCredentials();
  const [params, setParams] = useCredentialsParams();

  return (
    <EntityPagination
      page={credentials.data.page}
      totalPages={credentials.data.totalPages}
      onPageChange={(page) => setParams({ ...params, page })}
      disabled={credentials.isPending}
    />
  );
};

export const CredentialsContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <EntityContainer
      header={<CredentialsHeader />}
      search={<CredentialsSearch />}
      pagination={<CredentialsPagination />}
    >
      {children}
    </EntityContainer>
  );
};

export const CredentialsLoading = () => {
  return <LoadingView message="Loading credentials..." />;
};

export const CredentialsError = () => {
  return <ErrorView message="Error loading credentials..." />;
};

export const CredentialsEmpty = () => {
  const router = useRouter();

  const handleCreate = () => {
    router.push("/credentials/new");
  };
  return (
    <EmptyView
      message="No credentials found. Get started by creating the credential."
      onNew={handleCreate}
    />
  );
};

const credentialLogos = {
  GEMINI: "/logos/gemini.svg",
  OPENAI: "/logos/openai.svg",
  ANTHROPIC: "/logos/anthropic.svg",
};

export const CredentialsListItem = ({
  credential,
}: {
  credential: Credential;
}) => {
  const removeCredential = useRemoveCredential();
  const handleRemove = () => {
    removeCredential.mutate({ id: credential.id });
  };

  const logo = credentialLogos[credential.type] || "/logos/openai.svg";

  return (
    <EntityItem
      href={`/credentials/${credential.id}`}
      title={credential.name}
      subtitle={
        <>
          Updated{" "}
          {formatDistanceToNow(credential.updatedAt, { addSuffix: true })}{" "}
          &bull; Created{" "}
          {formatDistanceToNow(credential.createdAt, { addSuffix: true })}
        </>
      }
      image={
        <div className="size-8 flex items-center justify-center">
          <Image src={logo} alt={credential.type} width={20} height={20} />
        </div>
      }
      onRemove={handleRemove}
      isRemoving={removeCredential.isPending}
    />
  );
};
