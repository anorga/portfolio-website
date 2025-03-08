import { Fragment } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion";
import portrait from "./assets/portrait.jpeg"

export default function About() {
    return (
        <Fragment>
            <div className="bg-gray-50 py-16">
                <div className="px-4 mx-auto max-w-6xl lg:px-8">
                    <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24 text-center md:text-left">
                      
                      {/* Text Section with Animation */}
                      <motion.div 
                        initial={{ opacity: 0, x: 50 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ duration: 0.8 }}
                        className="md:w-1/2 text-left"
                      >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center md:text-left mb-10 md:mb-14">
                          ABOUT ME
                        </h2>

                        {/* Image (only reorders for mobile) */}
                        <div className="md:hidden flex justify-center mb-10">
                          <img 
                            src={portrait} 
                            alt="portrait" 
                            className="w-56 md:w-72 lg:w-80 rounded-xl shadow-lg opacity-95"
                          />
                        </div>

                        <p className="mt-4 px-2 md:px-0 text-lg md:text-xl text-gray-700 leading-relaxed max-w-lg text-left">
                          I'm Chris, a Web Developer based in San Diego. I’m passionate about crafting high-quality web experiences, combining technical expertise with thoughtful design.
                        </p>

                        <div className="mt-6 px-2 md:px-0 grid gap-6 text-lg md:text-xl text-gray-700 leading-8 text-left">
                          <p>
                            The constantly evolving nature of web development inspires me to stay at the forefront of new technologies and to approach challenges with innovative solutions. My goal is to build intuitive, visually engaging websites and applications. 
                          </p>
                          <p>
                            With expertise across the MERN stack and content management systems like WordPress, I deliver comprehensive web solutions that exceed expectations. I’m always excited to turn ideas into reality.
                          </p>
                        </div>
                      </motion.div>

                      {/* Desktop Image Section */}
                      <motion.div 
                        initial={{ opacity: 0, x: -50 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ duration: 0.8 }}
                        className="hidden md:flex md:w-1/2 justify-center"
                      >
                        <img 
                          src={portrait} 
                          alt="portrait" 
                          className="w-56 md:w-72 lg:w-80 rounded-xl shadow-lg opacity-95"
                        />
                      </motion.div>

                    </div>
                </div>
            </div>
        </Fragment>
    )
}