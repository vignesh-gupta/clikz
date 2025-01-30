import { getAnalytics } from "~/lib/analytics/fetch-analytics";

import { PageWithSlugParams } from "../page";

const AnalyticsPage = async ({ params }: PageWithSlugParams) => {
  const { slug } = await params;
  const data = await getAnalytics(slug);

  console.log(data);

  return <div>AnalyticsPage</div>;
};

export default AnalyticsPage;
