import { CircleDashed, CircleDot, CircleEqual } from "lucide-react";

import ClickAnalytics from "~/components/analytics/click-analytics";
import { getAnalytics } from "~/lib/analytics/fetch-analytics";

import { PageWithSlugParams } from "../page";
import { MetricBarChart } from "./metric-chart";

const AnalyticsPage = async ({ params }: PageWithSlugParams) => {
  const { slug } = await params;
  const data = await getAnalytics(slug, 7);

  const items = [
    {
      icon: <CircleDot className="h-4 w-4" />,
      label: "Text1",
      amt: 30,
    },
    {
      icon: <CircleEqual className="h-4 w-4" />,
      label: "Text2",
      amt: 15,
    },
    {
      icon: <CircleDashed className="h-4 w-4" />,
      label: "Text3",
      amt: 15,
    },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <ClickAnalytics data={data} />
      <MetricBarChart items={items} />
    </div>
  );
};

export default AnalyticsPage;
