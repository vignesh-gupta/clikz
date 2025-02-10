"use client";

import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import * as React from "react";
import type { DateRange } from "react-day-picker";

import { Button } from "@clikz/ui/components/ui/button";
import { Calendar } from "@clikz/ui/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@clikz/ui/components/ui/popover";
import { cn } from "@clikz/ui/lib/utils";

interface DateRangePickerProps {
  date?: DateRange | undefined;
  // eslint-disable-next-line no-unused-vars
  onDateChange?: (date: DateRange | undefined) => void;
  className?: string;
}

export function DateRangePicker({
  date,
  onDateChange,
  className,
}: DateRangePickerProps) {
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);

  const presets = [
    {
      label: "Last 24 hours",
      value: "24h",
      dateRange: {
        from: addDays(new Date(), -1),
        to: new Date(),
      },
    },
    {
      label: "Last 7 days",
      value: "7d",
      dateRange: {
        from: addDays(new Date(), -7),
        to: new Date(),
      },
    },
    {
      label: "Last 30 days",
      value: "30d",
      dateRange: {
        from: addDays(new Date(), -30),
        to: new Date(),
      },
    },
    {
      label: "Last 3 months",
      value: "3m",
      dateRange: {
        from: addDays(new Date(), -90),
        to: new Date(),
      },
    },
    {
      label: "Year to Date",
      value: "ytd",
      dateRange: {
        from: new Date(new Date().getFullYear(), 0, 1),
        to: new Date(),
      },
    },
    {
      label: "Last 12 months",
      value: "12m",
      dateRange: {
        from: addDays(new Date(), -365),
        to: new Date(),
      },
    },
    {
      label: "All Time",
      value: "all",
      dateRange: {
        from: addDays(new Date(), -730), // Example: 2 years
        to: new Date(),
      },
    },
  ];

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={onDateChange}
              numberOfMonths={2}
              className="rounded-l-md border-r"
            />
            <div className="grid gap-1 p-3 min-w-[160px]">
              <div className="grid gap-1">
                {presets.map((preset) => (
                  <Button
                    key={preset.value}
                    size="sm"
                    variant="ghost"
                    className="justify-start font-normal"
                    onClick={() => {
                      onDateChange?.(preset.dateRange);
                      setIsCalendarOpen(false);
                    }}
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
