'use client'

import { usePathname } from 'next/navigation'
import { useNostrEvents } from 'nostr-react'
import { Event } from 'nostr-tools'
import { useState } from 'react'
import Feed from '../../components/Feed'
import Profile from '../../components/Profile'

export default function Page() {
  const [events, setEvents] = useState<Event[]>([])
  const [limit, setLimit] = useState(15)
  const pathname = usePathname()

  const { events: allEvents, isLoading: loading } = useNostrEvents({
    filter: {
      authors: [pathname.split('/')[1]],
      since: 0,
      kinds: [1],
      limit
    }
  })

  const slicedSortedEvents = allEvents
    .slice(allEvents.length - 15, allEvents.length)
    .sort((a, b) => a.created_at + b.created_at)

  const allSortedEvents = allEvents.sort((a, b) => a.created_at + b.created_at)

  return (
    <>
      <Profile pubkey={pathname.split('/')[1]} />
      <Feed
        slicedEvents={events.length > 0 ? events : slicedSortedEvents}
        allEvents={allSortedEvents}
        setLimit={setLimit}
        setEvents={setEvents}
        loading={loading}
      />
    </>
  )
}
