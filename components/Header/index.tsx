import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { getPublicKey } from 'nostr-tools'
import { FiLogIn, FiLogOut, FiMoon, FiSettings, FiSun, FiUser } from 'react-icons/fi'
import { useAppContext } from '../../context/AppContext'

export default function Header() {
  const { resolvedTheme, setTheme } = useTheme()
  const { privkey, setPrivkey } = useAppContext()

  return (
    <header className="sticky top-0 inset-x-0 dark:bg-dark bg-cultured flex flex-col">
      <nav aria-label="Top">
        <div className="py-6 space-y-9">
          <div className="flex justify-center">
            <Link href="/" className="items-center dark:hidden">
              <Image
                src="/logo/light.svg"
                height={48}
                width={48}
                alt="logo"
                className="hidden sm:block"
              />
              <Image
                src="/logo/light.svg"
                height={40}
                width={40}
                alt="logo"
                className="block sm:hidden"
              />
            </Link>
            <Link href="/" className="items-center hidden dark:inline-flex ">
              <Image
                src="/logo/dark.svg"
                height={48}
                width={48}
                alt="logo"
                className="hidden sm:block"
              />
              <Image
                src="/logo/dark.svg"
                height={48}
                width={48}
                alt="logo"
                className="block sm:hidden"
              />
            </Link>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
              className="text-stone-700 hover:text-richblack dark:text-quicksilver  dark:hover:text-slate-200 text-2xl mt-3"
            >
              {resolvedTheme === 'light' ? <FiSun /> : <FiMoon />}
            </button>
          </div>
          {!!privkey && (
            <div className="flex justify-center">
              <Link
                href={`${getPublicKey(privkey)}`}
                className="text-stone-700 hover:text-richblack dark:text-quicksilver  dark:hover:text-slate-200 text-2xl"
              >
                <FiUser />
              </Link>
            </div>
          )}
          {!!privkey && (
            <div className="flex justify-center">
              <Link
                href="/settings"
                className="text-stone-700 hover:text-richblack dark:text-quicksilver  dark:hover:text-slate-200 text-2xl"
              >
                <FiSettings />
              </Link>
            </div>
          )}
          {!privkey ? (
            <div className="flex justify-center">
              <Link
                href="/auth"
                className="text-stone-700 hover:text-richblack dark:text-quicksilver  dark:hover:text-slate-200 text-2xl"
              >
                <FiLogIn />
              </Link>
            </div>
          ) : (
            <div className="flex justify-center">
              <Link href="/auth">
                <button
                  type="button"
                  className="text-stone-700 hover:text-richblack dark:text-quicksilver  dark:hover:text-slate-200 text-2xl"
                  onClick={() => setPrivkey('')}
                >
                  <FiLogOut />
                </button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
