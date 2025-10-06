// Performance monitoring utilities
export const measurePerformance = (name: string, fn: () => void) => {
  const start = performance.now();
  fn();
  const end = performance.now();
  console.log(`${name} took ${end - start} milliseconds`);
};

export const measureAsyncPerformance = async (name: string, fn: () => Promise<void>) => {
  const start = performance.now();
  await fn();
  const end = performance.now();
  console.log(`${name} took ${end - start} milliseconds`);
};

export const getMemoryUsage = () => {
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    return {
      used: memory.usedJSHeapSize,
      total: memory.totalJSHeapSize,
      limit: memory.jsHeapSizeLimit,
    };
  }
  return null;
};

export const logPerformanceMetrics = () => {
  const memory = getMemoryUsage();
  if (memory) {
    console.log('Memory Usage:', {
      used: `${(memory.used / 1024 / 1024).toFixed(2)} MB`,
      total: `${(memory.total / 1024 / 1024).toFixed(2)} MB`,
      limit: `${(memory.limit / 1024 / 1024).toFixed(2)} MB`,
    });
  }
};
