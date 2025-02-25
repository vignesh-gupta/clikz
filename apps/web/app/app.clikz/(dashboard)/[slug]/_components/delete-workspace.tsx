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

import { useDeleteWorkspace } from "~/features/workspace/api/workspace/use-delete-workspace";
import { useWorkspaceSlug } from "~/features/workspace/hooks/use-workspace-slug";

const DeleteWorkspace = () => {
  const { mutate } = useDeleteWorkspace();
  const slug = useWorkspaceSlug();

  const handleDelete = () => {
    mutate({ param: { idOrSlug: slug } });
  };

  return (
    <Card className="border-destructive/45">
      <CardContent className="space-y-2 p-4">
        <h2 className="text-lg font-semibold text-destructive">
          Delete Workspace
        </h2>
        <p className="text-sm text-muted-foreground">
          Permanently delete your workspace, custom domain, and all associated
          links + their stats. This action cannot be undone - please proceed
          with caution.
        </p>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete Workspace</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                workspace and remove all associated data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={handleDelete}
              >
                Delete Workspace
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
};

export default DeleteWorkspace;
