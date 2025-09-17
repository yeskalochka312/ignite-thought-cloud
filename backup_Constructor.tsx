import React, { useState, useRef } from "react";
import { MapPin, Type, Palette, Shapes, Ruler, Search, Download, ShoppingCart, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { useConstructorStore, type ThemeKey, type Shape, type Frame, type Orientation, type Units, type Background, type StyleKey } from "@/store/constructor";
import { PosterPreview, type PosterPreviewHandle } from "@/components/constructor/PosterPreview";
import { SHAPES, getShapeLabel } from "@/data/shapes";
import { debouncedGeocodeSearch, type GeocodeResult } from "@/lib/geocode";
import { exportPoster, downloadImage, generateThumbnail } from "@/lib/exportPoster";
import backgroundWood from "@/assets/background-wood.jpg";
import backgroundMarble from "@/assets/background-marble.jpg";
import backgroundFabric from "@/assets/background-fabric.jpg";
import backgroundPaper from "@/assets/background-paper.jpg";

export const Constructor = () => {
  const posterRef = useRef<PosterPreviewHandle>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<GeocodeResult[]>([]);
  const [isExporting, setIsExporting] = useState(false);
  
  const { addItem, openCart } = useCart();
  
  const {
    activeStep,
    setActiveStep,
    // Location
    lng,
    lat,
    zoom,
    setLocation,
    // Theme
    theme,
    setTheme,
    style,
    setStyle,
    // Background
    background,
    setBackground,
    // Shape
    shape,
    setShape,
    // Size
    units,
    setUnits,
    size,
    setSize,
    orientation,
    setOrientation,
    frame,
    setFrame,
    // Text
    title,
    divider,
    subtitle,
    date,
    setText,
    showTitle,
    toggleShowTitle,
    showNameCity,
    toggleShowNameCity,
    showDate,
    toggleShowDate,
    showCoords,
    toggleShowCoords,
    hideText,
    toggleHideText,
    removeText,
    toggleRemoveText,
    // Price
    price,
    recalcPrice,
  } = useConstructorStore();

  const steps = [
    { id: "background" as const, name: "Фон", icon: <Image className="w-5 h-5" /> },
    { id: "location" as const, name: "Локация", icon: <MapPin className="w-5 h-5" /> },
    { id: "titles" as const, name: "Текст", icon: <Type className="w-5 h-5" /> },
    { id: "theme" as const, name: "Тема", icon: <Palette className="w-5 h-5" /> },
    { id: "shape" as const, name: "Форма", icon: <Shapes className="w-5 h-5" /> },
    { id: "size" as const, name: "Размер", icon: <Ruler className="w-5 h-5" /> },
  ];

  const themes = [
  {id:'classic', name:'Classic'},
  {id:'hugo', name:'Hugo'},
  {id:'japandi', name:'Japandi'},
  {id:'wabi_sabi', name:'Wabi‑Sabi'},
  {id:'relief', name:'Relief'},
  {id:'calligraphic', name:'Calligraphic'},
  {id:'veil', name:'Veil'},
  {id:'lucas', name:'Lucas'},
  {id:'hygge', name:'Hygge'},
  {id:'bauhaus', name:'Bauhaus'},
  {id:'gypset', name:'Gypset'},
];

  const styles: { id: StyleKey; name: string }[] = [
    {id:'classic', name:'Classic'}, {id:'hugo', name:'Hugo'}, {id:'japan', name:'Japan'}, {id:'bauhaus', name:'Bauhaus'}, {id:'frame', name:'Frame'}
  ];

  const backgrounds = [
    { id: "white" as Background, name: "Белый", preview: "#ffffff" },
    { id: "wood" as Background, name: "Дерево", preview: backgroundWood },
    { id: "marble" as Background, name: "Мрамор", preview: backgroundMarble },
    { id: "fabric" as Background, name: "Ткань", preview: backgroundFabric },
    { id: "paper" as Background, name: "Бумага", preview: backgroundPaper },
  ];

  const shapes = SHAPES.map(s => ({ id: s.id as Shape, name: getShapeLabel(s.id, s.name), svg: s.svg }));

  const sizes = [
    { id: { w: 21, h: 30 }, name: "21×30 см", price: 2990, popular: false },
    { id: { w: 30, h: 40 }, name: "30×40 см", price: 4990, popular: true },
    { id: { w: 40, h: 50 }, name: "40×50 см", price: 7990, popular: false },
    { id: { w: 50, h: 70 }, name: "50×70 см", price: 12990, popular: false },
  ];

  const frames = [
    { id: "none" as Frame, name: "Без рамки", price: 0 },
    { id: "frame" as Frame, name: "Рамка", price: 1500 },
    { id: "hanger" as Frame, name: "Подвес", price: 2500 },
  ];

  // Search functionality
  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      try {
        const results = await debouncedGeocodeSearch(query);
        setSearchResults(results || []);
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectLocation = (result: GeocodeResult) => {
    const [newLng, newLat] = result.center;
    setLocation({ lng: newLng, lat: newLat, zoom: 11 });
    setSearchQuery(result.place_name);
    setSearchResults([]);
    
    // Update text based on location with safety checks
    const placeName = result.place_name || '';
    const titleText = placeName.split(',')[0] || 'Unknown Location';
    
    setText({
      title: titleText.toUpperCase(),
      subtitle: `${newLat.toFixed(4)}°N / ${newLng.toFixed(4)}°E`,
    });
  };

  // Export functionality
  const handleExport = async () => {
    if (!posterRef.current) return;
    
    setIsExporting(true);
    try {
      const posterElement = posterRef.current.getPosterElement();
      const mapHandle = posterRef.current.getMapHandle();
      
      if (!posterElement) throw new Error('Poster element not found');
      
      const dataUrl = await exportPoster(posterElement, mapHandle, {
        format: 'png',
        width: 2000,
        height: 2800,
      });
      
      downloadImage(dataUrl, `map-of-love-${title.toLowerCase().replace(/\s+/g, '-')}.png`);
      toast.success('Постер сохранён на устройство!');
    } catch (error) {
      console.error('Export failed:', error);
      toast.error('Ошибка при экспорте. Попробуйте ещё раз.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleAddToCart = async () => {
    if (!posterRef.current) return;
    
    try {
      const posterElement = posterRef.current.getPosterElement();
      const mapHandle = posterRef.current.getMapHandle();
      
      if (!posterElement) throw new Error('Poster element not found');
      
      // Generate thumbnail for cart
      const thumbnailUrl = await generateThumbnail(posterElement, mapHandle, 300);
      
      addItem({
        id: `poster_${Date.now()}`,
        name: `Персональная карта "${title || 'Без названия'}"`,
        price: price,
        image: thumbnailUrl,
        variant: `${size.w}×${size.h} см, ${frames.find(f => f.id === frame)?.name || 'без рамки'}`,
      });
      
      toast.success('Ваш дизайн добавлен в корзину!', {
        action: {
          label: "В корзину",
          onClick: () => openCart(),
        },
      });
    } catch (error) {
      console.error('Add to cart failed:', error);
      toast.error('Ошибка при добавлении в корзину. Попробуйте ещё раз.');
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case "background":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground">Select style</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {styles.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setStyle(s.id)}
                  className={`rounded-xl border px-3 py-3 bg-surface hover:bg-surface-hover transition ${style === s.id ? 'ring-2 ring-neon-red' : ''}`}
                  data-style-option={s.id}
                >
                  <div className="text-sm text-center">{s.name}</div>
                </button>
              ))}
            </div>

            <h3 className="text-xl font-semibold text-foreground">Select background</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {backgrounds.map((bg) => (
                <button
                  key={bg.id}
                  onClick={() => setBackground(bg.id)}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${background === bg.id ? 'border-neon-red bg-neon-red/10' : 'border-border/30 bg-surface hover:border-neon-red/50'}`}
                  data-background-option={bg.id}
                >
                  <div
                    className="h-20 rounded-lg border bg-cover bg-center"
                    style={bg.preview.startsWith('#') ? { backgroundColor: bg.preview } : { backgroundImage: `url(${bg.preview})` }}
                  />
                  <div className="mt-2 text-sm font-medium text-foreground">{bg.name}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case "location":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground">Set location</h3>
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search places: city, landmark, address..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="input-glass w-full pr-12"
                  data-coords-input
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neon-red hover:text-neon-red-dark transition-colors">
                  <Search className="w-5 h-5" />
                </button>

                {/* Search Results Dropdown */}
                {searchResults && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-surface rounded-xl border border-border/30 shadow-lg z-50 max-h-60 overflow-y-auto">
                    {searchResults.map((result) => (
                      <button
                        key={result.id}
                        onClick={() => handleSelectLocation(result)}
                        className="w-full px-4 py-3 text-left hover:bg-surface-hover transition-colors text-foreground"
                      >
                        <div className="text-sm font-medium">{result.place_name || 'Unknown Location'}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <p className="text-sm text-foreground-muted">
                ????????? ????? ? ?? ??????? ????? ?????????????.
              </p>
            </div>
          </div>
        );

      case "titles":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground">Text settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">???????? ?????????</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setText({ title: e.target.value })}
                  className="input-glass w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">????? ??? ??????</label>
                <input
                  type="text"
                  value={divider}
                  onChange={(e) => setText({ divider: e.target.value })}
                  className="input-glass w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">????</label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setText({ date: e.target.value })}
                  className="input-glass w-full"
                  placeholder="01.01.2025"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">??????????</label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setText({ subtitle: e.target.value })}
                  className="input-glass w-full"
                />
              </div>

              {/* Text Visibility */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Button variant={showTitle ? "default" : "outline"} onClick={toggleShowTitle}>?????????</Button>
                <Button variant={showNameCity ? "default" : "outline"} onClick={toggleShowNameCity}>?????/??????</Button>
                <Button variant={showDate ? "default" : "outline"} onClick={toggleShowDate}>????</Button>
                <Button variant={showCoords ? "default" : "outline"} onClick={toggleShowCoords}>??????????</Button>
              </div>
            </div>
          </div>
        );

      case "theme":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground">Select theme</h3>
            <div className="grid grid-cols-4 gap-3">
              {themes.map((themeOption) => (
                <button
                  key={themeOption.id}
                  onClick={() => setTheme(themeOption.id)}
                  className={`aspect-square rounded-2xl bg-gradient-to-br ${themeOption.color} relative group transition-all duration-300 ${
                    theme === themeOption.id
                      ? 'ring-4 ring-neon-red scale-105'
                      : 'hover:scale-105'
                  }`}
                  data-theme-swatch={themeOption.id}
                >
                  <div className="absolute inset-0 rounded-2xl bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-xs font-medium">{themeOption.name}</span>
                  </div>
                </button>
              ))}
            </div>
            <p className="text-sm text-foreground-muted">
              ????????? ???????? ????? ??????? ? ???? ????.
            </p>
          </div>
        );

      case "shape":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground">Select mask</h3>
            <div className="max-h-80 overflow-y-auto pr-2">
              <div className="grid grid-cols-4 gap-2">
                {shapes.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setShape(s.id as Shape)}
                    className={`group rounded-xl border px-2 py-2 bg-surface hover:bg-surface-hover transition ${shape === s.id ? 'ring-2 ring-neon-red' : ''}`}
                  >
                    <div className="w-full aspect-square flex items-center justify-center overflow-hidden">
                      <div className="w-12 h-12 [&_svg]:w-full [&_svg]:h-full" dangerouslySetInnerHTML={{ __html: s.svg }} />
                    </div>
                    <div className="mt-1 text-center text-xs opacity-80 line-clamp-1">{s.name}</div>
                  </button>
                ))}
              </div>
            </div>
            <p className="text-sm text-foreground-muted">
              ????? ???????? ??????????? ?????????? ???????.
            </p>
          </div>
        );

      case "size":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground">Select size and frame</h3>

            {/* Size */}
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">??????</h4>
              <div className="grid grid-cols-1 gap-3">
                {sizes.map((sizeOption) => (
                  <button
                    key={`${sizeOption.id.w}x${sizeOption.id.h}`}
                    onClick={() => {
                      setSize(sizeOption.id);
                      recalcPrice();
                    }}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      size.w === sizeOption.id.w && size.h === sizeOption.id.h
                        ? 'border-neon-red bg-neon-red/10'
                        : 'border-border/30 bg-surface-hover hover:border-neon-red/50'
                    }`}
                    data-size-option={`${sizeOption.id.w}x${sizeOption.id.h}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-semibold text-foreground">{sizeOption.name}</div>
                        {sizeOption.popular && (
                          <span className="text-xs uppercase tracking-wide text-neon-red">??????????</span>
                        )}
                      </div>
                      <div className="text-sm text-foreground-muted">
                        {sizeOption.price.toLocaleString('ru-RU')} ?
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Orientation */}
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">??????????</h4>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setOrientation('portrait')}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    orientation === 'portrait'
                      ? 'border-neon-red bg-neon-red/10'
                      : 'border-border/30 bg-surface-hover hover:border-neon-red/50'
                  }`}
                  data-orientation="portrait"
                >
                  <div className="w-8 h-10 bg-current mx-auto mb-2 rounded opacity-50" />
                  <div className="text-sm font-medium">???????</div>
                </button>
                <button
                  onClick={() => setOrientation('landscape')}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    orientation === 'landscape'
                      ? 'border-neon-red bg-neon-red/10'
                      : 'border-border/30 bg-surface-hover hover:border-neon-red/50'
                  }`}
                  data-orientation="landscape"
                >
                  <div className="w-10 h-8 bg-current mx-auto mb-2 rounded opacity-50" />
                  <div className="text-sm font-medium">??????</div>
                </button>
              </div>
            </div>

            {/* Frame */}
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">?????</h4>
              <div className="space-y-2">
                {frames.map((frameOption) => (
                  <button
                    key={frameOption.id}
                    onClick={() => {
                      setFrame(frameOption.id);
                      recalcPrice();
                    }}
                    className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                      frame === frameOption.id
                        ? 'border-neon-red bg-neon-red/10'
                        : 'border-border/30 bg-surface-hover hover:border-neon-red/50'
                    }`}
                    data-frame-option={frameOption.id}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-foreground">{frameOption.name}</span>
                      <span className="text-neon-red font-semibold">
                        {frameOption.price === 0 ? '0 ?' : `+${frameOption.price.toLocaleString('ru-RU')} ?`}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
            Конструктор <span className="text-neon-red">персональных карт</span>
          </h1>
          <p className="text-foreground-muted">
            Создайте уникальную карту своего особенного места
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
          {/* Steps Sidebar */}
          <div className="lg:col-span-3">
            <div className="bg-surface rounded-xl p-6 sticky top-24">
              <h3 className="font-semibold text-foreground mb-6">Этапы создания</h3>
              <div className="space-y-2">
                {steps.map((step, index) => (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(step.id)}
                    className={`w-full flex items-center space-x-3 p-4 rounded-xl text-left transition-all duration-300 ${
                      activeStep === step.id
                        ? 'bg-neon-red text-white shadow-neon'
                        : 'text-foreground-muted hover:text-foreground hover:bg-surface-hover'
                    }`}
                  >
                    <div className={`flex-shrink-0 ${
                      activeStep === step.id ? 'text-white' : 'text-neon-red'
                    }`}>
                      {step.icon}
                    </div>
                    <div>
                      <div className="font-medium">{step.name}</div>
                      <div className="text-xs opacity-70">Шаг {index + 1}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Preview Area */}
          <div className="lg:col-span-6">
            <div className="bg-surface rounded-xl p-8 min-h-[600px] flex items-center justify-center">
              <PosterPreview ref={posterRef} className="w-full" />
            </div>
          </div>

          {/* Controls Panel */}
          <div className="lg:col-span-3">
            <div className="bg-surface rounded-xl p-6 space-y-6">
              {renderStepContent()}
              
              {/* Export Button */}
              <div className="pt-4 border-t border-border/30">
                <Button
                  onClick={handleExport}
                  disabled={isExporting}
                  variant="outline"
                  className="w-full"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {isExporting ? 'Экспорт...' : 'Скачать превью'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-surface glass border-t border-border/30 p-4 z-40">
          <div className="container mx-auto flex items-center justify-between">
            <div className="text-foreground">
              <div className="text-sm text-foreground-muted">Цена:</div>
              <div className="text-2xl font-bold text-neon-red">
                {price.toLocaleString('ru-RU')} ₽
              </div>
            </div>
            
            <Button 
              onClick={handleAddToCart}
              className="text-lg px-8 py-4"
              data-add-config-to-cart
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Добавить в корзину
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};