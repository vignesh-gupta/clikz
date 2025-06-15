import Link from "next/link";

type SubscriptionLayoutProps = {
  children: React.ReactNode;
};

const SubscriptionLayout = ({ children }: SubscriptionLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {children}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Need help?{" "}
            <Link
              href="/support"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionLayout;
