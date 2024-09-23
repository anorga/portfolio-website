import { Fragment } from "react"
import { Link } from "react-router-dom"
import portrait from "./assets/portrait.jpeg"

export default function About() {
    return (
        <Fragment>
            <div className="bg-gray-50">
                <div className="px-4 py-12 mx-auto max-w-7xl lg:py-16 lg:px-8">
                    <div className="flex flex-col md:flex-row md:gap-40 md:pl-10">
                        <div className="order-1 md:order-first mt-20 md:mt-0"><img src={portrait} alt="portrait" className="w-72 h-auto md:w-96 md:h-full rounded-full md:rounded-[60px] opacity-95 mx-auto block" /></div>
                        <div className="my-auto mx-10 md:mx-0">
                            <div className="text-5xl md:text-[100px] mt-20 md:mt-0 font-medium md:font-normal">Hello!</div>
                            <div className="text-2xl md:text-4xl pt-10 md:pt-5 md:leading-normal">I'm Chris, a Web Developer based in San Diego.</div>
                        </div>
                    </div>
                    <div className=" mt-32 md:mt-40 pl-10">
                            <span className="font-semibold text-black uppercase bg-gray-50 text-3xl md:text-[35px]">About Me</span>
                    </div>
                    <div className="px-5 mt-5 bg-gray-50 flex flex-col lg:flex-row">
                        <p className="mx-auto mt-6 px-3 md:px-4 leading-7 text-black max-w-7xl text-lg md:text-2xl md:leading-9">
                        I’m a front-end developer passionate about crafting high-quality web experiences. The constantly evolving nature of web development inspires me to stay at the forefront of new technologies and to approach challenges with innovative solutions. My goal is to combine technical expertise with thoughtful design to build intuitive, visually engaging websites and applications. Feel free to explore the <Link to={'/Projects'} className="hover:text-red-700 animate-pulse">Projects</Link> section to see some of my recent work.
                        </p>
                        <p className="mx-auto mt-6 px-3 leading-7 text-black max-w-7xl text-lg md:text-2xl md:leading-9">
                        I deliver comprehensive web solutions that consistently exceed client expectations. With expertise across a range of technologies, including the MERN stack, and significant experience in content management systems like WordPress, I’m well-equipped to handle both simple websites and more complex web applications. I’m always excited to turn ideas into reality.
                        </p>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}