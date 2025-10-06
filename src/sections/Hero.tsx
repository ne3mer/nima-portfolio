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
        mouseX.set((e.clientX - rect.left - rect.width / 2) / 30); // Reduced intensity
        mouseY.set((e.clientY - rect.top - rect.height / 2) / 30); // Reduced intensity
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
          <HeroImage src={heroImageSrc} className="w-full h-full" />
        </div>
      )}

      {/* Fallback animated mesh gradient background */}
      {!heroImageSrc && (
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(245, 158, 11, 0.2) 0%, transparent 50%),
                linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)
              `,
            }}
            animate={{
              background: [
                `
                  radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.3) 0%, transparent 50%),
                  radial-gradient(circle at 40% 40%, rgba(245, 158, 11, 0.2) 0%, transparent 50%),
                  linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)
                `,
                `
                  radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.4) 0%, transparent 50%),
                  radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.2) 0%, transparent 50%),
                  radial-gradient(circle at 60% 60%, rgba(245, 158, 11, 0.3) 0%, transparent 50%),
                  linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(245, 158, 11, 0.1) 100%)
                `,
                `
                  radial-gradient(circle at 40% 40%, rgba(245, 158, 11, 0.4) 0%, transparent 50%),
                  radial-gradient(circle at 60% 60%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
                  radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.2) 0%, transparent 50%),
                  linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(139, 92, 246, 0.15) 100%)
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
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
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
              background: `linear-gradient(45deg, ${
                ["#8b5cf6", "#06b6d4", "#f59e0b"][Math.floor(Math.random() * 3)]
              }, transparent)`,
              borderRadius: Math.random() > 0.5 ? "50%" : "20%",
            }}
            animate={{
              y: [0, -50, 0],
              rotate: [0, 360, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Techy floating geometric shapes */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`geo-${i}`}
            className="absolute border-2 border-purple-500/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 40 + 20,
              height: Math.random() * 40 + 20,
              clipPath: [
                "polygon(50% 0%, 0% 100%, 100% 100%)",
                "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              ][Math.floor(Math.random() * 3)],
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3,
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
              className="absolute -inset-4 bg-gradient-to-r from-purple-600 via-cyan-600 to-orange-600 rounded-lg blur-2xl opacity-30"
              animate={{
                opacity: [0.2, 0.4, 0.2],
                scale: [1, 1.05, 1],
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
              NIMA AFSHAR FAR
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
              MBA STUDENT · FULL-STACK DEVELOPER · CREATIVE TECHNOLOGIST
            </PowerText>
          </motion.div>

          {/* Location */}
          <motion.div variants={fadeInUp} className="mb-8 relative">
            <PowerText
              className="relative text-lg md:text-xl text-gray-300 flex items-center justify-center gap-2"
              delay={1.0}
              stagger={0.05}
              effect="slide"
            >
              📍 Budapest, Hungary
            </PowerText>
          </motion.div>

          {/* Enhanced description with wave effect */}
          <motion.div variants={fadeInUp} className="mb-16 relative">
            <motion.div
              className="absolute -inset-2 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-lg blur opacity-20"
              animate={{
                opacity: [0.1, 0.3, 0.1],
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
              stagger={0.03}
              effect="wave"
            >
              "I build digital experiences where design, business, and
              technology come together."
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
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-3 bg-gray-400 rounded-full mt-2"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>

      {/* Enhanced interactive cursor effect */}
      <motion.div
        className="fixed pointer-events-none z-50"
        style={{
          left: mousePosition.x - 10,
          top: mousePosition.y - 10,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-5 h-5 border-2 border-cyan-400 rounded-full bg-cyan-400/20" />
      </motion.div>

      {/* Additional floating orbs */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute w-32 h-32 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${
                [
                  "rgba(139, 92, 246, 0.1)",
                  "rgba(6, 182, 212, 0.1)",
                  "rgba(245, 158, 11, 0.1)",
                ][i]
              } 0%, transparent 70%)`,
            }}
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2,
            }}
          />
        ))}
      </div>

      {/* Enhanced floating elements */}
      <FloatingElements />
    </section>
  );
}
