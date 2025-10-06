import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MotionTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  as?: keyof JSX.IntrinsicElements;
  style?: React.CSSProperties;
}

export default function MotionText({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  stagger = 0.1,
  as: Component = "div",
  style = {},
}: MotionTextProps) {
  const words = typeof children === "string" ? children.split(" ") : [children];

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

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      as={Component}
      className={className}
      style={style}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

interface MotionLetterProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  as?: keyof JSX.IntrinsicElements;
  style?: React.CSSProperties;
}

export function MotionLetter({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  stagger = 0.05,
  as: Component = "div",
  style = {},
}: MotionLetterProps) {
  const letters = children.split("");

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

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      as={Component}
      className={className}
      style={style}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          className="inline-block"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
}
