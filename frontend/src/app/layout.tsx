import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: Readonly<RootLayoutProps>): ReactNode => {
  return (
    <html lang="ru">
      <body
        style={{ borderTop: "rgba(117,117,117, 0.4) solid 1px" }}
        className={`${inter.className}`}
      >
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
