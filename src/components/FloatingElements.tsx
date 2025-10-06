import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  shape: "circle" | "square" | "triangle";
  delay: number;
  duration: number;
}

const colors = [
  "rgba(139, 92, 246, 0.1)", // purple
  "rgba(6, 182, 212, 0.1)", // cyan
  "rgba(245, 158, 11, 0.1)", // orange
  "rgba(16, 185, 129, 0.1)", // green
  "rgba(239, 68, 68, 0.1)", // red
  "rgba(59, 130, 246, 0.1)", // blue
];

const shapes: ("circle" | "square" | "triangle")[] = [
  "circle",
  "square",
  "triangle",
];

export default function FloatingElements() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const newElements: FloatingElement[] = Array.from({ length: 15 }).map(
      (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 50 + 20,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 5,
      })
    );
    setElements(newElements);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: element.size,
            height: element.size,
            background: element.color,
            borderRadius:
              element.shape === "circle"
                ? "50%"
                : element.shape === "square"
                ? "0%"
                : "20%", // for triangle-like effect
            clipPath:
              element.shape === "triangle"
                ? "polygon(50% 0%, 0% 100%, 100% 100%)"
                : "none",
            filter: "blur(2px)",
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: element.delay,
          }}
        />
      ))}
    </div>
  );
}
