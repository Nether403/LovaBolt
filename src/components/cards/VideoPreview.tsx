import React, { useEffect, useRef, useState } from 'react';
import { ReactBitsComponent } from '../../types';

interface VideoPreviewProps {
  option: ReactBitsComponent;
}

/**
 * VideoPreview renders a video preview from the react-bits video assets.
 * Uses Intersection Observer to only load videos when visible for performance.
 * 
 * Video files are located in react-bits/public/assets/video/
 * Each component has both .mp4 and .webm formats for browser compatibility.
 */
export const VideoPreview: React.FC<VideoPreviewProps> = ({ option }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Separate effect to handle video play/pause based on visibility
  useEffect(() => {
    if (videoRef.current) {
      if (isVisible) {
        // Small delay to ensure video is loaded
        const timer = setTimeout(() => {
          videoRef.current?.play().catch((error) => {
            console.log('Autoplay prevented:', error);
            // Autoplay might be blocked, that's okay
          });
        }, 100);
        return () => clearTimeout(timer);
      } else {
        videoRef.current.pause();
      }
    }
  }, [isVisible]);

  // Convert component ID to video filename (remove hyphens, lowercase)
  const videoName = option.id.replace(/-/g, '').toLowerCase();
  
  // Videos are copied to public/videos/ folder
  // Vite serves public folder at root, so we can reference them directly
  const webmUrl = `/videos/${videoName}.webm`;
  const mp4Url = `/videos/${videoName}.mp4`;

  const handleError = () => {
    console.error(`Video failed to load: ${videoName}`);
    setHasError(true);
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-40 rounded-lg overflow-hidden bg-gray-900 relative"
      aria-label={`Preview of ${option.title}`}
    >
      {hasError || (!webmUrl && !mp4Url) ? (
        // Fallback if video fails to load
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
          <div className="text-center p-4">
            <svg
              className="w-12 h-12 mx-auto mb-2 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            <div className="text-gray-500 text-xs">Preview not available</div>
          </div>
        </div>
      ) : isVisible ? (
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          loop
          muted
          playsInline
          autoPlay
          onError={handleError}
          onLoadedData={() => {
            // Ensure video plays when loaded
            videoRef.current?.play().catch(() => {
              // Autoplay might be blocked
            });
          }}
        >
          {/* Provide both formats for browser compatibility */}
          {webmUrl && <source src={webmUrl} type="video/webm" />}
          {mp4Url && <source src={mp4Url} type="video/mp4" />}
          Your browser does not support the video tag.
        </video>
      ) : (
        // Placeholder before video loads
        <div className="w-full h-full flex items-center justify-center bg-gray-800">
          <div className="text-gray-500 text-sm">Scroll to load</div>
        </div>
      )}
    </div>
  );
};

export default VideoPreview;
