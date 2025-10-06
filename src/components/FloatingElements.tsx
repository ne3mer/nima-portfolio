import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  shape: "circle" | "square" | "triangle";
  speed: number;
}

export default function FloatingElements() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [elements, setElements] = useState<FloatingElement[]>([]);

  const colors = [
    "#8b5cf6", // purple
    "#06b6d4", // cyan
    "#f59e0b", // orange
    "#10b981", // green
    "#ef4444", // red
    "#3b82f6", // blue
  ];

  const shapes: ("circle" | "square" | "triangle")[] = [
    "circle",
    "square",
    "triangle",
  ];

  useEffect(() => {
    const generateElements = () => {
      const newElements: FloatingElement[] = [];
      for (let i = 0; i < 15; i++) {
        newElements.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 20 + 10,
          color: colors[Math.floor(Math.random() * colors.length)],
          shape: shapes[Math.floor(Math.random() * shapes.length)],
          speed: Math.random() * 2 + 1,
        });
      }
      setElements(newElements);
    };

    generateElements();
  }, []);

  const getShapeStyle = (element: FloatingElement) => {
    const baseStyle = {
      width: element.size,
      height: element.size,
      backgroundColor: element.color,
      position: "absolute" as const,
      left: `${element.x}%`,
      top: `${element.y}%`,
      filter: "blur(0.5px)",
    };

    switch (element.shape) {
      case "circle":
        return {
          ...baseStyle,
          borderRadius: "50%",
        };
      case "square":
        return {
          ...baseStyle,
          borderRadius: "20%",
        };
      case "triangle":
        return {
          ...baseStyle,
          width: 0,
          height: 0,
          backgroundColor: "transparent",
          borderLeft: `${element.size / 2}px solid transparent`,
          borderRight: `${element.size / 2}px solid transparent`,
          borderBottom: `${element.size}px solid ${element.color}`,
        };
      default:
        return baseStyle;
    }
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      {elements.map((element) => (
        <motion.div
          key={element.id}
          style={getShapeStyle(element)}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 8 + element.speed * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: element.id * 0.5,
          }}
        />
      ))}
    </div>
  );
}
