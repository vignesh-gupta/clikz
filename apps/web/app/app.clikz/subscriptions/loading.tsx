import Link from "next/link";

import { ArrowLeft, Loader2 } from "lucide-react";

import { Button } from "@clikz/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@clikz/ui/components/ui/card";

const SubscriptionLoadingPage = () => {
  return (
    <Card className="bg-blue-50 border-blue-200 border-2">
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-4">
          <Loader2 className="h-16 w-16 text-blue-500 animate-spin" />
        </div>
        <CardTitle className="text-2xl font-bold text-gray-900">
          Processing Your Subscription
        </CardTitle>
        <CardDescription className="text-gray-600 text-base">
          Please wait while we confirm your payment and set up your account.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="text-center">
          <p className="text-sm text-gray-500">
            This may take a few moments...
          </p>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <Button variant="ghost" asChild className="w-full">
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionLoadingPage;
