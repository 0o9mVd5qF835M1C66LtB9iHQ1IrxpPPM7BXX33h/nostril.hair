import { useProfile } from 'nostr-react'
import { getPublicKey } from 'nostr-tools'
import { useState } from 'react'
import { BsKeyFill, BsArrowRight, BsArrowBarRight } from 'react-icons/bs'
import { useAppContext } from '../../../context/AppContext'
import { bech32ToHex, shortenID } from '../../../utils'

export default function Auth() {
  const { privkey, setPrivkey, setPubkey } = useAppContext()
  const [value, setValue] = useState<string>('')

  const { data } = useProfile({ pubkey: privkey ? getPublicKey(privkey as string) : '' })

  const signIn = () => {
    try {
      const hex = bech32ToHex(value)
      setPrivkey(hex as string)
    } catch (e) {
      setPrivkey('')
    }
  }

  const signOut = () => {
    setPrivkey('')
    setPubkey('')
  }

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {!privkey ? (
        <div>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label
            htmlFor="privkey"
            className="block text-sm font-medium text-richblack dark:text-cultured"
          >
            Sign in
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <div className="relative flex flex-grow items-stretch focus-within:z-10">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <BsKeyFill
                  className="h-5 w-5 text-gray-700 dark:text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                type="text"
                name="privkey"
                id="privkey"
                value={value}
                className="rounded-l-lg pl-10 sm:text-sm block w-full text-richblack dark:text-slate-200 focus:ring-px bg-white border border-gray-200 dark:border-gray-900 focus:ring-carolinablue focus:border-carolinablue dark:focus:ring-tallships dark:focus:border-tallships dark:bg-nero dark:placeholder-cultured"
                placeholder={shortenID(
                  'nsec1eabms7jcdacjk3g3cexuhg2yx8zze9c4j2ma4e6c4g55dcsrckqq8siqhp'
                )}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="relative -ml-px inline-flex items-center space-x-2 rounded-r-lg border border-gray-200 dark:border-gray-900 bg-cultured dark:bg-nero px-4 py-2 text-sm font-medium dark:text-cultured text-richblack hover:bg-gray-100 dark:opacity-80 dark:hover:opacity-90"
              onClick={signIn}
            >
              <div className="text-lg">
                <BsArrowRight className="text-gray-700 dark:text-gray-400" />
              </div>
            </button>
          </div>
        </div>
      ) : (
        <button type="button" className="flex text-sm" onClick={signOut}>
          Sign out
          <BsArrowBarRight className="text-gray-700 dark:text-gray-400 text-xl ml-1" />
        </button>
      )}
    </>
  )
}
