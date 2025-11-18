
import { useEffect, useRef, useCallback, useState } from "react";

export default function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const dvdRef = useRef({
    x: 100,
    y: 100,
    vx: 2,
    vy: 1.5,
    colorIndex: 0
  });

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, time: 0 });
  const lastPositionRef = useRef({ x: 0, y: 0, time: 0 });

  const colors = [
    '#00FFFF', // Cyan
    '#FF0080', // Hot Pink
    '#00FF00', // Lime
    '#FFD700', // Gold
    '#FF4500', // Orange Red
    '#9932CC', // Dark Orchid
    '#00BFFF', // Deep Sky Blue
    '#32CD32', // Lime Green
  ];

  const drawDVD = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number, color: string) => {
    const width = 80;
    const height = 40;
    
    // Draw DVD logo background
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
    
    // Draw DVD text
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('PHV', x + width / 2, y + height / 2);
    
    // Add subtle border
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);
  }, []);

  const isPointInDVD = (x: number, y: number) => {
    const dvd = dvdRef.current;
    const dvdWidth = 80;
    const dvdHeight = 40;
    return x >= dvd.x && x <= dvd.x + dvdWidth && y >= dvd.y && y <= dvd.y + dvdHeight;
  };

  const handleMouseDown = (e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (isPointInDVD(x, y)) {
      setIsDragging(true);
      setDragStart({ x, y, time: Date.now() });
      lastPositionRef.current = { x, y, time: Date.now() };
      dvdRef.current.vx = 0;
      dvdRef.current.vy = 0;
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const dvdWidth = 80;
    const dvdHeight = 40;

    dvdRef.current.x = Math.max(0, Math.min(canvas.width - dvdWidth, x - dvdWidth / 2));
    dvdRef.current.y = Math.max(0, Math.min(canvas.height - dvdHeight, y - dvdHeight / 2));

    lastPositionRef.current = { x, y, time: Date.now() };
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (!isDragging) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const timeDiff = Date.now() - lastPositionRef.current.time;
    const dx = x - dragStart.x;
    const dy = y - dragStart.y;

    if (timeDiff > 0 && timeDiff < 100) {
      const velocityX = (dx / timeDiff) * 10;
      const velocityY = (dy / timeDiff) * 10;
      
      const maxSpeed = 8;
      dvdRef.current.vx = Math.max(-maxSpeed, Math.min(maxSpeed, velocityX));
      dvdRef.current.vy = Math.max(-maxSpeed, Math.min(maxSpeed, velocityY));
    } else {
      dvdRef.current.vx = 2;
      dvdRef.current.vy = 1.5;
    }

    setIsDragging(false);
  };

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const dvd = dvdRef.current;
    const dvdWidth = 80;
    const dvdHeight = 40;
    
    // Clear canvas
    ctx.fillStyle = '#0A0A0C';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    if (!isDragging) {
      // Update DVD position
      dvd.x += dvd.vx;
      dvd.y += dvd.vy;
      
      // Check for collisions and bounce
      let colorChanged = false;
      
      if (dvd.x <= 0 || dvd.x >= canvas.width - dvdWidth) {
        dvd.vx = -dvd.vx;
        dvd.x = Math.max(0, Math.min(canvas.width - dvdWidth, dvd.x));
        colorChanged = true;
      }
      
      if (dvd.y <= 0 || dvd.y >= canvas.height - dvdHeight) {
        dvd.vy = -dvd.vy;
        dvd.y = Math.max(0, Math.min(canvas.height - dvdHeight, dvd.y));
        colorChanged = true;
      }
      
      // Change color when hitting edge
      if (colorChanged) {
        dvd.colorIndex = (dvd.colorIndex + 1) % colors.length;
      }
    }
    
    // Draw DVD logo
    drawDVD(ctx, dvd.x, dvd.y, colors[dvd.colorIndex]);
    
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [drawDVD, isDragging]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const dvdWidth = 80;
      const dvdHeight = 40;
      if (dvdRef.current.x > canvas.width - dvdWidth) {
        dvdRef.current.x = canvas.width - dvdWidth;
      }
      if (dvdRef.current.y > canvas.height - dvdHeight) {
        dvdRef.current.y = canvas.height - dvdHeight;
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{ background: 'transparent', cursor: isDragging ? 'grabbing' : 'default' }}
      data-testid="particles-canvas"
    />
  );
}
