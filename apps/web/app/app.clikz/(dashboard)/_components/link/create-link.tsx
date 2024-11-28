import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from "@clikz/ui/components/responsive-dialog";
import { Button } from "@clikz/ui/components/ui/button";

const CreateLink = () => {
  return (
    <ResponsiveModal>
      <ResponsiveModalTrigger asChild>
        <Button>Create</Button>
      </ResponsiveModalTrigger>
      <ResponsiveModalContent>
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>Are you absolutely sure?</ResponsiveModalTitle>
          <ResponsiveModalDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};

export default CreateLink;
