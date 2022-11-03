import { Fragment } from "react"
import { Link } from "react-router-dom"

export default function About() {
    return (
        <Fragment>
            <div className="bg-gray-50">
                <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:py-16 lg:px-8">

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center">
                            <span className="px-3 font-semibold text-gray-600 uppercase bg-gray-50 sm:text-lg md:text-xl">About Me</span>
                        </div>
                    </div>
                    <div className="px-5 pt-1 pb-8 bg-gray-50 mt-7">
                        <p className="mx-auto mt-6 leading-7 text-gray-500 max-w-7xl sm:text-lg md:text-xl md:leading-9">
                            I am a front-end developer with a passion for building web applications and a deep love for JavaScript, React, and everything related to web development. The endless combination of technology and creativity in this field drives my passion and excitement to keep learning and building. Please refer to the <Link to={'/Projects'} className="hover:text-red-700 animate-pulse">Projects</Link> section for recent applications I have worked on. When I am not at my desk, I spend my time reading, watching my favorite tv shows, and keeping fit.
                        </p>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}