import { useNostrEvents, useProfile } from 'nostr-react'
import { Event } from 'nostr-tools'
import { mapEvent } from '../../utils'
import ParsedText from '../ParsedText'
import Avatar from './Avatar'
import Username from './Username'
import Link from 'next/link'
import Reply from './Reply'
import classNames from 'classnames'

interface Props {
  event: Event
  showReplies?: boolean
}

export default function Post({ event, showReplies = true }: Props) {
  const mappedEvent = mapEvent({ ...event })
  const { data: metadata } = useProfile({ pubkey: event.pubkey })

  const { events: replyingTo } = useNostrEvents({
    filter: {
      ids: [...mappedEvent.replies],
      since: 0,
      kinds: [1]
    },
    enabled: showReplies
  })

  return (
    <>
      {!!showReplies &&
        replyingTo
          .sort((a, b) => b.created_at - a.created_at)
          .map((reply) => (
            <Reply
              key={reply.id}
              reply={reply}
              replyingTo={replyingTo}
              post={mappedEvent}
              postMetadata={metadata}
            />
          ))}
      <li
        key={event.id}
        className={classNames(
          'border-0 border-t hover:cursor-pointer dark:border-gray-700 px-4 py-6 dark:hover:bg-codgray hover:bg-guyabano',
          replyingTo.length > 0 && 'border-none'
        )}
      >
        <Link href={`/${event.pubkey}/status/${event.id}`}>
          <div className="relative flex items-start space-x-3">
            <Avatar pubkey={event.pubkey} metadata={metadata} />
            <div className="min-w-0 flex-1">
              <Username pubkey={event.pubkey} createdAt={event.created_at} metadata={metadata} />
              <div className="mt-2 text-sm text-richblack dark:text-cultured font-normal">
                <div className="break-words">
                  <ParsedText content={mappedEvent.content} />
                </div>
              </div>
            </div>
          </div>
        </Link>
      </li>
    </>
  )
}
