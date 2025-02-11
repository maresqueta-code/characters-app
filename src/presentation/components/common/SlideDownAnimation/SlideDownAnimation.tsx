import { useEffect, useState, type ReactNode } from 'react';
import './SlideDownAnimation.css';

export interface SlideDownAnimationProps {
  children?: ReactNode;
}

export function SlideDownAnimation({ children }: SlideDownAnimationProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimate(true);
    }, 10);
  }, []);

  return <div className={`slide-down-container ${animate ? 'animate' : ''}`}>{children}</div>;
}
