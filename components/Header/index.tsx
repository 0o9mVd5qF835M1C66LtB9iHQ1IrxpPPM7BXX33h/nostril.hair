import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
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

export default function Header() {
  const { resolvedTheme, setTheme } = useTheme()
  const { privkey, setPrivkey, pubkey } = useAppContext()

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
              />
              <Image
                src="/logo/light.svg"
                height={40}
                width={40}
                alt="logo"
                className="block sm:hidden"
                unoptimized
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
              />
              <Image
                src="/logo/dark.svg"
                height={40}
                width={40}
                alt="logo"
                className="block sm:hidden"
                unoptimized
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
              href="/explore"
              className="text-richblack hover:text-richblack dark:text-cultured dark:hover:text-cultured text-2xl"
            >
              <FiHash />
            </Link>
          </div>
          <div className="flex justify-center mt-3">
            <Link
              href="/messages"
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
          {!!privkey && (
            <div className="flex justify-center">
              <Link
                href={`/${pubkey}`}
                className="text-richblack hover:text-richblack dark:text-cultured dark:hover:text-cultured text-2xl"
              >
                <FiUser />
              </Link>
            </div>
          )}
          {!!privkey && (
            <div className="flex justify-center">
              <Link
                href="/settings"
                className="text-richblack hover:text-richblack dark:text-cultured  dark:hover:text-cultured text-2xl"
              >
                <FiSettings />
              </Link>
            </div>
          )}
          <div className="flex justify-center mt-3">
            <Link
              href="/support"
              className="text-richblack hover:text-richblack dark:text-cultured dark:hover:text-cultured text-2xl"
            >
              <FiCoffee />
            </Link>
          </div>
          {!privkey ? (
            <div className="flex justify-center">
              <Link
                href="/auth"
                className="text-richblack hover:text-richblack dark:text-cultured  dark:hover:text-cultured text-2xl"
              >
                <FiLogIn />
              </Link>
            </div>
          ) : (
            <div className="absolute mx-auto left-0 right-0 bottom-7 text-center">
              <Link href="/auth">
                <button
                  type="button"
                  className="text-richblack hover:text-richblack dark:text-cultured  dark:hover:text-cultured text-2xl"
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
