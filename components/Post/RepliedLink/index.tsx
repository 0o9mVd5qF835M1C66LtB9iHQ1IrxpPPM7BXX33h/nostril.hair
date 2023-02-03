'use client'

import Link from 'next/link'
import { useProfile } from 'nostr-react'
import { FiMessageSquare } from 'react-icons/fi'
import { shortenID } from '../../../utils'

interface Props {
  pubkey: string
}

export default function RepliedLink({ pubkey }: Props) {
  const { data } = useProfile({ pubkey })

  let username = ''

  if (data?.username) {
    username = data.username
  } else if (data?.display_name) {
    username = data.display_name
  } else {
    username = shortenID(pubkey)
  }

  return (
    <Link href={`/user?pubkey=${pubkey}`} className="ml-[2.65rem] flex">
      <div className="flex items-center">
        <FiMessageSquare className="mr-1 font-bold text-gray-700 dark:text-gray-400 text-sm" />
        <span className="hover:underline dark:decoration-gray-400 decoration-gray-700 font-medium text-gray-700 dark:text-gray-400 text-sm">
          {username} replied
        </span>
      </div>
    </Link>
  )
}
