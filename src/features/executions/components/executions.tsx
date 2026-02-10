"use client";

import {
  EmptyView,
  EntityContainer,
  EntityHeader,
  EntityItem,
  EntityList,
  EntityPagination,
  ErrorView,
  LoadingView,
} from "@/components/entity-components";
import { useSuspenseExecutions } from "../hooks/use-executions";
import { useExecutionsParams } from "../hooks/use-executions-params";
import type { ExecutionStatus, Execution } from "@/generated/prisma/client";
import { formatDistanceToNow } from "date-fns";
import {
  CheckCircle2Icon,
  ClockIcon,
  Loader2Icon,
  XCircleIcon,
} from "lucide-react";

export const ExecutionsList = () => {
  const executions = useSuspenseExecutions();

  return (
    <EntityList
      items={executions.data.items}
      getKey={(execution) => execution.id}
      emptyView={<ExecutionsEmpty />}
      renderItem={(execution) => <ExecutionsListItem execution={execution} />}
    />
  );
};

export const ExecutionsHeader = () => {
  return (
    <EntityHeader
      title="Executions"
      description="View your workflow execution history"
    />
  );
};

export const ExecutionsPagination = () => {
  const executions = useSuspenseExecutions();
  const [params, setParams] = useExecutionsParams();

  return (
    <EntityPagination
      page={executions.data.page}
      totalPages={executions.data.totalPages}
      onPageChange={(page) => setParams({ ...params, page })}
      disabled={executions.isPending}
    />
  );
};

export const ExecutionsContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <EntityContainer
      header={<ExecutionsHeader />}
      pagination={<ExecutionsPagination />}
    >
      {children}
    </EntityContainer>
  );
};

export const ExecutionsLoading = () => {
  return <LoadingView message="Loading executions..." />;
};

export const ExecutionsError = () => {
  return <ErrorView message="Error loading executions..." />;
};

export const ExecutionsEmpty = () => {
  return (
    <EmptyView message="No executions found. Get started by running your first workflow." />
  );
};

const getStatusIcon = (status: ExecutionStatus) => {
  switch (status) {
    case "SUCCESS":
      return <CheckCircle2Icon className="size-5 text-green-600" />;
    case "FAILED":
      return <XCircleIcon className="size-5 text-red-600" />;
    case "RUNNING":
      return <Loader2Icon className="size-5 text-blue-600 animate-spin" />;
    default:
      return <ClockIcon className="size-5 text-muted-foreground" />;
  }
};

export const ExecutionsListItem = ({
  execution,
}: {
  execution: Execution & {
    workflow: {
      id: string;
      name: string;
    };
  };
}) => {
  const duration = execution.completedAt
    ? Math.round(
        (new Date(execution.completedAt).getTime() -
          new Date(execution.startedAt).getTime()) /
          1000,
      )
    : null;

  const subtitle = (
    <>
      {execution.workflow.name} &bull; Started{" "}
      {formatDistanceToNow(execution.startedAt, { addSuffix: true })}
      {duration !== null && <> &bull; Took {duration}s </>}
    </>
  );

  const formatStatus = (status: ExecutionStatus) => {
    return status.charAt(0) + status.slice(1).toLocaleLowerCase();
  };
  return (
    <EntityItem
      href={`/executions/${execution.id}`}
      title={formatStatus(execution.status)}
      subtitle={subtitle}
      image={
        <div className="size-8 flex items-center justify-center">
          {getStatusIcon(execution.status)}
        </div>
      }
    />
  );
};
