"use client";

import { useDebounce } from "use-debounce";

import { Card, CardContent } from "@clikz/ui/components/ui/card";
import { Label } from "@clikz/ui/components/ui/label";

import { BASE_URL } from "~/lib/constants";
import { getUrlWithoutUTMParams } from "~/lib/utils/url";

import { QRCode } from "./qr-code";

type QRPreviewProps = {
  domain?: string;
  slug: string;
};

const QRPreview = ({ domain, slug }: QRPreviewProps) => {
  const [debouncedSlug] = useDebounce(getUrlWithoutUTMParams(slug), 500);

  return (
    <Card className="w-full shadow-none border-none">
      <CardContent className="p-4 space-y-2">
        <Label>QR Code</Label>
        <div className="w-full h-28 bg-gray-200 flex items-center justify-center text-gray-500">
          {debouncedSlug ? (
            <QRCode
              url={`${domain || BASE_URL}/${debouncedSlug}`}
              scale={0.8}
            />
          ) : (
            <p>QR Code will appear here</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QRPreview;
