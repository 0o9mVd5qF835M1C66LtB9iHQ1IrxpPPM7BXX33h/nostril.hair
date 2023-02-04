'use client'

import { useNostrEvents } from 'nostr-react'
import Reply from '../Reply'

interface Props {
  replies: string[]
}

export default function Replies({ replies }: Props) {
  const { events: replyEvents } = useNostrEvents({
    filter: {
      ids: [...replies],
      since: 0,
      kinds: [1]
    }
  })

  return (
    <div>
      {replyEvents
        .sort((a, b) => a.created_at - b.created_at)
        .map((event) => (
          <Reply key={event.id} event={event} />
        ))}
    </div>
  )
}
