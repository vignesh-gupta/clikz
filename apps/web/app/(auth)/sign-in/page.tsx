"use client";

import { Alert, AlertDescription } from "@repo/ui/components/ui/alert";
import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import { AlertCircle } from "lucide-react";
import { FormEvent, useState } from "react";
import { FaDiscord, FaGithub, FaGoogle } from "react-icons/fa";
import SocialLogin from "~/components/auth/social-login";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the sign-in logic
    // For this example, we'll just show an error if the fields are empty
    if (!email || !password) {
      setError("Please fill in all fields");
    } else {
      setError("");
      // Handle sign-in logic here
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center text-blue-600">
            ZAP
          </CardTitle>
          <CardDescription className="text-center">
            Sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Sign In
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <SocialLogin provider="github" label="Github" Icon={FaGithub} />
            <SocialLogin provider="google" label="Google" Icon={FaGoogle} />
            <SocialLogin provider="discord" label="Discord" Icon={FaDiscord} />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?
          </p>
          <Button variant="link" className="text-blue-600">
            Sign up
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
