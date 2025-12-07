import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

// Map routes to their index for determining slide direction
const routeIndex = {
  '/': 0,
  '/history': 1,
  '/about': 2
};

const PageTransition = ({ children }) => {
  const location = useLocation();
  const currentIndex = routeIndex[location.pathname];
  const prevIndex = React.useRef(currentIndex);

  React.useEffect(() => {
    prevIndex.current = currentIndex;
  }, [currentIndex]);

  const getSlideDirection = () => {
    // Going forward (Dashboard → History → About)
    // Should slide left-to-right (website appears to move right)
    if (currentIndex > prevIndex.current) {
      return {
        initial: { x: '-100%' },
        animate: { x: 0 },
        exit: { x: '100%' }
      };
    }
    // Going backward (About → History → Dashboard)
    // Should slide right-to-left (website appears to move left)
    else if (currentIndex < prevIndex.current) {
      return {
        initial: { x: '100%' },
        animate: { x: 0 },
        exit: { x: '-100%' }
      };
    }
    // Default (first render)
    return {
      initial: { x: '-100%' },
      animate: { x: 0 },
      exit: { x: '100%' }
    };
  };

  const slideVariants = getSlideDirection();

  return (
    <motion.div
      key={location.pathname}
      initial={slideVariants.initial}
      animate={slideVariants.animate}
      exit={slideVariants.exit}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.2
      }}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute'
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition; 