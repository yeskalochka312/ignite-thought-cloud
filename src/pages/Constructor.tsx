import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Type, Palette, Shapes, Move3D, Image, ShoppingCart, Download, Search, ZoomIn } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ConstructorStep {
  id: string;
  title: string;
  step: number;
  icon: React.ReactNode;
  completed?: boolean;
}

interface Shape {
  id: string;
  name: string;
  icon: React.ReactNode;
  selected?: boolean;
}

const Constructor: React.FC = () => {
  const [activeStep, setActiveStep] = useState<string>("form");
  const [selectedShape, setSelectedShape] = useState<string>("circle");

  const steps: ConstructorStep[] = [
    {
      id: "background",
      title: "Фон",
      step: 1,
      icon: <Image className="w-4 h-4" />,
      completed: true,
    },
    {
      id: "location",
      title: "Локация",
      step: 2,
      icon: <MapPin className="w-4 h-4" />,
      completed: true,
    },
    {
      id: "text",
      title: "Текст",
      step: 3,
      icon: <Type className="w-4 h-4" />,
      completed: true,
    },
    {
      id: "theme",
      title: "Тема",
      step: 4,
      icon: <Palette className="w-4 h-4" />,
      completed: true,
    },
    {
      id: "form",
      title: "Форма",
      step: 5,
      icon: <Shapes className="w-4 h-4" />,
    },
    {
      id: "size",
      title: "Размер",
      step: 6,
      icon: <Move3D className="w-4 h-4" />,
    },
  ];

  const shapes: Shape[] = [
    {
      id: "circle",
      name: "Круг",
      icon: <div className="w-6 h-6 rounded-full border-2 border-current"></div>,
    },
    {
      id: "square",
      name: "Квадрат",
      icon: <div className="w-6 h-6 border-2 border-current"></div>,
    },
    {
      id: "heart",
      name: "Сердце",
      icon: <div className="text-neon-red">❤️</div>,
    },
    {
      id: "moon",
      name: "Луна",
      icon: <div className="text-yellow-400">🌙</div>,
    },
    {
      id: "glass",
      name: "Бокал",
      icon: <div className="text-blue-400">🥂</div>,
    },
    {
      id: "ball",
      name: "Шар",
      icon: <div className="text-purple-400">🔮</div>,
    },
    {
      id: "rectangle",
      name: "Прямоугольник",
      icon: <div className="w-8 h-5 border-2 border-current"></div>,
    },
  ];

  const price = "4 990 ₽";

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
          <div className="text-2xl font-bold text-neon-red">{price}</div>
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
            <div className={`relative ${
              selectedShape === 'circle' ? 'rounded-full' : 
              selectedShape === 'square' ? 'rounded-lg' : 
              selectedShape === 'rectangle' ? 'rounded-lg aspect-[4/3]' : 'rounded-full'
            } w-64 h-64 bg-gray-100 border-2 border-gray-300 overflow-hidden`}>
              <img 
                src="/static-map.png" 
                alt="Map preview" 
                className="w-full h-full object-cover"
              />
              {/* Heart markers */}
              <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-neon-red text-xl">❤️</div>
              <div className="absolute bottom-1/4 left-1/3 text-neon-red text-xl">❤️</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Right Sidebar - Shape Selection */}
      <div className="w-80 bg-surface border-l border-border p-6">
        <h2 className="text-lg font-serif text-foreground-muted mb-6">Выберите форму</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          {shapes.map((shape) => (
            <button
              key={shape.id}
              onClick={() => setSelectedShape(shape.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-2 ${
                selectedShape === shape.id
                  ? 'border-neon-red bg-surface-hover'
                  : 'border-border hover:border-neon-red/50 hover:bg-surface-hover/50'
              }`}
            >
              <div className="flex items-center justify-center h-8">
                {shape.icon}
              </div>
              <span className="text-sm text-foreground-muted">{shape.name}</span>
            </button>
          ))}
        </div>

        <div className="text-sm text-foreground-muted mb-6">
          Выберите форму для вырезания карты
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
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