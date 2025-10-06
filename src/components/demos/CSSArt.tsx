import { motion } from "framer-motion";
import { useState } from "react";

const artPieces = [
  {
    id: "sunset",
    title: "Digital Sunset",
    description: "Pure CSS gradient sunset with animated clouds",
  },
  {
    id: "geometric",
    title: "Geometric Dance",
    description: "Animated geometric shapes with CSS transforms",
  },
  {
    id: "wave",
    title: "Wave Motion",
    description: "CSS-only wave animation with multiple layers",
  },
  {
    id: "matrix",
    title: "Matrix Rain",
    description: "CSS animation simulating matrix digital rain",
  },
];

export default function CSSArt() {
  const [selectedArt, setSelectedArt] = useState(0);

  const renderArt = () => {
    switch (artPieces[selectedArt].id) {
      case "sunset":
        return (
          <div className="w-full h-full relative overflow-hidden bg-gradient-to-b from-yellow-400 via-orange-500 to-purple-600">
            {/* Animated clouds */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-white/20 rounded-full"
                style={{
                  width: `${60 + i * 20}px`,
                  height: `${30 + i * 10}px`,
                  left: `${i * 20}%`,
                  top: `${20 + i * 10}%`,
                }}
                animate={{
                  x: [0, 50, 0],
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
            {/* Sun */}
            <motion.div
              className="absolute w-20 h-20 bg-yellow-300 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        );

      case "geometric":
        return (
          <div className="w-full h-full bg-gray-900 flex items-center justify-center">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-16 h-16 border-2 border-purple-500"
                style={{
                  transform: `rotate(${i * 60}deg)`,
                }}
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
            <motion.div
              className="w-8 h-8 bg-cyan-400 rounded-full"
              animate={{
                scale: [1, 2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        );

      case "wave":
        return (
          <div className="w-full h-full bg-gradient-to-b from-blue-400 to-blue-600 relative overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-full h-32 bg-white/10"
                style={{
                  bottom: `${i * 20}%`,
                  clipPath: "polygon(0% 50%, 100% 50%, 100% 100%, 0% 100%)",
                }}
                animate={{
                  x: [0, 100, 0],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
          </div>
        );

      case "matrix":
        return (
          <div className="w-full h-full bg-black relative overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-green-400 font-mono text-sm"
                style={{
                  left: `${i * 5}%`,
                  top: "-20px",
                }}
                animate={{
                  y: [0, 400],
                  opacity: [1, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "linear",
                }}
              >
                {String.fromCharCode(0x30A0 + Math.random() * 96)}
              </motion.div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full bg-gray-900 rounded-lg overflow-hidden">
      <div className="h-3/4 relative">
        {renderArt()}
      </div>
      
      <div className="h-1/4 p-4 bg-gray-800">
        <h3 className="text-lg font-semibold text-white mb-2">
          {artPieces[selectedArt].title}
        </h3>
        <p className="text-sm text-gray-300 mb-4">
          {artPieces[selectedArt].description}
        </p>
        
        <div className="flex gap-2">
          {artPieces.map((art, index) => (
            <button
              key={art.id}
              onClick={() => setSelectedArt(index)}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                selectedArt === index
                  ? "bg-purple-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {art.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
