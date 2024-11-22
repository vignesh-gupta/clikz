import React from "react";
import SignOut from "~/components/auth/sign-out";
import { auth } from "~/auth";

const PrivatePage = async () => {
  const session = await auth();

  return (
    <div>
      {JSON.stringify(session)}
      <SignOut />
    </div>
  );
};

export default PrivatePage;
