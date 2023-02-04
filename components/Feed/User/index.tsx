'use client'

import classNames from 'classnames'
import { Event } from 'nostr-tools'
import { mapEvent } from '../../../utils'
import ParsedText from '../../ParsedText'
import Avatar from '../../Post/Avatar'
import Username from '../../Post/Username'
import RepliedLink from '../../Post/RepliedLink'
import Chain from '../../Post/Chain'
import { useEffect, useState } from 'react'
import { useNostrEvents } from 'nostr-react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import debounce from 'debounce'

const DEFAULT_LIMIT = 6

export default function UserFeed({ filter }) {
  const [events, setEvents] = useState<Event[]>([])
  const { events: incomingEvents } = useNostrEvents({ filter })

  useEffect(() => {
    if (events.length === 0 && incomingEvents.length >= DEFAULT_LIMIT) {
      setEvents(incomingEvents.slice(0, DEFAULT_LIMIT))
    }
  }, [events.length, incomingEvents])

  const [sentryRef] = useInfiniteScroll({
    loading: false,
    hasNextPage: true,
    onLoadMore: () => {
      debounce(setEvents(incomingEvents.slice(0, events.length + DEFAULT_LIMIT)), 1000)
    },
    rootMargin: '0px 0px 50px 0px'
  })

  return (
    <div className="flow-root border-l border-r dark:border-gray-700 min-h-screen">
      <ul className="scroll-smooth bg-opacity-100">
        {events.map((event: Event, eventIndex: number) => {
          const mappedEvent = mapEvent(event.content, event.tags)
          return (
            <li
              key={Math.random()}
              className={classNames(
                'border-0 border-t dark:border-gray-700 px-4 py-6',
                eventIndex === 0 && 'border-none'
              )}
            >
              {mappedEvent.replies.length > 0 && (
                <div className="mb-2">
                  <RepliedLink pubkey={event.pubkey} />
                </div>
              )}
              {mappedEvent.replies.length > 0 && (
                <div className="relative">
                  <Chain replies={mappedEvent.replies} />
                </div>
              )}
              <div className="relative flex items-start space-x-3">
                <Avatar pubkey={event.pubkey} />
                <div className="min-w-0 flex-1">
                  <div>
                    <Username pubkey={event.pubkey} createdAt={event.created_at} />
                  </div>
                  <div className="mt-2 text-sm text-richblack dark:text-cultured font-normal">
                    <div className="break-words">
                      <ParsedText content={mappedEvent.content} />
                    </div>
                  </div>
                </div>
              </div>
            </li>
          )
        })}
        <li
          ref={sentryRef}
          className={classNames(
            'flex justify-center items-center border-t dark:border-t-gray-700 py-8',
            events.length === 0 && 'border-none'
          )}
        >
          <div className="h-3 w-3 rounded-full animate-pulse dark:bg-carolinablue bg-tallships" />
        </li>
      </ul>
    </div>
  )
}
