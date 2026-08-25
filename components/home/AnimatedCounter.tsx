'use client';

import React, { useEffect, useState, useRef } from 'react';

interface CounterProps {
  value: string; // e.g. "6", "3", "80+", "54%" or Arabic "٦", "٣", "+٨٠", "٥٤٪"
  duration?: number;
}

const ARABIC_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

const toWestern = (value: string) =>
  value.replace(/[٠-٩]/g, (digit) => ARABIC_DIGITS.indexOf(digit).toString());

const toArabic = (value: number) =>
  value.toString().replace(/[0-9]/g, (digit) => ARABIC_DIGITS[parseInt(digit, 10)]);

export default function AnimatedCounter({ value, duration = 1800 }: CounterProps) {
  const [displayValue, setDisplayValue] = useState('0');
  const [hasAnimated, setHasAnimated] = useState(false);
  const hasAnimatedRef = useRef(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  // Extract number and affixes (works for Arabic and Western digits)
  const isArabic = /[٠-٩]/.test(value);
  const normalized = toWestern(value);
  const match = normalized.match(/(\d+)/);
  const targetNumber = match ? parseInt(match[0], 10) : 0;
  const prefix = value.startsWith('+') ? '+' : (value.startsWith('٪') ? '٪' : '');
  const suffix = value.endsWith('+') ? '+' : (value.endsWith('٪') ? '٪' : (value.endsWith('%') ? '%' : ''));

  useEffect(() => {
    let animationFrame: number | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
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
              animationFrame = requestAnimationFrame(step);
            } else {
              setDisplayValue(value);
            }
          };

          animationFrame = requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
      if (animationFrame !== undefined) cancelAnimationFrame(animationFrame);
    };
  }, [value, duration, targetNumber, isArabic, prefix, suffix]);

  return <span ref={elementRef}>{hasAnimated ? displayValue : value}</span>;
}
