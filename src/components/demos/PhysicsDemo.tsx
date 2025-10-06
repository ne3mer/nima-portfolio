import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

interface Ball {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  mass: number;
}

export default function PhysicsDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [balls, setBalls] = useState<Ball[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [gravity, setGravity] = useState(0.5);
  const [bounce, setBounce] = useState(0.8);
  const animationRef = useRef<number>();

  const colors = ["#8b5cf6", "#06b6d4", "#f59e0b", "#10b981", "#ef4444"];

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
      setBalls((prevBalls) => {
        const canvas = canvasRef.current;
        if (!canvas) return prevBalls;

        const width = canvas.width / window.devicePixelRatio;
        const height = canvas.height / window.devicePixelRatio;

        return prevBalls.map((ball) => {
          // Apply gravity
          let newVy = ball.vy + gravity;
          let newVx = ball.vx;
          let newX = ball.x + newVx;
          let newY = ball.y + newVy;

          // Bounce off walls
          if (newX - ball.radius < 0 || newX + ball.radius > width) {
            newVx = -newVx * bounce;
            newX = newX - ball.radius < 0 ? ball.radius : width - ball.radius;
          }
          if (newY - ball.radius < 0 || newY + ball.radius > height) {
            newVy = -newVy * bounce;
            newY = newY - ball.radius < 0 ? ball.radius : height - ball.radius;
          }

          // Collision detection with other balls
          const updatedBalls = [...prevBalls];
          const ballIndex = updatedBalls.findIndex((b) => b.id === ball.id);

          for (let i = 0; i < updatedBalls.length; i++) {
            if (i === ballIndex) continue;

            const otherBall = updatedBalls[i];
            const dx = newX - otherBall.x;
            const dy = newY - otherBall.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < ball.radius + otherBall.radius) {
              // Collision response
              const angle = Math.atan2(dy, dx);
              const sin = Math.sin(angle);
              const cos = Math.cos(angle);

              // Rotate ball positions
              const x1 = 0;
              const y1 = 0;
              const x2 = dx * cos + dy * sin;
              const y2 = dy * cos - dx * sin;

              // Rotate ball velocities
              const vx1 = newVx * cos + newVy * sin;
              const vy1 = newVy * cos - newVx * sin;
              const vx2 = otherBall.vx * cos + otherBall.vy * sin;
              const vy2 = otherBall.vy * cos - otherBall.vx * sin;

              // Collision reaction
              const vx1Final =
                ((ball.mass - otherBall.mass) * vx1 +
                  2 * otherBall.mass * vx2) /
                (ball.mass + otherBall.mass);
              const vx2Final =
                ((otherBall.mass - ball.mass) * vx2 + 2 * ball.mass * vx1) /
                (ball.mass + otherBall.mass);

              // Update velocities
              newVx = vx1Final * cos - vy1 * sin;
              newVy = vy1 * cos + vx1Final * sin;

              // Separate balls
              const overlap = ball.radius + otherBall.radius - distance;
              const separationX = (overlap / 2) * cos;
              const separationY = (overlap / 2) * sin;

              newX += separationX;
              newY += separationY;
            }
          }

          return {
            ...ball,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy,
          };
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, gravity, bounce]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      balls.forEach((ball) => {
        ctx.save();
        ctx.fillStyle = ball.color;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fill();

        // Add glow effect
        ctx.shadowColor = ball.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    };

    draw();
  }, [balls]);

  const addBall = (x: number, y: number) => {
    const newBall: Ball = {
      id: Date.now() + Math.random(),
      x,
      y,
      vx: (Math.random() - 0.5) * 10,
      vy: (Math.random() - 0.5) * 10,
      radius: Math.random() * 15 + 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      mass: Math.random() * 2 + 1,
    };
    setBalls((prev) => [...prev, newBall]);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    addBall(e.clientX - rect.left, e.clientY - rect.top);
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Canvas */}
      <div className="flex-1 relative">
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-crosshair bg-gray-900"
          onClick={handleCanvasClick}
        />

        <div className="absolute top-4 left-4 space-y-2">
          <motion.button
            className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium"
            onClick={() => setIsActive(!isActive)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isActive ? "Pause" : "Start"} Physics
          </motion.button>

          <motion.button
            className="px-4 py-2 bg-cyan-600 text-white rounded-lg text-sm font-medium block"
            onClick={() => setBalls([])}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Clear Balls
          </motion.button>
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 space-y-4 bg-gray-800">
        <div className="space-y-2">
          <label className="text-white text-sm font-medium">
            Gravity: {gravity.toFixed(1)}
          </label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={gravity}
            onChange={(e) => setGravity(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="text-white text-sm font-medium">
            Bounce: {bounce.toFixed(1)}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={bounce}
            onChange={(e) => setBounce(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="text-center text-white text-sm">
          <p>Click to add balls</p>
          <p>Adjust gravity and bounce settings</p>
        </div>
      </div>
    </div>
  );
}
