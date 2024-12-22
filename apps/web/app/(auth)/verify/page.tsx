import { redirect } from "next/navigation";

import VerifyEmail from "~/components/auth/verify-email";

type VerifyPageProps = {
  searchParams: Promise<{ to: string; code: string }>;
};

const VerifyPage = async ({ searchParams }: VerifyPageProps) => {
  const { to, code } = await searchParams;

  if (!to) redirect("/sign-up");

  return <VerifyEmail to={to} code={code} />;
};

export default VerifyPage;
