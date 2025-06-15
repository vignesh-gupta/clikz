"use client";

import Link from "next/link";

import {
  AlertCircle,
  ArrowLeftIcon,
  CreditCard,
  CreditCardIcon,
  Mail,
} from "lucide-react";

import { Button } from "@clikz/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@clikz/ui/components/ui/card";

export default function CancelledPage() {
  return (
    <Card className="bg-orange-50 border-orange-200 border-2">
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-4">
          <AlertCircle className="h-16 w-16 text-orange-500" />
        </div>
        <CardTitle className="text-2xl font-bold text-gray-900">
          Subscription Cancelled
        </CardTitle>
        <CardDescription className="text-gray-600 text-base">
          Your subscription process was cancelled. You can try again anytime to
          unlock Clikz Pro features.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {status === "loading" && (
          <div className="text-center">
            <p className="text-sm text-gray-500">
              This may take a few moments...
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <h3 className="font-semibold text-gray-900 mb-2">What's Next?</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Create unlimited short links</li>
                <li>Access advanced analytics</li>
                <li>Use your custom domain</li>
                <li>Priority support</li>
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              <Button asChild className="w-full">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link href="/links/create">Create Your First Link</Link>
              </Button>
            </div>
          </div>
        )}

        {status === "failed" && (
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 border border-red-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                Common Issues:
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Insufficient funds</li>
                <li>Expired card</li>
                <li>Incorrect billing information</li>
                <li>Bank security restrictions</li>
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              <Button asChild className="w-full">
                <Link href="/subscription/plans">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Try Again
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link href="/support">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Support
                </Link>
              </Button>
            </div>
          </div>
        )}

        {status === "cancelled" && (
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 border border-orange-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                Clikz Pro Features:
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Unlimited link creation</li>
                <li>Advanced analytics & insights</li>
                <li>Custom domain support</li>
                <li>Team collaboration tools</li>
                <li>Priority customer support</li>
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              <Button asChild className="w-full">
                <Link href="/subscription/plans">
                  <CreditCardIcon className="h-4 w-4 mr-2" />
                  View Plans
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link href="/dashboard">Continue with Free Plan</Link>
              </Button>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-gray-200">
          <Button variant="ghost" asChild className="w-full">
            <Link href="/dashboard">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
