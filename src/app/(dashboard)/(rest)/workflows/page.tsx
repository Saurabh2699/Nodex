import { requireAuth } from "@/lib/auth-util";

const Page = async () => {
  await requireAuth();
  return <div>Page</div>;
};

export default Page;
