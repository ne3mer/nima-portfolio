import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { fadeInUp, staggerContainer } from "../lib/motion";

const socialLinks = [
  { name: "GitHub", url: "https://github.com/ne3mer", icon: "🐙" },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/nima-afsharfar-230a21176?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    icon: "💼",
  },
  { name: "Email", url: "mailto:ne3mer@gmail.com", icon: "📧" },
];

const contactMethods = [
  {
    title: "Email",
    description: "For project inquiries and collaborations",
    value: "ne3mer@gmail.com",
    action: "mailto:ne3mer@gmail.com",
  },
  {
    title: "Location",
    description: "Based in Budapest, Hungary",
    value: "Budapest, Hungary",
    action: null,
  },
  {
    title: "Availability",
    description: "Open to new opportunities",
    value: "Available for freelance work",
    action: null,
  },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredMethod, setHoveredMethod] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      className="min-h-screen py-20 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-transparent to-cyan-600/5" />

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-500/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
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
            Let's Build Something Extraordinary
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12"
          >
            I'm always excited to work on new projects and collaborate with
            like-minded people. Whether you have a specific project in mind or
            just want to chat about technology, design, and business strategy,
            I'd love to hear from you.
          </motion.p>

          {/* Main CTA */}
          <motion.div variants={fadeInUp}>
            <motion.a
              href="mailto:ne3mer@gmail.com"
              className="inline-block px-12 py-6 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-full font-semibold text-xl hover:from-purple-700 hover:to-cyan-700 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Say Hello →
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Contact methods grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-8 mb-20"
        >
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              variants={fadeInUp}
              className={`group relative p-8 rounded-2xl bg-gray-800/50 border border-white/10 transition-all duration-300 cursor-pointer ${
                hoveredMethod === index
                  ? "scale-105 border-purple-500/30"
                  : "hover:border-white/20"
              }`}
              onMouseEnter={() => setHoveredMethod(index)}
              onMouseLeave={() => setHoveredMethod(null)}
              whileHover={{ y: -5 }}
            >
              <h3 className="text-xl font-semibold text-white mb-2">
                {method.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4">{method.description}</p>
              {method.action ? (
                <a
                  href={method.action}
                  className="text-cyan-400 font-medium hover:text-cyan-300 transition-colors"
                >
                  {method.value}
                </a>
              ) : (
                <span className="text-gray-300 font-medium">
                  {method.value}
                </span>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Social links */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h3
            variants={fadeInUp}
            className="text-2xl font-semibold text-white mb-8"
          >
            Connect With Me
          </motion.h3>

          <motion.div variants={fadeInUp} className="flex justify-center gap-6">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 bg-gray-800/50 border border-white/10 rounded-full flex items-center justify-center text-2xl hover:bg-gradient-to-r hover:from-purple-600 hover:to-cyan-600 hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ delay: index * 0.1 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center pt-16 border-t border-white/10"
        >
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center gap-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-gray-400 text-sm">
              © 2024 Mohammad Nima Afshar Far. All rights reserved.
            </div>

            <div className="text-gray-400 text-sm">
              Made with React, TypeScript, and a bit of magic ✨ in Budapest
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
