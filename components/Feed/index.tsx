'use client'

import classNames from 'classnames'
import { Event } from 'nostr-tools'
import { useEffect, useState } from 'react'
import { useNostrEvents } from 'nostr-react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { useDebouncedCallback } from 'use-debounce'
import Post from '../Post'

const DEFAULT_LIMIT = 6

export default function HomeFeed({ filter }) {
  const [events, setEvents] = useState<Event[]>([])
  const debouncedSetEvents = useDebouncedCallback((value) => setEvents(value), 250, {
    leading: true
  })
  const { events: incomingEvents, isLoading: loading } = useNostrEvents({ filter })

  const hiddenPostsCount = incomingEvents.length - events.length
  const postsText = hiddenPostsCount === 1 ? 'post' : 'posts'

  useEffect(() => {
    if (events.length < DEFAULT_LIMIT) {
      debouncedSetEvents(incomingEvents.slice(0, DEFAULT_LIMIT))
    }
  }, [debouncedSetEvents, events.length, incomingEvents])

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage: true,
    onLoadMore: () => {
      debouncedSetEvents(incomingEvents.slice(0, events.length + DEFAULT_LIMIT))
    },
    rootMargin: '0px 0px 50px 0px'
  })

  return (
    <div className="flow-root border-l border-r dark:border-gray-700 min-h-screen">
      <ul className="scroll-smooth bg-opacity-100">
        {events.length >= DEFAULT_LIMIT && events.length < incomingEvents.length && (
          <li className="border-0 border-b dark:border-gray-700 py-6 bg-opacity-100">
            <div className="flex justify-center">
              <button
                type="button"
                className="text-[15px] text-blue-700 dark:text-carolinablue hover:opacity-90"
                onClick={() => setEvents(incomingEvents)}
              >
                {`Show ${hiddenPostsCount} ${postsText}`}
              </button>
            </div>
          </li>
        )}
        {events.map((event: Event, eventIndex: number) => (
          <Post key={event.id} event={event} eventIndex={eventIndex} />
        ))}
        <div
          ref={sentryRef}
          className={classNames(
            'flex justify-center items-center border-t dark:border-t-gray-700 py-8',
            events.length === 0 && 'border-none'
          )}
        >
          <div className="h-3 w-3 rounded-full animate-pulse dark:bg-carolinablue bg-tallships" />
        </div>
      </ul>
    </div>
  )
}
