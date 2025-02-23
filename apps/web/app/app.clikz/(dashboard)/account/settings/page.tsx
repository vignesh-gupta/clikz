import { redirect } from "next/navigation";

import { Card, CardContent } from "@clikz/ui/components/ui/card";
import { Label } from "@clikz/ui/components/ui/label";
import { Separator } from "@clikz/ui/components/ui/separator";

import { auth } from "~/auth";
import InputWithCopy from "~/components/input-with-copy";
import PageTitle from "~/components/page-title";
import { DATA_PREFIX } from "~/lib/constants";
import { DEFAULT_LOGIN_REDIRECT } from "~/routes";

import UserAvatarUpload from "./_components/avatar-upload";
import DeleteAccount from "./_components/delete-account";
import AccountSettingsClientPage from "./page-client";

const AccountSettingsPage = async () => {
  const session = await auth();

  if (!session || !session.user || !session.user.email || !session.user.id)
    redirect(DEFAULT_LOGIN_REDIRECT);

  const { email, id, name } = session.user;

  return (
    <div className="space-y-6">
      <PageTitle />

      <AccountSettingsClientPage email={email} name={name} id={id} />

      <Separator />

      <Card>
        <CardContent className="p-4 space-y-2">
          <Label>Your Avatar</Label>
          <div className="flex items-center gap-4">
            <UserAvatarUpload email={email} userId={id} />
            <div className="text-sm text-muted-foreground">
              <p>
                Square image recommended. Accepted file types: .png, .jpg with
                max size 2MB
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardContent className="p-4 space-y-2">
          <Label>User ID</Label>
          <InputWithCopy value={DATA_PREFIX.USER + id} />
          <p className="text-sm text-muted-foreground">
            This is your unique account identifier on Clikz.
          </p>
        </CardContent>
      </Card>

      <Separator />

      <DeleteAccount userId={id} />
    </div>
  );
};

export default AccountSettingsPage;
