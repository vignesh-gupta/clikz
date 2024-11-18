import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";
import SignOut from "~/components/auth/sign-out";

export default function Page() {
  return (
    <main>
      <Button asChild>
        <Link href="/private">Go to private page</Link>
      </Button>
      <SignOut />
    </main>
  );
}
