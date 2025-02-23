"use client";

import { useState } from "react";

import { IKUpload } from "imagekitio-next";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { Upload } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import { useUpdateUser } from "~/features/auth/api/use-update-user";
import UserAvatar from "~/features/auth/components/user-avatar";
import { urlEndpoint } from "~/lib/image-kit";

type UserAvatarUploadProps = {
  userId: string;
  email: string;
};

const UserAvatarUpload = ({ email, userId }: UserAvatarUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { mutate: updateUser } = useUpdateUser();
  const { data } = useSession();

  const onError = (err: any) => {
    console.log("Error", err);
    toast.error("Failed to upload image. Please try again.");
    setIsUploading(false);
  };

  const onSuccess = (res: IKUploadResponse) => {
    updateUser({
      json: {
        image: `${urlEndpoint}/avatars/tr:w-100,h-100/${res.name}`,
        email,
      },
      param: { userId },
    });
    setIsUploading(false);
  };

  if (!data?.user) return null;

  const { image } = data.user;

  return (
    <div className="relative border-2 rounded-full size-24 group shrink-0">
      <UserAvatar
        email={email}
        image={image}
        isLoading={isUploading}
        className="size-24"
      />

      <div className="absolute inset-0 items-center justify-center hidden rounded-full bg-black/60 group-hover:flex">
        <label htmlFor="avatar-upload" className="cursor-pointer">
          <Upload className="w-6 h-6 text-white" />
          <span className="sr-only">Upload new avatar</span>
        </label>
      </div>
      <IKUpload
        className="absolute inset-0 opacity-0 cursor-pointer size-full"
        onError={onError}
        onSuccess={onSuccess}
        onUploadStart={() => setIsUploading(true)}
        accept="image/png,image/jpeg"
        validateFile={(file) => file.size < 2 * 1024 * 1024} // 2MB
        folder="/avatars"
        overwriteFile={true}
        fileName={userId}
        tags={["avatar"]}
      />
    </div>
  );
};

export default UserAvatarUpload;
