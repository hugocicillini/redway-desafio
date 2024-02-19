import type { Metadata } from "next";
import { Roboto } from 'next/font/google'

import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/navbar";

import "./globals.css";

export const metadata: Metadata = {
  title: "Redway | Login",
  description: "Login Redway",
};

const roboto = Roboto({
  weight: ['400'],
  subsets: ['latin']
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={roboto.className}>
        <main className='h-screen flex flex-col justify-center items-center'>
          <Navbar />
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
