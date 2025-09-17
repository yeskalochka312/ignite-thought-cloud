
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeKey = "white" | "red" | "green" | "yellow" | "purple" | "blue" | "black";
export type Shape = string;
export type Units = "cm" | "inch";
export type Orientation = "portrait" | "landscape";
export type Frame = "none" | "frame" | "hanger";
export type Background = "white" | "wood" | "marble" | "fabric" | "paper";
export type StyleKey =
  | "classic" | "hugo" | "japandi" | "wabi_sabi"
  | "relief" | "calligraphic" | "veil" | "lucas"
  | "hygge" | "bauhaus" | "gypset";

export interface PosterSize { w: number; h: number }

export interface ConstructorState {
  // map & visual
  lat: number;
  lng: number;
  zoom: number;
  theme: ThemeKey;
  background: Background;
  shape: Shape;
  orientation: Orientation;
  style: StyleKey;
  // poster options
  units: Units;
  size: PosterSize;
  frame: Frame;
  date: string;
  // text
  title: string;
  divider: string;
  subtitle: string;
  showTitle: boolean;
  showNameCity: boolean;
  showDate: boolean;
  showCoords: boolean;
  hideText: boolean;
  removeText: boolean;
  // ui
  activeStep: string;
  price: number;
}

export interface ConstructorActions {
  setTheme: (theme: ThemeKey) => void;
  setBackground: (bg: Background) => void;
  setStyle: (style: StyleKey) => void;
  setOrientation: (o: Orientation) => void;
  setUnits: (u: Units) => void;
  setSize: (size: PosterSize) => void;
  setFrame: (f: Frame) => void;
  setDate: (d: string) => void;
  setCoords: (lat: number, lng: number) => void;
  setZoom: (z: number) => void;
  setShape: (shape: Shape) => void;
  setText: (data: Partial<Pick<ConstructorState, "title"|"divider"|"subtitle">>) => void;
  toggleShowTitle: () => void;
  toggleShowNameCity: () => void;
  toggleShowDate: () => void;
  toggleShowCoords: () => void;
  toggleHideText: () => void;
  toggleRemoveText: () => void;
  setActiveStep: (s: string) => void;
  recalcPrice: () => void;
  reset: () => void;
}

// Example simple pricing tables (руб)
const SIZE_PRICES: Record<string, number> = {
  "21x30": 2490,
  "30x40": 3490,
  "40x50": 4490,
  "50x70": 5490,
};
const FRAME_PRICES: Record<Frame, number> = {
  none: 0,
  frame: 900,
  hanger: 500,
};

export const initialState: ConstructorState = {
  lat: 48.8566,
  lng: 2.3522,
  zoom: 11,
  theme: "white",
  background: "white",
  shape: "circle",
  orientation: "portrait",
  style: "classic",
  units: "cm",
  size: { w: 30, h: 40 },
  frame: "none",
  date: "01.01.2025",
  title: "PARIS",
  divider: "France",
  subtitle: "48.8566°N / 2.3522°E",
  showTitle: true,
  showNameCity: true,
  showDate: true,
  showCoords: true,
  hideText: false,
  removeText: false,
  activeStep: "background",
  price: 3490,
};

export const useConstructorStore = create<ConstructorState & ConstructorActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      setTheme: (theme) => set({ theme }),
      setBackground: (background) => set({ background }),
      setStyle: (style) => set({ style }),
      setOrientation: (orientation) => set({ orientation }),
      setUnits: (units) => { set({ units }); get().recalcPrice(); },
      setSize: (size) => { set({ size }); get().recalcPrice(); },
      setFrame: (frame) => { set({ frame }); get().recalcPrice(); },
      setDate: (date) => set({ date }),
      setCoords: (lat, lng) => set({ lat, lng }),
      setZoom: (zoom) => set({ zoom }),
      setShape: (shape) => set({ shape }),
      setText: (data) => set(data),
      toggleShowTitle: () => set((s) => ({ showTitle: !s.showTitle })),
      toggleShowNameCity: () => set((s) => ({ showNameCity: !s.showNameCity })),
      toggleShowDate: () => set((s) => ({ showDate: !s.showDate })),
      toggleShowCoords: () => set((s) => ({ showCoords: !s.showCoords })),
      toggleHideText: () => set((s) => ({ hideText: !s.hideText })),
      toggleRemoveText: () => set((s) => ({ removeText: !s.removeText })),
      setActiveStep: (activeStep) => set({ activeStep }),

      recalcPrice: () => {
        const { size, frame } = get();
        const key = `${size.w}x${size.h}`;
        const base = SIZE_PRICES[key] ?? SIZE_PRICES["30x40"];
        const addon = FRAME_PRICES[frame] ?? 0;
        set({ price: base + addon });
      },

      reset: () => set(initialState),
    }),
    {
      name: "mol_constructor_v1",
    }
  )
);
