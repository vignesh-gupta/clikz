"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { SquareArrowOutUpRightIcon } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@clikz/ui/components/ui/tooltip";
import { cn } from "@clikz/ui/lib/utils";

interface MetricItem {
  icon: ReactNode;
  label: string;
  amt: number;
  href?: string;
}

interface MetricBarChartProps {
  items: MetricItem[];
  className?: string;
  barClassName?: string;
  filledBarClassName?: string;
  isLink?: boolean;
  color?: string;
}

export function MetricBarChart({
  items,
  className,
  barClassName,
  filledBarClassName,
  isLink,
}: MetricBarChartProps) {
  if (!items || items.length === 0)
    return (
      <div className="flex items-center justify-center h-full min-h-60">
        No data available
      </div>
    );

  const maxAmt = Math.max(...items.map((item) => item.amt));
  items.sort((a, b) => b.amt - a.amt);

  return (
    <TooltipProvider>
      <div className={cn("space-y-2", className)}>
        {items.map((item, index) => (
          <Tooltip
            delayDuration={0}
            key={`analytics-label-${item.label}-${index}`}
          >
            <div
              className={cn(
                "relative h-10 flex items-center justify-between gap-2 cursor-pointer px-4 py-1 border-l-2 border-transparent hover:bg-opacity-15 hover:border-yellow-600 hover:bg-yellow-300",
                barClassName
              )}
            >
              <div className="relative flex-1 h-full truncate">
                <div
                  className={cn(
                    "h-full rounded-lg bg-opacity-15 bg-yellow-500 absolute inset-y-0 left-0",
                    filledBarClassName
                  )}
                  style={{
                    width: `${(item.amt / maxAmt) * 100}%`,
                  }}
                />

                <TooltipTrigger asChild>
                  <div className="flex items-center h-full gap-2 px-4">
                    <span className="shrink-0">{item.icon}</span>
                    <span className="text-sm font-medium truncate text-primary/80">
                      {item.label}
                    </span>
                  </div>
                </TooltipTrigger>
                {isLink && (
                  <TooltipContent align="start" className="max-w-md">
                    <Link
                      target="_blank"
                      href={item.label}
                      className="inline-flex items-center gap-1 overflow-x-auto text-blue-500 hover:underline underline-offset-2 hover:text-blue-700 line-clamp-2"
                    >
                      {item.label}
                      <SquareArrowOutUpRightIcon className="size-3 shrink-0" />
                    </Link>
                  </TooltipContent>
                )}
              </div>
              {/* Amount on the right */}
              <span className="px-1 text-sm font-medium text-center">
                {item.amt}
              </span>
            </div>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
