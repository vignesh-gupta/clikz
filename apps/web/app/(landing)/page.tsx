import { cn } from "@clikz/ui/lib/utils";

import { urbanist } from "~/lib/utils/font";

import HeroSection from "./_sections/hero";

export default function HomePage() {
  return (
    <main
      className={cn(
        "min-h-screen bg-gradient-custom font-medium",
        urbanist.className
      )}
    >
      <HeroSection />
    </main>
  );
}
