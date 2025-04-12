import Link from "next/link";
import { PropsWithChildren } from "react";

const WorkspaceInviteLayout = ({ children }: PropsWithChildren) => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-green-50 to-blue-50 bg-opacity-80"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
    >
      {children}
      <div className="mt-12 text-sm text-gray-500">
        <p>
          Need help?{" "}
          <Link href="#" className="text-gray-700 underline">
            Contact support
          </Link>
        </p>
      </div>
    </div>
  );
};

export default WorkspaceInviteLayout;
