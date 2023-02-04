'use client'

import Link from 'next/link'
import { Metadata } from 'nostr-react'
import { FiMessageSquare } from 'react-icons/fi'
import { shortenID } from '../../../utils'

interface Props {
  pubkey: string
  metadata?: Metadata
}

export default function RepliedLink({ pubkey, metadata }: Props) {
  return (
    <Link href={`/${pubkey}`} className="ml-[2.65rem] flex">
      <div className="flex items-center">
        <FiMessageSquare className="mr-1 font-bold text-gray-700 dark:text-gray-400 text-sm" />
        <span className="hover:underline dark:decoration-gray-400 decoration-gray-700 font-medium text-gray-700 dark:text-gray-400 text-sm">
          {metadata?.name || shortenID(pubkey)} replied
        </span>
      </div>
    </Link>
  )
}
