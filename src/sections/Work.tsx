import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { fadeInUp, staggerContainer } from "../lib/motion";
import DitherImage from "../components/DitherImage";
import TiltCard from "../components/TiltCard";

// Import project data
import optisupplyData from "../content/projects/optisupply.json";
import ferendyData from "../content/projects/ferendy.json";
import stylematchData from "../content/projects/stylematch.json";
import thirtybinData from "../content/projects/30bin.json";

const projects = [optisupplyData, ferendyData, stylematchData, thirtybinData];

export default function Work() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      className="min-h-screen py-20 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-20"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-orange-400 mb-6"
          >
            Featured Work
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            A collection of projects that showcase my passion for creative
            technology, ethical AI, and user-centered design. Each project
            represents a unique challenge and learning opportunity.
          </motion.p>
        </motion.div>

        {/* Projects grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <TiltCard key={project.id} intensity={4}>
              <motion.div
                variants={fadeInUp}
                className={`group relative overflow-hidden rounded-3xl bg-gray-800/50 border border-white/10 transition-all duration-500 ${
                  hoveredProject === index ? "scale-105" : "hover:scale-102"
                }`}
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
                whileHover={{ y: -10 }}
              >
                {/* Project image */}
                <div className="relative h-64 overflow-hidden">
                  <DitherImage
                    src={project.cover}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Status badge */}
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        project.status === "Completed"
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-400 border border-purple-500/30">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Project content */}
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-gray-400 text-sm font-medium">
                      {project.year}
                    </span>
                  </div>

                  <p className="text-gray-300 leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-700/50 text-gray-300 text-sm rounded-full border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-3 py-1 bg-gray-700/50 text-gray-300 text-sm rounded-full border border-white/10">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Project links */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-4">
                      {project.links.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium"
                        >
                          Live Demo →
                        </a>
                      )}
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gray-300 transition-colors text-sm font-medium"
                        >
                          GitHub →
                        </a>
                      )}
                    </div>

                    <Link
                      to={`/work/${project.id}`}
                      className="px-6 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-full text-sm font-semibold hover:from-purple-700 hover:to-cyan-700 transition-all duration-300"
                    >
                      View Details
                    </Link>
                  </div>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            </TiltCard>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-3xl p-12 border border-white/10">
            <h3 className="text-3xl font-bold text-white mb-4">
              Interested in working together?
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              I'm always excited to take on new challenges and collaborate on
              innovative projects. Let's discuss how we can bring your ideas to
              life.
            </p>
            <a
              href="mailto:ne3mer@gmail.com"
              className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-full font-semibold hover:from-purple-700 hover:to-cyan-700 transition-all duration-300"
            >
              Get In Touch
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
