import { Fragment } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion";
import portrait from "./assets/portrait.jpeg"

export default function About() {
    return (
        <Fragment>
            <div className="bg-gray-50 py-16">
                <div className="px-4 mx-auto max-w-7xl lg:px-8">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                      
                      {/* Image Section with Animation */}
                      <motion.div 
                        initial={{ opacity: 0, x: -50 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ duration: 0.8 }}
                        className="md:w-1/2 text-center md:text-left"
                      >
                        <img 
                          src={portrait} 
                          alt="portrait" 
                          className="w-72 h-auto md:w-96 rounded-full md:rounded-[40px] shadow-lg opacity-95 mx-auto"
                        />
                      </motion.div>

                      {/* Text Section with Animation */}
                      <motion.div 
                        initial={{ opacity: 0, x: 50 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ duration: 0.8 }}
                        className="md:w-1/2 text-center md:text-left"
                      >
                        <h2 className="text-5xl md:text-6xl font-bold text-gray-900">
                          Hello!
                        </h2>
                        <p className="mt-6 text-2xl md:text-3xl text-gray-700 leading-relaxed">
                          I'm Chris, a Web Developer based in San Diego.
                        </p>
                      </motion.div>

                    </div>

                    {/* About Me Section */}
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      transition={{ duration: 0.9, delay: 0.5 }}
                      className="mt-24"
                    >
                      <h3 className="text-4xl md:text-5xl font-semibold text-black uppercase">
                        About Me
                      </h3>
                      <div className="mt-8 grid gap-8 md:grid-cols-2 text-lg md:text-xl text-gray-700 leading-8">
                        <p>
                          I’m a front-end developer passionate about crafting high-quality web experiences. The constantly evolving nature of web development inspires me to stay at the forefront of new technologies and to approach challenges with innovative solutions. My goal is to combine technical expertise with thoughtful design to build intuitive, visually engaging websites and applications. Feel free to explore the 
                          <Link to={'/Projects'} className="hover:text-red-700 animate-pulse"> Projects</Link> section to see some of my recent work.
                        </p>
                        <p>
                          I deliver comprehensive web solutions that consistently exceed client expectations. With expertise across a range of technologies, including the MERN stack, and significant experience in content management systems like WordPress, I’m well-equipped to handle both simple websites and more complex web applications. I’m always excited to turn ideas into reality.
                        </p>
                      </div>
                    </motion.div>
                </div>
            </div>
        </Fragment>
    )
}