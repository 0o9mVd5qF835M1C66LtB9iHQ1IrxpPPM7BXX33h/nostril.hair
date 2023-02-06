'use client'

import { Event, Filter } from 'nostr-tools'
import { useEffect, useState } from 'react'
import { useNostrEvents, useProfile } from 'nostr-react'
import { useDebouncedCallback } from 'use-debounce'
import Post from '../../Post'
import SendReply from '../SendReply'
import { mapEvent } from '../../../utils'
import Reply from '../../Post/Reply'

const DEFAULT_LIMIT = 1

interface Props {
  filter: Filter
  isProfilePage?: boolean
  user: string
  post: string
}

export default function ReplyFeed({ filter, user, post }: Props) {
  const [events, setEvents] = useState<Event[]>([])
  const { data: metadata } = useProfile({ pubkey: user })
  const debouncedSetEvents = useDebouncedCallback((value) => setEvents(value), 1000, {
    leading: true
  })
  const { events: incomingEvents } = useNostrEvents({ filter })
  const mappedEvent =
    incomingEvents.length > 0
      ? mapEvent({ ...incomingEvents[0] })
      : ({
          replies: []
        } as any)

  const { events: replyingTo } = useNostrEvents({
    filter: {
      ids: mappedEvent?.replies.length > 0 ? [...mappedEvent.replies] : [],
      since: 0,
      kinds: [1]
    },
    enabled: incomingEvents.length > 0
  })

  const rootPost: Event = replyingTo?.find(
    (reply) => reply.created_at < incomingEvents[0].created_at
  )

  const rootFilteredReplies = replyingTo.filter(
    (reply) => reply.created_at > incomingEvents[0].created_at
  )

  useEffect(() => {
    if (events.length < DEFAULT_LIMIT) {
      debouncedSetEvents(
        incomingEvents.slice(0, DEFAULT_LIMIT).sort((a, b) => b.created_at - a.created_at)
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incomingEvents.length])

  return (
    <div className="flow-root">
      <ul>
        {!!mappedEvent && !!metadata && rootPost && rootFilteredReplies && (
          <Reply
            post={mappedEvent}
            postMetadata={metadata}
            reply={rootPost}
            replyingTo={rootFilteredReplies}
          />
        )}
        {incomingEvents
          .sort((a, b) => b.created_at - a.created_at)
          .map((event: Event) => (
            <Post key={event.id} event={event} showReplies={false} />
          ))}
        <div className="border-b dark:border-b-gray-700 px-4">
          <SendReply user={user} post={post} />
        </div>
        {/* {rootFilteredReplies
          .sort((a, b) => b.created_at - a.created_at)
          .map((reply) => (
            <Reply key={reply.id} event={reply} replies={replies} />
          ))} */}
      </ul>
    </div>
  )
}
