import classNames from 'classnames'
import { Event } from 'nostr-tools'
import { mapEvent } from '../../utils'
import ParsedText from '../ParsedText'
import Avatar from '../Post/Avatar'
import Username from '../Post/Username'
import RepliedLink from '../RepliedLink'
import Replies from '../Replies'
import PostSkeleton from '../Skeletons/Post'

export interface NostrEvent {
  content: string
  created_at: number
  id: string
  kind: number
  pubkey: string
  sig: string
  tags: string[]
}

export default function Feed({ events }) {
  return (
    <div className="flow-root border-l border-r dark:border-gray-700 min-h-screen">
      <ul>
        {events.length > 0 ? (
          events
            .sort((a: Event, b: Event) => a.created_at - b.created_at)
            .map((event: Event, eventIndex: number) => {
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
                      <Replies replies={mappedEvent.replies} />
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
            })
        ) : (
          <PostSkeleton />
        )}
      </ul>
    </div>
  )
}
