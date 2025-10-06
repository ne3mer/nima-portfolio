import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeInUp, staggerContainer } from "../lib/motion";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="min-h-screen py-20 px-6 bg-gray-800"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-6"
          >
            Let's Work Together
          </motion.h2>
          
          <motion.p
            variants={fadeInUp}
            className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
          >
            I'm always interested in new opportunities and exciting projects.
            Let's discuss how we can bring your ideas to life.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="grid md:grid-cols-2 gap-8 mb-12"
          >
            <div className="p-8 bg-gray-700 rounded-2xl border border-gray-600">
              <h3 className="text-2xl font-semibold text-white mb-4">Get In Touch</h3>
              <p className="text-gray-300 mb-6">
                Ready to start your next project? I'd love to hear from you.
              </p>
              <a
                href="mailto:nima@example.com"
                className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-full font-medium hover:scale-105 transition-transform"
              >
                Send Email
              </a>
            </div>

            <div className="p-8 bg-gray-700 rounded-2xl border border-gray-600">
              <h3 className="text-2xl font-semibold text-white mb-4">Follow Me</h3>
              <p className="text-gray-300 mb-6">
                Stay updated with my latest work and thoughts.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://github.com"
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com"
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="https://twitter.com"
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
                >
                  Twitter
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="text-center"
          >
            <p className="text-gray-400">
              © 2024 Nima Afshar Far. All rights reserved.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
