
import React from "react";

const Constructor: React.FC = () => {
  return (
    <div className="w-full min-h-[calc(100vh-8rem)]">
      <iframe
        title="Constructor (embedded)"
        src="/mappora-embed/index.html"
        className="w-full h-[calc(100vh-8rem)] border-0"
        allow="fullscreen; clipboard-read; clipboard-write; accelerometer; gyroscope; xr-spatial-tracking"
      />
    </div>
  );
};

export { Constructor };
export default Constructor;
