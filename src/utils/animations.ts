export const fadeInUp = {
  initial: {
    y: 20,
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

export const gridAnimation = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

export const gridItemAnimation = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export const fadeInScale = {
  hidden: { 
    opacity: 0,
    scale: 0.9
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

export const scaleOnHover = {
  scale: 1.05,
  transition: {
    duration: 0.2
  }
};

export const glowingText = {
  animate: {
    textShadow: [
      "0 0 4px rgba(255,255,255,0.1)",
      "0 0 8px rgba(255,255,255,0.2)",
      "0 0 4px rgba(255,255,255,0.1)"
    ],
    transition: {
      duration: 2,
      repeat: Infinity
    }
  }
};
