'use client'

import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'

import { getPublicKey } from 'nostr-tools'

import Auth from './Auth'
import { BsList } from 'react-icons/bs'

export default function FlyoutMenu() {
  return (
    <Popover className="relative z-50">
      <>
        <div className="z-10">
          <div className="text-xl text-thin">
            <Popover.Button>
              <BsList />
            </Popover.Button>
          </div>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 -translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 -translate-y-1"
        >
          <Popover.Panel className="absolute inset-x-0 z-50 transform shadow-lg px-8 min-w-[610px] bg-white dark:bg-black rounded-lg mt-6">
            <div className="absolute inset-0 flex" aria-hidden="true">
              {/* <div className="w-full bg-white" />
              <div className="w-1/2 bg-gray-50" /> */}
            </div>
            <div className="relative mx-auto py-6">
              <nav className="" aria-labelledby="heading">
                <h2 id="heading" className="sr-only">
                  Menu
                </h2>
                <Auth />
              </nav>
            </div>
          </Popover.Panel>
        </Transition>
      </>
    </Popover>
  )
}
