"use client";

import { useState } from "react";

import {
  DateRange,
  DateRangePicker,
} from "@clikz/ui/components/date-range-picker";

const PageFilters = () => {
  const [dateRange, setDate] = useState<DateRange | undefined>();

  return (
    <div>
      <DateRangePicker date={dateRange} onDateChange={(val) => setDate(val)} />
    </div>
  );
};

export default PageFilters;
