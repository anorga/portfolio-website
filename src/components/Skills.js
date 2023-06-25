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

          <div className="mb-16 mt-10 pl-10">
            <div className="font-semibold text-black uppercase bg-gray-50 text-3xl md:text-[35px]">Technologies</div>
          </div>

          {/* <p className="text-base font-semibold tracking-wider text-center text-gray-600 uppercase">
            Development Tools and Languages
          </p> */}
          <div className="md:px-10 grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:mt-8">
            <div className="flex justify-center col-span-1 px-8 py-8 rounded-lg bg-red-600">
              <img className="max-h-12" src={ReactLogo} alt="React" />
              <div className="pt-2 pl-2 text-3xl font-bold text-white">React</div>
            </div>
            <div className="flex justify-center col-span-1 px-8 py-8 rounded-lg bg-red-600">
              <img className="max-h-12" src={HTML5Logo} alt="HTML" />
              <div className="pt-2 pl-2 text-3xl font-bold text-white">HTML</div>
            </div>
            <div className="flex justify-center col-span-1 px-8 py-8 rounded-lg bg-red-600">
              <img className="max-h-14" src={CSS3Logo} alt="CSS" />
              <div className="pt-2 pl-2 text-3xl font-bold text-white">CSS</div>
            </div>
            <div className="flex justify-center col-span-1 px-8 py-8 rounded-lg bg-red-600">
              <img className="max-h-12" src={JSLogo} alt="JavaScript" />
              <div className="pt-2 pl-2 text-3xl font-bold text-white">JS</div>
            </div>
            <div className="flex justify-center col-span-1 px-8 py-8 rounded-lg bg-red-600">
              <img
                className="max-h-12"
                src={NodeLogo}
                alt="Node"
              />
              <div className="pt-2 pl-2 text-3xl font-bold text-white">Node.js</div>
            </div>
            <div className="flex justify-center col-span-1 px-8 py-8 rounded-lg bg-red-600">
              <img
                className="mt-2 max-h-8"
                src={TailwindLogo}
                alt="Tailwind"
              />
              <div className="pt-2 pl-2 text-3xl font-bold text-white">Tailwind</div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
