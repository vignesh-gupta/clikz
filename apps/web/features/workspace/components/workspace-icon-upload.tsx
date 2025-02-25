"use client";

import { useState } from "react";

import { IKUpload } from "imagekitio-next";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { Upload } from "lucide-react";
import { toast } from "sonner";

import { useUpdateWorkspace } from "~/features/workspace/api/workspace/use-update-workspace";
import WorkspaceIcon from "~/features/workspace/components/workspace-icon";
import { urlEndpoint } from "~/lib/image-kit";

type IconUploadProps = {
  slug: string;
  icon?: string | null;
};

const IconUpload = ({ slug, icon }: IconUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { mutate: updateWorkspace } = useUpdateWorkspace();

  const onError = (err: any) => {
    console.log("Error", err);
    toast.error("Failed to upload image. Please try again.");
    setIsUploading(false);
  };

  const onSuccess = (res: IKUploadResponse) => {
    updateWorkspace({
      json: { icon: `${urlEndpoint}tr:w-100,h-100/${res.name}` },
      param: { idOrSlug: slug },
    });
    setIsUploading(false);
  };

  return (
    <div className="relative border-2 rounded-full size-24 group shrink-0">
      <WorkspaceIcon
        image={icon}
        name={slug}
        className="size-full"
        isLoading={isUploading}
      />

      <div className="absolute inset-0 items-center justify-center hidden rounded-full bg-black/60 group-hover:flex">
        <label htmlFor="avatar-upload" className="cursor-pointer">
          <Upload className="w-6 h-6 text-white" />
          <span className="sr-only">Upload new avatar</span>
        </label>
      </div>
      <IKUpload
        useUniqueFileName
        className="absolute inset-0 opacity-0 cursor-pointer size-full"
        onError={onError}
        onSuccess={onSuccess}
        onUploadStart={() => setIsUploading(true)}
        accept="image/png,image/jpeg"
        validateFile={(file) => file.size < 2 * 1024 * 1024} // 2MB
      />
    </div>
  );
};

export default IconUpload;
