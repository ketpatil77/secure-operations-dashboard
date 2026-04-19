import { Transition, Variants } from "framer-motion";

export const baseTransition: Transition = {
  duration: 0.36,
  ease: [0.32, 0.72, 0, 1],
};

export const fadeSlide: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: baseTransition,
  },
};

export const pop: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { ...baseTransition, duration: 0.28 },
  },
  hover: {
    scale: 1.01,
    transition: { duration: 0.18, ease: "easeOut" },
  },
};

export const listStagger = (stagger = 0.06): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: 0.05 },
  },
});

export const softGlow: Variants = {
  rest: { boxShadow: "0 0 0 0 rgba(61, 209, 246, 0)" },
  hover: {
    boxShadow: "0 0 0 1px rgba(61, 209, 246, 0.2), 0 0 18px rgba(61, 209, 246, 0.24)",
    transition: { duration: 0.2 },
  },
};
