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
    @apply max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4
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
      <body className={nunito.className}>{children}</body>
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
export const Navbar = () => {
  return (
    <div className="fixed w-full bg-white-100 shadow-sm">
      <div className="py-4 border-b-2">
        {/* <Container> */}
        <div className="container">
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">*
            Logo/
            Search/
            UserMenu/
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
'use client'
import { BiSearch } from 'react-icons/bi';

export const Search = () => {
  return (
    <div className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold px-6">
          Anywhere
        </div>
        <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
          Any Week
        </div>
        <div className=" text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3 ">
          <div className="hidden sm:block">
            Add Guest
          </div>
          <div className="p-2 bg-rose-500 rounded-full text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Create navbar component `UserMenu.tsx`

`> ./app/components/navbar/UserMenu.tsx`

```js
"use client";

import { AiOutlineMenu } from "react-icons/ai";

export const UserMenu = () => {
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
          Become a host
        </div>
        <div className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
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

