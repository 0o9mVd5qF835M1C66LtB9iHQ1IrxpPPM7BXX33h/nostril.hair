'use client'

import { useNostrEvents } from 'nostr-react'
import Thread from '../../../../components/Thread'

export default function Page({ params }) {
  const { events: post } = useNostrEvents({
    filter: {
      authors: [params.user],
      ids: [params.post],
      kinds: [1]
    }
  })

  return <Thread events={post} />
}
