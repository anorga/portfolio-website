import { Fragment } from "react"

export default function About() {
    return (
        <Fragment>
            <div className="bg-white">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center">
                            <span className="px-3 bg-white text-xl font-semibold uppercase text-gray-600">About Me</span>
                        </div>
                    </div>
                    <p className="mt-6 max-w-5xl mx-auto sm:text-lg md:text-xl md:leading-8 text-gray-500">
                        Hello World. My name is Christian Anorga.  I am a front-end developer with a passion for building web applications. I'm a front-end web developer with a deep passion for JavaScript, React, and all things web development. The endless combination of technology and creativity in this field are what drives my passion and excitement for web development. When I'm not at my computer I like to spend my time reading and keeping fit.
                   </p>
                </div>
                
            </div>
        </Fragment>
    )
}