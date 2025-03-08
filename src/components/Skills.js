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
        <div className="px-4 py-12 mx-auto max-w-6xl sm:px-6 lg:py-16 lg:px-8">

          <div className="text-center mb-16 mt-4">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 uppercase sm:text-center md:text-left">
              Technologies
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:mt-8">
            <div className="flex items-center justify-center col-span-1 px-8 py-8 rounded-lg bg-red-600 shadow-lg">
              <img className="max-h-12" src={ReactLogo} alt="React" />
              <div className="pt-2 pl-2 text-2xl md:text-3xl font-bold text-white">React</div>
            </div>
            <div className="flex items-center justify-center col-span-1 px-8 py-8 rounded-lg bg-red-600 shadow-lg">
              <img className="max-h-12" src={HTML5Logo} alt="HTML" />
              <div className="pt-2 pl-2 text-2xl md:text-3xl font-bold text-white">HTML</div>
            </div>
            <div className="flex items-center justify-center col-span-1 px-8 py-8 rounded-lg bg-red-600 shadow-lg">
              <img className="max-h-14" src={CSS3Logo} alt="CSS" />
              <div className="pt-2 pl-2 text-2xl md:text-3xl font-bold text-white">CSS</div>
            </div>
            <div className="flex items-center justify-center col-span-1 px-8 py-8 rounded-lg bg-red-600 shadow-lg">
              <img className="max-h-12" src={JSLogo} alt="JavaScript" />
              <div className="pt-2 pl-2 text-2xl md:text-3xl font-bold text-white">JS</div>
            </div>
            <div className="flex items-center justify-center col-span-1 px-8 py-8 rounded-lg bg-red-600 shadow-lg">
              <img
                className="max-h-12"
                src={NodeLogo}
                alt="Node"
              />
              <div className="pt-2 pl-2 text-2xl md:text-3xl font-bold text-white">Node.js</div>
            </div>
            <div className="flex items-center justify-center col-span-1 px-8 py-8 rounded-lg bg-red-600 shadow-lg">
              <img
                className="mt-2 max-h-8"
                src={TailwindLogo}
                alt="Tailwind"
              />
              <div className="pt-2 pl-2 text-2xl md:text-3xl font-bold text-white">Tailwind</div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
