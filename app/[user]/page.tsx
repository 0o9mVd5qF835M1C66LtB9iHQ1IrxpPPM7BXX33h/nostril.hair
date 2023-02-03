'use client'

import { useNostrEvents } from 'nostr-react'
import { Event } from 'nostr-tools'
import { useState } from 'react'
import Feed from '../../components/Feed'
import Profile from '../../components/Profile'

export default function Page({ params }) {
  const [events, setEvents] = useState<Event[]>([])
  const [limit, setLimit] = useState(15)

  const { events: allEvents, isLoading: loading } = useNostrEvents({
    filter: {
      authors: [params.user],
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
      <Profile pubkey={params.user} />
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
