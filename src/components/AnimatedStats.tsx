import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface Stat {
  number: string;
  label: string;
  icon: string;
  color: string;
  suffix?: string;
}

const stats: Stat[] = [
  {
    number: "50",
    label: "Projects Completed",
    icon: "🚀",
    color: "#8b5cf6",
    suffix: "+",
  },
  {
    number: "3",
    label: "Years Experience",
    icon: "⏰",
    color: "#06b6d4",
    suffix: "+",
  },
  {
    number: "15",
    label: "Technologies Mastered",
    icon: "🛠️",
    color: "#f59e0b",
    suffix: "+",
  },
  {
    number: "100",
    label: "Client Satisfaction",
    icon: "💯",
    color: "#10b981",
    suffix: "%",
  },
];

export default function AnimatedStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [countedNumbers, setCountedNumbers] = useState<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    if (!isInView) return;

    const durations = [2000, 2500, 1800, 1500]; // Different durations for each stat

    stats.forEach((stat, index) => {
      const targetNumber = parseInt(stat.number);
      const duration = durations[index];
      const steps = 60; // Number of animation steps
      const stepDuration = duration / steps;
      const increment = targetNumber / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const newValue = Math.min(
          Math.floor(increment * currentStep),
          targetNumber
        );

        setCountedNumbers((prev) => {
          const newCounts = [...prev];
          newCounts[index] = newValue;
          return newCounts;
        });

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, stepDuration);

      return () => clearInterval(timer);
    });
  }, [isInView]);

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="text-center group cursor-pointer"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
        >
          {/* Icon with glow effect */}
          <motion.div
            className="text-4xl mb-4 relative"
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.2,
            }}
          >
            <motion.div
              className="absolute inset-0 blur-xl opacity-30"
              style={{
                background: `radial-gradient(circle, ${stat.color}40, transparent)`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.3,
              }}
            />
            <span className="relative z-10">{stat.icon}</span>
          </motion.div>

          {/* Animated number */}
          <motion.div
            className="text-4xl md:text-5xl font-bold mb-2 relative"
            style={{
              background: `linear-gradient(45deg, ${stat.color}, ${stat.color}80)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 0.5,
              delay: index * 0.1 + 0.5,
            }}
          >
            <motion.span
              key={countedNumbers[index]}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {countedNumbers[index]}
            </motion.span>
            <span className="text-2xl">{stat.suffix}</span>
          </motion.div>

          {/* Label */}
          <motion.div
            className="text-foreground-muted text-sm font-medium"
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.2,
            }}
          >
            {stat.label}
          </motion.div>

          {/* Hover effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-transparent"
            style={{
              borderImage: `linear-gradient(45deg, ${stat.color}, transparent) 1`,
            }}
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      ))}
    </div>
  );
}
