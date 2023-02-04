import { useProfile } from 'nostr-react'
import { Event } from 'nostr-tools'
import { mapEvent } from '../../../utils'
import ParsedText from '../../ParsedText'
import Avatar from '../Avatar'
import Username from '../Username'

interface Props {
  event: Event
}

export default function Reply({ event }: Props) {
  const mappedEvent = mapEvent(event.content, event.tags)
  const { data: metadata } = useProfile({ pubkey: event.pubkey })

  return (
    <li key={event.id} className="mb-9">
      <div className="relative">
        <span
          className="absolute top-9 left-[23px] h-full w-[0.093rem] bg-gray-400 dark:bg-gray-500"
          aria-hidden="true"
        />
        <div className="relative flex items-start space-x-3">
          <Avatar pubkey={event.pubkey} metadata={metadata} />
          <div className="min-w-0 flex-1">
            <div>
              <Username pubkey={event.pubkey} createdAt={event.created_at} metadata={metadata} />
            </div>
            <div className="text-sm text-richblack dark:text-cultured font-normal">
              <div className="break-words">
                <ParsedText content={mappedEvent.content} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}
