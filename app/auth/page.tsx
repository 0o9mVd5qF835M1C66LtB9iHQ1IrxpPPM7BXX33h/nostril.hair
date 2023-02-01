'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import InfoButton from '../../components/Button/Info'
import UnstyledButton from '../../components/Button/Unstyled'
import { useAppContext } from '../../context/AppContext'
import { bech32ToHex } from '../../utils'

export default function Page() {
  const [value, setValue] = useState('')
  const { setPrivkey } = useAppContext()
  const { push } = useRouter()

  const signIn = () => {
    try {
      const hex = bech32ToHex(value)

      if (hex) {
        setPrivkey(hex as string)
        push('/')
      }
    } catch (e) {
      setPrivkey('')
    }
  }

  return (
    <div className="flow-root border-0 border-l border-r dark:border-gray-700 min-h-screen">
      <div className="flex min-h-full items-center justify-center py-12">
        <div className="w-full max-w-md space-y-8">
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
                    <InfoButton text="Sign in" onClick={signIn} />
                  </div>
                </div>
              </div>
            </div>
            <div className="my-3">
              <hr className="dark:border-gray-700 dark:opacity-30 my-6" />
              <UnstyledButton text="Create account" onClick={console.log} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
