import debounce from 'lodash.debounce';

export interface GeocodeResult {
  id: string;
  place_name: string;
  center: [number, number];
  bbox?: [number, number, number, number];
}

export interface GeocodeResponse {
  features: GeocodeResult[];
}

let abortController: AbortController | null = null;

export const geocodeSearch = async (query: string): Promise<GeocodeResult[]> => {
  // Geocoding functionality disabled
  return [];
};

export const debouncedGeocodeSearch = debounce(geocodeSearch, 300);