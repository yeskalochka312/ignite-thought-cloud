interface LoaderProps {
  isVisible: boolean;
}

export const Loader = ({ isVisible }: LoaderProps) => {
  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
      data-loader
    >
      <div className="flex flex-col items-center space-y-8">
        {/* Loader Animation */}
        <div className="loader"></div>
        
        {/* Brand Text */}
        <div className="text-center animate-fade-in">
          <div className="text-2xl font-serif font-bold text-foreground mb-2">
            <span>Map</span> <span className="text-neon-red">Of Love</span>
          </div>
          <p className="text-foreground-muted text-sm">
            Искусство говорить о чувствах без слов
          </p>
        </div>
      </div>
    </div>
  );
};