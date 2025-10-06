import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface PowerTextProps {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
  effect?: "slide" | "glitch" | "wave" | "typewriter";
}

export default function PowerText({
  children,
  className = "",
  delay = 0,
  stagger = 0.05,
  effect = "slide",
}: PowerTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const words = children.split(" ");

  const getVariants = () => {
    switch (effect) {
      case "glitch":
        return {
          hidden: {
            opacity: 0,
            x: -20,
            filter: "blur(10px)",
          },
          visible: {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            transition: {
              duration: 0.6,
              ease: [0.6, -0.05, 0.01, 0.99],
            },
          },
        };
      case "wave":
        return {
          hidden: {
            opacity: 0,
            y: 50,
            rotateX: -90,
          },
          visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
              duration: 0.8,
              ease: [0.6, -0.05, 0.01, 0.99],
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
              duration: 0.5,
              ease: "easeInOut",
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
              ease: [0.6, -0.05, 0.01, 0.99],
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

  const wordVariants = getVariants();

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{
        perspective: 1000,
      }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          className="inline-block mr-2"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
