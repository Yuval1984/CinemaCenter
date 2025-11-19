import { useEffect, useState, useRef } from "react";
import "./animatedCounter.scss";

interface AnimatedCounterProps {
  value: number;
  duration?: number; // Duration in milliseconds
  className?: string;
}

function AnimatedCounter({ value, duration = 1500, className = "" }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const previousValueRef = useRef(value);

  useEffect(() => {
    // Only animate if value changed
    if (value !== previousValueRef.current) {
      setIsAnimating(true);
      startTimeRef.current = null;
      
      const animate = (currentTime: number) => {
        if (startTimeRef.current === null) {
          startTimeRef.current = currentTime;
        }

        const elapsed = currentTime - startTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        const startValue = previousValueRef.current;
        const endValue = value;
        const currentValue = Math.floor(startValue + (endValue - startValue) * easeOut);
        
        setDisplayValue(currentValue);

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          setDisplayValue(endValue);
          setIsAnimating(false);
          previousValueRef.current = value;
        }
      };

      animationFrameRef.current = requestAnimationFrame(animate);

      return () => {
        if (animationFrameRef.current !== null) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }
  }, [value, duration]);

  return (
    <span className={`animated-counter ${className} ${isAnimating ? 'animating' : ''}`}>
      {displayValue}
    </span>
  );
}

export default AnimatedCounter;

