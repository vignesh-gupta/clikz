import { redirect } from "next/navigation";

import { Card, CardContent } from "@clikz/ui/components/ui/card";
import { Label } from "@clikz/ui/components/ui/label";
import { Separator } from "@clikz/ui/components/ui/separator";

import { auth } from "~/auth";
import InputWithCopy from "~/components/input-with-copy";
import { DATA_PREFIX } from "~/lib/constants";
import { DEFAULT_LOGIN_REDIRECT } from "~/routes";

import AccountSettingsClientPage from "./page-client";

const AccountSettingsPage = async () => {
  const session = await auth();

  if (!session || !session.user || !session.user.email)
    redirect(DEFAULT_LOGIN_REDIRECT);

  const { email, id, name } = session.user;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:items-center md:justify-between md:flex-row">
        <div>
          <h2 className="text-lg font-semibold">General Setting</h2>
          <p className="text-sm text-muted-foreground">
            Manage your workspace settings
          </p>
        </div>
      </div>

      <AccountSettingsClientPage email={email} name={name} />

      <Separator />

      {/* <Card>
        <CardContent className="p-4 space-y-2">
          <Label>Workspace Logo</Label>
          <div className="flex items-center gap-4">
            <AvatarUpload slug={slug} workspaceId={workspaceId} icon={icon} />
            <div className="text-sm text-muted-foreground">
              <p>
                Square image recommended. Accepted file types: .png, .jpg with
                max size 2MB
              </p>
            </div>
          </div>
        </CardContent>
      </Card> */}

      <Separator />

      <Card>
        <CardContent className="p-4 space-y-2">
          <Label>Workspace ID</Label>
          <InputWithCopy value={DATA_PREFIX.USER + id} />
          <p className="text-sm text-muted-foreground">
            This is your unique account identifier on Clikz.
          </p>
        </CardContent>
      </Card>

      <Separator />

      {/* <DeleteWorkspace workspaceId={workspaceId} /> */}
    </div>
  );
};

export default AccountSettingsPage;
