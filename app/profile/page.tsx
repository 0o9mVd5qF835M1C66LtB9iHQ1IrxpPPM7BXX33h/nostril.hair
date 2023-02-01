'use client'

import { useProfile } from 'nostr-react'
import { getPublicKey } from 'nostr-tools'
import { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { hexToBech32 } from '../../utils'

export default function Page() {
  const [value, setValue] = useState('')
  const { privkey, setPrivkey } = useAppContext()

  const { data, isLoading } = useProfile({ pubkey: privkey ? getPublicKey(privkey as string) : '' })

  const signOut = () => {
    setPrivkey('')
  }

  const downloadKeys = () => {
    const json = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify({
        npub: data?.npub,
        nsec: hexToBech32(privkey, 'nsec')
      })
    )}`
    const link = document.createElement('a')
    link.href = json
    link.download = 'nostril.keys.json'

    link.click()
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
            <div className="mt-20">
              <form className="space-y-8 divide-y divide-gray-200">
                <div className="space-y-8 divide-y divide-gray-200">
                  <div>
                    <div>
                      <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Manage your public profile on the Nostr network.
                      </p>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div className="sm:col-span-4">
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label
                          htmlFor="username"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Username
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <input
                            type="text"
                            name="username"
                            id="username"
                            spellCheck="false"
                            value={data?.name || ''}
                            className="rounded-lg sm:text-sm block w-full text-richblack dark:text-slate-200 focus:ring-px bg-white border border-gray-200 dark:border-gray-900 focus:ring-carolinablue focus:border-carolinablue dark:focus:ring-tallships dark:focus:border-tallships dark:bg-nero dark:placeholder-cultured"
                            onChange={(e) => setValue(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label
                          htmlFor="displayName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Display Name
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <input
                            type="text"
                            name="displayName"
                            id="displayName"
                            spellCheck="false"
                            value={data?.display_name || ''}
                            className="rounded-lg sm:text-sm block w-full text-richblack dark:text-slate-200 focus:ring-px bg-white border border-gray-200 dark:border-gray-900 focus:ring-carolinablue focus:border-carolinablue dark:focus:ring-tallships dark:focus:border-tallships dark:bg-nero dark:placeholder-cultured"
                            onChange={(e) => setValue(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label
                          htmlFor="website"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Website
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <input
                            type="text"
                            name="website"
                            id="website"
                            spellCheck="false"
                            value={data?.website || ''}
                            className="rounded-lg sm:text-sm block w-full text-richblack dark:text-slate-200 focus:ring-px bg-white border border-gray-200 dark:border-gray-900 focus:ring-carolinablue focus:border-carolinablue dark:focus:ring-tallships dark:focus:border-tallships dark:bg-nero dark:placeholder-cultured"
                            onChange={(e) => setValue(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-6">
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                          About
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="about"
                            name="about"
                            value={data?.about || ''}
                            rows={1}
                            className="rounded-lg sm:text-sm block w-full text-richblack dark:text-slate-200 focus:ring-px bg-white border border-gray-200 dark:border-gray-900 focus:ring-carolinablue focus:border-carolinablue dark:focus:ring-tallships dark:focus:border-tallships dark:bg-nero dark:placeholder-cultured"
                            defaultValue=""
                            placeholder="Nostril is pretty neat."
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-6">
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                          Profile Picture
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="photo"
                            id="photo"
                            spellCheck="false"
                            value={data?.picture || ''}
                            className="rounded-lg sm:text-sm block w-full text-richblack dark:text-slate-200 focus:ring-px bg-white border border-gray-200 dark:border-gray-900 focus:ring-carolinablue focus:border-carolinablue dark:focus:ring-tallships dark:focus:border-tallships dark:bg-nero dark:placeholder-cultured"
                            placeholder="https://example.com/image.png"
                            onChange={(e) => setValue(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-6">
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label htmlFor="banner" className="block text-sm font-medium text-gray-700">
                          Profile Banner
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="banner"
                            id="banner"
                            spellCheck="false"
                            value={data?.banner || ''}
                            className="rounded-lg sm:text-sm block w-full text-richblack dark:text-slate-200 focus:ring-px bg-white border border-gray-200 dark:border-gray-900 focus:ring-carolinablue focus:border-carolinablue dark:focus:ring-tallships dark:focus:border-tallships dark:bg-nero dark:placeholder-cultured"
                            placeholder="https://example.com/image.png"
                            onChange={(e) => setValue(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-6">
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label htmlFor="nip05" className="block text-sm font-medium text-gray-700">
                          NIP-05 Identifier
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="nip05"
                            id="nip05"
                            spellCheck="false"
                            value={data?.nip05 || ''}
                            className="rounded-lg sm:text-sm block w-full text-richblack dark:text-slate-200 focus:ring-px bg-white border border-gray-200 dark:border-gray-900 focus:ring-carolinablue focus:border-carolinablue dark:focus:ring-tallships dark:focus:border-tallships dark:bg-nero dark:placeholder-cultured"
                            placeholder="https://example.com/image.png"
                            onChange={(e) => setValue(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8">
                    <div>
                      <h3 className="text-lg font-medium leading-6 text-gray-900">Keys</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Manage your public and private keys.
                      </p>
                    </div>
                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div className="sm:col-span-6">
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label htmlFor="npub" className="block text-sm font-medium text-gray-700">
                          Public Key
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            spellCheck="false"
                            name="npub"
                            id="npub"
                            value={data?.npub || ''}
                            className="rounded-lg sm:text-sm block w-full text-richblack dark:text-slate-200 focus:ring-px bg-white border border-gray-200 dark:border-gray-900 focus:ring-carolinablue focus:border-carolinablue dark:focus:ring-tallships dark:focus:border-tallships dark:bg-nero dark:placeholder-cultured"
                            placeholder="https://example.com/image.png"
                            onChange={(e) => setValue(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-6">
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label htmlFor="npub" className="block text-sm font-medium text-gray-700">
                          Private Key
                        </label>
                        <div className="mt-1">
                          <input
                            type="password"
                            readOnly
                            disabled
                            spellCheck="false"
                            name="npub"
                            id="npub"
                            value={data?.npub || ''}
                            className="rounded-lg sm:text-sm block w-full text-richblack dark:text-slate-200 focus:ring-px bg-white border border-gray-200 dark:border-gray-900 focus:ring-carolinablue focus:border-carolinablue dark:focus:ring-tallships dark:focus:border-tallships dark:bg-nero dark:placeholder-cultured"
                            placeholder="https://example.com/image.png"
                            onChange={(e) => setValue(e.target.value)}
                          />
                          <div className="mt-3">
                            <div className="flex justify-end">
                              <button
                                type="button"
                                className="space-x-2 rounded-lg border border-gray-200 dark:border-gray-900 bg-cultured dark:bg-nero px-4 py-2 text-sm font-medium dark:text-cultured text-richblack hover:bg-gray-100 dark:hover:opacity-90"
                                onClick={downloadKeys}
                              >
                                Download keys
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-5">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>

              <button
                type="button"
                className="relative -ml-px inline-flex items-center space-x-2 rounded-lg border border-gray-200 dark:border-gray-900 bg-cultured dark:bg-nero px-4 py-2 text-sm font-medium dark:text-cultured text-richblack hover:bg-gray-100 dark:hover:opacity-90"
                onClick={signOut}
              >
                <div className="text-sm font-medium">Sign out</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}