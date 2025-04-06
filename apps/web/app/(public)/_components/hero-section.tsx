import Link from "next/link";

import { ArrowRightIcon, CircleCheckBig } from "lucide-react";
import * as motion from "motion/react-client";

import { AnimatedShinyText } from "@clikz/ui/components/ui/animated-shiny-text";
import { Button } from "@clikz/ui/components/ui/button";
import { APP_DOMAIN } from "@clikz/utils/constants";

import { DEFAULT_LOGIN_REDIRECT } from "~/routes";
import { inter } from "~/styles/font";

const HeroSection = () => {
  return (
    <motion.section
      className="flex items-center justify-center flex-col min-h-screen text-center px-5 gap-7 pb-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800">
        <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <span className={inter.className}>✨ Introducing Clikz</span>
          <ArrowRightIcon className="ml-1 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </AnimatedShinyText>
      </div>
      <h1 className="font-semibold md:text-6xl text-5xl max-w-2xl text-pretty">
        Smart Link, Real Insights for Strategic Growth and Success
      </h1>
      <p className={`text-muted-foreground ${inter.className}`}>
        Discover the power of seamless link management and analytics.
      </p>

      <div className="flex items-center justify-evenly w-xl md:flex-row flex-col gap-4">
        {["Branded Links", "Real Time Analytics", "Link Management"].map(
          (feat) => (
            <div key={feat} className="flex items-center gap-2">
              <div className="rounded-full p-1.5 border-2 border-muted/30 text-orange-500">
                <CircleCheckBig className="size-4" />
              </div>
              <span>{feat}</span>
            </div>
          )
        )}
      </div>

      <div className="flex items-center justify-between max-w-xl  gap-4">
        <Button className="rounded-2xl text-lg" size="lg" asChild>
          <Link
            href={{
              host: APP_DOMAIN,
              pathname: DEFAULT_LOGIN_REDIRECT,
            }}
            prefetch={false}
          >
            Get Started
            <ArrowRightIcon className="ml-1 size-4" />
          </Link>
        </Button>
        <Button className="rounded-2xl text-lg" size="lg" variant="outline">
          Contact Sales
        </Button>
      </div>
    </motion.section>
  );
};

export default HeroSection;
