"use client";

import Image from "next/image";
import Link from "next/link";

import * as motion from "motion/react-client";

import { Button } from "@clikz/ui/components/ui/button";
import { cn } from "@clikz/ui/lib/utils";

import { APP_DOMAIN } from "~/lib/constants";

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
  return (
    <nav className="fixed top-10 md:top-5  w-full z-50">
      <motion.div
        className={cn(
          "shadow-sm px-6 py-3 rounded-full mx-auto h-16 lg:max-w-screen-lg max-w-screen-md bg-white flex items-center justify-between transition-all z-50"
        )}
        initial={{ y: -200 }}
        animate={{
          y: 0,
        }}
        exit={{ y: -200 }}
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
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
