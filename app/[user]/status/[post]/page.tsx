'use client'

import { useNostrEvents } from 'nostr-react'
import Feed from '../../../../components/Feed'

export default function Page({ params }) {
  const { events: post } = useNostrEvents({
    filter: {
      authors: [params.user],
      ids: [params.post],
      kinds: [1]
    }
  })

  return <Feed events={post} />
}
