"use client";

import { useState } from "react";

import { PlusIcon, XIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@clikz/ui/components/ui/button";
import { Input } from "@clikz/ui/components/ui/input";
import { Label } from "@clikz/ui/components/ui/label";

import { useCreateInvites } from "../../api/invite/use-create-invites";
import { useWorkspaceSlug } from "../../hooks/use-workspace-slug";

const MemberInviteForm = () => {
  const [emails, setEmails] = useState<string[]>([""]);

  const { mutateAsync: createInvites, isPending } = useCreateInvites();
  const slug = useWorkspaceSlug();

  const addEmailInput = () => setEmails([...emails, ""]);

  const removeEmailInput = (index: number) => {
    const newEmails = emails.filter((_, i) => i !== index);
    setEmails(newEmails.length ? newEmails : [""]);
  };

  const handleEmailChange = (index: number, value: string) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!slug) return toast.error("Workspace not found");

    // Filter out empty emails
    const validEmails = emails.filter((email) => email.trim() !== "");

    createInvites({
      param: { idOrSlug: slug },
      json: { emails: validEmails },
    }).then(() => setEmails([""]));
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={`email-0`}>Email addresses</Label>
        {emails.map((email, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Input
              id={`email-${index}`}
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => handleEmailChange(index, e.target.value)}
              required={index === 0}
              className="flex-grow"
            />
            {index > 0 && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeEmailInput(index)}
                className="flex-shrink-0"
              >
                <XIcon className="h-4 w-4" />
                <span className="sr-only">Remove email</span>
              </Button>
            )}
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant="outline"
        onClick={addEmailInput}
        className="w-full"
      >
        <PlusIcon className="h-4 w-4 mr-2" />
        Add another email
      </Button>
      <Button
        type="submit"
        className="w-full bg-black text-white hover:bg-black/90"
        disabled={isPending}
      >
        {isPending ? "Sending invites..." : "Send invites"}
      </Button>
    </form>
  );
};

export default MemberInviteForm;
