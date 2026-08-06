import React, { useState, useRef, useEffect } from 'react';
import { loadAssetManifest, resolveManifestAsset } from '../utils/assetManifest';

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
  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [attemptedFallback, setAttemptedFallback] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Eagerly pre-load asset manifest
    loadAssetManifest();
  }, []);

  useEffect(() => {
    setCurrentSrc(src);
    setIsLoaded(false);
    setHasError(false);
    setAttemptedFallback(false);

    // Prevent race conditions: Check if browser already loaded & cached the image
    if (imgRef.current && imgRef.current.complete) {
      if (imgRef.current.naturalWidth > 0) {
        setIsLoaded(true);
        setHasError(false);
      }
    }
  }, [src]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const imgElem = e.currentTarget;
    // Verify image hasn't actually loaded despite event dispatch race conditions
    if (imgElem.complete && imgElem.naturalWidth > 0) {
      setIsLoaded(true);
      setHasError(false);
      return;
    }

    // Try fallback to centralized /images/ or manifest path
    if (!attemptedFallback && currentSrc) {
      setAttemptedFallback(true);
      const fallbackUrl = resolveManifestAsset(currentSrc);
      if (fallbackUrl !== currentSrc) {
        setCurrentSrc(fallbackUrl);
        return;
      }
    }

    console.error(`[ImageWithSkeleton] Failed to load image at URL: "${currentSrc}"`);
    setIsLoaded(true);
    setHasError(true);
  };

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden ${containerClassName}`}
      style={style}
    >
      {/* Skeleton Shimmer Overlay */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-slate-200 animate-pulse bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 z-10 pointer-events-none" />
      )}

      {/* Fallback display if image fails */}
      {hasError && (
        <div className="absolute inset-0 bg-slate-100 flex flex-col items-center justify-center text-slate-400 p-2 text-center text-xs z-10">
          <svg className="w-8 h-8 mb-1 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="font-medium text-slate-500">{alt || 'Product Image'}</span>
        </div>
      )}

      <img
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        onLoad={() => {
          setIsLoaded(true);
          setHasError(false);
        }}
        onError={handleImageError}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded && !hasError ? 'opacity-100' : 'opacity-0'
        } ${className}`}
      />
    </div>
  );
};


