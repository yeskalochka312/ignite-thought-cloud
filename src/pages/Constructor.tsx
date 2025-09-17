import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Type, Palette, Shapes, Move3D, Image, ShoppingCart, Download, Search, ZoomIn, Plus, Minus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SHAPES, getShapeLabel } from "@/data/shapes";

interface ConstructorStep {
  id: string;
  title: string;
  step: number;
  icon: React.ReactNode;
  completed?: boolean;
}

interface BackgroundTheme {
  id: string;
  name: string;
  image: string;
}

interface Size {
  id: string;
  name: string;
  dimensions: string;
  price: string;
}

const Constructor: React.FC = () => {
  const [activeStep, setActiveStep] = useState<string>("background");
  const [selectedShape, setSelectedShape] = useState<string>("s1");
  const [selectedBackground, setSelectedBackground] = useState<string>("theme1");
  const [selectedSize, setSelectedSize] = useState<string>("30x40");
  const [mapText, setMapText] = useState<string>("Where she said yes");
  const [locationText, setLocationText] = useState<string>("Москва, Россия");
  const [fontSize, setFontSize] = useState<number>(18);
  const [fontFamily, setFontFamily] = useState<string>("Cormorant");
  const [currentShapePage, setCurrentShapePage] = useState<number>(0);
  
  const shapesPerPage = 12;

  const steps: ConstructorStep[] = [
    {
      id: "background",
      title: "Фон",
      step: 1,
      icon: <Image className="w-4 h-4" />,
      completed: activeStep !== "background",
    },
    {
      id: "location",
      title: "Локация",
      step: 2,
      icon: <MapPin className="w-4 h-4" />,
      completed: ["text", "theme", "form", "size"].includes(activeStep),
    },
    {
      id: "text",
      title: "Текст",
      step: 3,
      icon: <Type className="w-4 h-4" />,
      completed: ["theme", "form", "size"].includes(activeStep),
    },
    {
      id: "theme",
      title: "Тема",
      step: 4,
      icon: <Palette className="w-4 h-4" />,
      completed: ["form", "size"].includes(activeStep),
    },
    {
      id: "form",
      title: "Форма",
      step: 5,
      icon: <Shapes className="w-4 h-4" />,
      completed: activeStep === "size",
    },
    {
      id: "size",
      title: "Размер",
      step: 6,
      icon: <Move3D className="w-4 h-4" />,
      completed: false,
    },
  ];

  const backgrounds: BackgroundTheme[] = [
    { id: "theme1", name: "Классик", image: "/mappora-embed/images/theme1.jpg" },
    { id: "theme2", name: "Винтаж", image: "/mappora-embed/images/theme2.jpg" },
    { id: "theme3", name: "Современный", image: "/mappora-embed/images/theme3.jpg" },
    { id: "theme4", name: "Элегант", image: "/mappora-embed/images/theme4.jpg" },
    { id: "theme5", name: "Минимализм", image: "/mappora-embed/images/theme5.jpg" },
    { id: "theme6", name: "Арт", image: "/mappora-embed/images/theme6.jpg" },
    { id: "theme7", name: "Ретро", image: "/mappora-embed/images/theme7.jpg" },
    { id: "theme8", name: "Природа", image: "/mappora-embed/images/theme8.jpg" },
    { id: "theme9", name: "Городской", image: "/mappora-embed/images/theme9.jpg" },
    { id: "theme10", name: "Романтик", image: "/mappora-embed/images/theme10.jpg" },
    { id: "theme11", name: "Морской", image: "/mappora-embed/images/theme11.jpg" },
  ];

  const sizes: Size[] = [
    { id: "21x30", name: "A4", dimensions: "21 × 30 см", price: "2 990 ₽" },
    { id: "30x40", name: "A3", dimensions: "30 × 40 см", price: "4 990 ₽" },
    { id: "40x50", name: "Средний", dimensions: "40 × 50 см", price: "6 990 ₽" },
    { id: "50x70", name: "Большой", dimensions: "50 × 70 см", price: "8 990 ₽" },
    { id: "70x100", name: "XL", dimensions: "70 × 100 см", price: "12 990 ₽" },
  ];

  const fonts = [
    { id: "Cormorant", name: "Cormorant" },
    { id: "Inter", name: "Inter" },
    { id: "Abril", name: "Abril" },
    { id: "Oswald", name: "Oswald" },
    { id: "Secular", name: "Secular" },
    { id: "Barlow", name: "Barlow" },
  ];

  const currentPrice = sizes.find(s => s.id === selectedSize)?.price || "4 990 ₽";
  const paginatedShapes = SHAPES.slice(currentShapePage * shapesPerPage, (currentShapePage + 1) * shapesPerPage);
  const totalPages = Math.ceil(SHAPES.length / shapesPerPage);

  const renderStepContent = () => {
    switch (activeStep) {
      case "background":
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-serif text-foreground mb-6">Выберите фон</h2>
            <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
              {backgrounds.map((bg) => (
                <button
                  key={bg.id}
                  onClick={() => setSelectedBackground(bg.id)}
                  className={`relative p-2 rounded-xl border-2 transition-all duration-300 ${
                    selectedBackground === bg.id
                      ? 'border-neon-red'
                      : 'border-border hover:border-neon-red/50'
                  }`}
                >
                  <img 
                    src={bg.image} 
                    alt={bg.name}
                    className="w-full h-20 object-cover rounded-lg"
                  />
                  <div className="text-xs mt-1 text-foreground-muted">{bg.name}</div>
                </button>
              ))}
            </div>
          </div>
        );
      
      case "location":
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-serif text-foreground mb-6">Введите локацию</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-foreground-muted mb-2 block">Адрес или место</label>
                <Input
                  value={locationText}
                  onChange={(e) => setLocationText(e.target.value)}
                  placeholder="Москва, Красная площадь"
                  className="input-glass"
                />
              </div>
              <div className="text-xs text-foreground-muted">
                Введите адрес, название места или координаты
              </div>
            </div>
          </div>
        );
      
      case "text":
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-serif text-foreground mb-6">Настройка текста</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-foreground-muted mb-2 block">Заголовок</label>
                <Input
                  value={mapText}
                  onChange={(e) => setMapText(e.target.value)}
                  placeholder="Where she said yes"
                  className="input-glass"
                />
              </div>
              
              <div>
                <label className="text-sm text-foreground-muted mb-2 block">Шрифт</label>
                <Select value={fontFamily} onValueChange={setFontFamily}>
                  <SelectTrigger className="input-glass">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fonts.map((font) => (
                      <SelectItem key={font.id} value={font.id}>{font.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm text-foreground-muted mb-2 block">Размер шрифта: {fontSize}px</label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFontSize(Math.max(12, fontSize - 2))}
                    className="btn-3d btn-outline"
                  >
                    <span className="button_top">
                      <Minus className="w-3 h-3" />
                    </span>
                  </Button>
                  <span className="flex-1 text-center">{fontSize}px</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFontSize(Math.min(32, fontSize + 2))}
                    className="btn-3d btn-outline"
                  >
                    <span className="button_top">
                      <Plus className="w-3 h-3" />
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      
      case "theme":
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-serif text-foreground mb-6">Цветовая схема</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: "classic", name: "Классик", colors: ["#000", "#fff"] },
                { id: "sepia", name: "Сепия", colors: ["#8B4513", "#F4E4BC"] },
                { id: "blue", name: "Синий", colors: ["#1E3A8A", "#DBEAFE"] },
                { id: "green", name: "Зеленый", colors: ["#166534", "#DCFCE7"] },
                { id: "red", name: "Красный", colors: ["#DC2626", "#FEE2E2"] },
                { id: "purple", name: "Фиолетовый", colors: ["#7C3AED", "#EDE9FE"] },
              ].map((theme) => (
                <button
                  key={theme.id}
                  className="p-3 rounded-lg border border-border hover:border-neon-red/50 transition-colors"
                >
                  <div className="flex gap-2 mb-2">
                    {theme.colors.map((color, idx) => (
                      <div
                        key={idx}
                        className="w-4 h-4 rounded-full border border-border"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <div className="text-xs text-foreground-muted">{theme.name}</div>
                </button>
              ))}
            </div>
          </div>
        );
      
      case "form":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-serif text-foreground">Выберите форму</h2>
              <div className="text-sm text-foreground-muted">
                {currentShapePage + 1} / {totalPages}
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3 max-h-80 overflow-y-auto">
              {paginatedShapes.map((shape) => (
                <button
                  key={shape.id}
                  onClick={() => setSelectedShape(shape.id)}
                  className={`p-3 rounded-xl border-2 transition-all duration-300 aspect-square flex flex-col items-center justify-center ${
                    selectedShape === shape.id
                      ? 'border-neon-red bg-surface-hover'
                      : 'border-border hover:border-neon-red/50'
                  }`}
                >
                  <div 
                    className="w-8 h-8 mb-1" 
                    dangerouslySetInnerHTML={{ __html: shape.svg }}
                  />
                  <span className="text-xs text-foreground-muted truncate">
                    {getShapeLabel(shape.id)}
                  </span>
                </button>
              ))}
            </div>
            
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentShapePage(Math.max(0, currentShapePage - 1))}
                disabled={currentShapePage === 0}
                className="btn-3d btn-outline"
              >
                <span className="button_top">Назад</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentShapePage(Math.min(totalPages - 1, currentShapePage + 1))}
                disabled={currentShapePage === totalPages - 1}
                className="btn-3d btn-outline"
              >
                <span className="button_top">Далее</span>
              </Button>
            </div>
            
            <div className="text-sm text-foreground-muted">
              Выберите форму для вырезания карты ({SHAPES.length} доступно)
            </div>
          </div>
        );
      
      case "size":
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-serif text-foreground mb-6">Выберите размер</h2>
            <div className="space-y-3">
              {sizes.map((size) => (
                <button
                  key={size.id}
                  onClick={() => setSelectedSize(size.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                    selectedSize === size.id
                      ? 'border-neon-red bg-surface-hover'
                      : 'border-border hover:border-neon-red/50'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-foreground">{size.name}</div>
                      <div className="text-sm text-foreground-muted">{size.dimensions}</div>
                    </div>
                    <div className="font-bold text-neon-red">{size.price}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-background flex">
      {/* Left Sidebar - Steps */}
      <div className="w-80 bg-surface border-r border-border p-6 flex flex-col">
        <div className="mb-8">
          <h2 className="text-lg font-serif text-foreground-muted mb-6">Этапы создания</h2>
          <div className="space-y-3">
            {steps.map((step) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-lg transition-all duration-300 ${
                  activeStep === step.id
                    ? 'bg-neon-red text-white'
                    : step.completed
                    ? 'bg-surface-hover text-foreground hover:bg-surface-hover/80'
                    : 'text-foreground-muted hover:text-foreground'
                }`}
              >
                <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${
                  activeStep === step.id || step.completed
                    ? 'text-current'
                    : 'text-foreground-muted'
                }`}>
                  {step.icon}
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium">{step.title}</div>
                  <div className="text-sm opacity-75">Шаг {step.step}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Price Section */}
        <div className="mt-auto">
          <div className="text-sm text-foreground-muted mb-2">Цена:</div>
          <div className="text-2xl font-bold text-neon-red">{currentPrice}</div>
        </div>
      </div>

      {/* Center - Preview */}
      <div className="flex-1 flex items-center justify-center p-8">
        <Card className="relative bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full aspect-[3/4]">
          {/* Search Icons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
              <Search className="w-4 h-4 text-gray-600" />
            </button>
            <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
              <ZoomIn className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Title */}
          <div className="text-center mb-6">
            <h3 className="text-2xl font-serif text-gray-800 italic">Where she said yes</h3>
          </div>

          {/* Map Preview */}
          <div className="flex items-center justify-center">
            <div className="relative w-64 h-64 bg-gray-100 border-2 border-gray-300 overflow-hidden rounded-2xl">
              {/* Background */}
              <img 
                src={backgrounds.find(bg => bg.id === selectedBackground)?.image || "/mappora-embed/images/theme1.jpg"}
                alt="Background" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Map with shape mask */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-48 h-48">
                  <img 
                    src="/static-map.png" 
                    alt="Map preview" 
                    className="w-full h-full object-cover"
                    style={{
                      clipPath: selectedShape.startsWith('s') ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' : 'circle(50%)'
                    }}
                  />
                  {/* Selected shape overlay */}
                  {selectedShape && selectedShape.startsWith('s') && (
                    <div 
                      className="absolute inset-0 w-full h-full"
                      dangerouslySetInnerHTML={{ 
                        __html: SHAPES.find(s => s.id === selectedShape)?.svg || ''
                      }}
                      style={{
                        filter: 'invert(1)',
                        mixBlendMode: 'multiply'
                      }}
                    />
                  )}
                  {/* Heart markers */}
                  <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-neon-red text-xl">❤️</div>
                  <div className="absolute bottom-1/4 left-1/3 text-neon-red text-xl">❤️</div>
                </div>
              </div>
              
              {/* Text overlay */}
              <div 
                className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center"
                style={{ 
                  fontFamily: fontFamily === 'Cormorant' ? 'var(--font-serif)' : 'var(--font-sans)',
                  fontSize: `${fontSize * 0.8}px`
                }}
              >
                <h3 className="text-gray-800 italic font-medium">{mapText}</h3>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Right Sidebar - Current Step Content */}
      <div className="w-80 bg-surface border-l border-border p-6">
        {renderStepContent()}
        
        {/* Action Buttons */}
        <div className="space-y-4 mt-8 pt-6 border-t border-border">
          <Button 
            variant="outline" 
            className="w-full btn-3d btn-outline"
          >
            <span className="button_top">
              <Download className="w-4 h-4 mr-2" />
              Скачать превью
            </span>
          </Button>
          
          <Button className="w-full btn-3d">
            <span className="button_top">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Добавить в корзину
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export { Constructor };
export default Constructor;