'use client'

import { useProfile } from 'nostr-react'
import { generateFromString } from 'generate-avatar'
import Link from 'next/link'

interface Props {
  pubkey: string
}

export default function Avatar({ pubkey }: Props) {
  const { data } = useProfile({ pubkey })

  return (
    <Link href={pubkey} className="relative">
      <img
        className="flex h-12 w-12 items-center justify-center rounded-full hover:opacity-90"
        src={data?.picture || `data:image/svg+xml;utf8,${generateFromString(pubkey)}`}
        alt="avatar"
      />

      {/* <span className="absolute -bottom-0.5 -right-1 rounded-tl bg-transparent px-0.5 py-px">
        <ChatBubbleLeftEllipsisIcon className="h-5 w-5 text-cultured" aria-hidden="true" />
      </span> */}
    </Link>
  )
}
