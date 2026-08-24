'use client';

import React, { useEffect, useState, useRef } from 'react';

interface CounterProps {
  value?: string;
  target?: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

export default function AnimatedCounter({ 
  value, 
  target, 
  suffix = '', 
  prefix = '', 
  duration = 1800 
}: CounterProps) {
  const targetNum = target !== undefined ? target : (value ? parseInt(value.replace(/[^0-9]/g, ''), 10) || 0 : 0);
  const explicitSuffix = suffix || (value && value.includes('+') ? '+' : (value && value.includes('%') ? '%' : ''));
  const explicitPrefix = prefix || (value && value.startsWith('+') ? '+' : '');

  const [displayValue, setDisplayValue] = useState(targetNum.toString());
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTimestamp: number | null = null;

          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentNum = Math.floor(easeOut * targetNum);

            setDisplayValue(currentNum.toString());

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setDisplayValue(targetNum.toString());
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [targetNum, duration, hasAnimated]);

  return (
    <span ref={elementRef}>
      {explicitPrefix}{hasAnimated ? displayValue : targetNum.toString()}{explicitSuffix}
    </span>
  );
}
