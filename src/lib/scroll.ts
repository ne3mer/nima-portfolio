import Lenis from "lenis";

let lenis: Lenis | null = null;

export function initSmoothScroll() {
  if (typeof window === "undefined") return;

  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  function raf(time: number) {
    lenis?.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  return lenis;
}

export function destroySmoothScroll() {
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
}

export function scrollTo(
  target: string | number,
  options?: { offset?: number; duration?: number }
) {
  if (!lenis) return;

  lenis.scrollTo(target, {
    offset: options?.offset || 0,
    duration: options?.duration || 1.2,
  });
}

export function getScrollProgress(): number {
  if (!lenis) return 0;
  return lenis.progress;
}

export function onScroll(callback: (progress: number) => void) {
  if (!lenis) return;

  lenis.on("scroll", ({ progress }: { progress: number }) => {
    callback(progress);
  });
}
