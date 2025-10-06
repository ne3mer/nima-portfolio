import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  achievements: string[];
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "2024",
    title: "AI Innovation Lead",
    description:
      "Leading cutting-edge AI projects and creative web experiences",
    icon: "🚀",
    color: "#8b5cf6",
    achievements: [
      "Launched 10+ AI-powered applications",
      "Mentored 5 junior developers",
      "Spoke at 3 tech conferences",
    ],
  },
  {
    year: "2023",
    title: "Full-Stack Developer",
    description: "Built scalable web applications and design systems",
    icon: "⚛️",
    color: "#06b6d4",
    achievements: [
      "Developed 20+ React applications",
      "Created reusable component libraries",
      "Optimized performance by 40%",
    ],
  },
  {
    year: "2022",
    title: "Frontend Specialist",
    description: "Focused on modern web technologies and user experience",
    icon: "🎨",
    color: "#f59e0b",
    achievements: [
      "Mastered TypeScript and Next.js",
      "Built responsive design systems",
      "Achieved 95+ Lighthouse scores",
    ],
  },
  {
    year: "2021",
    title: "Computer Science Graduate",
    description: "Started my journey in software development",
    icon: "🎓",
    color: "#10b981",
    achievements: [
      "Graduated with honors",
      "Built first portfolio website",
      "Completed 50+ coding challenges",
    ],
  },
];

export default function CreativeTimeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);

  return (
    <div ref={ref} className="space-y-8">
      <h3 className="text-2xl font-semibold text-foreground mb-8">
        My Journey
      </h3>

      <div className="relative">
        {/* Timeline line */}
        <motion.div
          className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-accent rounded-full"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />

        {/* Timeline events */}
        <div className="space-y-12">
          {timelineEvents.map((event, index) => (
            <motion.div
              key={event.year}
              className="relative flex items-start gap-8"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ delay: index * 0.2 }}
            >
              {/* Timeline dot */}
              <motion.div
                className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full border-4 border-background-secondary flex items-center justify-center text-2xl"
                style={{
                  backgroundColor: event.color,
                  boxShadow: `0 0 20px ${event.color}40`,
                }}
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {event.icon}
              </motion.div>

              {/* Event content */}
              <motion.div
                className={`flex-1 p-6 rounded-2xl border transition-all duration-500 cursor-pointer ${
                  hoveredEvent === index
                    ? "bg-primary/10 border-primary/30 scale-105"
                    : "bg-background-tertiary border-white/10 hover:border-white/20"
                }`}
                onMouseEnter={() => setHoveredEvent(index)}
                onMouseLeave={() => setHoveredEvent(null)}
                whileHover={{ y: -5 }}
              >
                {/* Year badge */}
                <motion.div
                  className="inline-block px-3 py-1 rounded-full text-sm font-bold mb-3"
                  style={{
                    backgroundColor: `${event.color}20`,
                    color: event.color,
                    border: `1px solid ${event.color}40`,
                  }}
                  animate={{
                    scale: hoveredEvent === index ? 1.1 : 1,
                  }}
                >
                  {event.year}
                </motion.div>

                {/* Title */}
                <h4 className="text-xl font-semibold text-foreground mb-2">
                  {event.title}
                </h4>

                {/* Description */}
                <p className="text-foreground-muted mb-4">
                  {event.description}
                </p>

                {/* Achievements */}
                <motion.div
                  className="space-y-2"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: hoveredEvent === index ? "auto" : 0,
                    opacity: hoveredEvent === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="pt-4 border-t border-white/10">
                    <h5 className="text-sm font-medium text-foreground mb-2">
                      Key Achievements:
                    </h5>
                    <ul className="space-y-1">
                      {event.achievements.map(
                        (achievement, achievementIndex) => (
                          <motion.li
                            key={achievement}
                            className="flex items-center gap-2 text-sm text-foreground-muted"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{
                              opacity: hoveredEvent === index ? 1 : 0,
                              x: hoveredEvent === index ? 0 : -20,
                            }}
                            transition={{ delay: achievementIndex * 0.1 }}
                          >
                            <motion.span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: event.color }}
                              animate={{
                                scale: hoveredEvent === index ? 1.5 : 1,
                              }}
                            />
                            {achievement}
                          </motion.li>
                        )
                      )}
                    </ul>
                  </div>
                </motion.div>

                {/* Floating particles on hover */}
                {hoveredEvent === index && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full"
                        style={{ backgroundColor: event.color }}
                        initial={{
                          x: Math.random() * 300,
                          y: Math.random() * 200,
                          opacity: 0,
                        }}
                        animate={{
                          y: [0, -100, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
