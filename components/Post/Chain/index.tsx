'use client'

import { useNostrEvents } from 'nostr-react'
import ParsedText from '../../ParsedText'
import Avatar from '../Avatar'
import Username from '../Username'
import classNames from 'classnames'

interface Props {
  replies: string[]
}

export default function Chain({ replies }: Props) {
  const { events: replyEvents, isLoading: loading } = useNostrEvents({
    filter: {
      ids: [...replies],
      since: 0,
      kinds: [1]
    }
  })

  return (
    <ul className="flow-root">
      {replyEvents
        .sort((a, b) => a.created_at - b.created_at)
        .map((event) => (
          <li
            key={event.id}
            className={classNames('mb-9', loading && 'animate-pulse bg-opacity-30')}
          >
            <div className="relative">
              <span
                className="absolute top-9 left-[23px] h-full w-[0.09rem] bg-gray-200 dark:bg-gray-700"
                aria-hidden="true"
              />
              <div className="relative flex items-start space-x-3">
                <Avatar pubkey={event.pubkey} />
                <div className="min-w-0 flex-1">
                  <div>
                    <Username pubkey={event.pubkey} createdAt={event.created_at} />
                  </div>
                  <div className="text-sm text-richblack dark:text-cultured font-normal">
                    <div className="break-words">
                      <ParsedText content={event.content} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
    </ul>
  )
}
