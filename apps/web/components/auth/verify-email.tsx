"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { BadgeCheck, CircleX, RefreshCw } from "lucide-react";
import { toast } from "sonner";

import { Button, buttonVariants } from "@clikz/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@clikz/ui/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@clikz/ui/components/ui/input-otp";
import { cn } from "@clikz/ui/lib/utils";

type VerifyEmailProps = {
  to: string;
  code?: string;
};

const RETRY_INTERVAL = 0;

export default function VerifyEmail({ code, to }: VerifyEmailProps) {
  const [resendStatus, setResendStatus] = useState<"idle" | "sending" | "sent">(
    "sent"
  );
  const [countdown, setCountdown] = useState(RETRY_INTERVAL);
  const [otp, setOtp] = useState(code ?? "");
  const [verificationStatus, setVerificationStatus] = useState<
    "idle" | "verifying" | "verified" | "failed"
  >("idle");
  const [message, setMessage] = useState<string | null>(null);

  // Handle countdown for resend OTP
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (resendStatus === "sent" && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendStatus, countdown]);

  // Reset countdown and reset button state when it reaches 0
  useEffect(() => {
    if (countdown === 0) {
      setResendStatus("idle");
      setCountdown(RETRY_INTERVAL);
    }
  }, [countdown]);

  const handleResendOtp = async () => {
    setResendStatus("sending");
    await fetch("/api/auth/verify", {
      method: "POST",
      body: JSON.stringify({ to }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => setResendStatus("sent"))
      .catch(() => setResendStatus("idle"));
  };

  const handleVerifyOtp = () => {
    if (otp.length !== 6 || verificationStatus === "verifying") return;

    setVerificationStatus("verifying");
    fetch(`/api/auth/verify?to=${to}&code=${otp}`)
      .then(async (res) => {
        if (res.ok) {
          setVerificationStatus("verified");
          setMessage("Email verified successfully.");
        } else {
          setVerificationStatus("failed");
          const data = await res.json();
          setMessage(data.error);
        }
      })
      .catch(() => toast.error("An error occurred. Please try again."));
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center">Verify your email</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-center text-sm text-muted-foreground">
          Enter the 6-digit code we sent to {to ?? "your email"} to verify your
          account.
        </p>
        <div className="flex justify-center space-x-2">
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        {verificationStatus === "verified" && (
          <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-emerald-500 w-full justify-center">
            <BadgeCheck className="size-4" />
            <p>{message}</p>
          </div>
        )}
        {verificationStatus === "failed" && (
          <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-destructive-foreground w-full justify-center">
            <CircleX className="size-4" />
            <p>{message}</p>
          </div>
        )}

        {verificationStatus !== "verified" ? (
          <div className="text-center space-y-3">
            <Button
              onClick={handleVerifyOtp}
              disabled={otp.length !== 6 || verificationStatus === "verifying"}
              className="w-full flex items-center justify-center"
            >
              {verificationStatus === "verifying" ? (
                <>
                  <RefreshCw className="mr-1 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify OTP"
              )}
            </Button>
            <Button
              variant="outline"
              onClick={handleResendOtp}
              disabled={resendStatus === "sending" || resendStatus === "sent"}
              className="w-full"
            >
              {resendStatus === "sending" ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : resendStatus === "sent" ? (
                <>Resend in {countdown}s</>
              ) : (
                "Resend OTP"
              )}
            </Button>
          </div>
        ) : (
          <Link
            href="/sign-in"
            className={cn(buttonVariants({ className: "w-full" }))}
          >
            Back to login
          </Link>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Didn't sign up for an account?
        </p>
        <Button variant="link">Contact support</Button>
      </CardFooter>
    </Card>
  );
}
