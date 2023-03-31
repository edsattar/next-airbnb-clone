import { Navbar } from "./components/navbar/Navbar";
import { Nunito } from "next/font/google";
import "./globals.css";
import ClientOnly from "./components/ClientOnly";
import { Modal } from "./components/modals/Modal";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});
export const metadata = {
  title: "Airbnb Clone",
  description: "Airbnb clone created using Next.js",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ClientOnly>
          {/* <Modal /> */}
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
