'use client'

import { Inter } from '@next/font/google'
import { NostrProvider } from 'nostr-react'
import { ThemeProvider } from 'next-themes'
import Layout from '../components/Layout'
import '../styles/tailwind.css'
import AppProvider from '../context/AppContext'
import useSWR from 'swr'
import fetcher from '../utils/fetcher'
import relayUrls from '../utils/relays'

const inter = Inter({
  subsets: ['latin'],
  display: 'optional'
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { data } = useSWR('https://api.nostr.watch/v1/online', fetcher, {
    refreshInterval: 1000 * 60 * 5,
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    revalidateOnMount: true,
    shouldRetryOnError: false
  })

  const relays = data?.relays?.flatMap()

  return (
    <html lang="en" className={inter.className}>
      <body>
        <AppProvider>
          <NostrProvider relayUrls={relays?.length > 0 ? relays : relayUrls}>
            <ThemeProvider attribute="class" defaultTheme="system">
              <Layout>{children}</Layout>
            </ThemeProvider>
          </NostrProvider>
        </AppProvider>
      </body>
    </html>
  )
}
