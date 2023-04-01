import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
const variants = {
  out: {
    opacity: 0,
    y: -10,

    transition: {
      duration: 0.2,
    },
  },
  in: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.2,
    },
  },
};
const Transitions = ({ children }) => {
  const { asPath } = useRouter();
  return (
    <div className="effect-1">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={asPath}
          variants={variants}
          animate="in"
          initial="out"
          exit="out"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Transitions;
