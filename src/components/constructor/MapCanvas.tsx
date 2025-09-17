import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { useConstructorStore } from '@/store/constructor';

export interface MapCanvasHandle {
  getCanvasEl: () => HTMLCanvasElement | null;
  snapshot: () => Promise<string>;
}

interface MapCanvasProps {
  className?: string;
}

export const MapCanvas = forwardRef<MapCanvasHandle, MapCanvasProps>(
  ({ className = '' }, ref) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    
    const { lng, lat, zoom, theme } = useConstructorStore();

    useImperativeHandle(ref, () => ({
      getCanvasEl: () => {
        return null;
      },
      snapshot: async () => {
        try {
          const img = mapContainer.current?.querySelector('img') as HTMLImageElement;
          if (!img) return '';
          
          // Wait for image to load if needed
          if (!img.complete) {
            await new Promise((resolve) => {
              img.onload = resolve;
              img.onerror = resolve;
            });
          }
          
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) return '';
          
          canvas.width = img.naturalWidth || 800;
          canvas.height = img.naturalHeight || 600;
          
          // Apply filter to canvas if theme is set
          if (theme !== 'white') {
            ctx.filter = img.style.filter || 'none';
          }
          
          ctx.drawImage(img, 0, 0);
          return canvas.toDataURL('image/png', 1.0);
        } catch (error) {
          console.error('Snapshot failed:', error);
          return '';
        }
      },
    }));

    useEffect(() => {
      // Map functionality disabled
    }, []);

    return (
      <div
        ref={mapContainer}
        className={`w-full h-full ${className} relative overflow-hidden`}
        style={{ minHeight: '200px' }}
      >
        {/* Map Image from Photo 2 */}
        <img 
          src="/static-map.png"
          alt="Map"
          className="w-full h-full object-cover"
          style={{
            filter: theme === 'black' ? 'invert(1)' : 
                   theme === 'red' ? 'sepia(1) hue-rotate(320deg) saturate(2)' :
                   theme === 'green' ? 'sepia(1) hue-rotate(80deg) saturate(2)' :
                   theme === 'blue' ? 'sepia(1) hue-rotate(200deg) saturate(2)' :
                   theme === 'purple' ? 'sepia(1) hue-rotate(280deg) saturate(2)' :
                   theme === 'yellow' ? 'sepia(1) hue-rotate(40deg) saturate(2)' :
                   'none'
          }}
        />
      </div>
    );
  }
);

MapCanvas.displayName = 'MapCanvas';