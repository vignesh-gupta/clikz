"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useMotionValueEvent, useScroll } from "motion/react";
import * as motion from "motion/react-client";
import { useSession } from "next-auth/react";

import { Button } from "@clikz/ui/components/ui/button";
import { cn } from "@clikz/ui/lib/utils";

import { APP_DOMAIN } from "~/lib/constants";
import { DEFAULT_LOGIN_REDIRECT } from "~/routes";

const navItems = [
  {
    title: "Features",
    link: "#",
  },
  {
    title: "Pricing",
    link: "#",
  },
  {
    title: "Blog",
    link: "#",
  },
  {
    title: "Contact",
    link: "/contact",
  },
];

const Navbar = () => {
  const [hidden, setHidden] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest: number) => {
    const prev = scrollY.getPrevious() || 0;

    if (latest > prev && latest > 100) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const { status } = useSession();

  return (
    <nav className="fixed top-10 md:top-5  w-full z-50">
      <motion.div
        variants={{
          visible: { y: 0 },
          hidden: { y: "-150%" },
        }}
        className={cn(
          "shadow-sm px-6 py-3 rounded-full mx-auto h-16 lg:max-w-screen-lg max-w-screen-md bg-white flex items-center justify-between z-50"
        )}
        initial={{ y: "-200%" }}
        animate={hidden ? "hidden" : "visible"}
      >
        <Link href="/">
          <Image
            src="/logo-name.png"
            alt="Clikz Logo"
            width={100}
            height={40}
            className="hidden md:block"
          />
          <Image
            src="/logo.png"
            alt="Clikz Logo"
            width={40}
            height={40}
            className="md:hidden"
          />
        </Link>
        <div className="flex items-center gap-6">
          <ul className="flex items-center gap-4">
            {navItems.map((item) => (
              <li
                key={`landing-nav-${item.title}`}
                className="relative cursor-pointer after:contents-[''] after:absolute after:w-0 after:transition-all after:duration-500 after:left-0 after:bottom-0 hover:after:w-full after:bg-black after:h-0.5"
              >
                <a href={item.link} className="text-black font-semibold">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
          {status === "authenticated" ? (
            <Button className="rounded-full" asChild>
              <Link
                href={{
                  host: APP_DOMAIN,
                  pathname: DEFAULT_LOGIN_REDIRECT,
                }}
                prefetch={false}
              >
                Dashboard
              </Link>
            </Button>
          ) : (
            <Button className="rounded-full" asChild>
              <Link
                href={{
                  host: APP_DOMAIN,
                  pathname: "/sign-in",
                }}
                prefetch={false}
              >
                Sign In
              </Link>
            </Button>
          )}
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
