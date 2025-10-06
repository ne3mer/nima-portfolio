import { motion } from "framer-motion";
import React, { useRef } from "react";

interface PowerTextProps {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
  effect?: "glitch" | "wave" | "typewriter" | "slide";
}

export default function PowerText({
  children,
  className = "",
  delay = 0,
  stagger = 0.05,
  effect = "slide",
}: PowerTextProps) {
  const ref = useRef(null);
  const words = children.split(" ");

  const getWordVariants = () => {
    switch (effect) {
      case "glitch":
        return {
          hidden: {
            opacity: 0,
            x: -20,
            filter: "blur(5px)",
          },
          visible: {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            transition: {
              duration: 0.6,
              ease: "easeOut",
              x: { type: "spring", stiffness: 100, damping: 10 },
            },
          },
        };
      case "wave":
        return {
          hidden: {
            opacity: 0,
            y: 50,
            rotateX: 90,
          },
          visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
              duration: 0.8,
              ease: [0.6, 0.01, -0.05, 0.9],
            },
          },
        };
      case "typewriter":
        return {
          hidden: {
            opacity: 0,
            width: 0,
          },
          visible: {
            opacity: 1,
            width: "auto",
            transition: {
              duration: 0.1,
              ease: "linear",
            },
          },
        };
      default: // slide
        return {
          hidden: {
            opacity: 0,
            y: 50,
          },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.6,
              ease: "easeOut",
            },
          },
        };
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay,
        staggerChildren: stagger,
      },
    },
  };

  const wordVariants = getWordVariants();

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ display: "inline-block" }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          className="inline-block mr-2"
          style={{ display: "inline-block", whiteSpace: "nowrap" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
