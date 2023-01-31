import { relativeTimeUTC, shortenID, urlify } from '../../utils'
import Avatar from '../Avatar'

interface NostrEvent extends Event {
  content: string
  created_at: number
  id: string
  kind: number
  pubkey: string
  sig: string
  tags: string[]
}

interface Props {
  events: NostrEvent[]
}

export default function Feed({ events }: Props) {
  return (
    <div className="flow-root mb-16">
      <ul className="-mb-8">
        {events.map((event) => {
          return (
            <li key={event.id} className="my-3">
              <div className="relative pb-8">
                {/* {eventIndex !== event.length - 1 ? (
                  <span
                    className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                ) : null} */}
                <div className="relative flex items-start space-x-3">
                  <Avatar pubkey={event.pubkey} />
                  <div className="min-w-0 flex-1">
                    <div>
                      <div className="text-sm">
                        <a href={event.pubkey} className="font-medium text-gray-900">
                          {shortenID(event.pubkey)}
                        </a>
                      </div>
                      {/* <p className="mt-0.5 text-sm text-gray-500">
                        {dayjs(dayjs().valueOf() - event.created_at).format(
                          'HH:mm:ss | ddd, MMM D, YYYY'
                        )}
                      </p> */}
                      <p className="mt-0.5 text-sm text-gray-500">
                        {relativeTimeUTC(event.created_at)}
                      </p>
                    </div>
                    <div className="mt-2 text-sm text-gray-700">
                      {/* eslint-disable-next-line react/no-danger */}
                      <p dangerouslySetInnerHTML={{ __html: urlify(event.content) }} />
                    </div>
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
