import { Fragment } from "react"
import { Link } from "react-router-dom"
import portrait from "./assets/portrait.jpeg"

export default function About() {
    return (
        <Fragment>
            <div className="bg-gray-50">
                <div className="px-4 py-12 mx-auto max-w-7xl lg:py-16 lg:px-8">
                    <div className="flex flex-col md:flex-row md:gap-40 md:pl-10">
                        <div><img src={portrait} alt="portrait" className="w-72 h-auto md:w-96 md:h-full rounded-full md:rounded-[60px] opacity-95 mx-auto block" /></div>
                        <div className="my-auto mx-10 md:mx-0">
                            <div className="text-5xl md:text-[120px] mt-20 md:mt-0 font-medium md:font-normal">Hello!</div>
                            <div className="text-2xl md:text-5xl pt-10 md:pt-5">I'm Chris, a Web Developer based in San Diego.</div>
                        </div>
                    </div>
                    <div className=" mt-32 md:mt-40 pl-10">
                            <span className="font-semibold text-black uppercase bg-gray-50 text-3xl md:text-[35px]">About Me</span>
                    </div>
                    <div className="px-5 mt-5 bg-gray-50 flex flex-col lg:flex-row">
                        <p className="mx-auto mt-6 px-3 md:px-4 leading-7 text-black max-w-7xl text-lg md:text-2xl md:leading-9">
                            I am a front-end developer with a passion for building web applications and a deep interest in everything related to web development. The endless combination of technology and creativity in this field drives my passion and excitement to keep learning and building. Please refer to the <Link to={'/Projects'} className="hover:text-red-700 animate-pulse">Projects</Link> section for recent applications I have worked on.
                        </p>
                        <p className="mx-auto mt-6 px-3 md:pl-7 leading-7 text-black max-w-7xl text-lg md:text-2xl md:leading-9">
                            I currently provide services to clients needing end-to-end web solutions for their organizations and deliver projects that frequently exceed expectations. Building web applications for different needs and experiences with languages, frameworks, and libraries, such as the MERN web stack, and content management systems such as WordPress.
                        </p>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}