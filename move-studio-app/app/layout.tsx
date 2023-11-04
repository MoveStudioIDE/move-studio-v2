'use client';

import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'
import { Inter } from 'next/font/google'

import { WalletProvider } from "@suiet/wallet-kit";
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from '@vercel/analytics/react';


const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
              <Analytics />
              <Toaster />
          </ThemeProvider>
        </WalletProvider>
      </body>
    </html>
  )
}
