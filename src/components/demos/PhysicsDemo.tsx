import { motion } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";

interface Ball {
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
  const animationRef = useRef<number>();
  const ballsRef = useRef<Ball[]>([]);
  const [isRunning, setIsRunning] = useState(true);
  const [gravity, setGravity] = useState(0.5);
  const [bounce, setBounce] = useState(0.8);

  const colors = [
    "#8b5cf6", // purple
    "#06b6d4", // cyan
    "#f59e0b", // orange
    "#10b981", // green
    "#ef4444", // red
    "#3b82f6", // blue
  ];

  const createBall = useCallback((x: number, y: number) => {
    const radius = Math.random() * 15 + 10;
    return {
      x,
      y,
      vx: (Math.random() - 0.5) * 10,
      vy: (Math.random() - 0.5) * 10,
      radius,
      color: colors[Math.floor(Math.random() * colors.length)],
      mass: radius * 0.1,
    };
  }, [colors]);

  const updateBalls = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update physics
    ballsRef.current.forEach((ball, i) => {
      // Apply gravity
      ball.vy += gravity;

      // Update position
      ball.x += ball.vx;
      ball.y += ball.vy;

      // Bounce off walls
      if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
        ball.vx *= -bounce;
        ball.x = ball.x - ball.radius < 0 ? ball.radius : canvas.width - ball.radius;
      }
      if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.vy *= -bounce;
        ball.y = ball.y - ball.radius < 0 ? ball.radius : canvas.height - ball.radius;
      }

      // Collision detection with other balls
      for (let j = i + 1; j < ballsRef.current.length; j++) {
        const otherBall = ballsRef.current[j];
        const dx = ball.x - otherBall.x;
        const dy = ball.y - otherBall.y;
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
          const vx1 = ball.vx * cos + ball.vy * sin;
          const vy1 = ball.vy * cos - ball.vx * sin;
          const vx2 = otherBall.vx * cos + otherBall.vy * sin;
          const vy2 = otherBall.vy * cos - otherBall.vx * sin;

          // Collision reaction
          const vx1Final = ((ball.mass - otherBall.mass) * vx1 + 2 * otherBall.mass * vx2) / (ball.mass + otherBall.mass);
          const vx2Final = ((otherBall.mass - ball.mass) * vx2 + 2 * ball.mass * vx1) / (ball.mass + otherBall.mass);

          // Update velocities
          ball.vx = vx1Final * cos - vy1 * sin;
          ball.vy = vy1 * cos + vx1Final * sin;
          otherBall.vx = vx2Final * cos - vy2 * sin;
          otherBall.vy = vy2 * cos + vx2Final * sin;

          // Separate balls
          const overlap = ball.radius + otherBall.radius - distance;
          const separationX = (overlap / 2) * cos;
          const separationY = (overlap / 2) * sin;
          ball.x += separationX;
          ball.y += separationY;
          otherBall.x -= separationX;
          otherBall.y -= separationY;
        }
      }

      // Draw ball
      ctx.save();
      ctx.fillStyle = ball.color;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fill();
      
      // Add highlight
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
      ctx.beginPath();
      ctx.arc(ball.x - ball.radius * 0.3, ball.y - ball.radius * 0.3, ball.radius * 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }, [gravity, bounce]);

  const animate = useCallback(() => {
    updateBalls();
    if (isRunning) {
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [updateBalls, isRunning]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize balls
    ballsRef.current = Array.from({ length: 8 }, () =>
      createBall(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      )
    );

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [createBall]);

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

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ballsRef.current.push(createBall(x, y));
  };

  return (
    <div className="w-full h-full bg-gray-900 rounded-lg overflow-hidden relative">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-pointer"
        onClick={handleClick}
      />
      
      <div className="absolute top-4 left-4 text-white">
        <h3 className="text-lg font-semibold mb-2">Physics Engine</h3>
        <p className="text-sm text-gray-300 mb-4">
          Click to add balls, adjust settings below
        </p>
        
        <div className="space-y-2">
          <div>
            <label className="text-xs text-gray-300">Gravity: {gravity.toFixed(1)}</label>
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
          
          <div>
            <label className="text-xs text-gray-300">Bounce: {bounce.toFixed(1)}</label>
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
        </div>
        
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-colors"
        >
          {isRunning ? "Pause" : "Resume"}
        </button>
      </div>
    </div>
  );
}
