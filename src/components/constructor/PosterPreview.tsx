
import React, { forwardRef, useMemo, useRef } from "react";
import { MapCanvas, type MapCanvasHandle } from "./MapCanvas";
import { useConstructorStore, type StyleKey } from "@/store/constructor";
import { ZoomIn, ZoomOut } from "lucide-react";
import backgroundWood from "@/assets/background-wood.jpg";
import backgroundMarble from "@/assets/background-marble.jpg";
import backgroundFabric from "@/assets/background-fabric.jpg";
import backgroundPaper from "@/assets/background-paper.jpg";
import { ShapeMasks } from "./ShapeMasks";
import { SHAPES } from "@/data/shapes";

export interface PosterPreviewHandle {
  getMapHandle: () => MapCanvasHandle | null;
  getPosterElement: () => HTMLElement | null;
}

type StyleTemplate = {
  fontFamily: string;
  titleClass: string;
  nameCityClass: string;
  detailClass: string;
  dividerVariant: "plain" | "lines" | "dot";
  stack: Array<"title" | "namecity" | "coords" | "date">;
  container: string; // Tailwind classes for block with texts
  align?: "left" | "center" | "right";
};

const STYLE_TEMPLATES: Record<StyleKey, StyleTemplate> = {
  classic: {
    fontFamily: "Bebas, var(--font-sans)",
    titleClass: "text-3xl tracking-wider",
    nameCityClass: "text-sm tracking-widest",
    detailClass: "text-xs text-gray-600",
    dividerVariant: "lines",
    stack: ["title", "namecity", "coords", "date"],
    container: "absolute bottom-8 left-8 right-8 text-center space-y-1",
  },
  hugo: {
    fontFamily: "Barlow, var(--font-sans)",
    titleClass: "text-2xl font-bold uppercase",
    nameCityClass: "text-sm font-semibold uppercase tracking-wide",
    detailClass: "text-xs text-gray-600 tracking-wide",
    dividerVariant: "lines",
    stack: ["title", "coords", "namecity", "date"],
    container: "absolute bottom-8 left-8 right-8 text-center space-y-1",
  },
  japandi: {
    fontFamily: "Made, var(--font-serif)",
    titleClass: "text-3xl",
    nameCityClass: "text-sm uppercase tracking-[0.2em]",
    detailClass: "text-xs text-gray-700",
    dividerVariant: "plain",
    stack: ["title", "namecity", "coords", "date"],
    container: "absolute bottom-10 left-10 right-10 text-center space-y-1",
  },
  wabi_sabi: {
    fontFamily: "Abril, var(--font-serif)",
    titleClass: "text-2xl",
    nameCityClass: "text-sm uppercase tracking-wide",
    detailClass: "text-xs text-gray-700",
    dividerVariant: "dot",
    stack: ["title", "coords", "namecity", "date"],
    container: "absolute bottom-10 left-10 right-10 text-center space-y-1",
  },
  relief: {
    fontFamily: "Bebas Book, var(--font-sans)",
    titleClass: "text-4xl tracking-wide",
    nameCityClass: "text-sm uppercase tracking-[0.3em]",
    detailClass: "text-xs text-gray-600",
    dividerVariant: "plain",
    stack: ["title", "namecity", "coords", "date"],
    container: "absolute bottom-6 left-6 right-6 text-center space-y-1",
  },
  calligraphic: {
    fontFamily: "Collection, var(--font-serif)",
    titleClass: "text-4xl",
    nameCityClass: "text-base italic",
    detailClass: "text-sm",
    dividerVariant: "plain",
    stack: ["title", "namecity", "coords", "date"],
    container: "absolute bottom-10 left-12 right-12 text-center space-y-1",
  },
  veil: {
    fontFamily: "BadScript, var(--font-serif)",
    titleClass: "text-3xl",
    nameCityClass: "text-sm uppercase tracking-widest",
    detailClass: "text-xs",
    dividerVariant: "lines",
    stack: ["title", "coords", "namecity", "date"],
    container: "absolute bottom-10 left-8 right-8 text-center space-y-1",
  },
  lucas: {
    fontFamily: "Bebas, var(--font-sans)",
    titleClass: "text-4xl tracking-[0.2em]",
    nameCityClass: "text-sm uppercase tracking-[0.3em]",
    detailClass: "text-xs",
    dividerVariant: "lines",
    stack: ["title", "namecity", "coords", "date"],
    container: "absolute bottom-8 left-8 right-8 text-center space-y-1",
  },
  hygge: {
    fontFamily: "Inter, var(--font-sans)",
    titleClass: "text-2xl font-semibold",
    nameCityClass: "text-sm",
    detailClass: "text-xs text-gray-600",
    dividerVariant: "plain",
    stack: ["title", "namecity", "coords", "date"],
    container: "absolute bottom-10 left-10 right-10 text-center space-y-1",
  },
  bauhaus: {
    fontFamily: "Barlow, var(--font-sans)",
    titleClass: "text-3xl font-black uppercase",
    nameCityClass: "text-xs uppercase tracking-[0.25em]",
    detailClass: "text-xs",
    dividerVariant: "lines",
    stack: ["title", "coords", "namecity", "date"],
    container: "absolute bottom-8 left-8 right-8 text-center space-y-1",
  },
  gypset: {
    fontFamily: "Abril, var(--font-serif)",
    titleClass: "text-3xl",
    nameCityClass: "text-sm uppercase tracking-[0.2em]",
    detailClass: "text-xs",
    dividerVariant: "dot",
    stack: ["title", "namecity", "coords", "date"],
    container: "absolute bottom-8 left-8 right-8 text-center space-y-1",
  },
};

export const PosterPreview = forwardRef<PosterPreviewHandle>((_, ref) => {
  const mapCanvasRef = useRef<MapCanvasHandle | null>(null);
  const posterRef = useRef<HTMLDivElement | null>(null);

  const {
    style,
    theme,
    background,
    shape,
    orientation,
    size,
    title,
    divider,
    subtitle,
    date,
    showTitle,
    showNameCity,
    showDate,
    showCoords,
    lat,
    lng,
  } = useConstructorStore();

  React.useImperativeHandle(ref, () => ({
    getMapHandle: () => mapCanvasRef.current,
    getPosterElement: () => posterRef.current,
  }));

  const backgroundImages = {
    white: undefined as any,
    wood: backgroundWood,
    marble: backgroundMarble,
    fabric: backgroundFabric,
    paper: backgroundPaper,
  };

  const styleConfig = STYLE_TEMPLATES[style] ?? STYLE_TEMPLATES.classic;

  const mapShapeStyles = useMemo<React.CSSProperties>(() => {
    return {
      WebkitMaskImage: "url(#shape-mask)",
      maskImage: "url(#shape-mask)",
      WebkitMaskSize: "contain",
      maskSize: "contain",
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskPosition: "center",
    } as React.CSSProperties;
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div
        ref={posterRef}
        className="relative bg-white shadow-2xl overflow-hidden"
        style={{ width: 600, height: 800 }}
      >
        {/* background */}
        {background !== "white" && (
          <img
            src={backgroundImages[background]}
            alt="bg"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
        )}

        {/* Map canvas in shape */}
        <div className="absolute inset-12">
          <div className="relative w-full h-full">
            <ShapeMasks shape={shape} />
            <div className="absolute inset-0 rounded-md overflow-hidden">
              <MapCanvas ref={(h) => (mapCanvasRef.current = h)} />
            </div>
          </div>
        </div>

        {/* Text block */}
        <div
          className={styleConfig.container}
          style={{ fontFamily: styleConfig.fontFamily }}
        >
          {styleConfig.stack.map((key) => {
            switch (key) {
              case "title":
                if (!showTitle || !title) return null;
                return (
                  <h2 key="title" className={styleConfig.titleClass}>
                    {title}
                  </h2>
                );
              case "namecity":
                if (!showNameCity || !divider) return null;
                if (styleConfig.dividerVariant === "plain") {
                  return (
                    <div key="namecity" className={styleConfig.nameCityClass}>
                      {divider}
                    </div>
                  );
                }
                return (
                  <div
                    key="namecity"
                    className="flex items-center justify-center space-x-4"
                  >
                    {styleConfig.dividerVariant === "lines" && (
                      <div className="h-px bg-gray-400 flex-1" />
                    )}
                    <div className={styleConfig.nameCityClass}>{divider}</div>
                    {styleConfig.dividerVariant === "lines" && (
                      <div className="h-px bg-gray-400 flex-1" />
                    )}
                    {styleConfig.dividerVariant === "dot" && (
                      <div className="w-1 h-1 bg-gray-400 rounded-full" />
                    )}
                  </div>
                );
              case "coords":
                if (!showCoords || !subtitle) return null;
                return (
                  <div key="coords" className={styleConfig.detailClass}>
                    {subtitle}
                  </div>
                );
              case "date":
                if (!showDate || !date) return null;
                return (
                  <div key="date" className={styleConfig.detailClass}>
                    {date}
                  </div>
                );
              default:
                return null;
            }
          })}
        </div>

        {/* Simple zoom controls placeholder (no-op for static map) */}
        <div className="absolute top-4 right-4 bg-white/80 rounded-md shadow p-1 flex flex-col gap-1">
          <button className="p-2"><ZoomIn size={16} /></button>
          <button className="p-2"><ZoomOut size={16} /></button>
        </div>
      </div>
    </div>
  );
});

PosterPreview.displayName = "PosterPreview";
