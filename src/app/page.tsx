import { Button } from "@/components/ui/button";
import { caller } from "@/trpc/server";

const Page = async () => {
  const users = await caller.getUsers();

  return (
    <div>
      <Button>Click Me</Button>
      {JSON.stringify(users)}
    </div>
  );
};

export default Page;
