'use client'

import dayjs from 'dayjs'
import { useNostr } from 'nostr-react'
import { Event, getEventHash, getPublicKey, signEvent } from 'nostr-tools'
import { useState } from 'react'
import { useAppContext } from '../../../context/AppContext'
import InfoButton from '../../Button/Info'

export default function SendPost() {
  const [value, setValue] = useState('')
  const { privkey, provider, pubkey } = useAppContext()
  const { publish } = useNostr()

  const handlePost = async () => {
    try {
      if (provider === 'local') {
        const event: Event = {
          content: value,
          kind: 1,
          tags: [],
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
          tags: [],
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
    <div className="border-l border-r border-b dark:border-gray-700">
      <div className="border-none px-4 py-6">
        <div className="relative flex-col items-start space-x-3">
          <div className="sm:col-span-6">
            <div className="mt-1">
              <textarea
                id="about"
                name="about"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                rows={1}
                className="rounded-lg block w-full text-richblack dark:text-slate-200 focus:ring-px bg-white border border-gray-200 dark:border-gray-900 focus:ring-carolinablue focus:border-carolinablue dark:focus:ring-tallships dark:focus:border-tallships dark:bg-nero"
                placeholder="What's happening?"
              />
              <div className="pt-3">
                <div className="flex justify-end">
                  <InfoButton
                    text="Post"
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
