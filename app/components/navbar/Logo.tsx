'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"

export const Logo = () => {
  const router = useRouter()

  return (
    <Image
      src="/airbnb_logo.png"
      alt="Airbnb Logo"
      width={100}
      height={100}
      className="hidden md:block cursor-pointer"
    />
  );
}