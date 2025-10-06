import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface HeroImageProps {
  src: string;
  className?: string;
}

export default function HeroImage({ src, className = "" }: HeroImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setIsLoaded(true);
    img.src = src;
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Multiple layers of blurred images for depth */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        {/* Base blurred layer - enhanced for portrait */}
        <motion.div
          className="absolute inset-0 scale-110"
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(50px) brightness(0.2) contrast(1.2)",
          }}
          animate={{
            scale: [1.1, 1.3, 1.1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Medium blur layer - enhanced for portrait */}
        <motion.div
          className="absolute inset-0 scale-105"
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(25px) brightness(0.4) contrast(1.1)",
          }}
          animate={{
            scale: [1.05, 1.2, 1.05],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />

        {/* Light blur layer - enhanced for portrait */}
        <motion.div
          className="absolute inset-0 scale-102"
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(12px) brightness(0.6) contrast(1.05)",
          }}
          animate={{
            scale: [1.02, 1.1, 1.02],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />

        {/* Sharp center focus - enhanced for portrait */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(1px) brightness(0.9) contrast(1.1)",
            maskImage:
              "radial-gradient(circle at center, black 25%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(circle at center, black 25%, transparent 75%)",
          }}
          animate={{
            scale: [1, 1.03, 1],
            opacity: [0.7, 0.9, 0.7],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </motion.div>

      {/* Enhanced gradient overlays for black & white portrait */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 30% 70%, rgba(139, 92, 246, 0.3) 0%, transparent 60%),
            radial-gradient(circle at 70% 30%, rgba(6, 182, 212, 0.3) 0%, transparent 60%),
            radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.15) 0%, transparent 60%),
            linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)
          `,
        }}
        animate={{
          background: [
            `
              radial-gradient(circle at 30% 70%, rgba(139, 92, 246, 0.3) 0%, transparent 60%),
              radial-gradient(circle at 70% 30%, rgba(6, 182, 212, 0.3) 0%, transparent 60%),
              radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.15) 0%, transparent 60%),
              linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)
            `,
            `
              radial-gradient(circle at 70% 30%, rgba(6, 182, 212, 0.4) 0%, transparent 60%),
              radial-gradient(circle at 30% 70%, rgba(139, 92, 246, 0.2) 0%, transparent 60%),
              radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.25) 0%, transparent 60%),
              linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(245, 158, 11, 0.1) 100%)
            `,
            `
              radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.35) 0%, transparent 60%),
              radial-gradient(circle at 30% 70%, rgba(139, 92, 246, 0.25) 0%, transparent 60%),
              radial-gradient(circle at 70% 30%, rgba(6, 182, 212, 0.2) 0%, transparent 60%),
              linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(139, 92, 246, 0.15) 100%)
            `,
          ],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Techy glitch overlay */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            linear-gradient(90deg, transparent 0%, rgba(0, 255, 0, 0.1) 25%, transparent 50%, rgba(255, 0, 255, 0.1) 75%, transparent 100%),
            linear-gradient(0deg, transparent 0%, rgba(0, 255, 255, 0.1) 25%, transparent 50%, rgba(255, 255, 0, 0.1) 75%, transparent 100%)
          `,
          mixBlendMode: "screen",
        }}
        animate={{
          opacity: [0.1, 0.4, 0.1],
          x: [0, 2, -2, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Digital scan lines */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0, 255, 0, 0.1) 2px,
              rgba(0, 255, 0, 0.1) 4px
            )
          `,
          mixBlendMode: "screen",
        }}
        animate={{
          y: [0, 100, 0],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Cartoon-style outline effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(0.5px) contrast(1.5) saturate(1.2)",
          mixBlendMode: "overlay",
          opacity: 0.3,
        }}
        animate={{
          scale: [1, 1.01, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Tech UI elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Corner brackets */}
        <motion.div
          className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-cyan-400"
          animate={{
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-purple-400"
          animate={{
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
        <motion.div
          className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-orange-400"
          animate={{
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-green-400"
          animate={{
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />

        {/* Floating tech orbs */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 rounded-full border-2"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
              borderColor:
                i % 3 === 0 ? "#06b6d4" : i % 3 === 1 ? "#8b5cf6" : "#f59e0b",
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}

        {/* Data stream lines */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-20 bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
            style={{
              left: `${25 + i * 20}%`,
              top: "10%",
            }}
            animate={{
              y: [0, 100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5,
            }}
          />
        ))}

        {/* Pixelated border effect */}
        <motion.div
          className="absolute inset-0 border-4 border-transparent"
          style={{
            borderImage: `
              linear-gradient(45deg, 
                #06b6d4 0%, 
                #8b5cf6 25%, 
                #f59e0b 50%, 
                #10b981 75%, 
                #06b6d4 100%
              ) 1
            `,
          }}
          animate={{
            borderImageSlice: [1, 2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Cartoon-style color splash */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, rgba(255, 0, 255, 0.3) 0%, transparent 30%),
            radial-gradient(circle at 80% 80%, rgba(0, 255, 255, 0.3) 0%, transparent 30%),
            radial-gradient(circle at 50% 10%, rgba(255, 255, 0, 0.3) 0%, transparent 30%)
          `,
          mixBlendMode: "screen",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Noise texture overlay */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
        animate={{
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
