import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { fadeInUp, staggerContainer } from "../lib/motion";

const experiments = [
  {
    id: "particle-system",
    title: "Particle System",
    description: "Interactive particle physics simulation with mouse interaction",
    category: "Canvas",
    status: "live",
  },
  {
    id: "css-art",
    title: "CSS Art Gallery",
    description: "Creative CSS art pieces with pure CSS animations",
    category: "CSS",
    status: "live",
  },
  {
    id: "physics-demo",
    title: "Physics Engine",
    description: "2D physics simulation with collision detection",
    category: "Canvas",
    status: "live",
  },
  {
    id: "shader-playground",
    title: "Shader Playground",
    description: "WebGL shaders and visual effects experimentation",
    category: "WebGL",
    status: "coming-soon",
  },
];

export default function Playground() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredExperiment, setHoveredExperiment] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      className="min-h-screen py-20 px-6 bg-gray-900"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-6"
          >
            Creative Playground
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Interactive experiments and creative coding projects that showcase
            the intersection of technology and art.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {experiments.map((experiment, index) => (
            <motion.div
              key={experiment.id}
              variants={fadeInUp}
              className={`group relative overflow-hidden rounded-2xl bg-gray-800 border border-gray-700 transition-all duration-500 ${
                hoveredExperiment === index ? "scale-105" : "hover:scale-102"
              }`}
              onMouseEnter={() => setHoveredExperiment(index)}
              onMouseLeave={() => setHoveredExperiment(null)}
              whileHover={{ y: -10 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm font-medium">
                    {experiment.category}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    experiment.status === "live" 
                      ? "bg-green-600/20 text-green-300" 
                      : "bg-yellow-600/20 text-yellow-300"
                  }`}>
                    {experiment.status === "live" ? "Live" : "Soon"}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">
                  {experiment.title}
                </h3>
                
                <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                  {experiment.description}
                </p>
                
                <motion.button
                  className={`w-full py-3 rounded-lg font-medium transition-all ${
                    experiment.status === "live"
                      ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:scale-105"
                      : "bg-gray-700 text-gray-400 cursor-not-allowed"
                  }`}
                  whileHover={experiment.status === "live" ? { scale: 1.05 } : {}}
                  whileTap={experiment.status === "live" ? { scale: 0.95 } : {}}
                >
                  {experiment.status === "live" ? "Try Live Demo" : "Coming Soon"}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-6">
            More experiments and creative projects coming soon...
          </p>
          <button className="px-8 py-4 border-2 border-purple-500 text-purple-300 rounded-full font-semibold hover:bg-purple-600/20 transition-colors">
            View All Projects
          </button>
        </motion.div>
      </div>
    </section>
  );
}
