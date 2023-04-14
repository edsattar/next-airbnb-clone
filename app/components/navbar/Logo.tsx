"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";


const Logo = () => {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push("/")}
      className="hidden md:block cursor-pointer"
      src="/logo.svg"
      height="150"
      width="150"
      alt="Lodgebnb Logo"
      priority={true}
    />
  );
};
export default Logo;