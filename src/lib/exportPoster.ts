import { toPng, toJpeg } from 'html-to-image';
import type { MapCanvasHandle } from '@/components/constructor/MapCanvas';

export interface ExportOptions {
  format?: 'png' | 'jpeg';
  width?: number;
  height?: number;
  quality?: number;
}

export const exportPoster = async (
  posterElement: HTMLElement,
  mapCanvasHandle: MapCanvasHandle | null,
  options: ExportOptions = {}
): Promise<string> => {
  const {
    format = 'png',
    width = 2000,
    height = 2800,
    quality = 0.95,
  } = options;

  try {
    // Get map snapshot first with retry logic
    let mapDataUrl = '';
    if (mapCanvasHandle) {
      try {
        mapDataUrl = await mapCanvasHandle.snapshot();
      } catch (error) {
        console.warn('Map snapshot failed, continuing without map data:', error);
      }
    }

    // Create export configuration with better error handling
    const exportConfig = {
      width,
      height,
      quality,
      backgroundColor: '#ffffff',
      pixelRatio: 1,
      style: {
        transform: 'scale(1)',
        transformOrigin: 'top left',
      },
      filter: (node: Element) => {
        // Exclude UI elements from export
        if (node.classList?.contains('exclude-from-export')) {
          return false;
        }
        // Exclude script tags and other non-visual elements
        if (node.tagName === 'SCRIPT' || node.tagName === 'STYLE') {
          return false;
        }
        return true;
      },
      onclone: (clonedDoc: Document) => {
        // Ensure all images are loaded in the cloned document
        const images = clonedDoc.querySelectorAll('img');
        images.forEach(img => {
          if (!img.complete) {
            img.style.opacity = '0';
          }
        });
      }
    };

    // Export based on format with retry logic
    let dataUrl: string;
    let attempts = 0;
    const maxAttempts = 3;
    
    while (attempts < maxAttempts) {
      try {
        if (format === 'jpeg') {
          dataUrl = await toJpeg(posterElement, exportConfig);
        } else {
          dataUrl = await toPng(posterElement, exportConfig);
        }
        
        if (dataUrl && dataUrl.startsWith('data:image/')) {
          return dataUrl;
        }
        throw new Error('Invalid data URL generated');
      } catch (attemptError) {
        attempts++;
        if (attempts === maxAttempts) {
          throw attemptError;
        }
        
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, 500));
        console.warn(`Export attempt ${attempts} failed, retrying...`, attemptError);
      }
    }

    return dataUrl!;
  } catch (error) {
    console.error('Export failed:', error);
    throw new Error(`Failed to export poster: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const downloadImage = (dataUrl: string, filename: string = 'poster') => {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const generateThumbnail = async (
  posterElement: HTMLElement,
  mapCanvasHandle: MapCanvasHandle | null,
  maxWidth: number = 600
): Promise<string> => {
  const aspectRatio = posterElement.offsetHeight / posterElement.offsetWidth;
  const thumbnailHeight = Math.round(maxWidth * aspectRatio);

  return exportPoster(posterElement, mapCanvasHandle, {
    format: 'jpeg',
    width: maxWidth,
    height: thumbnailHeight,
    quality: 0.8,
  });
};