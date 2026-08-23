'use client';

import React, { useEffect, useState, useRef } from 'react';

interface CounterProps {
  value: string; // e.g. "6", "3", "80+", "54%" or Arabic "٦", "٣", "+٨٠", "٥٤٪"
  duration?: number;
}

export default function AnimatedCounter({ value, duration = 1800 }: CounterProps) {
  const [displayValue, setDisplayValue] = useState('0');
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  // Extract number and affixes (works for Arabic and Western digits)
  const isArabic = /[٠-٩]/.test(value);
  const arabicDigits = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
  
  const toWestern = (str: string) => 
    str.replace(/[٠-٩]/g, d => arabicDigits.indexOf(d).toString());

  const toArabic = (num: number) => 
    num.toString().replace(/[0-9]/g, d => arabicDigits[parseInt(d, 10)]);

  const normalized = toWestern(value);
  const match = normalized.match(/(\d+)/);
  const targetNumber = match ? parseInt(match[0], 10) : 0;
  const prefix = value.startsWith('+') ? '+' : (value.startsWith('٪') ? '٪' : '');
  const suffix = value.endsWith('+') ? '+' : (value.endsWith('٪') ? '٪' : (value.endsWith('%') ? '%' : ''));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTimestamp: number | null = null;

          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentNum = Math.floor(easeOut * targetNumber);

            const formattedNum = isArabic ? toArabic(currentNum) : currentNum.toString();
            setDisplayValue(prefix + formattedNum + suffix);

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setDisplayValue(value);
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
  }, [value, duration, targetNumber, hasAnimated, isArabic, prefix, suffix]);

  return <span ref={elementRef}>{hasAnimated ? displayValue : value}</span>;
}
