import Link from "next/link";

import { Button } from "@clikz/ui/components/ui/button";
import { Card, CardContent, CardHeader } from "@clikz/ui/components/ui/card";
import { STRIPE_BILLING_URL } from "@clikz/utils/constants";

import Invoices from "./_components/invoices";
import Usage from "./_components/usage";

const WorkspaceBillingPage = () => {
  return (
    <div className="container py-6 space-y-8">
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row justify-between border-b-2">
          <div>
            <h2 className="text-lg font-semibold">Free Plan</h2>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold">Current billing cycle:</span>
              Apr 15, 2025 - May 14, 2025
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" asChild>
              <Link target="_blank" href={STRIPE_BILLING_URL}>
                Upgrade
              </Link>
            </Button>
            <Button size="sm" variant="outline" asChild>
              <Link href="billing/invoices">View Invoices</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-0">
          <Usage />
        </CardContent>
      </Card>

      <Invoices />
    </div>
  );
};

export default WorkspaceBillingPage;
