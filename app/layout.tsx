'use client'

import { Inter } from '@next/font/google'
import { NostrProvider } from 'nostr-react'
import { ThemeProvider } from 'next-themes'
import Layout from '../components/Layout'
import '../styles/tailwind.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'optional'
})

const relayUrls = ['wss://nostr-pub.wellorder.net', 'wss://relay.nostr.ch']

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <NostrProvider relayUrls={relayUrls} debug>
          <ThemeProvider attribute="class" defaultTheme="system">
            <Layout>{children}</Layout>
          </ThemeProvider>
        </NostrProvider>
      </body>
    </html>
  )
}
