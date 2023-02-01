import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { BsArrowLeftRight, BsFillPersonFill, BsMoonFill, BsSunFill } from 'react-icons/bs'
import { useAppContext } from '../../context/AppContext'

export default function Header() {
  const { resolvedTheme, setTheme } = useTheme()
  const { privkey } = useAppContext()

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
              className="text-stone-700 hover:text-richblack dark:text-quicksilver  dark:hover:text-slate-200 text-xl mt-3"
            >
              {resolvedTheme === 'light' ? <BsSunFill className="text-2xl" /> : <BsMoonFill />}
            </button>
          </div>
          {!!privkey && (
            <div className="flex justify-center">
              <Link
                href="/profile"
                className="text-stone-700 hover:text-richblack dark:text-quicksilver  dark:hover:text-slate-200 text-2xl"
              >
                <BsFillPersonFill />
              </Link>
            </div>
          )}
          <div className="flex justify-center">
            <Link
              href="/auth"
              className="text-stone-700 hover:text-richblack dark:text-quicksilver  dark:hover:text-slate-200 text-2xl"
            >
              <BsArrowLeftRight />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
