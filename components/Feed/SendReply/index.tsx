'use client'

import dayjs from 'dayjs'
import { useNostr, useProfile } from 'nostr-react'
import { Event, getEventHash, getPublicKey, signEvent } from 'nostr-tools'
import { useState } from 'react'
import { useAppContext } from '../../../context/AppContext'
import InfoButton from '../../Button/Info'
import Avatar from '../../Post/Avatar'

interface Props {
  user: string
  post: string
}

export default function SendReply({ post }: Props) {
  const [value, setValue] = useState('')
  const { privkey, pubkey, provider } = useAppContext()
  const { data: metadata } = useProfile({ pubkey })
  const { publish } = useNostr()

  const handlePost = async () => {
    try {
      if (provider === 'local') {
        const event: Event = {
          content: value,
          kind: 1,
          tags: [['e', post, 'wss://relay.damus.io', 'root']],
          created_at: dayjs().unix(),
          pubkey: getPublicKey(privkey)
        }

        event.id = getEventHash(event)
        event.sig = signEvent(event, privkey)

        publish(event)
        setValue('')
      } else if (provider.includes('nos2x'.toLocaleLowerCase())) {
        const event: Event = {
          content: value,
          kind: 1,
          tags: [['e', post, 'wss://relay.damus.io', 'root']],
          created_at: dayjs().unix(),
          pubkey
        }

        event.id = getEventHash(event)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const message = await window?.nostr.signEvent(event)
        event.sig = message.sig

        publish(event)
        setValue('')
      } else {
        /* empty */
      }
    } catch {
      /* empty */
    }
  }

  return (
    <div className="border-t dark:border-gray-700">
      <div className="border-none py-6">
        <div className="relative flex-col items-start space-x-3">
          <div className="sm:col-span-6">
            <div className="mt-1 flex flex-row space-x-3 items-center">
              <Avatar pubkey={pubkey} metadata={metadata} />
              <textarea
                id="reply"
                name="reply"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                rows={1}
                className="rounded-lg block text-richblack dark:text-slate-200 focus:ring-px bg-white border border-gray-200 dark:border-gray-900 focus:ring-carolinablue focus:border-carolinablue dark:focus:ring-tallships dark:focus:border-tallships dark:bg-nero max-w-full h-auto flex-1"
                placeholder="Post your reply"
              />
              <div className="">
                <div className="flex justify-end">
                  <InfoButton
                    text="Reply"
                    onClick={handlePost}
                    disabled={!provider || !pubkey || value.length === 0 || value.length > 240}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
