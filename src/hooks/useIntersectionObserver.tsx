import React, { useEffect, useRef, useState } from 'react';

export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit
) {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
      ...options,
    });

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [options]);

  return { ref, isVisible };
}

interface FadeInElementProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const FadeInElement: React.FC<FadeInElementProps> = ({
  children,
  className = '',
  delay = 0,
}) => {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>();

  const combinedClassName = `scroll-fade-in ${isVisible ? 'is-visible' : ''} ${className}`;

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={combinedClassName}
    >
      {children}
    </div>
  );
};
