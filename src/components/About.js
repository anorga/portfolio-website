import { Fragment } from "react"
import { Link } from "react-router-dom"

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
                            <span className="px-3 bg-white sm:text-lg md:text-xl font-semibold uppercase text-gray-600">About Me</span>
                        </div>
                    </div>
                    <div className="bg-gray-50 mt-7 pt-1 pb-8 px-5">
                        <p className="mt-6 max-w-5xl mx-auto sm:text-lg md:text-xl leading-7 md:leading-8 text-gray-500">
                            I am a frontend developer with a passion for building web applications and a deep love for JavaScript, React, and everything related to web development. The endless combination of technology and creativity in this field is what drives my passion and excitement to keep learning and building. Please refer to the <Link to={'/Projects'} className="hover:text-red-700 animate-pulse">Projects</Link> section for a recent list of applications I have worked on. When I am not at my computer, I spend my time reading, watching my favorite tv shows, and keeping fit.
                        </p>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}