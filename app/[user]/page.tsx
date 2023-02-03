'use client'

import { useNostrEvents } from 'nostr-react'
import { useState } from 'react'
import Feed from '../../components/Feed'
import Profile from '../../components/Profile'

export default function Page({ params }) {
  const [limit, setLimit] = useState(15)

  const { events, isLoading: loading } = useNostrEvents({
    filter: {
      authors: [params.user],
      since: 0,
      kinds: [1],
      limit
    }
  })

  const sortedEvents = events.sort((a, b) => a.created_at + b.created_at)

  return (
    <>
      <Profile pubkey={params.user} />
      <Feed events={sortedEvents} setLimit={setLimit} loading={loading} />
    </>
  )
}
