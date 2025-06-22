
import React, { useState, useEffect } from 'react';

import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName === 'A' ||
        e.target.tagName === 'BUTTON' ||
        e.target.closest('a') ||
        e.target.closest('button')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Hide on mobile devices
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return null;
  }

  return (
    <motion.div
      className="custom-cursor hidden md:block"
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
        scale: isHovering ? 1.5 : 1,
        opacity: 0.6,
      }}
      transition={{
        type: 'spring',
        mass: 0.2,
        stiffness: 100,
        damping: 10,
      }}
    />
  );
};

export default CustomCursor;