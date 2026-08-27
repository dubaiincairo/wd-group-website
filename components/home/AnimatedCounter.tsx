'use client';

import React, { useEffect, useState, useRef } from 'react';

interface CounterProps {
  value?: string;
  target?: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  delay?: number;
}

export default function AnimatedCounter({ 
  value, 
  target, 
  suffix = '', 
  prefix = '', 
  duration = 1400,
  delay = 0,
}: CounterProps) {
  const targetNum = target !== undefined ? target : (value ? parseInt(value.replace(/[^0-9]/g, ''), 10) || 0 : 0);
  const explicitSuffix = suffix || (value && value.includes('+') ? '+' : (value && value.includes('%') ? '%' : ''));
  const explicitPrefix = prefix || (value && value.startsWith('+') ? '+' : '');

  const [displayNum, setDisplayNum] = useState<number>(0);
  const startedRef = useRef(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let timeoutId: NodeJS.Timeout;
    let animationFrameId: number;

    const startCounting = () => {
      if (startedRef.current) return;
      startedRef.current = true;

      timeoutId = setTimeout(() => {
        let startTime: number | null = null;

        const step = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const elapsed = timestamp - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Smooth cubic ease-out
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(easeOut * targetNum);

          setDisplayNum(current);

          if (progress < 1) {
            animationFrameId = requestAnimationFrame(step);
          } else {
            setDisplayNum(targetNum);
          }
        };

        animationFrameId = requestAnimationFrame(step);
      }, delay);
    };

    // Listen to website preloader finish
    const handlePreloaderDone = () => {
      startCounting();
    };

    window.addEventListener('website_preloader_done', handlePreloaderDone);

    // Fallback timer in case preloader is disabled/cached or user enters mid-page
    const fallbackTimer = setTimeout(() => {
      startCounting();
    }, 2200 + delay);

    // Also trigger immediately if element scrolls into view after initial load
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // If page has already finished loading (> 1.8s)
          if (performance.now() > 1800) {
            startCounting();
          }
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(fallbackTimer);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('website_preloader_done', handlePreloaderDone);
      observer.disconnect();
    };
  }, [targetNum, duration, delay]);

  return (
    <span ref={elementRef} className="tabular-nums inline-block font-mono">
      {explicitPrefix}{displayNum}{explicitSuffix}
    </span>
  );
}
