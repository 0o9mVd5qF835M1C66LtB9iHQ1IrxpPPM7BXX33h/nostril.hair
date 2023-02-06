'use client'

import { Event, Filter } from 'nostr-tools'
import { useEffect, useState } from 'react'
import { useNostrEvents } from 'nostr-react'
import dedupe from 'dedupe'
import Post from '../../Post'
import useVirtual from 'react-cool-virtual'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { useDebouncedCallback } from 'use-debounce'

const DEFAULT_LIMIT = 5

interface Props {
  filter: Filter
  isInfiniteScroll?: boolean
}

export default function DefaultFeed({ filter, isInfiniteScroll = false }: Props) {
  const [events, setEvents] = useState<Event[]>([])
  const { events: incomingEvents, isLoading: loading } = useNostrEvents({ filter })
  const debouncedSetEvents = useDebouncedCallback((value) => setEvents(value), 1000, {
    leading: true
  })

  const hiddenPostsCount = incomingEvents.length - events.length
  const postsText = hiddenPostsCount === 1 ? 'post' : 'posts'

  const { outerRef, innerRef, items } = useVirtual<HTMLDivElement, HTMLUListElement>({
    itemCount: events.length
  })

  useEffect(() => {
    if (events.length < DEFAULT_LIMIT) {
      debouncedSetEvents(
        incomingEvents.slice(0, DEFAULT_LIMIT).sort((a, b) => b.created_at - a.created_at)
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incomingEvents.length])

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage: true,
    onLoadMore: () => {
      if (events.length >= DEFAULT_LIMIT) {
        debouncedSetEvents(
          dedupe(
            [...events, ...incomingEvents.slice(0, events.length + DEFAULT_LIMIT)].sort(
              (a, b) => b.created_at - a.created_at
            ),
            (event: Event) => event.id
          )
        )
      }
    },
    rootMargin: '0px 0px 400px 0px'
  })

  return (
    <div className="flow-root" ref={outerRef}>
      <ul ref={innerRef}>
        {!isInfiniteScroll &&
          events.length >= DEFAULT_LIMIT &&
          events.length < incomingEvents.length && (
            <li className="py-6 border-0 border-t dark:border-gray-700">
              <div className="flex justify-center">
                <button
                  type="button"
                  className="text-[15px] text-blue-700 dark:text-carolinablue hover:opacity-90"
                  onClick={() => setEvents(dedupe(incomingEvents, (event) => event.id))}
                >
                  {`Show ${hiddenPostsCount} ${postsText}`}
                </button>
              </div>
            </li>
          )}
        {items.map(({ index, size, measureRef }) => (
          <Post
            key={events[index].id}
            event={events[index]}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            style={{ height: `${size}px` }}
            ref={measureRef}
          />
        ))}
        <li
          ref={isInfiniteScroll ? sentryRef : null}
          className="flex justify-center items-center border-t dark:border-t-gray-700 py-8"
        >
          <div className="h-3 w-3 rounded-full animate-pulse dark:bg-carolinablue bg-tallships" />
        </li>
      </ul>
    </div>
  )
}
