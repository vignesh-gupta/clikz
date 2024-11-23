import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <p>This is landing page</p>
      <Button asChild>
        <Link href="/dashboard">Go to dashboard page</Link>
      </Button>
    </main>
  );
}
