import { Check } from "lucide-react";
import * as motion from "motion/react-client";

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
  <motion.div
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
    <h3 className="text-2xl font-bold text-gray-900">{name}</h3>
    <div className="mt-4 flex items-baseline">
      <span className="text-5xl font-bold">{price}</span>
      {price !== "Free" && <span className="text-gray-600 ml-2">/month</span>}
    </div>
    <p className="mt-4 text-gray-600">{description}</p>
    <ul className="mt-8 space-y-4 flex-1">
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
          <span className="text-gray-600">{feature}</span>
        </motion.li>
      ))}
    </ul>
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`mt-8 w-full py-3 px-4 rounded-xl font-medium transition-colors ${
        isPopular
          ? "bg-blue-600 text-white hover:bg-blue-700"
          : "bg-gray-900 text-white hover:bg-gray-800"
      }`}
    >
      Get Started
    </motion.button>
  </motion.div>
);

export default function PricingSection() {
  const pricingTiers = [
    {
      name: "Free",
      price: "Free",
      description: "Perfect for trying out our service",
      features: [
        "Up to 5 projects",
        "Basic analytics",
        "24/7 support",
        "Community access",
      ],
    },
    {
      name: "Pro",
      price: "$29",
      description: "For professionals and growing teams",
      features: [
        "Unlimited projects",
        "Advanced analytics",
        "Priority support",
        "Team collaboration",
        "Custom integrations",
        "API access",
      ],
      isPopular: true,
    },
    {
      name: "Enterprise",
      price: "$99",
      description: "For large organizations with advanced needs",
      features: [
        "Everything in Pro",
        "Dedicated support",
        "Custom deployment",
        "Advanced security",
        "SLA guarantee",
        "Custom training",
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
            Choose the plan that's right for you. All plans include 14-day free
            trial.
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
