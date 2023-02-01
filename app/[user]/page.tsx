'use client'

import { usePathname } from 'next/navigation'
import { useNostrEvents } from 'nostr-react'
import Feed from '../../components/Feed'

export default function Page() {
  const pathname = usePathname()

  const { events: postEvents } = useNostrEvents({
    filter: {
      ids: [pathname.slice(1)],
      since: 0,
      kinds: [1]
    }
  })

  const { events: userEvents } = useNostrEvents({
    filter: {
      authors: [pathname.slice(1)],
      since: 0,
      kinds: [1]
    }
  })

  const events = [...postEvents, ...userEvents].sort((a, b) => b.created_at - a.created_at)

  return <Feed events={events} />
}
