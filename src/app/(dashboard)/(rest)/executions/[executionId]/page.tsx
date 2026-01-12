import { requireAuth } from "@/lib/auth-util";

interface PageProps {
  params: Promise<{
    executionId: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  await requireAuth();
  const { executionId } = await params;
  return <div>Execution Id: {executionId}</div>;
};

export default Page;
 