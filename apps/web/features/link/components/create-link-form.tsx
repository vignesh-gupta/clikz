"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import QRCode from "qrcode";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@clikz/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@clikz/ui/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@clikz/ui/components/ui/form";
import { Input } from "@clikz/ui/components/ui/input";
import { Label } from "@clikz/ui/components/ui/label";
import { Textarea } from "@clikz/ui/components/ui/textarea";

import LinkPreview from "~/components/preview/link-preview";

const formSchema = z.object({
  destinationUrl: z.string().url({ message: "Please enter a valid URL" }),
  shortUrl: z
    .string()
    .min(3, { message: "Short URL must be at least 3 characters" }),
  tags: z.string(),
  comments: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

const CreateLinkForm = () => {
  const [qrCode, setQrCode] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destinationUrl: "",
      shortUrl: "",
      tags: "",
      comments: "",
    },
  });

  const { watch } = form;

  const destinationUrl = watch("destinationUrl");

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "shortUrl" && value.shortUrl) {
        QRCode.toDataURL(`https://clikz.com/${value.shortUrl}`)
          .then((url) => setQrCode(url))
          .catch((err) => console.error(err));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (data: FormValues) => {
    console.log(data);
  };

  return (
    <Card className="rounded-xl">
      <CardHeader>
        <CardTitle>Create Link</CardTitle>
      </CardHeader>
      <CardContent className="p-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="destinationUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Destination URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="shortUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Short URL</FormLabel>
                      <FormControl>
                        <Input placeholder="my-awesome-link" {...field} />
                      </FormControl>
                      <FormDescription>
                        This will be appended to your custom domain
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Input placeholder="marketing, campaign" {...field} />
                      </FormControl>
                      <FormDescription>
                        Separate tags with commas
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="comments"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Comments</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Add any additional notes here"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <Label>QR Code</Label>
                    {qrCode ? (
                      <Image
                        src={qrCode}
                        alt="QR Code"
                        className="object-contain h-full w-auto mx-auto"
                        width={200}
                        height={200}
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                        QR Code will appear here
                      </div>
                    )}
                  </CardContent>
                </Card>
                <LinkPreview url={destinationUrl} />
              </div>
            </div>
            <Button type="submit" className="w-full">
              Create Link
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateLinkForm;
