import RegionAnalytics from "~/app/app.clikz/(dashboard)/[slug]/analytics/_components/region-analytics";
import UrlAnalytics from "~/app/app.clikz/(dashboard)/[slug]/analytics/_components/url-analytics";
import { getAnalytics } from "~/lib/analytics/fetch-analytics";

import { PageWithSlugParams } from "../page";

const AnalyticsPage = async ({ params }: PageWithSlugParams) => {
  const { slug } = await params;
  const data = await getAnalytics(slug, 7);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <UrlAnalytics data={data} />
      <RegionAnalytics data={data} />
    </div>
  );
};

export default AnalyticsPage;
