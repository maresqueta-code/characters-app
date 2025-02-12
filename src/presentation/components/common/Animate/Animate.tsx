import type { ReactNode } from 'react';
import './Animate.css';

type AnimateVariants = 'fade-in' | 'fade-out' | 'slide-down' | 'slide-up';

interface AnimateProps {
  children: ReactNode;
  variants: AnimateVariants | AnimateVariants[];
  duration?: number;
  delay?: number;
  startY?: number;
  endY?: number;
}

export function Animate({
  children,
  variants,
  duration = 1,
  delay = 0,
  startY = 0,
  endY = 20,
}: AnimateProps) {
  const variantList = Array.isArray(variants) ? variants : [variants];
  const animateClasses = variantList.join(' ');

  const animationStyle = {
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
    transform:
      variantList.includes('slide-down') || variantList.includes('slide-up')
        ? `translateY(${startY}px)`
        : undefined,
  };

  return (
    <div
      className={`animate-container ${animateClasses}`}
      style={animationStyle}
      data-endy={endY} // `endY` is passed as an attr to CSS
    >
      {children}
    </div>
  );
}
