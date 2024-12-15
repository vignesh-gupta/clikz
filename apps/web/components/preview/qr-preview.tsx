"use client";

import { useDebounce } from "use-debounce";

import { Card, CardContent } from "@clikz/ui/components/ui/card";
import { Label } from "@clikz/ui/components/ui/label";

import { getUrlWithoutUTMParams } from "~/lib/utils/url";

import { QRCode } from "./qr-code";

type QRPreviewProps = {
  slug: string;
};

const QRPreview = ({ slug }: QRPreviewProps) => {
  const [debouncedSlug] = useDebounce(getUrlWithoutUTMParams(slug), 500);

  return (
    <Card>
      <CardContent className="p-4 space-y-2">
        <Label>QR Code</Label>
        <div className="w-full h-36 bg-gray-200 flex items-center justify-center text-gray-500">
          {debouncedSlug ? (
            <QRCode url={`https://clikz.com/${debouncedSlug}`} scale={1} />
          ) : (
            <p>QR Code will appear here</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QRPreview;
