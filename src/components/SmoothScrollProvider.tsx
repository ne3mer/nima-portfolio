import { useEffect, ReactNode } from "react";
import { initSmoothScroll, destroySmoothScroll } from "../lib/scroll";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export default function SmoothScrollProvider({
  children,
}: SmoothScrollProviderProps) {
  useEffect(() => {
    // Initialize smooth scrolling
    const lenis = initSmoothScroll();

    return () => {
      // Cleanup on unmount
      destroySmoothScroll();
    };
  }, []);

  return <>{children}</>;
}
