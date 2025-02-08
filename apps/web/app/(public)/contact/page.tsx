"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { FaXTwitter } from "react-icons/fa6";
import { z } from "zod";

import { Button } from "@clikz/ui/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@clikz/ui/components/ui/form";
import { Input } from "@clikz/ui/components/ui/input";
import { Separator } from "@clikz/ui/components/ui/separator";
import { Textarea } from "@clikz/ui/components/ui/textarea";

const contactFormSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Please enter your name",
    })
    .max(100, {
      message: "Name is too long",
    }),
  email: z.string().email(),
  message: z.string().min(10, {
    message: "Message is too short",
  }),
});

const ContactPage = () => {
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = (data: z.infer<typeof contactFormSchema>) => {
    console.log(data);
  };
  return (
    <section className="min-h-screen flex items-center justify-center flex-col ">
      <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900  to-gray-600 inline-block text-transparent bg-clip-text">
        Get in touch with us
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="px-5 w-full md:w-2/3 xl:w-1/2 space-y-2 grid grid-cols-2 items-center gap-x-3 my-10"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="col-span-2 md:col-span-1">
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="col-span-2 md:col-span-1 md:!mt-0">
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormControl>
                  <Textarea
                    placeholder="Let us know your thoughts"
                    className="resize-none"
                    rows={10}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="col-span-2">
            Submit
          </Button>
        </form>
      </Form>

      <div className="flex items-center gap-4 mb-6">
        <Separator className="w-20 bg-foreground" /> OR
        <Separator className="w-20 bg-foreground" />
      </div>
      <div className="flex justify-center space-x-4">
        <Button variant="outline" size="icon" asChild>
          <a
            href="https://x.com/vigneshfixes"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaXTwitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </a>
        </Button>
        <Button variant="outline" size="icon" asChild>
          <a
            href="mailto:vighneshgupta32@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Mail className="h-5 w-5" />
            <span className="sr-only">Email</span>
          </a>
        </Button>
      </div>
    </section>
  );
};

export default ContactPage;
