import { GlobeIcon, LinkIcon, SparklesIcon, UsersIcon } from "lucide-react";

import { cn } from "@clikz/ui/lib/utils";

const Usage = () => {
  return (
    <>
      <UsageCardWithProgress
        icon={<LinkIcon className="size-5 text-primary" />}
        title="Links created"
        current={1}
        total={25}
        progressColor="bg-blue-500"
        className="md:border-r"
      />

      {/* Events Tracked Card */}
      <UsageCardWithProgress
        icon={<SparklesIcon className="size-5 text-primary" />}
        title="Events tracked"
        current={1}
        total={1000}
        progressColor="bg-blue-500"
      />

      {/* Custom Domains Card */}
      <UsageCardSimple
        icon={<GlobeIcon className="size-5" />}
        title="Custom Domains"
        current={0}
        total={3}
        className="md:border-r"
      />

      {/* Teammates Card */}
      <UsageCardSimple
        icon={<UsersIcon className="size-5" />}
        title="Teammates"
        current={1}
        total={1}
      />
    </>
  );
};

export default Usage;

function UsageCardWithProgress({
  icon,
  title,
  current,
  total,
  progressColor = "bg-blue-500",
  className,
}: {
  icon: React.ReactNode;
  title: string;
  current: number;
  total: number;
  progressColor?: string;
  className?: string;
}) {
  const progressWidth = `${(current / total) * 100}%`;

  return (
    <div className={cn("p-6 border-b", className)}>
      <div className="flex items-center gap-2 text-muted-foreground mb-2">
        {icon}
        <span>{title}</span>
      </div>
      <div className="text-3xl font-bold mb-4">1</div>
      <div className="h-1.5 w-full bg-gray-100 rounded-full mb-2">
        <div
          className={`h-full rounded-full ${progressColor}`}
          style={{ width: progressWidth }}
        />
      </div>
      <div className="text-sm text-muted-foreground">
        {total - current} remaining of {total}
      </div>
    </div>
  );
}

// Component for Domains and Teammates cards
function UsageCardSimple({
  icon,
  title,
  current,
  total,
  className,
}: {
  icon: React.ReactNode;
  title: string;
  current: number;
  total: number;
  className?: string;
}) {
  return (
    <div className={cn("p-6", className)}>
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span>{title}</span>
      </div>
      <div className="text-lg font-semibold">
        {current}{" "}
        <span className="text-muted-foreground font-normal">/ {total}</span>
      </div>
    </div>
  );
}
