import { useEffect, ReactNode } from "react";
import { initSmoothScroll, destroySmoothScroll } from "../lib/scroll";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export default function SmoothScrollProvider({
  children,
}: SmoothScrollProviderProps) {
  useEffect(() => {
    const lenis = initSmoothScroll();
    return () => {
      destroySmoothScroll();
    };
  }, []);

  return <>{children}</>;
}
