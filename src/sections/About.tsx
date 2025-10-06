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
              I'm Nima (Mohammad Afshar Far) — a 1994-born Iranian developer and
              MBA student based in Budapest. I'm passionate about creative
              technology, ethical AI, and user-centered digital products.
            </PowerText>

            <PowerText
              className="text-lg md:text-xl text-gray-400 leading-relaxed mb-8"
              delay={1.4}
              stagger={0.03}
              effect="slide"
            >
              My background combines software engineering, business strategy,
              and design thinking, allowing me to craft projects that balance
              innovation with real-world impact.
            </PowerText>

            <PowerText
              className="text-lg md:text-xl text-gray-400 leading-relaxed"
              delay={2.0}
              stagger={0.03}
              effect="slide"
            >
              Currently, I'm studying for my MBA at Budapest Metropolitan
              University, where I focus on AI, sustainability, and digital
              transformation. Outside academics, I'm a freelance full-stack
              developer building modern web applications using React, Node.js,
              and TypeScript — with a strong eye for design and storytelling.
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

        {/* Education Section */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-20"
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <PowerText
              className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-orange-400 mb-6"
              delay={0.2}
              stagger={0.1}
              effect="glitch"
            >
              Education
            </PowerText>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="max-w-4xl mx-auto bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-3xl p-8 border border-white/10"
          >
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                  METU
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Budapest Metropolitan University
                </h3>
                <p className="text-xl text-cyan-400 mb-2">
                  MBA — Digital Business, Innovation & Strategy
                </p>
                <p className="text-gray-300 mb-4">
                  Focus on AI, sustainability, and digital transformation
                </p>
                <div className="flex items-center gap-2 text-gray-400">
                  <span>📆</span>
                  <span>2023 – Present</span>
                </div>
              </div>
            </div>
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
