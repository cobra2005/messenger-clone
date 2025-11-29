import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AuthContext from "@/app/context/AuthContext";
import ChakraProvider from "@/app/providers/ChakraProvider";
import { ReactNode } from "react";
import ToasterContext from "@/app/context/ToasterContext";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Messenger Clone',
  description: 'Messenger Clone',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ChakraProvider>
        <AuthContext>
          <ToasterContext />
          {children}
        </AuthContext>
      </ChakraProvider>
      </body>
    </html>
  )
}
