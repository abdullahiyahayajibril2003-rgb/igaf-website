import React, { useState, useRef, useEffect } from 'react';

interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
  fetchPriority?: 'high' | 'low' | 'auto';
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  loading = 'lazy',
  decoding = 'async',
  fetchPriority = 'auto',
  onClick,
  style,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Reset state when src changes
    setIsLoaded(false);
    setHasError(false);

    // Check if the image is already completed (e.g., loaded from browser cache)
    if (imgRef.current && imgRef.current.complete) {
      if (imgRef.current.naturalWidth > 0) {
        setIsLoaded(true);
      } else if (imgRef.current.naturalWidth === 0 && imgRef.current.src) {
        setIsLoaded(true);
        setHasError(true);
      }
    }
  }, [src]);

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden ${containerClassName}`}
      style={style}
    >
      {/* Skeleton Shimmer Overlay when image is loading */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-slate-200 animate-pulse bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200" />
      )}

      {/* Fallback if image fails */}
      {hasError && (
        <div className="absolute inset-0 bg-slate-200 flex items-center justify-center text-slate-400 text-xs font-semibold p-2 text-center">
          Image unavailable
        </div>
      )}

      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        onLoad={() => {
          setIsLoaded(true);
          setHasError(false);
        }}
        onError={() => {
          setIsLoaded(true);
          setHasError(true);
        }}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded && !hasError ? 'opacity-100' : 'opacity-0'
        } ${className}`}
      />
    </div>
  );
};
