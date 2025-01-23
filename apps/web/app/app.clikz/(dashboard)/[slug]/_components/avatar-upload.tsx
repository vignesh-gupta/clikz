"use client";

import { useState } from "react";

import { IKUpload } from "imagekitio-next";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { Upload } from "lucide-react";
import { toast } from "sonner";

import { useUpdateWorkspace } from "~/features/workspace/api/workspace/use-update-workspace";
import WorkspaceAvatar from "~/features/workspace/components/workspace-avatar";
import { urlEndpoint } from "~/lib/image-kit";

type AvatarUploadProps = {
  workspaceId: string;
  slug: string;
  icon?: string;
};

const AvatarUpload = ({ slug, workspaceId, icon }: AvatarUploadProps) => {
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
      param: { workspaceId },
    });
    setIsUploading(false);
  };

  return (
    <div className="relative size-24 rounded-full border-2 group">
      <WorkspaceAvatar
        image={icon}
        name={slug}
        className="size-full"
        isLoading={isUploading}
      />

      <div className="hidden absolute inset-0 bg-black/60  rounded-full group-hover:flex items-center justify-center">
        <label htmlFor="avatar-upload" className="cursor-pointer">
          <Upload className="h-6 w-6 text-white" />
          <span className="sr-only">Upload new avatar</span>
        </label>
      </div>
      <IKUpload
        useUniqueFileName
        className="absolute inset-0 size-full cursor-pointer opacity-0"
        onError={onError}
        onSuccess={onSuccess}
        onUploadStart={() => setIsUploading(true)}
        accept="image/png,image/jpeg"
        validateFile={(file) => file.size < 2 * 1024 * 1024} // 2MB
      />
    </div>
  );
};

export default AvatarUpload;
