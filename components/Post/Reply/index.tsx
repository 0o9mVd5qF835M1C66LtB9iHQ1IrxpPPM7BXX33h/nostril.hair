import classNames from 'classnames'
import Link from 'next/link'
import { Metadata, useProfile } from 'nostr-react'
import { Event } from 'nostr-tools'
import { mapEvent } from '../../../utils'
import ParsedText from '../../ParsedText'
import Avatar from '../Avatar'
import RepliedLink from '../RepliedLink'
import Username from '../Username'

interface Post extends Event {
  content: string
  replies: string[]
  mentions: string[]
}

interface Props {
  post: Post
  postMetadata: Metadata
  reply: Event
  replyingTo: Event[]
}

export default function Reply({ post, postMetadata, reply, replyingTo }: Props) {
  const mappedEvent = mapEvent({ ...reply })
  const { data: metadata } = useProfile({ pubkey: reply.pubkey })

  return (
    <li
      className={classNames(
        'border-0 border-t hover:cursor-pointer dark:border-gray-700 px-4 py-6 dark:hover:bg-codgray hover:bg-guyabano',
        replyingTo.indexOf(reply) > 0 &&
          replyingTo.indexOf(reply) < replyingTo.length &&
          'border-none'
      )}
    >
      {post.replies.length > 0 && replyingTo.indexOf(reply) === 0 && (
        <div className="mb-2">
          <RepliedLink pubkey={post.pubkey} metadata={postMetadata} />
        </div>
      )}
      <Link href={`/${reply.pubkey}/status/${reply.id}`}>
        <div className="relative">
          <span
            className="absolute top-12 left-[23px] h-full w-[0.093rem] bg-gray-400 dark:bg-gray-500"
            aria-hidden="true"
          />
          <div className="relative flex items-start space-x-3">
            <Avatar pubkey={reply.pubkey} metadata={metadata} />
            <div className="min-w-0 flex-1">
              <div>
                <Username pubkey={reply.pubkey} createdAt={reply.created_at} metadata={metadata} />
              </div>
              <div className="text-sm text-richblack dark:text-cultured font-normal">
                <div className="break-words">
                  <ParsedText content={mappedEvent.content} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}
