import { LoginForm } from "@/features/auth/components/login-form";
import { requireUnauth } from "@/lib/auth-util";

const Page = async () => {
  await requireUnauth();
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default Page;
