'use client'

import Link from 'next/link'
import { useProfile } from 'nostr-react'
import { BsFillPatchCheckFill } from 'react-icons/bs'
import { relativeTimeUTC, shortenID } from '../../../utils'

interface Props {
  pubkey: string
  createdAt: number
}

export default function Username({ pubkey, createdAt }: Props) {
  const { data } = useProfile({ pubkey })

  let username = ''

  if (data?.username) {
    username = data.username
  } else if (data?.display_name) {
    username = data.display_name
  } else if (data?.name) {
    username = data.name
  } else {
    username = shortenID(pubkey)
  }

  return (
    <>
      <Link href={`/user?pubkey=${pubkey}`}>
        <span className="hover:underline dark:decoration-cultured decoration-richblack font-medium text-richblack dark:text-cultured text-[15px]">
          {username}
        </span>
      </Link>
      {data?.nip05 && (
        <BsFillPatchCheckFill className="inline-flex text-carolinablue text-md ml-1 mb-px" />
      )}
      {(data?.username || data?.name) && (
        <span className="text-sm font-normal text-gray-700 dark:text-gray-400 self-center hidden sm:inline-flex ml-1">
          {data?.username || data?.name || ''}
        </span>
      )}
      <span className="inline-flex text-sm font-normal text-gray-700 dark:text-gray-400 self-center align-middle">
        &nbsp;· {relativeTimeUTC(createdAt)}
      </span>
      {data?.nip05 && (
        <div className="items-center align-middle self-center pb-1 -mt-1.5">
          <span className="text-[0.815rem] text-gray-700 dark:text-gray-400 font-normal">
            {data?.nip05.startsWith('_') ? data.nip05.split('_') : data.nip05 || ''}
          </span>
        </div>
      )}
    </>
  )
}
