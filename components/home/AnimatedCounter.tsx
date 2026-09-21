'use client';

import React, { useEffect, useState, useRef } from 'react';

interface CounterProps {
  value?: string | number;
  target?: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  delay?: number;
  className?: string;
  'data-live-field'?: string;
}

function normalizeNumerals(str: string): string {
  if (!str) return '';
  return str
    .replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d).toString())
    .replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString());
}

function parseCounterValue(rawVal: string | number | undefined, targetProp?: number, suffixProp = '', prefixProp = '') {
  if (rawVal === undefined || rawVal === null || rawVal === '') {
    const t = targetProp ?? 0;
    return {
      targetNum: t,
      padLength: 0,
      prefix: prefixProp,
      suffix: suffixProp,
      hasMatch: true,
    };
  }

  const str = normalizeNumerals(String(rawVal).trim());
  
  // Match prefix, the digits cluster (including leading zeros), and suffix
  const match = str.match(/^([^0-9]*)(0*[0-9]+)(.*)$/);
  
  if (match) {
    const rawPrefix = match[1] || '';
    const digitCluster = match[2] || '';
    const rawSuffix = match[3] || '';
    
    const parsedTarget = parseInt(digitCluster, 10) || 0;
    const targetNum = targetProp !== undefined && rawVal === undefined ? targetProp : parsedTarget;
    
    // Check if user explicitly wrote leading zeros (e.g. "03", "06", "007", "030")
    const padLength = digitCluster.length > 1 && digitCluster.startsWith('0') ? digitCluster.length : 0;

    const finalPrefix = prefixProp || rawPrefix;
    const finalSuffix = suffixProp || rawSuffix;

    return {
      targetNum,
      padLength,
      prefix: finalPrefix,
      suffix: finalSuffix,
      hasMatch: true,
    };
  }

  // Fallback if string has some digits scattered
  const digitsOnly = str.replace(/[^0-9]/g, '');
  if (digitsOnly.length > 0) {
    const parsed = parseInt(digitsOnly, 10) || 0;
    const padLength = digitsOnly.length > 1 && digitsOnly.startsWith('0') ? digitsOnly.length : 0;
    return {
      targetNum: parsed,
      padLength,
      prefix: prefixProp,
      suffix: suffixProp,
      hasMatch: true,
    };
  }

  return {
    targetNum: targetProp ?? 0,
    padLength: 0,
    prefix: prefixProp,
    suffix: suffixProp,
    hasMatch: false,
    rawStr: str,
  };
}

export default function AnimatedCounter({ 
  value, 
  target, 
  suffix = '', 
  prefix = '', 
  duration = 1400,
  delay = 0,
  className = '',
  ...restProps
}: CounterProps) {
  const parsed = parseCounterValue(value, target, suffix, prefix);
  const { targetNum, padLength, prefix: finalPrefix, suffix: finalSuffix, hasMatch } = parsed;

  const [displayNum, setDisplayNum] = useState<number>(0);
  const startedRef = useRef(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  // If targetNum updates after mount (e.g. Live Editor typing or dynamicContent update),
  // immediately reflect the new value
  useEffect(() => {
    if (startedRef.current) {
      setDisplayNum(targetNum);
    }
  }, [targetNum]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let timeoutId: NodeJS.Timeout;
    let animationFrameId: number;

    const startCounting = () => {
      if (startedRef.current) {
        setDisplayNum(targetNum);
        return;
      }
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
    }, 1800 + delay);

    // Also trigger immediately if element scrolls into view after initial load
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (performance.now() > 1400) {
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

  if (!hasMatch && (parsed as any).rawStr) {
    return (
      <span 
        ref={elementRef} 
        className={`tabular-nums inline-block font-mono ${className}`}
        {...restProps}
      >
        {(parsed as any).rawStr}
      </span>
    );
  }

  const formattedNum = padLength > 0 
    ? String(displayNum).padStart(padLength, '0') 
    : String(displayNum);

  return (
    <span 
      ref={elementRef} 
      className={`tabular-nums inline-block font-mono ${className}`}
      {...restProps}
    >
      {finalPrefix}{formattedNum}{finalSuffix}
    </span>
  );
}
