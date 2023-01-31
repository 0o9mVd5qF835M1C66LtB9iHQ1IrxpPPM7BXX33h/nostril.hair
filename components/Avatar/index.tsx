'use client'

import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/20/solid'
import { useProfile } from 'nostr-react'
import { generateFromString } from 'generate-avatar'

interface Props {
  pubkey: string
}

export default function Avatar({ pubkey }: Props) {
  const { data: userData } = useProfile({ pubkey })

  return (
    <div className="relative">
      <img
        className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-400 ring-4 ring-quicksilver dark:ring-quicksilver"
        src={userData?.picture || `data:image/svg+xml;utf8,${generateFromString(pubkey)}`}
        alt="avatar"
      />

      <span className="absolute -bottom-0.5 -right-1 rounded-tl bg-transparent px-0.5 py-px">
        <ChatBubbleLeftEllipsisIcon className="h-5 w-5 text-cultured" aria-hidden="true" />
      </span>
    </div>
  )
}
