import { motion } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";

interface Particle {
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
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isRunning, setIsRunning] = useState(true);

  const colors = [
    "#8b5cf6", // purple
    "#06b6d4", // cyan
    "#f59e0b", // orange
    "#10b981", // green
    "#ef4444", // red
    "#3b82f6", // blue
  ];

  const createParticle = useCallback((x: number, y: number) => {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 3 + 1;
    const size = Math.random() * 4 + 2;
    const life = Math.random() * 100 + 50;

    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size,
      color: colors[Math.floor(Math.random() * colors.length)],
      life,
      maxLife: life,
    };
  }, [colors]);

  const updateParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particlesRef.current = particlesRef.current.filter((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life--;

      // Mouse attraction
      const dx = mouseRef.current.x - particle.x;
      const dy = mouseRef.current.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        const force = (100 - distance) / 100;
        particle.vx += (dx / distance) * force * 0.1;
        particle.vy += (dy / distance) * force * 0.1;
      }

      // Draw particle
      const alpha = particle.life / particle.maxLife;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      return particle.life > 0;
    });

    // Add new particles
    if (Math.random() < 0.3) {
      particlesRef.current.push(
        createParticle(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        )
      );
    }
  }, [createParticle]);

  const animate = useCallback(() => {
    updateParticles();
    if (isRunning) {
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [updateParticles, isRunning]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  useEffect(() => {
    if (isRunning) {
      animate();
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, isRunning]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Create explosion
    for (let i = 0; i < 20; i++) {
      particlesRef.current.push(createParticle(x, y));
    }
  };

  return (
    <div className="w-full h-full bg-gray-900 rounded-lg overflow-hidden relative">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-pointer"
        onMouseMove={handleMouseMove}
        onClick={handleClick}
      />
      
      <div className="absolute top-4 left-4 text-white">
        <h3 className="text-lg font-semibold mb-2">Particle System</h3>
        <p className="text-sm text-gray-300 mb-4">
          Click to create explosions, move mouse to attract particles
        </p>
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-colors"
        >
          {isRunning ? "Pause" : "Resume"}
        </button>
      </div>
    </div>
  );
}
