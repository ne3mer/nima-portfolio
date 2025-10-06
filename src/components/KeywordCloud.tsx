import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";

interface Keyword {
  text: string;
  color: string;
  size: number;
  x: number;
  y: number;
}

const keywords: Keyword[] = [
  { text: "Ethical AI", color: "#8b5cf6", size: 1.2, x: 20, y: 30 },
  { text: "Design Systems", color: "#06b6d4", size: 1.0, x: 70, y: 20 },
  { text: "React", color: "#f59e0b", size: 1.4, x: 30, y: 60 },
  { text: "TypeScript", color: "#8b5cf6", size: 1.1, x: 80, y: 50 },
  { text: "Machine Learning", color: "#10b981", size: 0.9, x: 15, y: 80 },
  { text: "Creative Coding", color: "#ef4444", size: 1.3, x: 60, y: 70 },
  { text: "User Experience", color: "#3b82f6", size: 1.0, x: 40, y: 40 },
  { text: "Performance", color: "#06b6d4", size: 0.8, x: 75, y: 85 },
  { text: "WebGL", color: "#f59e0b", size: 1.1, x: 25, y: 15 },
  { text: "Innovation", color: "#10b981", size: 1.2, x: 85, y: 35 },
  { text: "Accessibility", color: "#ef4444", size: 0.9, x: 50, y: 90 },
  { text: "Scalability", color: "#3b82f6", size: 1.0, x: 10, y: 50 },
];

export default function KeywordCloud() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredKeyword, setHoveredKeyword] = useState<number | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    mouseX.set(distanceX / 20);
    mouseY.set(distanceY / 20);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        What I'm passionate about:
      </h3>

      <motion.div
        ref={containerRef}
        className="relative h-64 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-background-tertiary to-background-secondary border border-white/10"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          perspective: 1000,
        }}
      >
        {/* Background particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Keywords */}
        {keywords.map((keyword, index) => {
          const isHovered = hoveredKeyword === index;

          return (
            <motion.div
              key={keyword.text}
              className="absolute cursor-pointer"
              style={{
                left: `${keyword.x}%`,
                top: `${keyword.y}%`,
                transform: `translate(-50%, -50%)`,
              }}
              onMouseEnter={() => setHoveredKeyword(index)}
              onMouseLeave={() => setHoveredKeyword(null)}
              animate={{
                x: springX * (isHovered ? 2 : 1),
                y: springY * (isHovered ? 2 : 1),
                scale: isHovered ? keyword.size * 1.3 : keyword.size,
                rotate: isHovered ? [0, 5, -5, 0] : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              whileHover={{ scale: keyword.size * 1.3 }}
              whileTap={{ scale: keyword.size * 0.9 }}
            >
              <motion.span
                className="px-4 py-2 rounded-full font-medium text-sm backdrop-blur-sm border border-white/20"
                style={{
                  color: keyword.color,
                  backgroundColor: `${keyword.color}20`,
                  borderColor: `${keyword.color}40`,
                }}
                animate={{
                  boxShadow: isHovered
                    ? [
                        `0 0 20px ${keyword.color}40`,
                        `0 0 40px ${keyword.color}60`,
                        `0 0 20px ${keyword.color}40`,
                      ]
                    : `0 0 0px ${keyword.color}00`,
                }}
                transition={{
                  duration: 0.3,
                }}
              >
                {keyword.text}
              </motion.span>

              {/* Connection lines on hover */}
              {isHovered && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {keywords
                    .filter((_, i) => i !== index)
                    .slice(0, 3)
                    .map((otherKeyword, i) => (
                      <motion.line
                        key={i}
                        className="absolute"
                        style={{
                          left: "50%",
                          top: "50%",
                          width: `${Math.abs(
                            Number(keyword.x) - Number(otherKeyword.x)
                          )}%`,
                          height: `${Math.abs(
                            Number(keyword.y) - Number(otherKeyword.y)
                          )}%`,
                          background: `linear-gradient(45deg, ${keyword.color}40, transparent)`,
                          transform: `rotate(${
                            (Math.atan2(
                              otherKeyword.y - keyword.y,
                              otherKeyword.x - keyword.x
                            ) *
                              180) /
                            Math.PI
                          }deg)`,
                          transformOrigin: "0 0",
                        }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: i * 0.1 }}
                      />
                    ))}
                </motion.div>
              )}
            </motion.div>
          );
        })}

        {/* Central focus point */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full border-2 border-white/30"
          style={{
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  );
}
