import { requireAuth } from "@/lib/auth-util";

const Page = async () => {

  await requireAuth();

  return (
    <div className="min-h-screen min-w-screen flex-items-center justify-center">
      Hello
    </div>
  );
};

export default Page;
