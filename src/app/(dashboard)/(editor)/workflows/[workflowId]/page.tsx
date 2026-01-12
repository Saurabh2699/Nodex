import { requireAuth } from "@/lib/auth-util";

interface PageProps {
  params: Promise<{
    workflowId: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  await requireAuth();
  const { workflowId } = await params;
  return <div>Workflow Id: {workflowId}</div>;
};

export default Page;
 