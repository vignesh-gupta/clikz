"use client";

import { Dispatch, SetStateAction, useEffect } from "react";

import { useFormContext } from "react-hook-form";
import { useDebounce } from "use-debounce";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@clikz/ui/components/ui/form";
import { Input } from "@clikz/ui/components/ui/input";
import { APP_DOMAIN } from "@clikz/utils/constants";
import { textToSlug } from "@clikz/utils/functions";

type WorkspaceSlugFieldProps = {
  setSlugAvailable: Dispatch<SetStateAction<boolean>>;
};

const WorkspaceSlugField = ({ setSlugAvailable }: WorkspaceSlugFieldProps) => {
  const form = useFormContext();

  const slug = form.watch("slug");
  const name = form.watch("name");

  const [debouncedSlug] = useDebounce(slug, 500);

  useEffect(() => {
    form.setValue("slug", textToSlug(name)); // Automatically update the slug field
  }, [name]);

  useEffect(() => {
    form.setValue("slug", textToSlug(slug)); // Automatically update the slug field
  }, [slug]);

  useEffect(() => {
    setSlugAvailable(false);
    const controller = new AbortController();
    const checkSlug = async (slug: string) => {
      const data = await fetch(`/api/workspaces/${debouncedSlug}/exist`, {
        signal: controller.signal,
      }).then((res) => res.json());

      if (data.exists) {
        form.setError("slug", {
          type: "manual",
          message: `The slug "${slug}" is already taken`,
        });
      } else {
        setSlugAvailable(true);
        if (
          form.formState.errors.slug &&
          form.formState.errors.slug.type === "manual"
        ) {
          form.clearErrors("slug");
        }
      }
    };

    if (debouncedSlug) checkSlug(debouncedSlug);
    return () => controller.abort("Sending a new request");
  }, [debouncedSlug]);

  return (
    <FormField
      control={form.control}
      name="slug"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Workspace Slug</FormLabel>
          <FormControl>
            <div className="flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                {APP_DOMAIN}/
              </span>
              <Input placeholder="my-workspace" {...field} />
            </div>
          </FormControl>
          <FormMessage className="text-xs ml-2" />
        </FormItem>
      )}
    />
  );
};

export default WorkspaceSlugField;
