import React from 'react';
import { SHAPES } from '@/data/shapes';

interface ShapeMasksProps {
  shape: string;
}

const sanitizeSvg = (svg: string) => {
  let transformed = svg.replace(/(width|height)="[^"]*"/g, '');
  transformed = transformed.replace(/fill="(?!none)[^"]*"/g, 'fill="none"');
  transformed = transformed.replace(/stroke="[^"]*"/g, 'stroke="rgba(0,0,0,0.25)"');
  transformed = transformed.replace('<svg', '<svg class="w-full h-full"');
  return transformed;
};

export const ShapeMasks: React.FC<ShapeMasksProps> = ({ shape }) => {
  const entry = React.useMemo(() => SHAPES.find((s) => s.id === shape), [shape]);

  if (!entry) {
    return (
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }}
      >
        <div className="absolute inset-8 border-4 border-black/30 rounded-3xl" />
      </div>
    );
  }

  const svgMarkup = sanitizeSvg(entry.svg);

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      dangerouslySetInnerHTML={{ __html: svgMarkup }}
    />
  );
};
