import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../lib/motion";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-900">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="text-center px-6 max-w-6xl mx-auto"
      >
        <motion.h1
          variants={fadeInUp}
          className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-orange-400 mb-6"
        >
          NIMA
        </motion.h1>
        
        <motion.p
          variants={fadeInUp}
          className="text-2xl md:text-4xl font-semibold text-gray-200 mb-8"
        >
          FULL-STACK DEVELOPER & CREATIVE ENGINEER
        </motion.p>
        
        <motion.p
          variants={fadeInUp}
          className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12"
        >
          I craft digital experiences that blend cutting-edge technology with
          beautiful design. Specializing in AI-powered applications,
          interactive web experiences, and innovative solutions.
        </motion.p>
        
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row gap-8 justify-center items-center"
        >
          <button className="px-10 py-5 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-full font-semibold text-lg hover:scale-105 transition-transform">
            View My Work
          </button>
          <button className="px-10 py-5 border-2 border-purple-500 text-gray-200 rounded-full font-semibold text-lg hover:bg-purple-600/20 transition-colors">
            Get In Touch
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}