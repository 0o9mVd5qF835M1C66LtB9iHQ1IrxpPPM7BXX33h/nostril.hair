import classNames from 'classnames'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  FiCoffee,
  FiHash,
  FiHome,
  FiLogIn,
  FiLogOut,
  FiMail,
  FiMoon,
  FiSettings,
  FiSun,
  FiUser
} from 'react-icons/fi'
import { useAppContext } from '../../context/AppContext'

export default function Navigation() {
  const { resolvedTheme, setTheme } = useTheme()
  const { setPrivkey, pubkey, setPubkey, provider, setProvider } = useAppContext()
  const { push } = useRouter()

  return (
    <header className="sticky top-0 inset-x-0 dark:bg-dark bg-cultured h-screen flex flex-col">
      <nav aria-label="Top">
        <div className="py-6 space-y-9 h-screen">
          <div className="flex justify-center">
            <Link href="/" className="items-center dark:hidden">
              <Image
                src="/logo/light.svg"
                height={48}
                width={48}
                alt="logo"
                className="hidden sm:block"
                unoptimized
                quality={1}
              />
              <Image
                src="/logo/light.svg"
                height={40}
                width={40}
                alt="logo"
                className="block sm:hidden"
                unoptimized
                quality={1}
              />
            </Link>
            <Link href="/" className="items-center hidden dark:block">
              <Image
                src="/logo/dark.svg"
                height={48}
                width={48}
                alt="logo"
                className="hidden sm:block"
                unoptimized
                quality={1}
              />
              <Image
                src="/logo/dark.svg"
                height={40}
                width={40}
                alt="logo"
                className="block sm:hidden"
                unoptimized
                quality={1}
              />
            </Link>
          </div>
          <div className="flex justify-center mt-3">
            <Link
              href="/"
              className="text-richblack hover:text-richblack dark:text-cultured dark:hover:text-cultured text-2xl"
            >
              <FiHome />
            </Link>
          </div>
          <div className="flex justify-center mt-3">
            <Link
              href="/"
              className="text-richblack hover:text-richblack dark:text-cultured dark:hover:text-cultured text-2xl"
            >
              <FiHash />
            </Link>
          </div>
          <div className="flex justify-center mt-3">
            <Link
              href="/"
              className="text-richblack hover:text-richblack dark:text-cultured dark:hover:text-cultured text-2xl"
            >
              <FiMail />
            </Link>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
              className="text-richblack hover:text-richblack dark:text-cultured  dark:hover:text-cultured text-2xl"
            >
              {resolvedTheme === 'light' ? <FiSun /> : <FiMoon />}
            </button>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              disabled={!provider || !pubkey}
              onClick={() => push(`/${pubkey}`)}
              className={classNames(
                'text-richblack hover:text-richblack dark:text-cultured dark:hover:text-cultured text-2xl',
                (!provider || !pubkey) && 'opacity-50 cursor-not-allowed'
              )}
            >
              <FiUser />
            </button>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              disabled={!provider || !pubkey}
              onClick={() => push('/settings')}
              className={classNames(
                'text-richblack hover:text-richblack dark:text-cultured dark:hover:text-cultured text-2xl',
                (!provider || !pubkey) && 'opacity-50 cursor-not-allowed'
              )}
            >
              <FiSettings />
            </button>
          </div>
          <div className="flex justify-center mt-3">
            <Link
              href="https://wallet.getmash.com/e/michael?action=donate"
              target="_blank"
              className="text-richblack hover:text-richblack dark:text-cultured dark:hover:text-cultured text-2xl"
            >
              <FiCoffee />
            </Link>
          </div>
          {!provider ? (
            <div className="flex justify-center">
              <Link
                href="/auth"
                className="text-richblack hover:text-richblack dark:text-cultured  dark:hover:text-cultured text-2xl"
              >
                <FiLogIn />
              </Link>
            </div>
          ) : (
            <div className="flex justify-center">
              <Link href="/auth">
                <button
                  type="button"
                  className="text-richblack hover:text-richblack dark:text-cultured  dark:hover:text-cultured text-2xl"
                  onClick={() => {
                    setPrivkey('')
                    setPubkey('')
                    setProvider('')
                  }}
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
