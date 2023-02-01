'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { bech32ToHex, shortenID } from '../../utils'

export default function Page() {
  const [value, setValue] = useState('')
  const { setPrivkey } = useAppContext()
  const { push } = useRouter()

  const signIn = () => {
    try {
      const hex = bech32ToHex(value)
      setPrivkey(hex as string)
      push('/')
    } catch (e) {
      setPrivkey('')
    }
  }

  return (
    <div className="flow-root border-0 border-l border-r dark:border-gray-700 min-h-screen">
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <div className="flex justify-center">
              <div className="inline-flex justify-center align-middle items-baseline">
                <h2 className="text-center text-3xl font-bold tracking-normal dark:text-cultured text-richblack">
                  nostril
                </h2>
                <img className="mx-auto h-12 w-auto" src="/logo/nostril.svg" alt="nostril" />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900 mt-20">Account Sign In</h3>
            <p className="mt-1 text-sm text-gray-500">Use your nsec private key to sign in.</p>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="privkey" className="flex text-sm font-medium text-gray-700">
                  Private Key
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <div className="relative flex flex-grow items-stretch focus-within:z-10">
                    <input
                      type="text"
                      name="privkey"
                      id="privkey"
                      value={value}
                      className="rounded-lg sm:text-sm block w-full text-richblack dark:text-slate-200 focus:ring-px bg-white border border-gray-200 dark:border-gray-900 focus:ring-carolinablue focus:border-carolinablue dark:focus:ring-tallships dark:focus:border-tallships dark:bg-nero dark:placeholder-cultured"
                      placeholder={shortenID(
                        'nsec1eabms7jcdacjk3g3cexuhg2yx8zze9c4j2ma4e6c4g55dcsrckqq8siqhp'
                      )}
                      onChange={(e) => setValue(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="space-x-2 rounded-lg border border-gray-200 dark:border-gray-900 bg-cultured dark:bg-nero px-4 py-2 text-sm font-medium dark:text-cultured text-richblack hover:bg-gray-100 dark:hover:opacity-90"
                      onClick={signIn}
                    >
                      Sign in
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="my-3">
              <hr className="dark:border-gray-700 dark:opacity-30 my-6" />
              <button
                type="button"
                className="inline-flex items-center space-x-2 rounded-lg border border-gray-200 dark:border-gray-900 bg-cultured dark:bg-nero px-4 py-2 text-sm font-medium dark:text-cultured text-richblack hover:bg-gray-100 dark:hover:opacity-90"
                onClick={console.log}
              >
                <div className="text-sm font-medium">Create account</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
