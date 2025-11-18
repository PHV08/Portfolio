
import { useEffect, useRef } from "react";

interface Snowflake {
  x: number;
  y: number;
  radius: number;
  speed: number;
  drift: number;
  opacity: number;
}

export default function Snow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const snowflakesRef = useRef<Snowflake[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createSnowflake = (): Snowflake => {
      return {
        x: Math.random() * window.innerWidth,
        y: -10,
        radius: Math.random() * 3 + 1,
        speed: Math.random() * 1 + 0.5,
        drift: Math.random() * 0.5 - 0.25,
        opacity: Math.random() * 0.5 + 0.3
      };
    };

    // Initialize snowflakes
    for (let i = 0; i < 100; i++) {
      const snowflake = createSnowflake();
      snowflake.y = Math.random() * window.innerHeight;
      snowflakesRef.current.push(snowflake);
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      snowflakesRef.current.forEach((flake, index) => {
        // Calculate distance from mouse
        const dx = mouseRef.current.x - flake.x;
        const dy = mouseRef.current.y - flake.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = 80;

        // Push snowflake away from mouse
        if (distance < minDistance) {
          const force = (minDistance - distance) / minDistance;
          flake.x -= (dx / distance) * force * 3;
          flake.y -= (dy / distance) * force * 3;
        }

        // Update position
        flake.y += flake.speed;
        flake.x += flake.drift;

        // Reset if out of bounds
        if (flake.y > canvas.height) {
          snowflakesRef.current[index] = createSnowflake();
        }
        if (flake.x > canvas.width) {
          flake.x = 0;
        }
        if (flake.x < 0) {
          flake.x = canvas.width;
        }

        // Draw snowflake
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ 
        background: 'transparent',
        clipPath: 'polygon(0 0, 100% 0, 100% 100vh, 0 100vh)',
        maxHeight: '200vh',
        zIndex: 5
      }}
      data-testid="snow-canvas"
    />
  );
}
