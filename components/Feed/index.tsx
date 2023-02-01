import { mapEvent } from '../../utils'
import ParsedText from '../ParsedText'
import Avatar from '../Post/Avatar'
import Username from '../Post/Username'
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
    <div className="flow-root border-0 border-l border-r dark:border-gray-700 min-h-screen">
      <ul>
        {events.length > 0 ? (
          events.map((event) => {
            const mappedEvent = mapEvent(event.content, event.tags)
            console.log(mappedEvent)
            return (
              <li key={event.id} className="border-0 border-t dark:border-gray-700 px-4 py-6">
                <div className="relative ">
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
                        <Username pubkey={event.pubkey} createdAt={event.created_at} />
                      </div>
                      <div className="mt-2 text-sm text-richblack dark:text-cultured font-normal">
                        <div className="break-words">
                          <ParsedText content={event.content} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            )
          })
        ) : (
          <PostSkeleton count={5} />
        )}
      </ul>
    </div>
  )
}
