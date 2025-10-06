import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { fadeInUp, staggerContainer, hoverScale } from "../lib/motion";
import DitherImage from "../components/DitherImage";
import TiltCard from "../components/TiltCard";

// Import project data
import optisupplyData from "../content/projects/optisupply.json";
import ferendyData from "../content/projects/ferendy.json";
import stylematchData from "../content/projects/stylematch.json";

const projects = [optisupplyData, ferendyData, stylematchData];

export default function Work() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section ref={ref} className="min-h-screen py-20 px-6 bg-background">
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
            className="text-display-lg font-display font-bold text-gradient mb-6"
          >
            Featured Work
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-xl text-foreground-secondary max-w-3xl mx-auto leading-relaxed"
          >
            A collection of projects that showcase my passion for creating
            innovative solutions that blend cutting-edge technology with
            beautiful design.
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
                className={`group relative overflow-hidden rounded-3xl bg-background-secondary border border-white/10 transition-all duration-500 ${
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
                    ditherDelay={index * 200}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary/20 text-primary text-sm font-medium rounded-full backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>

                  {/* Year badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/10 text-foreground text-sm font-medium rounded-full backdrop-blur-sm">
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Project content */}
                <div className="p-8">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-lg text-foreground-secondary mb-4">
                      {project.subtitle}
                    </p>
                    <p className="text-foreground-muted leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-background-tertiary text-foreground-muted text-xs rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-2 py-1 bg-background-tertiary text-foreground-muted text-xs rounded-md">
                          +{project.technologies.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-4">
                    <Link to={`/work/${project.id}`}>
                      <motion.button
                        className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        View Project
                      </motion.button>
                    </Link>

                    {project.links.github && (
                      <motion.a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 border border-white/20 text-foreground rounded-lg font-medium hover:bg-white/5 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Code
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            </TiltCard>
          ))}
        </motion.div>

        {/* View all projects button */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mt-16"
        >
          <motion.button
            className="px-8 py-4 border-2 border-primary text-primary rounded-full font-medium text-lg hover:bg-primary hover:text-white transition-colors magnetic ripple-effect"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            View All Projects
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
