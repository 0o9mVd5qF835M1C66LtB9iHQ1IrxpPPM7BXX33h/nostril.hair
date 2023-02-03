import classNames from 'classnames'
import { Event } from 'nostr-tools'
import { mapEvent } from '../../utils'
import ParsedText from '../ParsedText'
import Avatar from '../Post/Avatar'
import Username from '../Post/Username'
import RepliedLink from '../Post/RepliedLink'
import Chain from '../Post/Chain'
import useInfiniteScroll from 'react-infinite-scroll-hook'

export interface NostrEvent {
  content: string
  created_at: number
  id: string
  kind: number
  pubkey: string
  sig: string
  tags: string[]
}

export default function Feed({ events, setLimit, loading }) {
  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage: true,
    onLoadMore: () => {
      setLimit((limit: number) => limit + 3)
    },
    rootMargin: '0px 0px 50px 0px'
  })

  return (
    <div className="flow-root border-l border-r dark:border-gray-700 min-h-screen">
      <ul className="scroll-smooth">
        {events.map((event: Event, eventIndex: number) => {
          const mappedEvent = mapEvent(event.content, event.tags)
          return (
            <li
              key={event.id}
              className={classNames(
                'border-0 border-t dark:border-gray-700 px-4 py-6',
                eventIndex === 0 && 'border-none',
                eventIndex === events.length - 1 && loading && 'animate-pulse bg-opacity-30 pb-12'
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
      </ul>
      <div ref={sentryRef} />
    </div>
  )
}
