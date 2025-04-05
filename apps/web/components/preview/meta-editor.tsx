"use client";

import { useEffect, useState } from "react";

import { IKUpload } from "imagekitio-next";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { EditIcon, ImageIcon, Upload } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

import ResponsiveModel from "@clikz/ui/components/responsive-dialog";
import { Button } from "@clikz/ui/components/ui/button";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@clikz/ui/components/ui/form";
import { Input } from "@clikz/ui/components/ui/input";
import { Skeleton } from "@clikz/ui/components/ui/skeleton";
import { cn } from "@clikz/ui/lib/utils";

import { LinkSchema } from "~/lib/zod/schemas";

type MetaEditorProps = {
  loading: boolean;
};

const MetaEditor = ({ loading }: MetaEditorProps) => {
  const form = useFormContext<LinkSchema>();

  const [open, setOpen] = useState(false);
  const [metadata, setMetadata] = useState({
    title: "",
    description: "",
    image: "",
  });

  const [title, description, image] = form.watch([
    "title",
    "description",
    "image",
  ]);

  useEffect(() => {
    setMetadata({
      title: title || "",
      description: description || "",
      image: image || "",
    });
  }, [title, description, image]);

  const handleUpdate = (
    name: "title" | "description" | "image",
    value: string
  ) => {
    setMetadata((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    form.setValue("title", metadata.title);
    form.setValue("description", metadata.description);
    form.setValue("image", metadata.image);
    setOpen(false);
    toast.success("Metadata updated successfully!");
  };

  return (
    <ResponsiveModel
      title="Edit Metadata"
      open={open}
      onOpen={setOpen}
      trigger={
        <Button
          size="sm"
          className="absolute z-10 hidden text-black bg-white right-4 top-4 group-hover:inline-flex"
          variant="secondary"
        >
          <EditIcon /> Edit
        </Button>
      }
    >
      <MetaImagePreview
        loading={loading}
        image={metadata.image}
        onUpload={(url) => handleUpdate("image", url)}
      />
      <div className="flex flex-col space-y-4">
        <FormItem>
          <FormLabel>Title</FormLabel>
          <FormControl>
            <Input
              value={metadata.title}
              name="title"
              onChange={(e) => handleUpdate("title", e.target.value)}
              placeholder="Enter a title"
              maxLength={100}
            />
          </FormControl>
          <FormMessage className="ml-2 text-xs" />
        </FormItem>
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Input
              value={metadata.description}
              name="description"
              onChange={(e) => handleUpdate("description", e.target.value)}
              placeholder="Enter a description"
              maxLength={200}
            />
          </FormControl>
          <FormMessage className="ml-2 text-xs" />
        </FormItem>

        <Button type="button" onClick={handleSave}>
          Save
        </Button>
      </div>
    </ResponsiveModel>
  );
};

export default MetaEditor;

type ImagePreviewProps = {
  image?: string;
  loading: boolean;
  className?: string;
  // eslint-disable-next-line no-unused-vars
  onUpload: (url: string) => void;
};

const MetaImagePreview = ({
  image,
  loading,
  className,
  onUpload,
}: ImagePreviewProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const onError = (err: any) => {
    console.log("Error", err);
    toast.error("Failed to upload image. Please try again.");
    setIsUploading(false);
  };

  const onSuccess = (res: IKUploadResponse) => {
    onUpload(res.url);
    setIsUploading(false);
  };

  if (loading || isUploading) {
    return <Skeleton className="w-full h-48 aspect-[2/1]" />;
  }

  return (
    <div className="relative overflow-hidden rounded-xl group shrink-0 w-full h-48 aspect-[2/1]">
      <div
        className={cn(
          "relative aspect-[2/1] w-full overflow-hidden  border border-gray-300 bg-gray-100",
          className
        )}
      >
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt="Preview"
            className="relative size-full rounded-[inherit] object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4 bg-white size-full">
            <ImageIcon className="text-gray-400 size-8" />
            <p className="text-sm text-gray-400">No Image</p>
          </div>
        )}
      </div>

      <div className="absolute inset-0 items-center justify-center flex-col text-white hidden bg-gray-500/30 group-hover:flex">
        <Upload className="size-6" />
        <span>Upload thumbnail</span>
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
