import { motion } from "framer-motion";
import { useRef, useState } from "react";

interface Skill {
  name: string;
  description: string;
  level: number;
  color: string;
  icon: string;
}

const skills: Skill[] = [
  {
    name: "Frontend Development",
    description: "React, TypeScript, Next.js, Tailwind CSS, Vite, GSAP",
    level: 95,
    color: "#8b5cf6",
    icon: "⚛️",
  },
  {
    name: "Backend Development",
    description: "Node.js, Express, REST APIs, MongoDB, PostgreSQL",
    level: 90,
    color: "#06b6d4",
    icon: "🔧",
  },
  {
    name: "AI & Machine Learning",
    description: "Python, TensorFlow, Flask, Computer Vision, NLP",
    level: 85,
    color: "#f59e0b",
    icon: "🤖",
  },
  {
    name: "Design & UX",
    description: "Figma, Adobe XD, UI/UX Design, Glassmorphism UI",
    level: 88,
    color: "#10b981",
    icon: "🎨",
  },
  {
    name: "DevOps & Deployment",
    description: "Vercel, Render, GitHub Actions, Docker",
    level: 80,
    color: "#ef4444",
    icon: "☁️",
  },
  {
    name: "Business Strategy",
    description: "MBA Studies, Digital Transformation, Project Management",
    level: 85,
    color: "#3b82f6",
    icon: "📊",
  },
];

export default function InteractiveSkills() {
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="space-y-6">
      <h3 className="text-2xl font-semibold text-foreground mb-8">
        Technical Expertise
      </h3>

      <div className="grid gap-4">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            className={`relative p-6 rounded-2xl border transition-all duration-500 cursor-pointer overflow-hidden ${
              hoveredSkill === index
                ? "bg-primary/10 border-primary/30 scale-105"
                : "bg-background-tertiary border-white/10 hover:border-white/20"
            }`}
            onMouseEnter={() => setHoveredSkill(index)}
            onMouseLeave={() => setHoveredSkill(null)}
            onClick={() =>
              setSelectedSkill(selectedSkill === index ? null : index)
            }
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 opacity-0"
              style={{
                background: `linear-gradient(45deg, ${skill.color}20, transparent)`,
              }}
              animate={{
                opacity: hoveredSkill === index ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Skill content */}
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{skill.icon}</span>
                  <h4 className="text-lg font-semibold text-foreground">
                    {skill.name}
                  </h4>
                </div>
                <motion.span
                  className="text-sm font-bold"
                  style={{ color: skill.color }}
                  animate={{
                    scale: hoveredSkill === index ? 1.1 : 1,
                  }}
                >
                  {skill.level}%
                </motion.span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-700 rounded-full h-2 mb-3 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`,
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{
                    delay: index * 0.1 + 0.5,
                    duration: 1,
                    ease: "easeOut",
                  }}
                />
              </div>

              <p className="text-foreground-muted text-sm">
                {skill.description}
              </p>

              {/* Expanded details */}
              <motion.div
                className="mt-4"
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: selectedSkill === index ? "auto" : 0,
                  opacity: selectedSkill === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="pt-4 border-t border-white/10">
                  <div className="flex flex-wrap gap-2">
                    {skill.description.split(", ").map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        className="px-3 py-1 bg-white/5 rounded-full text-xs text-foreground-muted"
                        initial={{ scale: 0 }}
                        animate={{
                          scale: selectedSkill === index ? 1 : 0,
                        }}
                        transition={{
                          delay: selectedSkill === index ? techIndex * 0.1 : 0,
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Floating particles on hover */}
            {hoveredSkill === index && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full"
                    style={{ backgroundColor: skill.color }}
                    initial={{
                      x: Math.random() * 300,
                      y: Math.random() * 200,
                      opacity: 0,
                    }}
                    animate={{
                      y: [0, -50, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
