import { MotionProps } from "framer-motion";

export const FadeAnimation: MotionProps = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
  transition: {
    duration: 0.2,
    ease: [0.4, 0, 0.2, 1],
  },
};
