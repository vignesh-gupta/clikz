import { Check } from "lucide-react";
import * as motion from "motion/react-client";

import { buttonVariants } from "@clikz/ui/components/ui/button";
import { cn } from "@clikz/ui/lib/utils";

const PricingTier = ({
  name,
  price,
  description,
  features,
  isPopular,
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.5,
      delay: name === "Pro" ? 0.2 : name === "Enterprise" ? 0.4 : 0,
    }}
    whileHover={{ y: -5 }}
    className={`flex flex-col p-8 rounded-2xl border-2 ${
      isPopular
        ? "border-blue-500 bg-blue-50/50 shadow-xl relative"
        : "border-gray-200 bg-white shadow-lg"
    }`}
  >
    {isPopular && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          Most Popular
        </span>
      </div>
    )}
    <h3 className="text-xl text-gray-900">{name}</h3>
    <div className="mt-4 flex items-baseline">
      <span className="text-4xl font-bold">{price}</span>
      <span className="text-gray-600 ml-1">/month</span>
    </div>
    <p className="mt-4 text-gray-600">{description}</p>
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={buttonVariants({
        variant: isPopular ? "default" : "outline",
        className: "mt-4  font-semibold",
      })}
    >
      {name === "Free" ? "Start for Free" : `Get ${name}`}
    </motion.button>
    <ul className="mt-6 space-y-3 flex-1">
      {features.map((feature, index) => (
        <motion.li
          key={index}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-start"
        >
          <div className="bg-blue-100 rounded-full p-1 mr-3">
            <Check className="h-4 w-4 text-blue-600" />
          </div>
          <span
            className={cn("text-gray-600", {
              "font-semibold text-primary": feature.includes("Everything "),
            })}
          >
            {feature}
          </span>
        </motion.li>
      ))}
    </ul>
  </motion.section>
);

export default function PricingSection() {
  const pricingTiers = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for trying out our service",
      features: [
        "3 workspaces",
        "30-day analytics retention",
        "5k tracked clicks/month",
        "5 domains",
        "3 users",
        "Basic support",
        "Community Access",
        "API access",
      ],
    },
    {
      name: "Pro",
      price: "$15",
      description: "For professionals and growing teams",
      features: [
        "Everything in Free",
        "Upto 10 workspaces",
        "Upto 50k tracked clicks/month",
        "1 year analytics retention",
        "15 domains",
        "10 users",
        "Advanced Link features",
        "Priority support",
        "Team collaboration",
      ],
      isPopular: true,
    },
    {
      name: "Business",
      price: "$40",
      description: "For large organizations with advanced needs",
      features: [
        "Everything in Pro",
        "Upto 50 workspaces",
        "Upto 100k tracked clicks/month",
        "3 year analytics retention",
        "50 domains",
        "30 users",
        "Real-time Event streaming",
        "Real-time webhook",
      ],
    },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that's right for you. All plans have no hidden fees.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingTiers.map((tier) => (
            <PricingTier key={tier.name} {...tier} />
          ))}
        </div>
      </div>
    </section>
  );
}
