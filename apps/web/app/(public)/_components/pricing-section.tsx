"use client";

import { useState } from "react";

import { Check } from "lucide-react";
import * as motion from "motion/react-client";
import AnimatedNumbers from "react-animated-numbers";

import { Button } from "@clikz/ui/components/ui/button";
import { Card, CardContent, CardHeader } from "@clikz/ui/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@clikz/ui/components/ui/tabs";
import { capitalize } from "@clikz/ui/lib/utils";
import { PLANS } from "@clikz/utils/constants";

type PricingCardProps = {
  name: string;
  price: number;
  description: string;
  features: string[];
  buttonText: string;
  buttonDisabled?: boolean;
  isCurrentPlan?: boolean;
  isPopular?: boolean;
};

export const PricingCard = ({
  name,
  price,
  description,
  features,
  buttonText,
  buttonDisabled,
  isCurrentPlan,
  isPopular,
}: PricingCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        scale: 1.01,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: { duration: 0.2 },
      }}
      className="h-full"
    >
      <Card
        className={`relative flex flex-col h-full transition-all duration-300 ${isPopular ? "border-blue-500 shadow-md" : ""}`}
      >
        {isPopular && (
          <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 text-xs font-medium rounded-bl-lg rounded-tr-lg">
            Popular
          </div>
        )}
        {isCurrentPlan && (
          <div className="absolute top-0 left-0 bg-green-500 text-white px-3 py-1 text-xs font-medium rounded-br-lg rounded-tl-lg">
            Current Plan
          </div>
        )}
        <CardHeader className="pb-0">
          <h3 className="text-xl font-bold">{capitalize(name)}</h3>

          <motion.div
            key={`${name}-price`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-baseline mt-2"
          >
            <span className="text-3xl font-bold">
              $
              <AnimatedNumbers animateToNumber={price} />
            </span>
            <span className="ml-1 text-muted-foreground">/month</span>
          </motion.div>
          <p className="text-muted-foreground mb-4 line-clamp-1">
            {description}
          </p>
        </CardHeader>
        <CardContent className="flex-grow">
          <Button
            className="w-full transition-all duration-300 hover:shadow-md my-4"
            disabled={buttonDisabled || isCurrentPlan}
            variant={isCurrentPlan ? "outline" : "default"}
          >
            {buttonText}
          </Button>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <motion.li
                key={index}
                className="flex items-start"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: 0.05 * index }}
              >
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
};

type PricingSectionProps = {
  showHeader?: boolean;
  isPricingPage?: boolean;
  currentPlan?: "FREE" | "PRO" | "ENTERPRISE";
};

export default function PricingSection({
  showHeader,
  isPricingPage,
  currentPlan,
}: PricingSectionProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">(
    "monthly"
  );

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          {showHeader && (
            <>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Choose the plan that's right for you. All plans have no hidden
                fees.
              </p>
            </>
          )}
          <Tabs value={billingCycle} className="w-[400px] mt-4 mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="monthly"
                onClick={() => setBillingCycle("monthly")}
              >
                Monthly
              </TabsTrigger>
              <TabsTrigger
                value="annually"
                onClick={() => setBillingCycle("annually")}
              >
                Annually (3 months free)
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {PLANS.map((plan) => (
            <PricingCard
              key={plan.name}
              {...plan}
              buttonText={
                isPricingPage ? plan.pricingButtonText : plan.buttonText
              }
              isCurrentPlan={plan.name === currentPlan}
              price={
                billingCycle === "monthly"
                  ? plan.price
                  : Math.floor((plan.price * 9) / 12)
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
