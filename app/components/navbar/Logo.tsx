"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";


const Logo = () => {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push("/")}
      className="hidden md:block cursor-pointer"
      src="/airbnb_logo.png"
      height="100"
      width="100"
      alt="Airbnb Logo"
      priority={true}
    />
  );
};
export default Logo;