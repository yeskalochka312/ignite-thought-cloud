import React, { forwardRef, useMemo, useRef } from 'react';
import { MapCanvas, type MapCanvasHandle } from './MapCanvas';
import { useConstructorStore, type StyleKey } from '@/store/constructor';
import { ZoomIn, ZoomOut } from 'lucide-react';
import backgroundWood from "@/assets/background-wood.jpg";
import backgroundMarble from "@/assets/background-marble.jpg";
import backgroundFabric from "@/assets/background-fabric.jpg";
import backgroundPaper from "@/assets/background-paper.jpg";
import { ShapeMasks } from './ShapeMasks';
import { SHAPES } from '@/data/shapes';

export interface PosterPreviewHandle {
  getMapHandle: () => MapCanvasHandle | null;
  getPosterElement: () => HTMLElement | null;
}

interface PosterPreviewProps {
  className?: string;
}

type TextSectionKey = 'title' | 'namecity' | 'date' | 'coords';

interface StyleTemplate {
  container: string;
  titleClass: string;
  fontFamily?: string;
  nameCityClass?: string;
  detailClass?: string;
  dividerVariant?: 'lines' | 'plain';
  stack: TextSectionKey[];
}

const STYLE_TEMPLATES: Record<StyleKey, StyleTemplate> = {
  classic: {
    fontFamily: 'Oswald, sans-serif',
    titleClass: 'text-xl font-bold uppercase tracking-[0.15em]',
    nameCityClass: 'text-sm font-medium uppercase tracking-wide',
    detailClass: 'text-xs text-gray-600 tracking-wide',
    dividerVariant: 'lines',
    stack: ['title', 'namecity', 'date', 'coords'],
    container: 'absolute bottom-6 left-6 right-6 text-center space-y-1',
  },
  hugo: {
    fontFamily: 'FuturaHeavy, sans-serif',
    titleClass: 'text-2xl font-bold uppercase',
    nameCityClass: 'text-sm font-semibold uppercase tracking-wide',
    detailClass: 'text-xs text-gray-600 tracking-wide',
    dividerVariant: 'lines',
    stack: ['title', 'coords', 'namecity', 'date'],
    container: 'absolute bottom-8 left-8 right-8 text-center space-y-1',
  },
  japan: {
    fontFamily: 'Abril, serif',
    titleClass: 'text-xl font-semibold',
    nameCityClass: 'text-sm font-medium tracking-wide',
    detailClass: 'text-xs text-gray-600 tracking-wide',
    dividerVariant: 'plain',
    stack: ['title', 'namecity', 'coords', 'date'],
    container: 'absolute top-8 left-8 right-8 text-center space-y-1',
  },
  bauhaus: {
    fontFamily: 'FuturaBook, sans-serif',
    titleClass: 'text-xl font-bold uppercase tracking-[0.1em]',
    nameCityClass: 'text-sm font-semibold uppercase tracking-[0.2em]',
    detailClass: 'text-xs text-gray-700 tracking-[0.3em]',
    dividerVariant: 'plain',
    stack: ['coords', 'title', 'namecity', 'date'],
    container: 'absolute top-6 left-6 right-6 text-center space-y-1',
  },
  frame: {
    fontFamily: 'Bookman, serif',
    titleClass: 'text-lg font-bold uppercase tracking-[0.15em]',
    nameCityClass: 'text-sm font-medium uppercase tracking-wide',
    detailClass: 'text-xs text-gray-600 tracking-wide',
    dividerVariant: 'lines',
    stack: ['title', 'namecity', 'date', 'coords'],
    container: 'absolute bottom-10 left-10 right-10 text-center space-y-1',
  },
};

export const PosterPreview = forwardRef<PosterPreviewHandle, PosterPreviewProps>(
  ({ className = '' }, ref) => {
    const posterRef = useRef<HTMLDivElement>(null);
    const mapCanvasRef = useRef<MapCanvasHandle>(null);
    
    const {
      shape,
      orientation,
      frame,
      title,
      divider,
      subtitle,
      date,
      style,
      showTitle,
      showNameCity,
      showDate,
      showCoords,
      hideText,
      removeText,
      zoom,
      background,
      setLocation,
      lng,
      lat,
    } = useConstructorStore();

    const backgroundImages = {
      white: undefined,
      wood: backgroundWood,
      marble: backgroundMarble,
      fabric: backgroundFabric,
      paper: backgroundPaper,
    };

    React.useImperativeHandle(ref, () => ({
      getMapHandle: () => mapCanvasRef.current,
      getPosterElement: () => posterRef.current,
    }));

    const handleZoomIn = () => {
      setLocation({ lng, lat, zoom: Math.min(16, zoom + 1) });
    };

    const handleZoomOut = () => {
      setLocation({ lng, lat, zoom: Math.max(1, zoom - 1) });
    };

    const isPortrait = orientation === 'portrait';
    const posterAspect = isPortrait ? 'aspect-[3/4]' : 'aspect-[4/3]';

    const styleConfig = STYLE_TEMPLATES[style] ?? STYLE_TEMPLATES.classic;
    const containerClass = `${styleConfig.container} text-gray-800`;
    const titleStyle = styleConfig.fontFamily ? { fontFamily: styleConfig.fontFamily } : undefined;
    const nameCityClass = styleConfig.nameCityClass ?? 'text-sm font-medium uppercase tracking-wide';
    const detailClass = styleConfig.detailClass ?? 'text-xs text-gray-600 tracking-wide';

    const shapeEntry = useMemo(() => SHAPES.find((s) => s.id === shape), [shape]);

    const maskSvg = useMemo(() => {
      if (!shapeEntry) return null;
      let svg = shapeEntry.svg.replace(/(width|height)="[^"]*"/g, '');
      svg = svg.replace(/fill="(?!none)[^"]*"/g, 'fill="white"');
      svg = svg.replace(/stroke="[^"]*"/g, 'stroke="white"');
      svg = svg.replace(/\s+/g, ' ');
      return svg;
    }, [shapeEntry]);

    const maskImage = useMemo(() => {
      if (!maskSvg) return null;
      const encoded = encodeURIComponent(maskSvg)
        .replace(/'/g, '%27')
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29');
      return `url("data:image/svg+xml,${encoded}")`;
    }, [maskSvg]);

    const mapShapeStyles = useMemo<React.CSSProperties>(() => {
      if (maskImage) {
        return {
          WebkitMaskImage: maskImage,
          maskImage,
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
          maskPosition: 'center',
          backgroundColor: 'transparent',
        };
      }
      return {
        clipPath: getClipPath(shape),
      };
    }, [maskImage, shape]);

    return (
      <div className={`relative ${className}`}>
        {/* Poster Container */}
        <div
          ref={posterRef}
          className={`relative bg-white rounded-lg shadow-card overflow-hidden ${posterAspect} max-w-md mx-auto`}
        >
          {/* Frame Layer */}
          {frame !== 'none' && (
            <div className="absolute inset-0 z-30 pointer-events-none">
              <div className={`w-full h-full border-8 rounded-lg ${
                frame === 'frame' ? 'border-gray-800' : 'border-amber-800'
              }`} />
            </div>
          )}

          {/* Mat/Background */}
          <div 
            className="absolute inset-4 rounded-lg"
            style={{
              backgroundColor: background === 'white' ? '#ffffff' : undefined,
              backgroundImage: backgroundImages[background] ? `url(${backgroundImages[background]})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          {/* Map Container with Mask */}
          <div className="absolute inset-8 top-8 bottom-20">
            {/* SVG Shape Overlay */}
            <div className="absolute inset-0 z-10 pointer-events-none">
              <ShapeMasks shape={shape} />
            </div>
            
            <div
              className="w-full h-full relative overflow-hidden bg-white"
              style={mapShapeStyles}
            >
              <MapCanvas ref={mapCanvasRef} className="w-full h-full" />
            </div>

            {/* Zoom Controls */}
            <div className="absolute top-4 right-4 flex flex-col space-y-2 z-20 exclude-from-export">
              <button
                onClick={handleZoomIn}
                className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-gray-800 hover:bg-white transition-colors shadow-sm"
                data-zoom-in
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleZoomOut}
                className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-gray-800 hover:bg-white transition-colors shadow-sm"
                data-zoom-out
              >
                <ZoomOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Text Area */}
          {!hideText && !removeText && (
            <div className={containerClass}>
              {styleConfig.stack.map((section) => {
                switch (section) {
                  case 'title':
                    if (!showTitle || !title) return null;
                    return (
                      <h2 key="title" className={styleConfig.titleClass} style={titleStyle}>
                        {title}
                      </h2>
                    );
                  case 'namecity':
                    if (!showNameCity || !divider) return null;
                    if (styleConfig.dividerVariant === 'plain') {
                      return (
                        <div key="namecity" className={nameCityClass}>
                          {divider}
                        </div>
                      );
                    }
                    return (
                      <div key="namecity" className="flex items-center justify-center space-x-4">
                        <div className="h-px bg-gray-400 flex-1" />
                        <span className={nameCityClass}>{divider}</span>
                        <div className="h-px bg-gray-400 flex-1" />
                      </div>
                    );
                  case 'date':
                    if (!showDate || !date) return null;
                    return (
                      <p key="date" className={detailClass}>
                        {date}
                      </p>
                    );
                  case 'coords':
                    if (!showCoords || !subtitle) return null;
                    return (
                      <p key="coords" className={detailClass}>
                        {subtitle}
                      </p>
                    );
                  default:
                    return null;
                }
              })}
            </div>
          )}
        </div>
      </div>
    );
  }
);

const getClipPath = (shape: string): string => {
  switch (shape) {
    case 'heart':
      return 'path("M50,85 C50,85 20,55 20,35 C20,25 30,15 40,15 C45,15 50,20 50,20 C50,20 55,15 60,15 C70,15 80,25 80,35 C80,55 50,85 50,85 Z")';
    case 'circle':
      return 'circle(40% at 50% 50%)';
    case 'moon':
      return 'path("M50 10 C70 10, 90 30, 90 50 C90 70, 70 90, 50 90 C30 90, 10 70, 10 50 C10 30, 30 10, 50 10 Z")';
    case 'glass':
      return 'path("M30 10 L70 10 L80 90 L20 90 Z")';
    case 'balloon':
      return 'ellipse(40% 45% at 50% 40%)';
    case 'rectangle':
      return 'inset(5% 10% 5% 10%)';
    case 'square':
    default:
      return 'inset(0% 0% 0% 0% round 8px)';
  }
};

PosterPreview.displayName = 'PosterPreview';