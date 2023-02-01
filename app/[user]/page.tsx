'use client'

import { usePathname } from 'next/navigation'
import { useNostrEvents } from 'nostr-react'
import Feed from '../../components/Feed'

export default function Page() {
  const pathname = usePathname()

  const { events } = useNostrEvents({
    filter: {
      authors: [pathname.slice(1)],
      since: 0,
      kinds: [1]
    }
  })

  return <Feed events={events} />
}
