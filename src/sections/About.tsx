import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
} from "../lib/motion";
import InteractiveSkills from "../components/InteractiveSkills";
import AnimatedStats from "../components/AnimatedStats";
import KeywordCloud from "../components/KeywordCloud";
import CreativeTimeline from "../components/CreativeTimeline";
import MagneticButton from "../components/MagneticButton";
import PowerText from "../components/PowerText";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="min-h-screen py-20 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-500/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero Section */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-20"
        >
          <motion.div variants={fadeInUp} className="mb-8">
            <PowerText
              className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-orange-400 mb-6"
              delay={0.2}
              stagger={0.1}
              effect="glitch"
            >
              About Me
            </PowerText>
          </motion.div>

          <motion.div variants={fadeInUp} className="max-w-4xl mx-auto">
            <PowerText
              className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-8"
              delay={0.8}
              stagger={0.05}
              effect="wave"
            >
              I'm a passionate full-stack developer and creative engineer based
              in Budapest, Hungary. With a background in computer science and a
              love for beautiful design, I specialize in building applications
              that are both technically robust and visually stunning.
            </PowerText>

            <PowerText
              className="text-lg md:text-xl text-gray-400 leading-relaxed"
              delay={1.4}
              stagger={0.03}
              effect="slide"
            >
              My journey spans from traditional web development to cutting-edge
              AI applications. I believe in the power of technology to solve
              real-world problems while creating experiences that delight users
              and push the boundaries of what's possible.
            </PowerText>
          </motion.div>
        </motion.div>

        {/* Main Content Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-16 items-start mb-20"
        >
          {/* Left side - Interactive Elements */}
          <motion.div variants={fadeInLeft} className="space-y-12">
            {/* Keyword Cloud */}
            <KeywordCloud />

            {/* Download Resume Button */}
            <motion.div variants={fadeInUp}>
              <MagneticButton
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-full font-semibold text-lg"
                strength={0.2}
              >
                📄 Download Resume
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Right side - Interactive Skills */}
          <motion.div variants={fadeInRight}>
            <InteractiveSkills />
          </motion.div>
        </motion.div>

        {/* Creative Timeline */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-20"
        >
          <CreativeTimeline />
        </motion.div>

        {/* Animated Stats */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <AnimatedStats />
        </motion.div>
      </div>
    </section>
  );
}
