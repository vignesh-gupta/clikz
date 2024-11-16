import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <main>
      <Button asChild>
        <Link href="/private">Go to private page</Link>
      </Button>
    </main>
  );
}
