import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import glasses from './assets/glasses.png'
import { Link } from 'react-router-dom'
import readmangas from './assets/readmangas.xyz.png'
import weatherapp from './assets/weatherapp.png'
import portfolio from './assets/portfolio.png'


const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
]

const posts = [
    {
        title: 'Portfolio Repository',
        href: 'https://github.com/anorga/portfolio-website',
        category: { name: 'This Website', href: 'https://anorga.xyz/' },
        description:
            'Current porfolio website used to host personal projects. Built with React, React-Router, and TailWindUI.',
        imageUrl:
            `${portfolio}`,
        target: '_blank',
    },
    {
        title: 'Weather App Repository',
        href: 'https://github.com/anorga/weather-app',
        category: { name: 'Live App', href: 'https://master.d1g2odaawq5ejv.amplifyapp.com/' },
        description:
            'Weather application that displays daily forecast in cities of choice. This Single Page Application was built using React with TypeScript, Bootstrap, and the Open Weather API.',
        imageUrl:
            `${weatherapp}`,
        target: '_blank',
    },
    {
        title: 'Read Manga App Repository',
        href: 'https://github.com/anorga/manga-react-app',
        category: { name: 'Live App', href: 'https://readmangas.xyz/' },
        description:
            'Application for manga enthusiasts. This application aggregates external links to read popular manga. Links will be constantly updated. This application was built using React and Bootstrap. Best viewed on mobile.',
        imageUrl:
            `${readmangas}`,
        target: '_blank',
    },
]

export default function Projects() {
    return (
        <Fragment>
            <div className="relative bg-gray-50 overflow-hidden">
                <div className="hidden sm:block sm:absolute sm:inset-y-0 sm:h-full sm:w-full" aria-hidden="true">
                    <div className="relative h-full max-w-7xl mx-auto">
                        <svg
                            className="absolute right-full transform translate-y-1/4 translate-x-1/4 lg:translate-x-1/2"
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
                            className="absolute left-full transform -translate-y-3/4 -translate-x-1/4 md:-translate-y-1/2 lg:-translate-x-1/2"
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
                        <div className="max-w-7xl mx-auto px-4 sm:px-6">
                            <nav className="relative flex items-center justify-between sm:h-10 md:justify-center" aria-label="Global">
                                <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
                                    <div className="flex items-center justify-between w-full md:w-auto">
                                        <Link to="/">
                                            <span className="sr-only">Workflow</span>
                                            <img
                                                className="h-12 w-auto sm:h-14"
                                                src={glasses}
                                                alt="logo"
                                            />
                                        </Link>
                                        <div className="items-center pr-12 sm:hidden text-lg font-bold text-gray-700">
                                            <h1>Portfolio</h1>
                                        </div>
                                        <div className="-mr-2 flex items-center md:hidden">
                                            <Popover.Button className="bg-gray-50 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500">
                                                <span className="sr-only">Open main menu</span>
                                                <MenuIcon className="h-6 w-6" aria-hidden="true" />
                                            </Popover.Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden md:flex md:space-x-10">
                                    {navigation.map((item) => (
                                        <Link key={item.name} to={item.href} className="font-medium text-gray-500 hover:text-gray-900">
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
                                className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                            >
                                <div className="rounded-lg shadow-md bg-gray-50 ring-1 ring-black ring-opacity-5 overflow-hidden">
                                    <div className="px-5 pt-4 flex items-center justify-between">
                                        <div>
                                            <img
                                                className="h-12 w-auto"
                                                src={glasses}
                                                alt="logo"
                                            />
                                        </div>
                                        <div className="-mr-2">
                                            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500">
                                                <span className="sr-only">Close menu</span>
                                                <XIcon className="h-6 w-6" aria-hidden="true" />
                                            </Popover.Button>
                                        </div>
                                    </div>
                                    <div className="px-2 pt-2 pb-3">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                to={item.href}
                                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </Popover>
                    <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24">
                        {/* Projects */}
                        <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
                            <div className="absolute inset-0">
                                <div className="bg-red-700 h-1/3 sm:h-2/3" />
                            </div>
                            <div className="relative max-w-7xl mx-auto">
                                <div className="text-center">
                                    <h2 className="mb-5 text-3xl tracking-tight font-extrabold text-white sm:text-5xl sm:animate-bounce md:animate-none">Projects</h2>
                                    <p className="mt-3 max-w-2xl mx-auto text-xl text-white sm:mt-4">
                                        This is a list of personal projects that I have worked on. Links to hosted web application and repository are provided.
                                    </p>
                                </div>
                                <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
                                    {posts.map((post) => (
                                        <div key={post.title} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                                            <div className="flex-shrink-0">
                                                <img className="h-48 w-full object-cover" src={post.imageUrl} alt="project" />
                                            </div>
                                            <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                                                <div className="flex-1">
                                                    <p className="text-base font-medium text-red-600">
                                                        <a href={post.category.href} target={post.target} className="hover:text-red-800 animate-pulse">
                                                            {post.category.name}
                                                        </a>
                                                    </p>
                                                    <a href={post.href} target={post.target} className="block mt-2">
                                                        <p className="text-xl font-semibold text-gray-900 hover:text-red-800">{post.title}</p>
                                                        <p className="mt-3 text-base text-gray-500">{post.description}</p>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </Fragment>
    )
}
