'use client'

import { Event, Filter } from 'nostr-tools'
import { useEffect, useState } from 'react'
import { useNostrEvents } from 'nostr-react'
import { useDebouncedCallback } from 'use-debounce'
import Post from '../../Post'
import SendReply from '../SendReply'

const DEFAULT_LIMIT = 1

interface Props {
  filter: Filter
  isProfilePage?: boolean
  user: string
  post: string
}

export default function ReplyFeed({ filter, user, post }: Props) {
  const [events, setEvents] = useState<Event[]>([])
  const debouncedSetEvents = useDebouncedCallback((value) => setEvents(value), 1000, {
    leading: true
  })
  const { events: incomingEvents } = useNostrEvents({ filter })

  useEffect(() => {
    if (events.length < DEFAULT_LIMIT) {
      debouncedSetEvents(
        incomingEvents.slice(0, DEFAULT_LIMIT).sort((a, b) => b.created_at - a.created_at)
      )
    }
  }, [debouncedSetEvents, events.length, incomingEvents])

  return (
    <div className="flow-root border-l border-r dark:border-gray-700 min-h-full">
      <ul className="scroll-smooth bg-opacity-100">
        {incomingEvents
          .sort((a, b) => b.created_at - a.created_at)
          .map((event: Event) => (
            <Post key={event.id} event={event} />
          ))}
        <div className="border-b dark:border-b-gray-700 px-4">
          <SendReply user={user} post={post} />
        </div>
      </ul>
    </div>
  )
}
