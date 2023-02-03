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

interface Props {
  slicedEvents: Event[]
  allEvents: Event[]
  setLimit: (_limit: number) => void
  loading: boolean
  setEvents: (_events: Event[]) => void
  pubkey?: string
}

export default function Feed({ slicedEvents, allEvents, setLimit, loading, setEvents }: Props) {
  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage: true,
    onLoadMore: () => {
      if (setLimit) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setLimit((limit: number) => limit + 3)
      }
    },
    rootMargin: '0px 0px 50px 0px'
  })

  return (
    <div className="flow-root border-l border-r dark:border-gray-700 min-h-screen">
      <ul className="scroll-smooth bg-opacity-100">
        {slicedEvents.length < allEvents.length && (
          <li className="border-0 border-b dark:border-gray-700 py-6 bg-opacity-100">
            <div className="flex justify-center">
              <button
                type="button"
                className="text-[15px] text-blue-700 dark:text-carolinablue hover:opacity-90"
                onClick={() => setEvents(allEvents)}
              >
                Show {allEvents.length - slicedEvents.length} posts
              </button>
            </div>
          </li>
        )}
        {slicedEvents.map((event: Event, eventIndex: number) => {
          const mappedEvent = mapEvent(event.content, event.tags)
          return (
            <li
              key={event.id}
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
          ref={sentryRef}
          className="flex justify-center items-center border-t dark:border-t-gray-700 py-16"
        >
          <div className="h-3 w-3 rounded-full animate-pulse dark:bg-carolinablue bg-tallships" />
        </div>
      </ul>
    </div>
  )
}
