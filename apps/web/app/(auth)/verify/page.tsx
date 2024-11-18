import { redirect } from "next/navigation";
import VerifyEmail from "~/components/auth/verify-email";

type VerifyPageProps = {
  searchParams: {
    to?: string;
    code?: string;
    pwd?: string;
  };
};

const VerifyPage = async ({
  searchParams: { to, code, pwd },
}: VerifyPageProps) => {
  if (!to || !pwd) redirect("/sign-up");

  return <VerifyEmail to={to} code={code} pwd={pwd} />;
};

export default VerifyPage;
