import { Fragment } from "react"
import ReactLogo from './assets/react_bw.png'
import HTML5Logo from './assets/html.png'
import CSS3Logo from './assets/css.png'
import JSLogo from './assets/js3png.png'
import NodeLogo from './assets/node.png'
import TailwindLogo from './assets/tailwind.png'

export default function Skills() {
  return (
    <Fragment>
      <div className="bg-gray-50">
        <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:py-16 lg:px-8">

          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 font-semibold text-gray-600 uppercase bg-gray-50 sm:text-lg md:text-xl">Development Tools and Languages</span>
            </div>
          </div>

          {/* <p className="text-base font-semibold tracking-wider text-center text-gray-600 uppercase">
            Development Tools and Languages
          </p> */}
          <div className="mt-6 grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:mt-8">
            <div className="flex justify-center col-span-1 px-8 py-8 bg-gray-50">
              <img
                className="max-h-12"
                src={ReactLogo}
                alt="React"
              />
              <div className="pt-2 pl-2 text-3xl font-bold text-gray-400">React</div>
            </div>
            <div className="flex justify-center col-span-1 px-8 py-8 bg-gray-50">
              <img className="max-h-12" src={HTML5Logo} alt="HTML" />
              <div className="pt-2 pl-2 text-3xl font-bold text-gray-400">HTML</div>
            </div>
            <div className="flex justify-center col-span-1 px-8 py-8 bg-gray-50">
              <img className="max-h-12" src={CSS3Logo} alt="CSS" />
              <div className="pt-2 pl-2 text-3xl font-bold text-gray-400">CSS</div>
            </div>
            <div className="flex justify-center col-span-1 px-8 py-8 bg-gray-50">
              <img className="max-h-12" src={JSLogo} alt="JavaScript" />
              <div className="pt-2 pl-2 text-3xl font-bold text-gray-400">JS</div>
            </div>
            <div className="flex justify-center col-span-1 px-8 py-8 bg-gray-50">
              <img
                className="max-h-12"
                src={NodeLogo}
                alt="Node"
              />
              <div className="pt-2 pl-2 text-3xl font-bold text-gray-400">Node.js</div>
            </div>
            <div className="flex justify-center col-span-1 px-8 py-8 bg-gray-50">
              <img
                className="mt-2 max-h-8"
                src={TailwindLogo}
                alt="Tailwind"
              />
              <div className="pt-2 pl-2 text-3xl font-bold text-gray-400">Tailwind</div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
