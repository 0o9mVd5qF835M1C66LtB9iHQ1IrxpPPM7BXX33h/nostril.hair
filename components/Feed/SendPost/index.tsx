'use client'

import dayjs from 'dayjs'
import { useNostr } from 'nostr-react'
import { Event, getEventHash, getPublicKey, signEvent } from 'nostr-tools'
import { useState } from 'react'
import { useAppContext } from '../../../context/AppContext'
import InfoButton from '../../Button/Info'

export default function SendPost() {
  const [value, setValue] = useState('')
  const { privkey } = useAppContext()
  const { publish } = useNostr()

  const handlePost = async () => {
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
                    disabled={value.length === 0 || value.length > 240}
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
