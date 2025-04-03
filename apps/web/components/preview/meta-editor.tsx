"use client";

import { ChangeEvent, useEffect, useState } from "react";

import { EditIcon } from "lucide-react";
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

import { LinkSchema } from "~/lib/zod/schemas";

import { ImagePreview } from "./social-preview";

type MetaEditorProps = {
  url?: string;
  loading: boolean;
};

const MetaEditor = ({ loading, url }: MetaEditorProps) => {
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

  const handleUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
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
      <ImagePreview loading={loading} image={url} />
      <div className="flex flex-col space-y-4">
        <FormItem>
          <FormLabel>Title</FormLabel>
          <FormControl>
            <Input
              value={metadata.title}
              name="title"
              onChange={handleUpdate}
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
              onChange={handleUpdate}
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
