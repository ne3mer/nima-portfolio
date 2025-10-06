import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { fadeInUp, staggerContainer } from "../lib/motion";
import ParticleSystem from "../components/demos/ParticleSystem";
import CSSArt from "../components/demos/CSSArt";
import PhysicsDemo from "../components/demos/PhysicsDemo";
import ShaderDemo from "../components/demos/ShaderDemo";

const experiments = [
  {
    id: "particle-system",
    title: "Particle System",
    description:
      "Interactive particle physics simulation with mouse interaction",
    category: "Canvas",
    status: "live",
    component: ParticleSystem,
  },
  {
    id: "shader-toy",
    title: "Shader Playground",
    description: "Real-time GLSL shader editor and visualizer",
    category: "WebGL",
    status: "live",
    component: ShaderDemo,
  },
  {
    id: "css-art",
    title: "CSS Art Gallery",
    description: "Pure CSS illustrations and animations",
    category: "CSS",
    status: "live",
    component: CSSArt,
  },
  {
    id: "physics-demo",
    title: "Physics Engine",
    description: "2D physics simulation with realistic collisions",
    category: "Physics",
    status: "live",
    component: PhysicsDemo,
  },
  {
    id: "ai-visualizer",
    title: "AI Decision Tree",
    description: "Visual representation of machine learning decision processes",
    category: "AI/ML",
    status: "coming-soon",
  },
  {
    id: "audio-visualizer",
    title: "Audio Visualizer",
    description: "Real-time audio frequency visualization",
    category: "Audio",
    status: "coming-soon",
  },
];

export default function Playground() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredExperiment, setHoveredExperiment] = useState<number | null>(
    null
  );
  const [selectedDemo, setSelectedDemo] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "text-secondary";
      case "demo":
        return "text-accent";
      case "coming-soon":
        return "text-foreground-muted";
      default:
        return "text-foreground-muted";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "live":
        return "bg-secondary/20";
      case "demo":
        return "bg-accent/20";
      case "coming-soon":
        return "bg-foreground-muted/20";
      default:
        return "bg-foreground-muted/20";
    }
  };

  return (
    <section
      ref={ref}
      className="min-h-screen py-20 px-6 bg-background-secondary relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Floating geometric shapes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-20"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-display-lg font-display font-bold text-gradient mb-6"
          >
            Creative Playground
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-xl text-foreground-secondary max-w-3xl mx-auto leading-relaxed mb-8"
          >
            Experimental projects and creative coding demos that explore the
            intersection of technology and art. These are my sandbox for pushing
            boundaries and trying new ideas.
          </motion.p>

          {/* Interactive cursor follower */}
          <motion.div
            className="absolute w-32 h-32 bg-primary/5 rounded-full pointer-events-none"
            style={{
              x: mousePosition.x - 64,
              y: mousePosition.y - 64,
            }}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Experiments grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {experiments.map((experiment, index) => (
            <motion.div
              key={experiment.id}
              variants={fadeInUp}
              className={`group relative overflow-hidden rounded-2xl bg-background border border-white/10 transition-all duration-500 ${
                hoveredExperiment === index ? "scale-105" : "hover:scale-102"
              }`}
              onMouseEnter={() => setHoveredExperiment(index)}
              onMouseLeave={() => setHoveredExperiment(null)}
              whileHover={{ y: -5 }}
            >
              {/* Experiment preview area */}
              <div className="h-48 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 relative overflow-hidden">
                {/* Animated background pattern */}
                <div className="absolute inset-0">
                  <motion.div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `
                        radial-gradient(circle at 20% 20%, rgba(138, 99, 255, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 80% 80%, rgba(0, 255, 198, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 40% 60%, rgba(255, 181, 71, 0.1) 0%, transparent 50%)
                      `,
                    }}
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </div>

                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/10 text-foreground text-sm font-medium rounded-full backdrop-blur-sm">
                    {experiment.category}
                  </span>
                </div>

                {/* Status badge */}
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full backdrop-blur-sm ${getStatusBg(
                      experiment.status
                    )} ${getStatusColor(experiment.status)}`}
                  >
                    {experiment.status}
                  </span>
                </div>

                {/* Interactive element */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="w-8 h-8 bg-primary rounded-full" />
                  </motion.div>
                </div>
              </div>

              {/* Experiment content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {experiment.title}
                </h3>
                <p className="text-foreground-muted text-sm leading-relaxed mb-4">
                  {experiment.description}
                </p>

                {/* Action button */}
                <motion.button
                  className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                    experiment.status === "coming-soon"
                      ? "bg-foreground-muted/20 text-foreground-muted cursor-not-allowed"
                      : "bg-primary text-white hover:bg-primary-600"
                  }`}
                  whileHover={
                    experiment.status !== "coming-soon" ? { scale: 1.02 } : {}
                  }
                  whileTap={
                    experiment.status !== "coming-soon" ? { scale: 0.98 } : {}
                  }
                  disabled={experiment.status === "coming-soon"}
                  onClick={() => {
                    if (
                      experiment.status !== "coming-soon" &&
                      experiment.component
                    ) {
                      setSelectedDemo(index);
                    }
                  }}
                >
                  {experiment.status === "coming-soon"
                    ? "Coming Soon"
                    : "Try Live Demo"}
                </motion.button>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mt-16"
        >
          <motion.p variants={fadeInUp} className="text-foreground-muted mb-6">
            Want to collaborate on something experimental?
          </motion.p>

          <motion.button
            className="px-8 py-4 bg-primary text-white rounded-full font-medium text-lg hover:bg-primary-600 transition-colors magnetic ripple-effect"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            Let's Create Together
          </motion.button>
        </motion.div>
      </div>

      {/* Demo Modal */}
      {selectedDemo !== null && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedDemo(null)}
        >
          <motion.div
            className="bg-gray-900 rounded-2xl w-full max-w-6xl h-[80vh] overflow-hidden border border-white/10"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <h3 className="text-2xl font-bold text-white">
                  {experiments[selectedDemo].title}
                </h3>
                <p className="text-gray-400">
                  {experiments[selectedDemo].description}
                </p>
              </div>
              <motion.button
                className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center text-white"
                onClick={() => setSelectedDemo(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
            </div>

            {/* Demo Content */}
            <div className="h-full p-6">
              {experiments[selectedDemo].component && (
                <div className="h-full">
                  {(() => {
                    const Component = experiments[selectedDemo].component!;
                    return <Component />;
                  })()}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
