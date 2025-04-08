import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@clikz/ui/components/ui/card";

import SignUpForm from "~/features/auth/components/sign-up-form";
import SocialLogins from "~/features/auth/components/social-logins";

type SignUpPageProps = {
  searchParams: Promise<{ callbackUrl?: string }>;
};

const SignUpPage = async ({ searchParams }: SignUpPageProps) => {
  const { callbackUrl } = await searchParams;

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl">Create your account</CardTitle>
        <CardDescription>
          Welcome! Please fill in the details to get started.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SocialLogins />

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <SignUpForm />
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center space-y-2">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href={{
              pathname: "/sign-in",
              query: { callbackUrl },
            }}
            className="text-foreground hover:underline underline-offset-2"
          >
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignUpPage;
