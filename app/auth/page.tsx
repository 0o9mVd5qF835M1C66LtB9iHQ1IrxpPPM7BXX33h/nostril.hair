'use client'

import { getPublicKey } from 'nostr-tools'
import { useState } from 'react'
import InfoButton from '../../components/Button/Info'
import UnstyledButton from '../../components/Button/Unstyled'
import { useAppContext } from '../../context/AppContext'
import { bech32ToHex } from '../../utils'
import { requestProvider } from 'webln'
import { useRouter } from 'next/navigation'

export default function Page() {
  const [value, setValue] = useState('')
  const { setPrivkey, setPubkey, setProvider } = useAppContext()
  const { push } = useRouter()

  const connectLocal = () => {
    setPrivkey(bech32ToHex(value) as string)
    setPubkey(getPublicKey(bech32ToHex(value) as string))
    setProvider('local')

    push('/')
  }

  const connectAlby = async () => {
    try {
      const webln = await requestProvider()
      const info = await webln.getInfo()

      if (Object.keys(info?.node || {}).length > 0) {
        setProvider(info.node.alias)
        setPubkey(info.node.pubkey || '')
      } else {
        setProvider('web')
        setPubkey('')
      }

      push('/')
    } catch {
      setProvider('')
      setPubkey('')
    }
  }

  const connectNos2x = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const pubkey = await window?.nostr?.getPublicKey()

      if (pubkey) {
        setProvider('nos2x')
        setPubkey(pubkey)
        push('/')
      }
    } catch {
      setProvider('')
      setPubkey('')
    }
  }

  return (
    <div className="flow-root border-0 border-l border-r dark:border-gray-700 min-h-screen">
      <div className="flex min-h-full items-center justify-center py-9 px-4">
        <div className="w-full space-y-8">
          <div>
            <h3 className="text-lg font-medium leading-6 text-richblack dark:text-cultured">
              Account Sign In
            </h3>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-400">
              Use your nsec private key to sign in.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label
                  htmlFor="privkey"
                  className="flex text-sm font-medium text-richblack dark:text-cultured"
                >
                  Private Key
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <div className="relative flex flex-grow items-stretch focus-within:z-10">
                    <input
                      type="text"
                      name="privkey"
                      id="privkey"
                      value={value}
                      className="rounded-lg sm:text-sm block w-full text-richblack dark:text-slate-200 focus:ring-px bg-white border border-gray-200 dark:border-gray-900 focus:ring-carolinablue focus:border-carolinablue dark:focus:ring-tallships dark:focus:border-tallships dark:bg-nero"
                      onChange={(e) => setValue(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex justify-end">
                    <InfoButton
                      text="Sign in"
                      onClick={connectLocal}
                      disabled={!value.startsWith('nsec') || !bech32ToHex(value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t dark:border-t-gray-700 my-5">
              <div className="mb-6">
                <h3 className="mt-9 text-lg font-medium leading-6 text-richblack dark:text-cultured">
                  Provider Sign In
                </h3>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-400">
                  Use a web provider to sign in.
                </p>
              </div>
              <div className="my-3">
                <UnstyledButton
                  text="🐝&nbsp;Connect Alby"
                  onClick={connectAlby}
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  disabled
                />
              </div>
              <div className="my-3">
                <UnstyledButton
                  text="🔐&nbsp;Connect Nos2x"
                  onClick={connectNos2x}
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  disabled={!window?.nostr}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
