'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useProfile } from 'nostr-react'
import { useEffect, useState } from 'react'
import { BsFillPatchCheckFill } from 'react-icons/bs'
import { FiLink, FiZap } from 'react-icons/fi'
import { useAppContext } from '../../context/AppContext'
import { shortenID } from '../../utils'
import UnstyledButton from '../Button/Unstyled'

interface Props {
  pubkey: string
}

export default function Profile({ pubkey }: Props) {
  const [hasData, setHasData] = useState(false)
  const { push } = useRouter()
  const { privkey, pubkey: sessionPubkey } = useAppContext()
  const { data } = useProfile({ pubkey, enabled: !hasData })

  useEffect(() => {
    if (Object.keys(data || {}).length > 0) {
      setHasData(true)
    }
  }, [data])

  return (
    <div className="border-l border-r border-b dark:border-gray-700">
      <div className="border-none px-4 py-6">
        <div className="relative flex-col items-start space-x-3">
          <div className="flex flex-row w-full">
            {data?.picture ? (
              <Link href={data.picture} className="relative" target="_blank">
                <Image
                  className="flex h-32 w-32 items-center justify-center rounded-full hover:opacity-90"
                  src={data.picture}
                  alt={data.picture}
                  height={128}
                  width={128}
                  unoptimized
                  quality={1}
                  placeholder="blur"
                  blurDataURL={data.picture}
                />
              </Link>
            ) : (
              <div>
                <Image
                  className="h-32 w-32 items-center justify-center rounded-full hover:opacity-90 cursor-pointer hidden dark:flex p-2 bg-nero"
                  src="/logo/dark.svg"
                  alt=""
                  height={128}
                  width={128}
                  unoptimized
                  quality={1}
                />
                <Image
                  className="flex h-32 w-32 items-center justify-center rounded-full hover:opacity-90 cursor-pointer dark:hidden p-2 bg-gray-200"
                  src="/logo/light.svg"
                  alt=""
                  height={128}
                  width={128}
                  unoptimized
                  quality={1}
                />
              </div>
            )}
            {!!privkey && pubkey === sessionPubkey && (
              <div className="self-end justify-end ml-1">
                <UnstyledButton text="Edit profile" onClick={() => push('/settings')} />
              </div>
            )}
          </div>
          <div className="mt-6">
            <span className="font-medium text-richblack dark:text-cultured text-xl max-w-prose truncate">
              {data?.display_name || shortenID(pubkey)}
            </span>
            {hasData && data?.nip05 && (
              <BsFillPatchCheckFill className="inline-flex text-carolinablue text-lg ml-1 mb-2" />
            )}
            {(data?.username || data?.name) && (
              <span className="text-md font-normal text-gray-700 dark:text-gray-400 self-center hidden sm:inline-flex ml-1 max-w-prose truncate">
                {data?.username || data?.name || ''}
              </span>
            )}
            <div>
              {data?.nip05 && (
                <div className="items-center align-middle self-center pb-1 -mt-1 max-w-prose truncate">
                  <span className="text-sm text-gray-700 dark:text-gray-400 font-normal">
                    {data.nip05.startsWith('_') ? data.nip05.split('_') : data.nip05 || ''}
                  </span>
                </div>
              )}
            </div>
            <div>
              {data?.about && (
                <div className="items-center align-middle self-center pb-1 mt-1 max-w-prose">
                  <span className="text-sm text-richblack dark:text-cultured font-normal">
                    {data.about}
                  </span>
                </div>
              )}
            </div>
            <div>
              {data?.website && (
                <Link
                  href={data.website}
                  className="self-center pb-1 mt-1 text-blue-700 dark:text-carolinablue hover:opacity-90 flex items-center"
                  target="_blank"
                >
                  <FiLink className="text-gray-700 dark:text-gray-400" />
                  <span className="text-sm font-normal ml-1">{data.website}</span>
                </Link>
              )}
            </div>
            <div>
              {(data?.lud16 || data?.lud06) && (
                <button
                  type="button"
                  className="self-center pb-1 mt-1 text-blue-700 dark:text-carolinablue hover:opacity-90 flex items-center"
                  // onClick={console.log}
                >
                  <FiZap className="text-gray-700 dark:text-gray-400" />
                  <span className="text-sm font-normal ml-1 max-w-xs truncate">
                    {data?.lud16 || shortenID(data?.lud06)}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
