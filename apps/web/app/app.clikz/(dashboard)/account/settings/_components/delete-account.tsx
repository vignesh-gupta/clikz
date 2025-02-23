"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@clikz/ui/components/ui/alert-dialog";
import { Button } from "@clikz/ui/components/ui/button";
import { Card, CardContent } from "@clikz/ui/components/ui/card";

import { useDeleteUser } from "~/features/auth/api/use-delete-user";

type DeleteAccountProps = {
  userId: string;
};

const DeleteAccount = ({ userId }: DeleteAccountProps) => {
  const { mutate } = useDeleteUser();

  const handleDelete = () => {
    mutate({ param: { userId } });
  };

  return (
    <Card className="border-destructive/45">
      <CardContent className="space-y-2 p-4">
        <h2 className="text-lg font-semibold text-destructive">
          Delete Account
        </h2>
        <p className="text-sm text-muted-foreground">
          Permanently delete your account, access. This action cannot be undone
          - please proceed with caution.
        </p>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete Account</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove all associated data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={handleDelete}
              >
                Yes, I'm sure!
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
};

export default DeleteAccount;
