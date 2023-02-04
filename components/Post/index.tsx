import classNames from 'classnames'
import { useProfile } from 'nostr-react'
import { Event } from 'nostr-tools'
import { mapEvent } from '../../utils'
import ParsedText from '../ParsedText'
import Avatar from './Avatar'
import Replies from './Replies'
import RepliedLink from './RepliedLink'
import Username from './Username'
import Link from 'next/link'

interface Props {
  event: Event
  eventIndex: number
  length?: number
}

export default function Post({ event, eventIndex, length }: Props) {
  const mappedEvent = mapEvent(event.content, event.tags)
  const { data: metadata } = useProfile({ pubkey: event.pubkey })

  return (
    <li
      key={event.id}
      className={classNames(
        `border-0 border-t hover:cursor-pointer dark:border-gray-700 px-4 py-6 dark:hover:bg-codgray hover:bg-guyabano`,
        eventIndex === 0 && 'border-none',
        eventIndex === 0 && length === 1 && 'border-b'
      )}
    >
      <Link href={`/${event.pubkey}/status/${event.id}`}>
        {mappedEvent.replies.length > 0 && (
          <div className="mb-2">
            <RepliedLink pubkey={event.pubkey} metadata={metadata} />
          </div>
        )}
        {mappedEvent.replies.length > 0 && (
          <div className="relative">
            <Replies replies={mappedEvent.replies} />
          </div>
        )}
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
  )
}
