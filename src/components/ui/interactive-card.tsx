import { useState, useRef } from "react";
interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  showTitle?: string;
}
export const InteractiveCard = ({
  children,
  className = "",
  showTitle
}: InteractiveCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / centerY * -20;
    const rotateY = (x - centerX) / centerX * 20;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  };
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    setIsHovered(false);
  };
  return (
    <div 
      className="card-3d perspective-1000"
      style={{
        transform: `rotateX(-15deg) rotateZ(15deg)`,
        transition: 'transform 0.1s ease-out'
      }}
    >
      <div
        ref={cardRef}
        className="relative w-full h-full cursor-pointer transform-gpu transition-all duration-300 ease-out"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        <img
          src="/lovable-uploads/09b75125-aff5-473a-bcb0-6991885be53c.png"
          alt="Персональная карта"
          className="w-full h-full object-contain drop-shadow-2xl"
          style={{
            filter: isHovered ? 'brightness(1.1)' : 'brightness(1)',
            transition: 'filter 0.3s ease'
          }}
        />
      </div>
    </div>
  );
};