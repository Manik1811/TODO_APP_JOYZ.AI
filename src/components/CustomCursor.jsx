import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const updateMousePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsHidden(false);
    };

    const updateCursorType = () => {
      const hoveredElement = document.elementFromPoint(position.x, position.y);
      const computedStyle = hoveredElement ? window.getComputedStyle(hoveredElement).cursor : 'default';
      setIsPointer(computedStyle === 'pointer');
    };

    const onMouseLeave = () => setIsHidden(true);
    const onMouseEnter = () => setIsHidden(false);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mousemove', updateCursorType);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousemove', updateCursorType);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [position.x, position.y]);

  // Hide custom cursor on mobile devices
  if (typeof window !== 'undefined' && window.innerWidth <= 768) {
    return null;
  }

  return (
    <>
      <motion.div
        className="cursor-dot fixed top-0 left-0 z-50 pointer-events-none rounded-full mix-blend-difference"
        animate={{
          scale: isPointer ? 1.5 : 1,
          x: position.x - 4,
          y: position.y - 4,
          opacity: isHidden ? 0 : 1
        }}
        transition={{ type: "spring", mass: 0.1, stiffness: 800, damping: 20 }}
        style={{
          width: '8px',
          height: '8px',
          backgroundColor: theme === 'dark' ? '#f5f5f5' : '#121212',
        }}
      />
      <motion.div
        className="cursor-ring fixed top-0 left-0 z-50 pointer-events-none rounded-full border-2 mix-blend-difference"
        animate={{
          scale: isPointer ? 1.5 : 1,
          x: position.x - 16,
          y: position.y - 16,
          opacity: isHidden ? 0 : 1
        }}
        transition={{ type: "spring", mass: 0.5, stiffness: 200, damping: 20 }}
        style={{
          width: '32px',
          height: '32px',
          borderColor: theme === 'dark' ? '#f5f5f5' : '#121212',
          backgroundColor: 'blue'
        }}
      />
    </>
  );
};

export default CustomCursor;