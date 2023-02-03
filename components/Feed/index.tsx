'use client'

import classNames from 'classnames'
import { Event } from 'nostr-tools'
import { mapEvent } from '../../utils'
import ParsedText from '../ParsedText'
import Avatar from '../Post/Avatar'
import Username from '../Post/Username'
import RepliedLink from '../Post/RepliedLink'
import Chain from '../Post/Chain'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { useEffect, useState } from 'react'

interface Props {
  incomingEvents: Event[]
  loading: boolean
  pubkey?: string
}

export default function Feed({ incomingEvents, loading }: Props) {
  const [events, setEvents] = useState([])

  useEffect(() => {
    if (events.length < 10) {
      setEvents(incomingEvents.slice(0, 10))
    }
  }, [incomingEvents, events])

  // const [sentryRef] = useInfiniteScroll({
  //   loading,
  //   hasNextPage: !loading,
  //   onLoadMore: () => {
  //     if (incomingEvents.length >= 10) {
  //       setEvents([
  //         ...events,
  //         ...incomingEvents
  //           .slice(incomingEvents.length - 10, incomingEvents.length)
  //           .sort((a, b) => a.created_at - b.created_at)
  //       ])
  //     }
  //   },
  //   rootMargin: '0px 0px 50px 0px'
  // })

  return (
    <div className="flow-root border-l border-r dark:border-gray-700 min-h-screen">
      <ul className="scroll-smooth bg-opacity-100">
        {incomingEvents.length > events.length && (
          <li className="border-0 border-b dark:border-gray-700 py-6 bg-opacity-100">
            <div className="flex justify-center">
              <button
                type="button"
                className="text-[15px] text-blue-700 dark:text-carolinablue hover:opacity-90"
                onClick={() => setEvents(incomingEvents)}
              >
                Show {incomingEvents.length - events.length} posts
              </button>
            </div>
          </li>
        )}
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
        <div
          // ref={sentryRef}
          className="flex justify-center items-center border-t dark:border-t-gray-700 py-8"
        >
          <div className="h-3 w-3 rounded-full animate-pulse dark:bg-carolinablue bg-tallships" />
        </div>
      </ul>
    </div>
  )
}
