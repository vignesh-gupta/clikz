import RegionAnalytics from "~/app/app.clikz/(dashboard)/[slug]/analytics/_components/region-analytics";
import UrlAnalytics from "~/app/app.clikz/(dashboard)/[slug]/analytics/_components/url-analytics";
import { getAnalytics } from "~/lib/analytics/fetch-analytics";

import { PageWithSlugParams } from "../page";
import DeviceAnalytics from "./_components/device-analytics";

const AnalyticsPage = async ({ params }: PageWithSlugParams) => {
  const { slug } = await params;
  const data = await getAnalytics(slug, 7);

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-semibold leading-7 text-neutral-900 md:text-2xl">
        Analytics
      </h1>
      <div className="grid md:grid-cols-2 gap-6">
        <UrlAnalytics data={data} />

        <RegionAnalytics data={data} />
        <DeviceAnalytics data={data} />
      </div>
    </div>
  );
};

export default AnalyticsPage;
