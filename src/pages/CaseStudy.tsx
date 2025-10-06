import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../lib/motion";
import CursorRipple from "../components/CursorRipple";
import DitherImage from "../components/DitherImage";

// Import project data
import optisupplyData from "../content/projects/optisupply.json";
import ferendyData from "../content/projects/ferendy.json";
import stylematchData from "../content/projects/stylematch.json";

const projects = {
  optisupply: optisupplyData,
  ferendy: ferendyData,
  stylematch: stylematchData,
};

export default function CaseStudy() {
  const { id } = useParams<{ id: string }>();
  const project = id ? projects[id as keyof typeof projects] : null;

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Project Not Found
          </h1>
          <Link to="/" className="text-primary hover:text-primary-600">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <CursorRipple />

      {/* Hero section */}
      <section className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <DitherImage
            src={project.cover}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>

        {/* Content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="mb-8">
            <span className="px-4 py-2 bg-primary/20 text-primary text-sm font-medium rounded-full mb-4 inline-block">
              {project.category}
            </span>
            <h1 className="text-display-xl font-display font-bold text-foreground mb-4">
              {project.title}
            </h1>
            <p className="text-2xl text-foreground-secondary mb-6">
              {project.subtitle}
            </p>
            <p className="text-lg text-foreground-muted max-w-2xl mx-auto leading-relaxed">
              {project.description}
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-background-secondary border border-white/10 text-foreground text-sm rounded-full"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {project.links.live && (
              <motion.a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-primary text-white rounded-full font-medium hover:bg-primary-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Live Project
              </motion.a>
            )}
            {project.links.github && (
              <motion.a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border-2 border-primary text-primary rounded-full font-medium hover:bg-primary hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Code
              </motion.a>
            )}
          </motion.div>
        </motion.div>

        {/* Back button */}
        <motion.div
          className="absolute top-8 left-8 z-20"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 bg-background-secondary/80 backdrop-blur-sm border border-white/10 text-foreground rounded-full hover:bg-background-secondary transition-colors"
          >
            ← Back to Work
          </Link>
        </motion.div>
      </section>

      {/* Project details */}
      <section className="py-20 px-6 bg-background-secondary">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-16"
          >
            {/* Challenge */}
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                The Challenge
              </h2>
              <p className="text-lg text-foreground-secondary leading-relaxed">
                {project.challenge}
              </p>
            </motion.div>

            {/* Solution */}
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                The Solution
              </h2>
              <p className="text-lg text-foreground-secondary leading-relaxed">
                {project.solution}
              </p>
            </motion.div>

            {/* Results */}
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Results
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {project.results.map((result, index) => (
                  <div
                    key={index}
                    className="p-6 bg-background border border-white/10 rounded-2xl"
                  >
                    <p className="text-foreground-secondary">{result}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Features */}
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Key Features
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {project.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-background border border-white/10 rounded-xl"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                    <span className="text-foreground-secondary">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="py-20 px-6 bg-background">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl font-bold text-foreground mb-12 text-center"
            >
              Project Gallery
            </motion.h2>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {project.gallery.map((image, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="relative overflow-hidden rounded-2xl bg-background-secondary border border-white/10"
                >
                  <DitherImage
                    src={image}
                    alt={`${project.title} screenshot ${index + 1}`}
                    className="w-full h-64 object-cover"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Back to work CTA */}
      <section className="py-20 px-6 bg-background-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Interested in working together?
            </h2>
            <p className="text-lg text-foreground-secondary mb-8">
              Let's discuss your next project and create something amazing
              together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="px-8 py-4 bg-primary text-white rounded-full font-medium hover:bg-primary-600 transition-colors"
              >
                View More Projects
              </Link>
              <a
                href="mailto:nima@example.com"
                className="px-8 py-4 border-2 border-primary text-primary rounded-full font-medium hover:bg-primary hover:text-white transition-colors"
              >
                Get In Touch
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
