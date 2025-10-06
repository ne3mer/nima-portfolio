import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { fadeInUp, staggerContainer } from "../lib/motion";

const projects = [
  {
    id: 1,
    title: "AI-Powered E-commerce Platform",
    description: "Built a full-stack e-commerce solution with AI recommendations and real-time analytics.",
    image: "https://picsum.photos/600/400?random=1",
    tags: ["React", "Node.js", "AI/ML", "PostgreSQL"],
  },
  {
    id: 2,
    title: "Interactive Data Visualization",
    description: "Created dynamic data visualization tools with WebGL and D3.js for complex datasets.",
    image: "https://picsum.photos/600/400?random=2",
    tags: ["WebGL", "D3.js", "TypeScript", "Canvas"],
  },
  {
    id: 3,
    title: "Mobile-First Design System",
    description: "Developed a comprehensive design system with React components and Storybook documentation.",
    image: "https://picsum.photos/600/400?random=3",
    tags: ["React", "Storybook", "Design System", "Figma"],
  },
  {
    id: 4,
    title: "Real-time Collaboration Tool",
    description: "Built a collaborative workspace with WebSocket integration and conflict resolution.",
    image: "https://picsum.photos/600/400?random=4",
    tags: ["WebSocket", "React", "Node.js", "MongoDB"],
  },
];

export default function Work() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

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
            Featured Work
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            A collection of projects that showcase my skills in full-stack development,
            creative design, and innovative problem-solving.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={fadeInUp}
              className={`group relative overflow-hidden rounded-3xl bg-gray-800 border border-gray-700 transition-all duration-500 ${
                hoveredProject === index ? "scale-105" : "hover:scale-102"
              }`}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
              whileHover={{ y: -10 }}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-full font-medium hover:scale-105 transition-transform">
                  View Project
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
