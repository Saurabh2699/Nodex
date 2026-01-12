import { requireAuth } from "@/lib/auth-util";

const Page = async () => {
  await requireAuth();
  return <div>Credentials</div>;
};

export default Page;
