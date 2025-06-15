import Link from "next/link";

import {
  ArrowLeftIcon,
  CheckCircleIcon,
  CreditCardIcon,
  MailIcon,
  XCircleIcon,
} from "lucide-react";

import { Button } from "@clikz/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@clikz/ui/components/ui/card";
import { getStripeSessionDetails } from "@clikz/utils/functions";

type SubscriptionCompletePageProps = {
  searchParams: Promise<{
    sessionId: string;
  }>;
};

const SubscriptionCompletePage = async ({
  searchParams,
}: SubscriptionCompletePageProps) => {
  const { sessionId } = await searchParams;

  const stripeSession = await getStripeSessionDetails(sessionId);

  const getStatusConfig = () => {
    switch (stripeSession.success) {
      case true:
        return {
          icon: <CheckCircleIcon className="h-16 w-16 text-green-500" />,
          title: "Subscription Successful!",
          description:
            "Welcome to Clikz Pro! Your subscription is now active and you can start creating unlimited short links.",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
        };
      case false:
        return {
          icon: <XCircleIcon className="h-16 w-16 text-red-500" />,
          title: "Payment Failed",
          description:
            "We couldn't process your payment. Please check your payment details and try again.",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
        };
    }
  };

  const config = getStatusConfig();

  return (
    <Card className={`${config.bgColor} ${config.borderColor} border-2`}>
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-4">{config.icon}</div>
        <CardTitle className="text-2xl font-bold text-gray-900">
          {config.title}
        </CardTitle>
        <CardDescription className="text-gray-600 text-base">
          {config.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {stripeSession.success && (
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

        {stripeSession.success && (
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
                <Link href="/dashboard">
                  <CreditCardIcon className="h-4 w-4 mr-2" />
                  Try Again
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link href="/support">
                  <MailIcon className="h-4 w-4 mr-2" />
                  Contact Support
                </Link>
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
};

export default SubscriptionCompletePage;
