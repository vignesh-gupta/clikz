"use client";

import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@repo/ui/components/ui/input-otp";
import { RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type VerifyEmailProps = {
  to: string;
  code?: string;
  pwd: string;
};

const RETRY_INTERVAL = 60;

export default function VerifyEmail({ code, to, pwd }: VerifyEmailProps) {
  const [resendStatus, setResendStatus] = useState<"idle" | "sending" | "sent">(
    "sent",
  );
  const [countdown, setCountdown] = useState(RETRY_INTERVAL);
  const [otp, setOtp] = useState(code ?? "");
  const [verificationStatus, setVerificationStatus] = useState<
    "idle" | "verifying"
  >("idle");

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
      body: JSON.stringify({ to, pwd }),
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
    fetch(`/api/auth/verify?to=${to}&code=${otp}&pwd=${pwd}`)
      .then(async (res) =>
        res.ok
          ? toast.success("Email verified successfully") 
          : toast.error(
              (await res.json()).error ?? "Invalid OTP. Please try again.",
            ),
      )
      .catch(() => toast.error("An error occurred. Please try again."))
      .finally(() => setVerificationStatus("idle"));
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
        <div className="text-center">
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
