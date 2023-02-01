'use client'

import { useNostrEvents } from 'nostr-react'
import Feed from '../../components/Feed'
import dayjs from 'dayjs'

export default function Page() {
  const { events } = useNostrEvents({
    filter: {
      since: dayjs().unix(),
      kinds: [1]
    }
  })

  return <Feed events={events} />
}
