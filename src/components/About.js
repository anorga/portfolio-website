import { Fragment } from "react"
import { Link } from "react-router-dom"
import portrait from "./assets/portrait.jpeg"

export default function About() {
    return (
        <Fragment>
            <div className="bg-gray-50">
                <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:py-16 lg:px-8">
                    <div className="flex gap-40 pl-10">
                        <img src={portrait} alt="portrait" className="w-96 h-full rounded-[60px] opacity-95 hidden lg:block" />
                        <div className="my-auto">
                            <p><span className="text-[120px]">Hello!</span><br></br>
                            <span className="text-[50px]">I'm Chris, a Web Developer based in San Diego.</span>
                            </p>
                        </div>
                    </div>
                    <div className="mt-40 pl-10">
                            <span className="font-semibold text-black uppercase bg-gray-50 sm:text-lg md:text-[40px]">About Me</span>
                    </div>
                    <div className="px-5 mt-5 bg-gray-50 flex flex-col lg:flex-row">
                        <p className="mx-auto mt-6 px-3 md:px-4 leading-7 text-black max-w-7xl sm:text-lg md:text-2xl md:leading-9">
                            I am a front-end developer with a passion for building web applications and a deep interest in everything related to web development. The endless combination of technology and creativity in this field drives my passion and excitement to keep learning and building. Please refer to the <Link to={'/Projects'} className="hover:text-red-700 animate-pulse">Projects</Link> section for recent applications I have worked on.
                        </p>
                        <p className="mx-auto mt-6 px-3 md:pl-7 leading-7 text-black max-w-7xl sm:text-lg md:text-2xl md:leading-9">
                            I currently provide services to clients needing end-to-end web solutions for their organizations and deliver projects that frequently exceed expectations. Building web applications for different needs and experiences with languages, frameworks, and libraries, such as the MERN web stack, and content management systems such as WordPress.
                        </p>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}