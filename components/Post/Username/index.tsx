'use client'

import dayjs from 'dayjs'
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
  } else {
    username = shortenID(pubkey)
  }

  return (
    <div className="text-sm">
      <Link href={pubkey}>
        <span className="hover:underline decoration-cultured font-semibold text-richblack dark:text-cultured text-[16px]">
          {username}
        </span>
        {data?.nip05 && (
          <div className="inline-flex items-center align-middle">
            <BsFillPatchCheckFill className="text-carolinablue text-md ml-1 mr-1" />
            <span className="text-xs text-gray-700 dark:text-gray-400 font-light">
              {data.nip05}
            </span>
          </div>
        )}
      </Link>
      <p className="mt-0.5 inline-flex text-xs font-normal text-gray-700 dark:text-gray-400">
        &nbsp;· {relativeTimeUTC(createdAt)}
      </p>
      <p className="mt-0.5 text-xs font-normal text-gray-700 dark:text-gray-400">
        {dayjs(new Date(createdAt * 1000)).format('h:mm A | MMM D, YYYY')}
      </p>
    </div>
  )
}
