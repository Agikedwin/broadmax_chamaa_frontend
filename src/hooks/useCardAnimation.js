// src/hooks/useCardAnimation.js
import { useRef, useCallback, useEffect } from 'react';
import { gsap } from 'gsap';

const useCardAnimation = () => {
  const cardRef = useRef(null);

  // Function to animate IN - memoized to maintain stable reference
  const animateIn = useCallback(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out"
        }
      );
    }
  }, []); // Empty dependency array - function never changes

  // Function to animate ON HOVER - memoized
  const animateHover = useCallback(() => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: -5,
        duration: 0.3,
        ease: "power1.inOut"
      });
    }
  }, []);

  // Function to animate HOVER EXIT - memoized
  const animateHoverExit = useCallback(() => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: 0,
        duration: 0.3,
        ease: "power1.inOut"
      });
    }
  }, []);

  // Automatically animate in when the component mounts
  useEffect(() => {
    animateIn();
  }, [animateIn]); // animateIn is stable due to useCallback, so this runs only once

  return { cardRef, animateHover, animateHoverExit };
  // Note: animateIn is not returned since it's handled internally
};

export default useCardAnimation;