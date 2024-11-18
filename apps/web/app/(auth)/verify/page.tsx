import { redirect } from "next/navigation";
import VerifyEmail from "~/components/auth/verify-email";

type VerifyPageProps = {
  searchParams: {
    to?: string;
    code?: string;
  };
};

const VerifyPage = async ({ searchParams: { to, code } }: VerifyPageProps) => {
  if (!to) redirect("/sign-up");

  return <VerifyEmail to={to} code={code} />;
};

export default VerifyPage;
