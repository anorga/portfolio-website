import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import glasses from './assets/glasses.png'
import { Link } from 'react-router-dom'
import { MailIcon, PhoneIcon } from '@heroicons/react/outline'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
]

export default function Home() {
  return (
    <Fragment>
      <div className="relative overflow-hidden bg-gray-50">
        <div className="hidden sm:block sm:absolute sm:inset-y-0 sm:h-full sm:w-full" aria-hidden="true">
          <div className="relative h-full mx-auto max-w-7xl">
            <svg
              className="absolute transform right-full translate-y-1/4 translate-x-1/4 lg:translate-x-1/2"
              width={404}
              height={784}
              fill="none"
              viewBox="0 0 404 784"
            >
              <defs>
                <pattern
                  id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                </pattern>
              </defs>
              <rect width={404} height={784} fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)" />
            </svg>
            <svg
              className="absolute transform left-full -translate-y-3/4 -translate-x-1/4 md:-translate-y-1/2 lg:-translate-x-1/2"
              width={404}
              height={784}
              fill="none"
              viewBox="0 0 404 784"
            >
              <defs>
                <pattern
                  id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                </pattern>
              </defs>
              <rect width={404} height={784} fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)" />
            </svg>
          </div>
        </div>

        <div className="relative pt-6 pb-16 sm:pb-24">
          <Popover>
            <div className="px-4 mx-auto max-w-7xl sm:px-6">
              <nav className="relative flex items-center justify-between sm:h-10 md:justify-center" aria-label="Global">
                <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
                  <div className="flex items-center justify-between w-full md:w-auto">
                    <Link to="/">
                      <span className="sr-only">Workflow</span>
                      <img
                        className="w-auto h-12 sm:h-14"
                        src={glasses}
                        alt="logo"
                      />
                    </Link>
                    <div className="items-center pr-12 text-lg font-bold text-gray-700 sm:hidden">
                      <h1>Portfolio</h1>
                    </div>
                    <div className="flex items-center -mr-2 md:hidden">
                      <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md bg-gray-50 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500">
                        <span className="sr-only">Open main menu</span>
                        <MenuIcon className="w-6 h-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                </div>
                <div className="hidden md:flex md:space-x-12">
                  {navigation.map((item) => (
                    <Link key={item.name} to={item.href} className="text-lg font-bold text-gray-500 font-large hover:text-gray-900">
                      {item.name}
                    </Link>
                  ))}
                </div>
              </nav>
            </div>

            <Transition
              as={Fragment}
              enter="duration-150 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-100 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Popover.Panel
                focus
                className="absolute inset-x-0 top-0 z-10 p-2 transition origin-top-right transform md:hidden"
              >
                <div className="overflow-hidden rounded-lg shadow-md bg-gray-50 ring-1 ring-black ring-opacity-5">
                  <div className="flex items-center justify-between px-5 pt-4">
                    <div>
                      <img
                        className="w-auto h-12"
                        src= {glasses}
                        alt="logo"
                      />
                    </div>
                    <div className="-mr-2">
                      <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500">
                        <span className="sr-only">Close menu</span>
                        <XIcon className="w-6 h-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="px-2 pt-2 pb-3">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-100"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>

          {/* Contact Form */}
          <div>
            <div className="px-4 py-16 mx-auto max-w-7xl sm:py-24 sm:px-6 lg:px-8">
              <div className="relative bg-white shadow-xl">
                <h2 className="sr-only">Contact us</h2>

                <div className="grid grid-cols-1 lg:grid-cols-3">
                  {/* Contact information */}
                  <div className="relative px-6 py-10 overflow-hidden bg-red-700 sm:px-10 xl:p-12">
                    <div className="absolute inset-0 pointer-events-none sm:hidden" aria-hidden="true">
                      <svg
                        className="absolute inset-0 w-full h-full"
                        width={343}
                        height={388}
                        viewBox="0 0 343 388"
                        fill="none"
                        preserveAspectRatio="xMidYMid slice"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M-99 461.107L608.107-246l707.103 707.107-707.103 707.103L-99 461.107z"
                          fill="url(#linear1)"
                          fillOpacity=".1"
                        />
                        <defs>
                          <linearGradient
                            id="linear1"
                            x1="254.553"
                            y1="107.554"
                            x2="961.66"
                            y2="814.66"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#fff" />
                            <stop offset={1} stopColor="#fff" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    <div
                      className="absolute top-0 bottom-0 right-0 hidden w-1/2 pointer-events-none sm:block lg:hidden"
                      aria-hidden="true"
                    >
                      <svg
                        className="absolute inset-0 w-full h-full"
                        width={359}
                        height={339}
                        viewBox="0 0 359 339"
                        fill="none"
                        preserveAspectRatio="xMidYMid slice"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M-161 382.107L546.107-325l707.103 707.107-707.103 707.103L-161 382.107z"
                          fill="url(#linear2)"
                          fillOpacity=".1"
                        />
                        <defs>
                          <linearGradient
                            id="linear2"
                            x1="192.553"
                            y1="28.553"
                            x2="899.66"
                            y2="735.66"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#fff" />
                            <stop offset={1} stopColor="#fff" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    <div
                      className="absolute top-0 bottom-0 right-0 hidden w-1/2 pointer-events-none lg:block"
                      aria-hidden="true"
                    >
                      <svg
                        className="absolute inset-0 w-full h-full"
                        width={160}
                        height={678}
                        viewBox="0 0 160 678"
                        fill="none"
                        preserveAspectRatio="xMidYMid slice"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M-161 679.107L546.107-28l707.103 707.107-707.103 707.103L-161 679.107z"
                          fill="url(#linear3)"
                          fillOpacity=".1"
                        />
                        <defs>
                          <linearGradient
                            id="linear3"
                            x1="192.553"
                            y1="325.553"
                            x2="899.66"
                            y2="1032.66"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#fff" />
                            <stop offset={1} stopColor="#fff" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-white">Contact information</h3>
                    <p className="max-w-3xl mt-6 text-base text-white">
                    Have a question or want to work together? Send me a message and I'll get back to you as soon as possible.
                    </p>
                    <dl className="mt-8 space-y-6">
                      <dt>
                        <span className="sr-only">Phone number</span>
                      </dt>
                      <dd className="flex text-base text-white">
                        <PhoneIcon className="flex-shrink-0 w-6 h-6 text-white" aria-hidden="true" />
                        <span className="ml-3">+1 (619) 822-8877</span>
                      </dd>
                      <dt>
                        <span className="sr-only">Email</span>
                      </dt>
                      <dd className="flex text-base text-white">
                        <MailIcon className="flex-shrink-0 w-6 h-6 text-white" aria-hidden="true" />
                        <span className="ml-3">anorga2990@gmail.com</span>
                      </dd>
                    </dl>
                    <ul role="list" className="flex mt-8 space-x-12">
                      <li>
                        <a className="flex text-white hover:text-red-100" href="https://github.com/anorga" target="_blank">
                          <span className="sr-only">GitHub</span>
                          <svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            aria-hidden="true"
                          >
                            <path
                              d="M11.999 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.386.6.11.819-.26.819-.578 0-.284-.01-1.04-.017-2.04-3.337.724-4.042-1.61-4.042-1.61-.545-1.386-1.332-1.755-1.332-1.755-1.09-.744.082-.73.082-.73 1.205.086 1.838 1.238 1.838 1.238 1.07 1.833 2.81 1.304 3.493.996.109-.775.419-1.303.762-1.603C7.145 17 4.343 15.97 4.343 11.373c0-1.31.468-2.382 1.236-3.22-.124-.304-.536-1.524.118-3.176 0 0 1.007-.323 3.3 1.23.956-.266 1.983-.4 3.003-.404 1.02.005 2.046.138 3.005.404 2.29-1.553 3.296-1.23 3.296-1.23.655 1.652.243 2.872.12 3.176.77.838 1.233 1.91 1.233 3.22 0 4.61-2.806 5.624-5.478 5.921.43.37.814 1.103.814 2.223 0 1.603-.015 2.898-.015 3.291 0 .321.217.695.825.578C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12.001-12"
                              fill="currentColor"
                            />
                          </svg>
                          <span className="pl-3">github.com/anorga</span>
                        </a>
                      </li>
                      {/* <li>
                        <a className="text-white hover:text-red-100" href="#">
                          <span className="sr-only">Twitter</span>
                          <svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            aria-hidden="true"
                          >
                            <path
                              d="M7.548 22.501c9.056 0 14.01-7.503 14.01-14.01 0-.213 0-.425-.015-.636A10.02 10.02 0 0024 5.305a9.828 9.828 0 01-2.828.776 4.94 4.94 0 002.165-2.724 9.867 9.867 0 01-3.127 1.195 4.929 4.929 0 00-8.391 4.491A13.98 13.98 0 011.67 3.9a4.928 4.928 0 001.525 6.573A4.887 4.887 0 01.96 9.855v.063a4.926 4.926 0 003.95 4.827 4.917 4.917 0 01-2.223.084 4.93 4.93 0 004.6 3.42A9.88 9.88 0 010 20.289a13.941 13.941 0 007.548 2.209"
                              fill="currentColor"
                            />
                          </svg>
                        </a>
                      </li> */}
                    </ul>
                  </div>

                  {/* Contact form */}
                  <div className="px-6 py-10 sm:px-10 lg:col-span-2 xl:p-12">
                    <h3 className="text-xl font-medium text-gray-900">Send a message</h3>
                    <form action="https://formspree.io/f/xrgjnkaz"  method="POST" className="grid grid-cols-1 mt-6 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                      <div>
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-900">
                          First name
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="given-name"
                            className="block w-full px-4 py-3 text-gray-900 border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-900">
                          Last name
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="last-name"
                            id="last-name"
                            autoComplete="family-name"
                            className="block w-full px-4 py-3 text-gray-900 border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                          Email
                        </label>
                        <div className="mt-1">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            className="block w-full px-4 py-3 text-gray-900 border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between">
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-900">
                            Phone
                          </label>
                          <span id="phone-optional" className="text-sm text-gray-500">
                            Optional
                          </span>
                        </div>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="phone"
                            id="phone"
                            autoComplete="tel"
                            className="block w-full px-4 py-3 text-gray-900 border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                            aria-describedby="phone-optional"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-900">
                          Subject
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="subject"
                            id="subject"
                            className="block w-full px-4 py-3 text-gray-900 border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-2">
                        <div className="flex justify-between">
                          <label htmlFor="message" className="block text-sm font-medium text-gray-900">
                            Message
                          </label>
                          <span id="message-max" className="text-sm text-gray-500">
                            Max. 500 characters
                          </span>
                        </div>
                        <div className="mt-1">
                          <textarea
                            id="message"
                            name="message"
                            rows={4}
                            className="block w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                            aria-describedby="message-max"
                            defaultValue={''}
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-2 sm:flex sm:justify-end">
                        <button
                          type="submit"
                          className="inline-flex items-center justify-center w-full px-6 py-3 mt-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>

    </Fragment>
  )
}
