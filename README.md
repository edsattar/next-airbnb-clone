## Initial Setup

### Install Next.js

```sh
npx create-next-app airbnb-clone
```

### Install dependencies

#### react-icons

```sh
npm i react-icons
```

#### zustand

```sh
npm i zustand
```

### Install Tailwind CSS

```sh
npm i -D tailwindcss postcss autoprefixer
```

#### Create Tailwind Config File

```sh
npx tailwindcss init -p
```

#### Configure Tailwind Config File

`> tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

#### Configure Global CSS

`> globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html,
body,
:root {
  height: 100%;
}

@layer utilities {
  .container {
    @apply max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4;
  }
}
```

#### Configure Layout

Update metadata, add font Nunito, add `{nunito.className}` to body

`> layout.tsx`

```js
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});
export const metadata = {
  title: "Airbnb Clone",
  description: "Airbnb clone created using Next.js",
};

type Props = {
  children: React.ReactNode,
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={nunito.className}>Modal / Navbar /{children}</body>
    </html>
  );
}
```

`> page.tsx`

```js
export default function Home() {
  return <div className="text-rose-500 text-2xl">Hello Airbnb</div>;
}
```

delete `page.module.css`
truncate `globals.css`

## Navbar

### Create component `Navbar.tsx`

`> ./app/components/navbar/Navbar.tsx`

```js
"use client";

export const Navbar = () => {
  return (
    <div className="fixed w-full bg-white-100 shadow-sm">
      <div className="py-4 border-b-2">
        {/* <Container> */}
        <div className="container">
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            Logo / Search / UserMenu /
          </div>
        </div>
        {/* </Container> */}
      </div>
    </div>
  );
};
```

### Create component `Container.tsx`

`> ./app/components/Container.tsx`

```js
"use client";

interface ContainerProps {
  children: React.ReactNode;
}

export const Container = ({ children }: ContainerProps): JSX.Element => {
  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 ms:px-10 sm:px-2 px-4">
      {children}
    </div>
  );
};
```

### Create navbar component `Logo.tsx`

First get the airbnb_logo.png and put it in the public folder

`> ./app/components/navbar/Logo.tsx`

```js
"use client";

import Image from "next/image";

export const Logo = () => {
  return (
    <Image
      src="/airbnb_logo.png"
      alt="Airbnb Logo"
      width={100}
      height={100}
      className="hidden md:block cursor-pointer"
    />
  );
};
```

### Create navbar component `Search.tsx`

`> ./app/components/navbar/Search.tsx`

```js
"use client";
import { BiSearch } from "react-icons/bi";

export const Search = () => {
  return (
    <div className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold px-6">Anywhere</div>
        <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
          Any Week
        </div>
        <div className=" text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3 ">
          <div className="hidden sm:block">Add Guest</div>
          <div className="p-2 bg-rose-500 rounded-full text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};
```

### Create navbar component `UserMenu.tsx`

`> ./app/components/navbar/UserMenu.tsx`

```tsx
"use client";

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";

export const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {}}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Become a host
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">Avatar/</div>
        </div>
      </div>
    </div>
  );
};
```

create component `Avatar.tsx`

`> ./app/components/Avatar.tsx`

```js
"use client";

import Image from "next/image";

interface AvatarProps {
  src?: string | null | undefined;
}

export const Avatar = ({ src }: AvatarProps): JSX.Element => {
  return (
    <Image
      className="rounded-full"
      height="30"
      width="30"
      alt="Avatar"
      src={src || "/placeholder.jpg"}
    />
  );
};
```

### Create component `MenuItems.tsx`

`> ./app/components/navbar/MenuItems.tsx`

```js
"use client";
interface MenuItemsProps {
  onClick?: () => void;
  label: string;
}

export const MenuItems = ({ onClick, label }: MenuItemsProps): JSX.Element => {
  return (
    <div
      onClick={onClick}
      className="px-4 py-3 hover:bg-neutral-100 transtion font-semibold"
    >
      {label}
    </div>
  );
};
```

### update `UserMenu.tsx` to use `Avatar.tsx` and add dropdown menu

`> ./app/components/navbar/UserMenu.tsx`

```js
...
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 top-12 right-0 bg-white overflow-hidden text-sm">
          <>
            <MenuItems onClick={() => {}} label="Login" />
            <MenuItems onClick={() => {}} label="Sign up" />
          </>
        </div>
      )}
    </div>
  );
};

```

## BUG FIX: hydration error on refresh and clicking screen

create `ClientOnly.tsx`

`> ./app/components/ClientOnly.tsx`

```js
"use client";

import React, { useState, useEffect } from "react";

interface ClientOnlyProps {
  children: React.ReactNode;
}

const ClientOnly = ({ children }: ClientOnlyProps): JSX.Element | null => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return <>{children}</>;
};

export default ClientOnly;
```

and use it to wrap around components in layout

`> ./app/components/Layout.tsx`

```js
...
<ClientOnly>
  Modal /
  <Navbar />
</ClientOnly>
...
```

## Modal

create `Modal.tsx`

`> ./app/components/Modal.tsx`

```js
"use client";
import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  actionLabel,
  footer,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}: ModalProps): JSX.Element | null => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose, disabled]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [secondaryAction, disabled]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
        <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
          {/*CONTENT*/}
          <div
            className={`
            translate
            duration-300
            h-full
            ${showModal ? "translate-y-0" : "translate-y-full"}
            ${showModal ? "opacity-100" : "opacity-0"}
          `}
          >
            <div className=" translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ">
              {/*HEADER*/}
              <div className=" flex items-center p-6 rounded-t justify-center relative border-b-[1px] ">
                <button
                  onClick={handleClose}
                  className=" p-1 border-0 hover:opacity-70 transition absolute left-9 "
                >
                  <IoMdClose size={18} />
                </button>
                {/* TITLE */}
                <div className="text-lg font-semibold">{title}</div>
              </div>
              {/* BODY */}
              <div className="relative p-6 flex-auto">{body}</div>
              {/* FOOTER */}
              <div className="flex flex-col gap-2 p-6">
                <div className=" flex flex-row items-center gap-4 w-full ">
                  Button /
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
```

#### Update `layout.tsx`

```js
import Modal from "./Modal";

...

  <ClientOnly>
    <Modal title="hello" isOpen />
    <Navbar />
  </ClientOnly>

...
```

### Create `Button.tsx`

`> ./app/components/Button.tsx`

```js
"use client";

import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Button = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}: ButtonProps): JSX.Element => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        w-full
        ${
          outline
            ? "bg-white border-black text-black"
            : "bg-rose-500 border-rose-500 text-white"
        }
        ${
          small
            ? "text-sm py-1 font-light border-[1px]"
            : "text-md py-3 font-semibold border-2"
        }
      `}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {label}
    </button>
  );
};

export default Button;
```

#### Update `Modal.tsx`

```js
import Button from "./Button";
...
{/* FOOTER */}
<div className="flex flex-col gap-2 p-6">
  <div className=" flex flex-row items-center gap-4 w-full ">
    {secondaryAction && secondaryActionLabel && (
      <Button
        disabled={disabled}
        label={secondaryActionLabel}
        onClick={handleSecondaryAction}
        outline
      />
    )}
    <Button
      disabled={disabled}
      label={actionLabel}
      onClick={handleSubmit}
    />
  </div>
  {footer}
</div>
...
```

#### Update `layout.tsx`

```js

