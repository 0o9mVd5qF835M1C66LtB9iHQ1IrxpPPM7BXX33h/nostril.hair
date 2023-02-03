'use client'

import { useNostrEvents } from 'nostr-react'
import Feed from '../components/Feed'
import dayjs from 'dayjs'
import { useState } from 'react'
import { Event } from 'nostr-tools'

export default function Page() {
  const [events, setEvents] = useState<Event[]>([])
  const [limit, setLimit] = useState(1)

  const { events: allEvents, isLoading: loading } = useNostrEvents({
    filter: {
      until: limit === 1 ? dayjs().add(15, 'seconds').unix() : undefined,
      kinds: [1],
      limit
    }
  })

  const slicedSortedEvents = allEvents
    .slice(allEvents.length - 15, allEvents.length)
    .sort((a, b) => a.created_at + b.created_at)

  const allSortedEvents = allEvents.sort((a, b) => a.created_at + b.created_at)

  return (
    <Feed
      slicedEvents={events.length > 0 ? events : slicedSortedEvents}
      allEvents={allSortedEvents}
      loading={loading}
      setLimit={setLimit}
      setEvents={setEvents}
    />
  )
}
