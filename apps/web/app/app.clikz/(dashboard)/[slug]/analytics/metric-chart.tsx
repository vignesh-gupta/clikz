"use client";

import type { ReactNode } from "react";

import { cn } from "@clikz/ui/lib/utils";

interface MetricItem {
  icon: ReactNode;
  label: string;
  amt: number;
}

interface MetricBarChartProps {
  items: MetricItem[];
  className?: string;
  barClassName?: string;
  filledBarClassName?: string;
}

export function MetricBarChart({
  items,
  className,
  barClassName,
  filledBarClassName,
}: MetricBarChartProps) {
  const maxAmt = Math.max(...items.map((item) => item.amt));
  items.sort((a, b) => b.amt - a.amt);

  return (
    <div className={cn("space-y-4", className)}>
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            "h-8 flex items-center justify-between gap-2",
            barClassName
          )}
        >
          {/* Bar background */}
          <div
            className={cn(
              "h-full rounded-lg bg-yellow-500 bg-opacity-15",
              filledBarClassName
            )}
            style={{
              width: `${(item.amt / maxAmt) * 100}%`,
            }}
          >
            {/* Label and icon container */}
            <div className="flex h-full items-center gap-2 px-4">
              <span className="shrink-0">{item.icon}</span>
              <span className="text-sm font-medium text-primary/80 truncate">
                {item.label}
              </span>
            </div>
          </div>
          {/* Amount on the right */}
          <span className="text-sm font-medium">{item.amt}</span>
        </div>
      ))}
    </div>
  );
}
