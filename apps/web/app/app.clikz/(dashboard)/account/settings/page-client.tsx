"use client";

import { useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@clikz/ui/components/ui/button";
import { Card, CardContent } from "@clikz/ui/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@clikz/ui/components/ui/form";
import { Input } from "@clikz/ui/components/ui/input";

import { useUpdateUser } from "~/features/auth/api/use-update-user";
import { type UserAccountSchema, userAccountSchema } from "~/lib/zod/schemas";

type AccountSettingsClientPageProps = {
  name?: string | null;
  email: string;
  id: string;
};

const AccountSettingsClientPage = ({
  name,
  email,
  id,
}: AccountSettingsClientPageProps) => {
  const { mutate: updateDetails } = useUpdateUser();
  const [isPending, startTransition] = useTransition();

  const form = useForm<UserAccountSchema>({
    resolver: zodResolver(userAccountSchema),
    disabled: isPending,
    values: {
      name: name || "",
      email,
    },
  });

  const onSubmit = (values: UserAccountSchema) => {
    startTransition(() => {
      updateDetails({
        json: values,
        param: { userId: id },
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <Card>
                <CardContent className="p-4 space-y-2">
                  <FormLabel>Workspace Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <p className="text-sm text-muted-foreground">
                    Only lowercase letters, numbers. Max 48 characters.
                  </p>
                </CardContent>
              </Card>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <Card>
                <CardContent className="p-4 space-y-2">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <p className="text-sm text-muted-foreground">
                    Only lowercase letters, numbers, and dashes. Max 48
                    characters.
                  </p>
                </CardContent>
              </Card>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          Save
        </Button>
      </form>
    </Form>
  );
};

export default AccountSettingsClientPage;
