'use client'

import { Inter } from '@next/font/google'
import { NostrProvider } from 'nostr-react'
import { ThemeProvider } from 'next-themes'
import Layout from '../components/Layout'
import '../styles/tailwind.css'
import AppProvider from '../context/AppContext'

const inter = Inter({
  subsets: ['latin'],
  display: 'optional'
})

const relayUrls = ['wss://nostr-pub.wellorder.net', 'wss://relay.nostr.ch']

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <AppProvider>
          <NostrProvider relayUrls={relayUrls}>
            <ThemeProvider attribute="class" defaultTheme="system">
              <Layout>{children}</Layout>
            </ThemeProvider>
          </NostrProvider>
        </AppProvider>
      </body>
    </html>
  )
}
