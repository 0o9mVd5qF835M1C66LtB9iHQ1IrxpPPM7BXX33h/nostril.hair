'use client'

import { Metadata } from 'nostr-react'
import Link from 'next/link'
import Image from 'next/image'

interface Props {
  pubkey: string
  metadata: Metadata
}

export default function Avatar({ pubkey, metadata }: Props) {
  return (
    <Link href={`/${pubkey}`}>
      {metadata?.picture ? (
        <Image
          className="flex h-12 w-12 items-center justify-center rounded-full hover:opacity-90"
          src={metadata.picture}
          alt={metadata.picture}
          height={48}
          width={48}
          unoptimized
          quality={1}
          placeholder="blur"
          blurDataURL={metadata.picture}
        />
      ) : (
        <>
          <Image
            className="h-12 w-12 items-center justify-center rounded-full hover:opacity-90 cursor-pointer hidden dark:flex bg-nero p-2"
            src="/logo/dark.svg"
            alt=""
            height={48}
            width={48}
            unoptimized
            quality={1}
          />
          <Image
            className="flex h-12 w-12 items-center justify-center rounded-full hover:opacity-90 cursor-pointer dark:hidden bg-gray-200 p-2"
            src="/logo/light.svg"
            alt=""
            height={48}
            width={48}
            unoptimized
            quality={1}
          />
        </>
      )}
    </Link>
  )
}
