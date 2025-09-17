
import React from "react";

export const MapporaEmbed: React.FC = () => {
  return (
    <div className="w-full h-[calc(100vh-8rem)]">
      <iframe
        title="Mappora Embed"
        src="/mappora-embed/index.html"
        className="w-full h-full border-0"
        allow="fullscreen; clipboard-read; clipboard-write; accelerometer; gyroscope; xr-spatial-tracking"
      />
    </div>
  );
};

export default MapporaEmbed;
