'use client'

import { useNostrEvents } from 'nostr-react'
import Feed from '../components/Feed'
import dayjs from 'dayjs'
import { useState } from 'react'

export default function Page() {
  const [limit, setLimit] = useState(15)

  const { events, isLoading: loading } = useNostrEvents({
    filter: {
      since: dayjs().unix(),
      kinds: [1],
      limit
    }
  })

  const sortedEvent = events.sort((a, b) => a.created_at + b.created_at)

  return <Feed events={sortedEvent} setLimit={setLimit} loading={loading} />
}
