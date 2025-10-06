import { motion } from "framer-motion";
import { useState } from "react";

const cssArtPieces = [
  {
    id: "sunset",
    title: "Digital Sunset",
    description: "Pure CSS gradient animation",
    component: (
      <div className="w-full h-full relative overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 30% 20%, #ff6b6b 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, #4ecdc4 0%, transparent 50%),
              linear-gradient(135deg, #667eea 0%, #764ba2 100%)
            `,
          }}
          animate={{
            background: [
              `
                radial-gradient(circle at 30% 20%, #ff6b6b 0%, transparent 50%),
                radial-gradient(circle at 70% 80%, #4ecdc4 0%, transparent 50%),
                linear-gradient(135deg, #667eea 0%, #764ba2 100%)
              `,
              `
                radial-gradient(circle at 70% 20%, #4ecdc4 0%, transparent 50%),
                radial-gradient(circle at 30% 80%, #ff6b6b 0%, transparent 50%),
                linear-gradient(135deg, #764ba2 0%, #667eea 100%)
              `,
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating orbs */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-white/30 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    ),
  },
  {
    id: "geometric",
    title: "Geometric Dance",
    description: "CSS transforms and animations",
    component: (
      <div className="w-full h-full relative flex items-center justify-center">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              width: 60 - i * 8,
              height: 60 - i * 8,
              border: `2px solid ${
                i % 3 === 0 ? "#8b5cf6" : i % 3 === 1 ? "#06b6d4" : "#f59e0b"
              }`,
              borderRadius: i % 2 === 0 ? "50%" : "0%",
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
    ),
  },
  {
    id: "wave",
    title: "Wave Motion",
    description: "CSS clip-path animations",
    component: (
      <div className="w-full h-full relative overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            style={{
              background: `linear-gradient(45deg, ${
                i === 0 ? "#8b5cf6" : i === 1 ? "#06b6d4" : "#f59e0b"
              }, transparent)`,
              clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0 0%)",
            }}
            animate={{
              clipPath: [
                "polygon(0 100%, 100% 100%, 100% 0%, 0 0%)",
                "polygon(0 80%, 100% 60%, 100% 20%, 0 40%)",
                "polygon(0 100%, 100% 100%, 100% 0%, 0 0%)",
              ],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8,
            }}
          />
        ))}
      </div>
    ),
  },
  {
    id: "matrix",
    title: "Matrix Rain",
    description: "CSS animation with text",
    component: (
      <div className="w-full h-full relative overflow-hidden bg-black">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-400 font-mono text-sm"
            style={{
              left: `${i * 5}%`,
              top: "-100px",
            }}
            animate={{
              y: [0, 400],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 2,
            }}
          >
            {String.fromCharCode(0x30a0 + Math.random() * 96)}
          </motion.div>
        ))}
      </div>
    ),
  },
];

export default function CSSArt() {
  const [selectedArt, setSelectedArt] = useState(0);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Art piece display */}
      <div className="flex-1 relative overflow-hidden rounded-lg">
        {cssArtPieces[selectedArt].component}
      </div>

      {/* Controls */}
      <div className="p-4 space-y-4">
        <div className="flex gap-2 flex-wrap">
          {cssArtPieces.map((art, index) => (
            <motion.button
              key={art.id}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedArt === index
                  ? "bg-purple-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
              onClick={() => setSelectedArt(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {art.title}
            </motion.button>
          ))}
        </div>

        <div className="text-center">
          <h3 className="text-white font-semibold mb-1">
            {cssArtPieces[selectedArt].title}
          </h3>
          <p className="text-gray-400 text-sm">
            {cssArtPieces[selectedArt].description}
          </p>
        </div>
      </div>
    </div>
  );
}
