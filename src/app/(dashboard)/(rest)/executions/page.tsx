import { requireAuth } from "@/lib/auth-util";

const Page = async () => {
  await requireAuth();

  return <div>Executions</div>;
};

export default Page;
