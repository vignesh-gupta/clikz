import { IKUpload } from "imagekitio-next";

import WorkspaceAvatar from "~/features/workspace/components/workspace-avatar";

type AvatarUploadProps = {
  slug: string;
};

const AvatarUpload = ({ slug }: AvatarUploadProps) => {
  const onError = (err: any) => {
    console.log("Error", err);
  };

  const onSuccess = (res: any) => {
    console.log("Success", res);
  };
  return (
    <div className="relative size-24 rounded-full border-2">
      <WorkspaceAvatar name={slug} className="size-full" />
      <IKUpload
        useUniqueFileName
        className="absolute inset-0 size-full cursor-pointer opacity-0"
        onError={onError}
        onSuccess={onSuccess}
        accept="image/png,image/jpeg"
        validateFile={(file) => file.size < 2 * 1024 * 1024} // 2MB
      />
    </div>
  );
};

export default AvatarUpload;
