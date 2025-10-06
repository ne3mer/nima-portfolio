import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from "../lib/motion";

const skills = [
  "Frontend Development",
  "Backend Development", 
  "AI & Machine Learning",
  "Design Systems",
  "Motion Design",
  "DevOps & Cloud"
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="min-h-screen py-20 px-6 bg-gray-800"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center"
        >
          <motion.div variants={fadeInLeft} className="space-y-8">
            <div>
              <motion.h2
                variants={fadeInUp}
                className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-6"
              >
                About Me
              </motion.h2>

              <motion.p
                variants={fadeInUp}
                className="text-xl text-gray-300 leading-relaxed mb-8"
              >
                I'm a passionate full-stack developer and creative engineer
                based in Budapest, Hungary. With a background in computer
                science and a love for beautiful design, I specialize in
                building applications that are both technically robust and
                visually stunning.
              </motion.p>

              <motion.p
                variants={fadeInUp}
                className="text-lg text-gray-400 leading-relaxed mb-8"
              >
                My journey spans from traditional web development to
                cutting-edge AI applications. I believe in the power of
                technology to solve real-world problems while creating
                experiences that delight users.
              </motion.p>
            </div>

            <motion.div variants={fadeInUp}>
              <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-full font-medium hover:scale-105 transition-transform">
                Download Resume
              </button>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeInRight} className="space-y-6">
            <h3 className="text-2xl font-semibold text-white mb-8">
              Technical Expertise
            </h3>

            <div className="grid gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  className="p-6 rounded-2xl bg-gray-700 border border-gray-600 hover:border-purple-500 transition-colors"
                  initial={{ opacity: 0, x: 50 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }
                  }
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {skill}
                  </h4>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
