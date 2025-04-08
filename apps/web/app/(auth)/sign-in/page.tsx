import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@clikz/ui/components/ui/card";

import SignInForm from "~/features/auth/components/sign-in-form";
import SocialLogins from "~/features/auth/components/social-logins";

type SignInPageProps = {
  searchParams: Promise<{ callbackUrl?: string }>;
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const { callbackUrl } = await searchParams;

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl">Sign in to clikz</CardTitle>
        <CardDescription>
          Welcome back! Please sign in to continue
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

        <SignInForm />
        <div className="mt-4 text-center">
          <Link href="#">Forgot password?</Link>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center space-y-2">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href={{
              pathname: "/sign-up",
              query: { callbackUrl },
            }}
            className="text-foreground hover:underline underline-offset-2"
          >
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
