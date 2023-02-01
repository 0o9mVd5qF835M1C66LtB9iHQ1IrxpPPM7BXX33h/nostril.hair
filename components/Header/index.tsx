import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
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
            <Link href="/" className="inline-flex items-center">
              <Image src="/logo/nostril.svg" height={40} width={40} alt="logo" className="" />
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
