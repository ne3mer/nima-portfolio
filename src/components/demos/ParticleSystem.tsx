import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
}

export default function ParticleSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const animationRef = useRef<number>();

  const colors = [
    "#8b5cf6", // purple
    "#06b6d4", // cyan
    "#f59e0b", // orange
    "#10b981", // green
    "#ef4444", // red
    "#3b82f6", // blue
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const animate = () => {
      setParticles((prevParticles) => {
        const updatedParticles = prevParticles
          .map((particle) => {
            // Update position
            const newX = particle.x + particle.vx;
            const newY = particle.y + particle.vy;

            // Apply gravity
            const newVy = particle.vy + 0.1;

            // Apply mouse attraction
            const dx = mousePos.x - newX;
            const dy = mousePos.y - newY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              const force = (100 - distance) / 100;
              const newVx = particle.vx + (dx / distance) * force * 0.5;
              const newVy = particle.vy + (dy / distance) * force * 0.5;

              return {
                ...particle,
                x: newX,
                y: newY,
                vx: newVx * 0.98,
                vy: newVy * 0.98,
                life: particle.life - 1,
              };
            }

            return {
              ...particle,
              x: newX,
              y: newY,
              vy: newVy,
              vx: particle.vx * 0.98,
              life: particle.life - 1,
            };
          })
          .filter((particle) => particle.life > 0);

        // Add new particles
        if (Math.random() < 0.3) {
          const newParticle: Particle = {
            id: Date.now() + Math.random(),
            x:
              (Math.random() * canvasRef.current!.width) /
              window.devicePixelRatio,
            y: canvasRef.current!.height / window.devicePixelRatio,
            vx: (Math.random() - 0.5) * 4,
            vy: -Math.random() * 8 - 2,
            size: Math.random() * 4 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            life: 200,
            maxLife: 200,
          };
          updatedParticles.push(newParticle);
        }

        return updatedParticles;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, mousePos]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        const alpha = particle.life / particle.maxLife;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    };

    draw();
  }, [particles]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const createExplosion = (x: number, y: number) => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: Date.now() + Math.random() + i,
        x,
        y,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
        size: Math.random() * 6 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 100,
        maxLife: 100,
      });
    }
    setParticles((prev) => [...prev, ...newParticles]);
  };

  return (
    <div className="w-full h-full relative">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-crosshair"
        onMouseMove={handleMouseMove}
        onClick={(e) => {
          const canvas = canvasRef.current;
          if (!canvas) return;
          const rect = canvas.getBoundingClientRect();
          createExplosion(e.clientX - rect.left, e.clientY - rect.top);
        }}
      />

      <div className="absolute top-4 left-4 space-y-2">
        <motion.button
          className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium"
          onClick={() => setIsActive(!isActive)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isActive ? "Stop" : "Start"} Particles
        </motion.button>

        <motion.button
          className="px-4 py-2 bg-cyan-600 text-white rounded-lg text-sm font-medium block"
          onClick={() => setParticles([])}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Clear
        </motion.button>
      </div>

      <div className="absolute bottom-4 left-4 text-white text-sm bg-black/50 px-3 py-2 rounded-lg">
        <p>Click to create explosions</p>
        <p>Move mouse to attract particles</p>
      </div>
    </div>
  );
}
