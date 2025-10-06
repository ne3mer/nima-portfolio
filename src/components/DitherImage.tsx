import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface DitherImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  ditherDelay?: number;
}

export default function DitherImage({
  src,
  alt,
  className = "",
  width,
  height,
  ditherDelay = 0,
}: DitherImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setTimeout(() => {
      setIsLoaded(true);
    }, ditherDelay);
  };

  return (
    <div className={`relative overflow-hidden ${className}`} ref={imgRef}>
      {/* Dithered placeholder */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20"
        initial={{ opacity: 1 }}
        animate={{
          opacity: isLoaded && isInView ? 0 : 1,
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Pixelated effect */}
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%),
              linear-gradient(-45deg, transparent 25%, rgba(255,255,255,0.1) 25%),
              linear-gradient(45deg, rgba(255,255,255,0.1) 75%, transparent 75%),
              linear-gradient(-45deg, rgba(255,255,255,0.1) 75%, transparent 75%)
            `,
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
          }}
        />
      </motion.div>

      {/* Actual image */}
      <motion.img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-full object-cover"
        onLoad={handleLoad}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{
          opacity: isLoaded && isInView ? 1 : 0,
          scale: isLoaded && isInView ? 1 : 1.1,
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  );
}
