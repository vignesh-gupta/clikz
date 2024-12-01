import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <p>This is landing page</p>
      <Link href="/dashboard">Go to dashboard page</Link>
    </main>
  );
}
