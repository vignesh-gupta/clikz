type TPlanName = "FREE" | "PRO" | "ENTERPRISE";

type TPlan = {
  name: TPlanName;
  price: number;
  priceId: string;
  priceIdAnnual: string;
  description: string;
  features: string[];
  isPopular: boolean;
  buttonText: string;
  pricingButtonText: string;
};

export const PLANS: TPlan[] = [
  {
    name: "FREE",
    price: 0,
    priceId: "0",
    priceIdAnnual: "0",
    description: "Perfect for trying out our service",
    features: [
      "3 workspaces",
      "30-day analytics retention",
      "5k tracked clicks/month",
      "1 domains",
      "3 users",
      "Basic support",
      "Community Access",
      "API access",
    ],
    isPopular: false,
    buttonText: "Get Started",
    pricingButtonText: "Current Plan",
  },
  {
    name: "PRO",
    price: 15,
    priceId: "price_1RQ4LUSHHMaQdLZi6YymvHQw",
    priceIdAnnual: "price_1RQ4gASHHMaQdLZi5eCVPCo5",
    description: "For professionals and growing teams",
    features: [
      "Everything in Free",
      "Upto 10 workspaces",
      "Upto 50k tracked clicks/month",
      "1 year analytics retention",
      "5 domains",
      "10 users",
      "Advanced Link features",
      "Priority support",
      "Team collaboration",
    ],
    isPopular: true,
    buttonText: "Get Pro",
    pricingButtonText: "Upgrade to Pro",
  },
  {
    name: "ENTERPRISE",
    price: 40,
    priceId: "price_1RQ4uvSHHMaQdLZipuCuPkoy",
    priceIdAnnual: "price_1RQ4wDSHHMaQdLZilkiMDxQW",
    description: "For large organizations with advanced needs",
    features: [
      "Everything in Pro",
      "Upto 50 workspaces",
      "Upto 100k tracked clicks/month",
      "3 year analytics retention",
      "10 domains",
      "30 users",
      "Real-time Event streaming",
      "Real-time webhook",
    ],
    isPopular: false,
    buttonText: "Get Business",
    pricingButtonText: "Upgrade to Enterprise",
  },
];

const PLANS_BENEFITS: Record<
  TPlanName,
  { maxLinks: number; maxUsers: number; maxDomains: number }
> = {
  FREE: { maxLinks: 25, maxUsers: 3, maxDomains: 5 },
  PRO: { maxLinks: 50000, maxUsers: 10, maxDomains: 15 },
  ENTERPRISE: { maxLinks: 100000, maxUsers: 30, maxDomains: 50 },
};

export const getPlanByName = (name: TPlanName) => {
  return PLANS_BENEFITS[name];
};
