import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { MotionLetter } from "../components/MotionText";
import HeroImage from "../components/HeroImage";
import TiltCard from "../components/TiltCard";
import MagneticButton from "../components/MagneticButton";
import PowerText from "../components/PowerText";
import FloatingElements from "../components/FloatingElements";
import { fadeInUp, staggerContainer } from "../lib/motion";

interface HeroProps {
  heroImageSrc?: string;
}

export default function Hero({ heroImageSrc }: HeroProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left - rect.width / 2) / 30);
        mouseY.set((e.clientY - rect.top - rect.height / 2) / 30);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900"
    >
      {/* Hero Image with blur effects */}
      {heroImageSrc && (
        <div className="absolute inset-0">
          <HeroImage
            src={heroImageSrc}
            alt="Hero Background"
            className="w-full h-full"
          />
        </div>
      )}

      {/* Fallback animated mesh gradient background */}
      {!heroImageSrc && (
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 opacity-40"
            style={{
              background: `
                radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%),
                linear-gradient(135deg, rgba(120, 119, 198, 0.1) 0%, rgba(255, 119, 198, 0.1) 100%)
              `,
            }}
            animate={{
              background: [
                `
                  radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
                  radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%),
                  linear-gradient(135deg, rgba(120, 119, 198, 0.1) 0%, rgba(255, 119, 198, 0.1) 100%)
                `,
                `
                  radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
                  radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                  radial-gradient(circle at 60% 60%, rgba(120, 219, 255, 0.3) 0%, transparent 50%),
                  linear-gradient(135deg, rgba(255, 119, 198, 0.1) 0%, rgba(120, 219, 255, 0.1) 100%)
                `,
                `
                  radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%),
                  radial-gradient(circle at 60% 60%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                  radial-gradient(circle at 20% 80%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
                  linear-gradient(135deg, rgba(120, 219, 255, 0.1) 0%, rgba(120, 119, 198, 0.1) 100%)
                `,
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      )}

      {/* Techy particle system with cartoon elements */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
              background: `hsl(${Math.random() * 60 + 240}, 80%, 70%)`,
              boxShadow: `0 0 ${Math.random() * 10 + 5}px currentColor`,
            }}
            animate={{
              y: [0, -120, 0],
              x: [0, Math.random() * 60 - 30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              rotate: [0, 360, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Cartoon-style floating shapes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 20 + 10,
              height: Math.random() * 20 + 10,
              background:
                i % 2 === 0
                  ? `linear-gradient(45deg, #ff6b6b, #4ecdc4)`
                  : `linear-gradient(45deg, #a8e6cf, #ffd3a5)`,
              borderRadius: i % 3 === 0 ? "50%" : i % 3 === 1 ? "20%" : "0%",
              filter: "blur(1px)",
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, 30, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Techy floating geometric shapes */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 80 + 40,
              height: Math.random() * 80 + 40,
              background: `linear-gradient(45deg, 
                rgba(139, 92, 246, 0.1), 
                rgba(6, 182, 212, 0.1), 
                rgba(245, 158, 11, 0.1)
              )`,
              border: `2px solid ${
                i % 3 === 0
                  ? "rgba(139, 92, 246, 0.3)"
                  : i % 3 === 1
                  ? "rgba(6, 182, 212, 0.3)"
                  : "rgba(245, 158, 11, 0.3)"
              }`,
              borderRadius:
                i % 4 === 0
                  ? "50%"
                  : i % 4 === 1
                  ? "20%"
                  : i % 4 === 2
                  ? "0%"
                  : "30%",
              filter: "blur(0.5px)",
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.4, 0.1],
              x: [0, 20, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
          />
        ))}
      </div>

      {/* Main content with 3D effects */}
      <TiltCard
        intensity={3}
        className="relative z-10 text-center px-6 max-w-6xl mx-auto"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          style={{
            x: springX,
            y: springY,
          }}
        >
          {/* 3D Name with glow effect */}
          <motion.div variants={fadeInUp} className="mb-8 relative">
            <motion.div
              className="absolute inset-0 blur-3xl opacity-30"
              style={{
                background: "linear-gradient(45deg, #8b5cf6, #06b6d4, #f59e0b)",
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <MotionLetter
              as="h1"
              className="relative text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-orange-400 mb-4"
              delay={0.2}
              stagger={0.05}
              style={{
                textShadow: `
                0 0 30px rgba(139, 92, 246, 0.5),
                0 0 60px rgba(6, 182, 212, 0.3),
                0 0 90px rgba(245, 158, 11, 0.2),
                2px 2px 0px rgba(255, 0, 255, 0.3),
                -2px -2px 0px rgba(0, 255, 255, 0.3)
              `,
                filter: "drop-shadow(0 0 20px rgba(139, 92, 246, 0.3))",
                fontFamily: "Space Grotesk, sans-serif",
              }}
            >
              NIMA
            </MotionLetter>
          </motion.div>

          {/* Enhanced tagline with power text effect */}
          <motion.div variants={fadeInUp} className="mb-12 relative">
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg blur opacity-30"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <PowerText
              className="relative text-2xl md:text-4xl font-semibold text-gray-200 px-4 py-2"
              delay={0.8}
              stagger={0.1}
              effect="glitch"
            >
              FULL-STACK DEVELOPER & CREATIVE ENGINEER
            </PowerText>
          </motion.div>

          {/* Enhanced description with wave effect */}
          <motion.div variants={fadeInUp} className="mb-16 relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-2xl blur-xl"
              animate={{
                y: [0, -10, 0],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <PowerText
              className="relative text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-8 py-6"
              delay={1.4}
              stagger={0.05}
              effect="wave"
            >
              I craft digital experiences that blend cutting-edge technology
              with beautiful design. Specializing in AI-powered applications,
              interactive web experiences, and innovative solutions that push
              the boundaries of what's possible.
            </PowerText>
          </motion.div>

          {/* Enhanced CTA Buttons with magnetic effects */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-8 justify-center items-center"
          >
            <MagneticButton
              className="px-10 py-5 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-full font-semibold text-lg"
              strength={0.2}
            >
              View My Work
            </MagneticButton>

            <MagneticButton
              className="px-10 py-5 border-2 border-purple-500 text-gray-200 rounded-full font-semibold text-lg hover:bg-purple-600/20 transition-colors"
              strength={0.2}
            >
              Get In Touch
            </MagneticButton>
          </motion.div>
        </motion.div>
      </TiltCard>

      {/* Enhanced scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <motion.div
          className="flex flex-col items-center text-gray-400"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.span
            className="text-sm mb-4 font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            scroll to explore
          </motion.span>
          <motion.div
            className="w-8 h-12 border-2 border-gradient-to-b from-purple-500 to-cyan-500 rounded-full flex justify-center relative overflow-hidden"
            style={{
              background: "linear-gradient(45deg, transparent, transparent)",
              borderImage: "linear-gradient(45deg, #8b5cf6, #06b6d4) 1",
            }}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-2 h-4 bg-gradient-to-b from-purple-400 to-cyan-400 rounded-full mt-2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Enhanced interactive cursor effect */}
      <motion.div
        className="fixed top-0 left-0 w-40 h-40 rounded-full pointer-events-none z-20"
        style={{
          x: mousePosition.x - 80,
          y: mousePosition.y - 80,
          background:
            "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, rgba(6, 182, 212, 0.05) 50%, transparent 100%)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Enhanced floating elements */}
      <FloatingElements />
    </section>
  );
}
