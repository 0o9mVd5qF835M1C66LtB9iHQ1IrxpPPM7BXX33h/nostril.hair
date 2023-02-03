'use client'

import dayjs from 'dayjs'
import { useSearchParams } from 'next/navigation'
import { useNostrEvents } from 'nostr-react'
import Feed from '../../components/Feed'
import Profile from '../../components/Profile'

export default function Page() {
  const params = useSearchParams()

  const { events: incomingEvents, isLoading: loading } = useNostrEvents({
    filter: {
      authors: [params.get('pubkey')],
      since: dayjs().subtract(1, 'week').unix(),
      until: dayjs().unix(),
      kinds: [1]
    }
  })

  return (
    <>
      <Profile pubkey={params.get('pubkey')} />
      <Feed incomingEvents={incomingEvents} loading={loading} />
    </>
  )
}
