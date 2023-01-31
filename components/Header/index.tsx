import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BsMoon, BsSun } from 'react-icons/bs'

const navigation = [{ name: 'nostril', href: '/' }]

export default function Header() {
  const { resolvedTheme, setTheme } = useTheme()
  const pathname = usePathname()

  return (
    <header className="dark:bg-dark bg-cultured">
      <nav aria-label="Top">
        <div className="py-12 justify-between hidden lg:flex">
          <div className="items-center justify-start">
            <div className="hidden space-x-8 lg:flex">
              {navigation.map((link) => (
                <h1
                  key={link.name}
                  className={`text-2xl font-medium hover:text-richblack  dark:hover:text-slate-200 ${
                    pathname === link.href
                      ? 'font-bold text-richblack dark:text-slate-200'
                      : 'font-normal text-stone-700 dark:text-quicksilver'
                  }`}
                >
                  <Link href={link.href} className="inline-flex items-center space-x-3">
                    <div className="">
                      <Image
                        src="/logo/nostril.svg"
                        height={36}
                        width={36}
                        alt="logo"
                        className=""
                      />
                    </div>
                    <span>{link.name}</span>
                  </Link>
                </h1>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
            className="text-stone-700 hover:text-richblack dark:text-quicksilver  dark:hover:text-slate-200 text-2xl items-center justify-end hidden lg:flex"
          >
            {resolvedTheme === 'light' ? <BsSun /> : <BsMoon />}
          </button>
        </div>
        <div className="flex py-12 flex-wrap justify-between space-x-6 lg:hidden">
          <div className="flex-wrap space-x-6">
            {navigation.map((link) => (
              <h1
                key={link.name}
                className={`text-2xl font-medium hover:text-richblack  dark:hover:text-slate-200 ${
                  pathname === link.href
                    ? 'font-bold text-richblack dark:text-slate-200'
                    : 'font-normal text-stone-700 dark:text-quicksilver'
                }`}
              >
                <Link href={link.href} className="inline-flex items-center space-x-3">
                  <div className="">
                    <Image src="/logo/nostril.svg" height={36} width={36} alt="logo" className="" />
                  </div>
                  <span>{link.name}</span>
                </Link>
              </h1>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
            className="text-stone-700 hover:text-richblack dark:text-quicksilver  dark:hover:text-slate-200 text-normal text-2xl"
          >
            {resolvedTheme === 'light' ? <BsSun /> : <BsMoon />}
          </button>
        </div>
      </nav>
    </header>
  )
}
