const getDynamicDimensions = () => {
  const width = Math.max(1024, window.innerWidth);
  const height = Math.max(768, window.innerHeight);
  return { width, height };
};

export const IMPRESS_CONFIG = {
  TRANSITION_DURATION: '1000',
  MAX_SCALE: '3',
  MIN_SCALE: '0',
  PERSPECTIVE: '1000',
  get WIDTH() {
    return getDynamicDimensions().width.toString();
  },
  get HEIGHT() {
    return getDynamicDimensions().height.toString();
  },
} as const;
