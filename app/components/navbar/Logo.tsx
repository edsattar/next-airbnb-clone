"use client";

import Image from "next/image";

export const Logo = () => {

  return (
    <Image
      priority={true}
      src="/airbnb_logo.png"
      alt="Airbnb Logo"
      width="100"
      height="100"
      className="hidden md:block cursor-pointer h-auto w-auto"
    />
  );
};
