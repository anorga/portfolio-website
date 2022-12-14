import { Fragment } from "react"
import { Link } from "react-router-dom"
import portrait from "./assets/portrait.jpeg"

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
                            <span className="px-3 font-semibold text-gray-600 uppercase bg-gray-50 sm:text-lg md:text-2xl">About Me</span>
                        </div>
                    </div>
                    <div className="px-5 mt-7 bg-gray-50 flex flex-col lg:flex-row">
                        <p className="mx-auto mt-6 px-3 md:px-4 leading-7 text-gray-500 max-w-7xl sm:text-lg md:text-xl md:leading-9">
                            I am a front-end developer with a passion for building web applications and a deep interest in everything related to web development. The endless combination of technology and creativity in this field drives my passion and excitement to keep learning and building. Please refer to the <Link to={'/Projects'} className="hover:text-red-700 animate-pulse">Projects</Link> section for recent applications I have worked on.
                        </p>
                        <img src={portrait} alt="portrait" className="w-72 h-1/4 mx-auto mt-8 rounded-xl opacity-95 hidden lg:block" />
                        <p className="mx-auto mt-6 px-3 md:pl-7 leading-7 text-gray-500 max-w-7xl sm:text-lg md:text-xl md:leading-9">
                            I currently provide services to clients needing end-to-end web solutions for their organizations and deliver projects that frequently exceed expectations. Building web applications for different needs and experiences with languages, frameworks, and libraries, such as the MERN web stack, and content management systems such as WordPress.
                        </p>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}