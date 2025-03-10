import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import glasses from './assets/glasses.png'
import Skills from './Skills'
import About from './About'
import { Link } from 'react-router-dom'
import ResumePDF from './assets/pdf/resume.pdf'
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';

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

        <div className="relative pt-6">
          <Popover>
            <div className="px-4 mx-auto max-w-7xl sm:px-6">
              <nav className="relative flex items-center justify-between sm:h-10 md:justify-center" aria-label="Global">
                <motion.div 
                  initial={{ opacity: 0, y: -20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.8 }}
                  className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0"
                >
                  <div className="flex items-center justify-between w-full md:w-auto">
                    <Link to="/">
                      <span className="sr-only">Workflow</span>
                      <img
                        className="w-auto h-12 sm:h-14"
                        src={glasses}
                        alt="logo"
                      />
                    </Link>
                    <div className="items-center pr-12 text-lg font-bold text-gray-700 hidden">
                      <h1>Portfolio</h1>
                    </div>
                    <div className="flex items-center -mr-2 md:hidden">
                      <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md bg-gray-50 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500">
                        <span className="sr-only">Open main menu</span>
                        <MenuIcon className="w-6 h-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                </motion.div>
                <div className="hidden md:flex md:space-x-12">
                  {navigation.map((item) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 * (navigation.indexOf(item) + 1) }}
                    >
                      <Link to={item.href} className="text-2xl text-black font-medium hover:text-red-600">
                        {item.name}
                      </Link>
                    </motion.div>
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
                        src={glasses}
                        alt="logo"
                      />
                    </div>
                    <div className="-mr-2">
                      <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500">
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
                        className="block px-3 py-2 font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-100 text-center text-lg"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>

          <main className="h-[450px] md:h-[500px] mx-auto pt-[50px] max-w-7xl mt-28">
            <div className="text-center mt-10">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.7 }}
                className="text-red-600 text-4xl font-semibold md:text-[80px] md:mb-10"
              >
                Chris Anorga
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-4xl font-semibold tracking-tight text-gray-900 md:text-[80px]"
              >
                <TypeAnimation
                  sequence={['Web Developer', 1000, '', 500, 'Front-End Developer', 1000, '', 500 ]}
                  className="block my-5 xl:block"
                  wrapper="span"
                  repeat={Infinity}
                />
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.9, delay: 0.7 }}
                className="max-w-md mx-auto mt-3 text-black text-xl md:mt-10 md:text-2xl md:max-w-3xl"
              >
                Welcome to my portfolio website
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 1, delay: 1 }}
                className="max-w-xs mx-auto mt-12 sm:flex sm:justify-center md:mt-8"
              >
                <div className="rounded-md shadow">
                  <a
                    href={ResumePDF}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 md:py-4 md:text-lg md:px-10"
                  >
                    Resume
                  </a>
                </div>
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                  <a
                    href="https://github.com/anorga"
                    target="_blank"
                    className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-red-600 bg-white border border-transparent rounded-md hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                  >
                    Github
                  </a>
                </div>
              </motion.div>
            </div>
           
          </main>
        </div>
      </div>
      <About />
      <Skills />
    </Fragment>
  )
}
