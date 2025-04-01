"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

type RedirectionToDestProps = {
  url: string;
};

const RedirectionToDest = ({ url }: RedirectionToDestProps) => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(url);
    }, 500);
    return () => clearTimeout(timer);
  }, [url, router]);

  return null;
};

export default RedirectionToDest;
