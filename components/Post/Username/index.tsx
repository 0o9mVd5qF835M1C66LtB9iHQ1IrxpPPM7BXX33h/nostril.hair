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

  return (
    <>
      <Link href={`/${pubkey}`}>
        <span className="hover:underline dark:decoration-cultured decoration-richblack font-medium text-richblack dark:text-cultured text-[15px] max-w-prose truncate">
          {data?.display_name || shortenID(pubkey)}
        </span>
      </Link>
      {data?.nip05 && (
        <BsFillPatchCheckFill className="inline-flex text-carolinablue text-md ml-1 mb-px" />
      )}
      {data?.name && (
        <span className="text-sm font-normal text-gray-700 dark:text-gray-400 self-center hidden sm:inline-flex ml-1 max-w-prose truncate">
          @{data.name}
        </span>
      )}
      <span className="inline-flex text-sm font-normal text-gray-700 dark:text-gray-400 self-center align-middle">
        &nbsp;· {relativeTimeUTC(createdAt)}
      </span>
      {/* {data?.nip05 && (
        <div className="items-center align-middle self-center pb-1 -mt-1.5 max-w-prose truncate">
          <span className="text-[0.815rem] text-gray-700 dark:text-gray-400 font-normal truncate">
            {data?.nip05.startsWith('_') ? data.nip05.split('_') : data.nip05 || ''}
          </span>
        </div>
      )} */}
    </>
  )
}
