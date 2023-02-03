'use client'

import { useNostrEvents } from 'nostr-react'
import Feed from '../components/Feed'
import dayjs from 'dayjs'

export default function Page() {
  const { events: incomingEvents, isLoading: loading } = useNostrEvents({
    filter: {
      since: dayjs().subtract(1, 'minute').unix(),
      until: dayjs().unix(),
      kinds: [1],
      limit: 1
    }
  })

  return <Feed incomingEvents={incomingEvents} loading={loading} />
}
