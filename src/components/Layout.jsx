import { Fragment, useId, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { Menu, Popover, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'

import { AudioPlayer } from '@/components/player/AudioPlayer'
import squareLogo from '@/images/lcr-logo-square.svg'
import sidewaysLogo from '@/images/lcr-logo-sideways.svg'

const navigation = [
  { name: 'Home', href: '#', current: true },
  { name: 'Profile', href: '#', current: false },
  { name: 'Resources', href: '#', current: false },
  { name: 'Company Directory', href: '#', current: false },
  { name: 'Openings', href: '#', current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function TinyWaveFormIcon({ colors = [], ...props }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 10 10" {...props}>
      <path
        d="M0 5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V5Z"
        className={colors[0]}
      />
      <path
        d="M6 1a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V1Z"
        className={colors[1]}
      />
    </svg>
  )
}

function SpotifyIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" {...props}>
      <path d="M15.8 3a12.8 12.8 0 1 0 0 25.6 12.8 12.8 0 0 0 0-25.6Zm5.87 18.461a.8.8 0 0 1-1.097.266c-3.006-1.837-6.787-2.252-11.244-1.234a.796.796 0 1 1-.355-1.555c4.875-1.115 9.058-.635 12.432 1.427a.8.8 0 0 1 .265 1.096Zm1.565-3.485a.999.999 0 0 1-1.371.33c-3.44-2.116-8.685-2.728-12.755-1.493a1 1 0 0 1-.58-1.91c4.65-1.41 10.428-.726 14.378 1.7a1 1 0 0 1 .33 1.375l-.002-.002Zm.137-3.629c-4.127-2.45-10.933-2.675-14.871-1.478a1.196 1.196 0 1 1-.695-2.291c4.52-1.374 12.037-1.107 16.785 1.711a1.197 1.197 0 1 1-1.221 2.06" />
    </svg>
  )
}

function ApplePodcastIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.528 24.8c-.232.592-.768 1.424-1.536 2.016-.44.336-.968.664-1.688.88-.768.232-1.72.304-2.904.304H10.6c-1.184 0-2.128-.08-2.904-.304a4.99 4.99 0 0 1-1.688-.88c-.76-.584-1.304-1.424-1.536-2.016C4.008 23.608 4 22.256 4 21.4V10.6c0-.856.008-2.208.472-3.4.232-.592.768-1.424 1.536-2.016.44-.336.968-.664 1.688-.88C8.472 4.08 9.416 4 10.6 4h10.8c1.184 0 2.128.08 2.904.304a4.99 4.99 0 0 1 1.688.88c.76.584 1.304 1.424 1.536 2.016C28 8.392 28 9.752 28 10.6v10.8c0 .856-.008 2.208-.472 3.4Zm-9.471-6.312a1.069 1.069 0 0 0-.32-.688c-.36-.376-.992-.624-1.736-.624-.745 0-1.377.24-1.737.624-.183.2-.287.4-.32.688-.063.558-.024 1.036.04 1.807v.009c.065.736.184 1.72.336 2.712.112.712.2 1.096.28 1.368.136.448.625.832 1.4.832.776 0 1.273-.392 1.4-.832.08-.272.169-.656.28-1.368.152-1 .273-1.976.337-2.712.072-.776.104-1.256.04-1.816ZM16 16.375c1.088 0 1.968-.88 1.968-1.967 0-1.08-.88-1.968-1.968-1.968s-1.968.88-1.968 1.968.88 1.967 1.968 1.967Zm-.024-9.719c-4.592.016-8.352 3.744-8.416 8.336-.048 3.72 2.328 6.904 5.648 8.072.08.032.16-.04.152-.12a35.046 35.046 0 0 0-.041-.288c-.029-.192-.057-.384-.079-.576a.317.317 0 0 0-.168-.232 7.365 7.365 0 0 1-4.424-6.824c.04-4 3.304-7.256 7.296-7.288 4.088-.032 7.424 3.28 7.424 7.36 0 3.016-1.824 5.608-4.424 6.752a.272.272 0 0 0-.168.232l-.12.864c-.016.088.072.152.152.12a8.448 8.448 0 0 0 5.648-7.968c-.016-4.656-3.816-8.448-8.48-8.44Zm-5.624 8.376c.04-2.992 2.44-5.464 5.432-5.576 3.216-.128 5.88 2.456 5.872 5.64a5.661 5.661 0 0 1-2.472 4.672c-.08.056-.184-.008-.176-.096.016-.344.024-.648.008-.96 0-.104.04-.2.112-.272a4.584 4.584 0 0 0 1.448-3.336 4.574 4.574 0 0 0-4.752-4.568 4.585 4.585 0 0 0-4.392 4.448 4.574 4.574 0 0 0 1.448 3.456c.08.072.12.168.112.272-.016.32-.016.624.008.968 0 .088-.104.144-.176.096a5.65 5.65 0 0 1-2.472-4.744Z"
      />
    </svg>
  )
}

function OvercastIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" {...props}>
      <path d="M16 28.8A12.77 12.77 0 0 1 3.2 16 12.77 12.77 0 0 1 16 3.2 12.77 12.77 0 0 1 28.8 16 12.77 12.77 0 0 1 16 28.8Zm0-5.067.96-.96-.96-3.68-.96 3.68.96.96Zm-1.226-.054-.48 1.814 1.12-1.12-.64-.694Zm2.453 0-.64.64 1.12 1.12-.48-1.76Zm.907 3.307L16 24.853l-2.133 2.133c.693.107 1.387.213 2.133.213.747 0 1.44-.053 2.134-.213ZM16 4.799C9.814 4.8 4.8 9.813 4.8 16c0 4.907 3.147 9.067 7.52 10.56l2.4-8.906c-.533-.374-.853-1.014-.853-1.707A2.14 2.14 0 0 1 16 13.813a2.14 2.14 0 0 1 2.134 2.133c0 .693-.32 1.28-.854 1.707l2.4 8.906A11.145 11.145 0 0 0 27.2 16c0-6.186-5.013-11.2-11.2-11.2Zm7.307 16.747c-.267.32-.747.427-1.12.16-.373-.267-.427-.747-.16-1.067 0 0 1.44-1.92 1.44-4.64 0-2.72-1.44-4.64-1.44-4.64-.267-.32-.213-.8.16-1.066.373-.267.853-.16 1.12.16.107.106 1.76 2.293 1.76 5.546 0 3.254-1.653 5.44-1.76 5.547Zm-3.893-2.08c-.32-.32-.267-.907.053-1.227 0 0 .8-.853.8-2.24 0-1.386-.8-2.186-.8-2.24-.32-.32-.32-.853-.053-1.226.32-.374.8-.374 1.12-.054.053.054 1.333 1.387 1.333 3.52 0 2.134-1.28 3.467-1.333 3.52-.32.32-.8.267-1.12-.053Zm-6.827 0c-.32.32-.8.373-1.12.053-.053-.106-1.333-1.386-1.333-3.52 0-2.133 1.28-3.413 1.333-3.52.32-.32.853-.32 1.12.054.32.32.267.906-.053 1.226 0 .054-.8.854-.8 2.24 0 1.387.8 2.24.8 2.24.32.32.373.854.053 1.227Zm-2.773 2.24c-.374.267-.854.16-1.12-.16-.107-.107-1.76-2.293-1.76-5.547 0-3.253 1.653-5.44 1.76-5.546.266-.32.746-.427 1.12-.16.373.266.426.746.16 1.066 0 0-1.44 1.92-1.44 4.64 0 2.72 1.44 4.64 1.44 4.64.266.32.16.8-.16 1.067Z" />
    </svg>
  )
}

function RSSIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.5 4h15A4.5 4.5 0 0 1 28 8.5v15a4.5 4.5 0 0 1-4.5 4.5h-15A4.5 4.5 0 0 1 4 23.5v-15A4.5 4.5 0 0 1 8.5 4ZM13 22a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-6-6a9 9 0 0 1 9 9h3A12 12 0 0 0 7 13v3Zm5.74-4.858A15 15 0 0 0 7 10V7a18 18 0 0 1 18 18h-3a15 15 0 0 0-9.26-13.858Z"
      />
    </svg>
  )
}

function PersonIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 11 12" {...props}>
      <path d="M5.019 5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm3.29 7c1.175 0 2.12-1.046 1.567-2.083A5.5 5.5 0 0 0 5.019 7 5.5 5.5 0 0 0 .162 9.917C-.39 10.954.554 12 1.73 12h6.578Z" />
    </svg>
  )
}

function AboutSection(props) {
  let [isExpanded, setIsExpanded] = useState(false)

  return (
    <section {...props}>
      <h2 className="flex items-center font-mono text-sm font-medium leading-7 text-slate-900">
        <TinyWaveFormIcon
          colors={['fill-brand-yellow-300', 'fill-brand-red-300']}
          className="h-2.5 w-2.5"
        />
        <span className="ml-2.5">About</span>
      </h2>
      <p
        className={clsx(
          'mt-2 text-base leading-7 text-slate-700',
          !isExpanded && 'lg:line-clamp-4'
        )}
      >
        In this show, Eric and Wes dig deep to get to the facts with guests who
        have been labeled villains by a society quick to judge, without actually
        getting the full story. Tune in every Thursday to get to the truth with
        another misunderstood outcast as they share the missing context in their
        tragic tale.
      </p>
      {!isExpanded && (
        <button
          type="button"
          className="mt-2 hidden text-sm font-bold leading-6 text-brand-red-500 hover:text-brand-red-700 active:text-brand-red-900 lg:inline-block"
          onClick={() => setIsExpanded(true)}
        >
          Show more
        </button>
      )}
    </section>
  )
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function Layout({children}) {
  return (
    <>
      <div className="min-h-full">
        <Popover as="header" className="bg-brand-yellow-500 pb-24">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="relative flex items-center justify-center py-5 lg:justify-between">
                  {/* Logo */}
                  <div className="absolute left-0 -ml-2 top-2 flex-shrink-0 lg:static">
                    <a href="#">
                      <span className="sr-only">Legacy Code Rocks!</span>
                      <Image
                        className="h-18 w-auto"
                        src={sidewaysLogo}
                        alt="Legacy Code Rocks!"
                        priority
                      />
                    </a>
                  </div>

                  {/* Search */}
                  <div className="min-w-0 flex-1 lg:hidden">
                    <div className="w-full max-w-s mt-20 ml-0">
                      <label htmlFor="mobile-search" className="sr-only">
                        Search
                      </label>
                      <div className="relative text-brand-yellow-900 focus-within:text-gray-800">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <input
                          id="mobile-search"
                          className="block w-full rounded-md border-0 bg-brand-yellow-400 py-1.5 pl-10 pr-3 text-black placeholder:text-brand-yellow-900 focus:bg-brand-yellow-400 focus:text-gray-900 focus:ring-0 focus:placeholder:text-gray-900 sm:text-sm sm:leading-6"
                          placeholder="Search"
                          type="search"
                          name="search"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Menu button */}
                  <div className="absolute -mt-20 right-0 flex-shrink-0 lg:hidden">
                    {/* Mobile menu button */}
                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-transparent p-2 text-brand-yellow-900 hover:bg-brand-yellow-100 hover:bg-opacity-50 hover:text-black focus:outline-none focus:ring-2 focus:ring-brand-yellow-900">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Popover.Button>
                  </div>
                </div>
                <div className="hidden border-t border-white border-opacity-20 py-5 lg:block">
                  <div className="grid grid-cols-3 items-center gap-8">
                    <div className="col-span-2">
                      <nav className="flex space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current ? 'text-black' : 'text-brand-yellow-900',
                              'rounded-md bg-white bg-opacity-0 px-3 py-2 text-sm font-medium hover:bg-opacity-30'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </nav>
                    </div>
                    <div>
                      <div className="mx-auto w-full max-w-md">
                        <label htmlFor="desktop-search" className="sr-only">
                          Search
                        </label>
                        <div className="relative text-brand-yellow-900 focus-within:text-gray-800">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                          </div>
                          <input
                            id="desktop-search"
                            className="block w-full rounded-md border-0 bg-brand-yellow-400 py-1.5 pl-10 pr-3 text-black placeholder:text-brand-yellow-900 focus:bg-brand-yellow-400 focus:text-gray-900 focus:ring-0 focus:placeholder:text-gray-900 sm:text-sm sm:leading-6"
                            placeholder="Search"
                            type="search"
                            name="search"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Transition.Root as={Fragment}>
                <div className="lg:hidden">
                  <Transition.Child
                    as={Fragment}
                    enter="duration-150 ease-out"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="duration-150 ease-in"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Popover.Overlay className="fixed inset-0 z-20 bg-black bg-opacity-25" />
                  </Transition.Child>

                  <Transition.Child
                    as={Fragment}
                    enter="duration-150 ease-out"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="duration-150 ease-in"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Popover.Panel
                      focus
                      className="absolute inset-x-0 top-0 z-30 mx-auto w-full max-w-3xl origin-top transform p-2 transition"
                    >
                      <div className="divide-y divide-gray-500 rounded-lg bg-brand-yellow-500 shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="pb-2 pt-3">
                          <div className="flex items-center justify-between px-4">
                            <div>
                              <Image
                                className="h-18 w-auto"
                                src={sidewaysLogo}
                                alt="Legacy Code Rocks!"
                                priority
                              />
                            </div>
                            <div className="-mr-2">
                              <Popover.Button className="inline-flex items-center justify-center rounded-md bg-brand-yellow-100 p-2 text-brand-yellow-900 hover:bg-brand-yellow-200 hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-yellow-900">
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                              </Popover.Button>
                            </div>
                          </div>
                          <div className="mt-3 space-y-1 px-2">
                            <a
                              href="#"
                              className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-brand-yellow-100 hover:text-gray-800"
                            >
                              Home
                            </a>
                            <a
                              href="#"
                              className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-brand-yellow-100 hover:text-gray-800"
                            >
                              Profile
                            </a>
                            <a
                              href="#"
                              className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-brand-yellow-100 hover:text-gray-800"
                            >
                              Resources
                            </a>
                            <a
                              href="#"
                              className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-brand-yellow-100 hover:text-gray-800"
                            >
                              Company Directory
                            </a>
                            <a
                              href="#"
                              className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-brand-yellow-100 hover:text-gray-800"
                            >
                              Openings
                            </a>
                          </div>
                        </div>
                        <div className="pb-2 pt-4">
                          <div className="px-2">
                            {userNavigation.map((item) => (
                              <a
                                key={item.name}
                                href={item.href}
                                className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-brand-yellow-100 hover:text-gray-800"
                              >
                                {item.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition.Child>
                </div>
              </Transition.Root>
            </>
          )}
        </Popover>
        <main className="-mt-24 pb-8">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="sr-only">Page title</h1>
            {/* Main 3 column grid */}
            <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
              {/* Left column */}
              <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                <section aria-labelledby="section-1-title">
                  <h2 className="sr-only" id="section-1-title">
                    Section title
                  </h2>
                  <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-6">
                      {children}
                    </div>
                  </div>
                </section>
              </div>

              {/* Right column */}
              <div className="grid grid-cols-1 gap-4">
                <section aria-labelledby="section-2-title">
                  <h2 className="sr-only" id="section-2-title">
                    Section title
                  </h2>
                  <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-6">
                      {/* Right column content */}
                      <Link
                        href="/"
                        className="relative mx-auto block w-48 overflow-hidden rounded-lg bg-slate-200 shadow-xl shadow-slate-200 sm:w-64 sm:rounded-xl lg:w-auto lg:rounded-2xl"
                        aria-label="Homepage"
                      >
                        <Image
                          className="w-full"
                          src={squareLogo}
                          alt=""
                          sizes="(min-width: 1024px) 20rem, (min-width: 640px) 16rem, 12rem"
                          priority
                        />
                        <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-black/10 sm:rounded-xl lg:rounded-2xl" />
                      </Link>
                      <div className="mt-10 text-center lg:mt-12 lg:text-left">
                        <p className="text-xl font-bold text-slate-900">
                          <Link href="/">Legacy Code Rocks</Link>
                        </p>
                        <p className="mt-3 text-lg font-medium leading-8 text-slate-700">
                          Legacy Code Rocks explores the world of modernizing existing software applications.
                        </p>
                      </div>
                      <AboutSection className="mt-12 hidden lg:block" />
                      <section className="mt-10 lg:mt-12">
                        <h2 className="sr-only flex items-center font-mono text-sm font-medium leading-7 text-slate-900 lg:not-sr-only">
                          <TinyWaveFormIcon
                            colors={['fill-brand-yellow-300', 'fill-brand-red-300']}
                            className="h-2.5 w-2.5"
                          />
                          <span className="ml-2.5">Listen</span>
                        </h2>
                        <div className="h-px bg-gradient-to-r from-slate-200/0 via-slate-200 to-slate-200/0 lg:hidden" />
                        <ul
                          role="list"
                          className="mt-4 flex justify-center gap-10 text-base font-medium leading-7 text-slate-700 sm:gap-8 lg:flex-col lg:gap-4"
                        >
                          {[
                            ['Spotify', SpotifyIcon],
                            ['Apple Podcast', ApplePodcastIcon],
                            ['Overcast', OvercastIcon],
                            ['RSS Feed', RSSIcon],
                          ].map(([label, Icon]) => (
                            <li key={label} className="flex">
                              <Link
                                href="/"
                                className="group flex items-center"
                                aria-label={label}
                              >
                                <Icon className="h-8 w-8 fill-slate-400 group-hover:fill-slate-600" />
                                <span className="hidden sm:ml-3 sm:block">{label}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </section>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
        <footer>
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 pb-40 sm:py-16 sm:pb-32">
            <div className="border-t border-gray-200 py-8 text-center text-sm text-gray-500 sm:text-left">
              <span className="block sm:inline">&copy; 2021 Your Company, Inc.</span>{' '}
              <span className="block sm:inline">All rights reserved.</span>
            </div>
          </div>
        </footer>
        <div className="fixed inset-x-0 bottom-0 z-10">
          <AudioPlayer />
        </div>
      </div>
    </>
  )
}
