import { useState, useEffect } from "react";
import { Filter, Grid, List, Heart, ShoppingBag, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useSearchParams } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  artist: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  size: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isBestseller?: boolean;
}

export const Products = () => {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popular');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;
  
  const { addItem, openCart } = useCart();

  // Handle URL parameters on component mount
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl && ['maps', 'stars', 'jewelry'].includes(categoryFromUrl)) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [searchParams]);

  const categories = [
    { id: 'all', name: 'Все товары', count: 18 },
    { id: 'maps', name: 'Карты', count: 10 },
    { id: 'stars', name: 'Звёзды', count: 5 },
    { id: 'jewelry', name: 'Кулоны', count: 3 },
  ];

  const sortOptions = [
    { value: 'popular', label: 'По популярности' },
    { value: 'price-low', label: 'Сначала дешевле' },
    { value: 'price-high', label: 'Сначала дороже' },
    { value: 'newest', label: 'Новинки' },
    { value: 'rating', label: 'По рейтингу' },
  ];

  const allProducts: Product[] = [
    // Страница 1
    {
      id: '1',
      name: 'Where She Said Yes',
      artist: 'Elena Vasquez',
      price: 7990,
      originalPrice: 9990,
      image: '/lovable-uploads/0ca5f333-17fd-427b-bcd0-87f71dd6983d.png',
      category: 'maps',
      size: '30×40 см',
      rating: 4.9,
      reviews: 127,
      isBestseller: true,
    },
    {
      id: '2',
      name: 'Our Love Story',
      artist: 'Marcus Chen',
      price: 12990,
      image: '/lovable-uploads/0ca5f333-17fd-427b-bcd0-87f71dd6983d.png',
      category: 'maps',
      size: '50×70 см',
      rating: 4.8,
      reviews: 89,
      isNew: true,
    },
    {
      id: '3',
      name: 'Romantic Journey',
      artist: 'Sarah Thompson',
      price: 15990,
      image: '/lovable-uploads/0ca5f333-17fd-427b-bcd0-87f71dd6983d.png',
      category: 'stars',
      size: '40×50 см',
      rating: 4.9,
      reviews: 156,
    },
    {
      id: '4',
      name: 'Golden Constellation',
      artist: 'David Rodriguez',
      price: 8990,
      image: '/lovable-uploads/0ca5f333-17fd-427b-bcd0-87f71dd6983d.png',
      category: 'stars',
      size: '30×40 см',
      rating: 4.7,
      reviews: 203,
    },
    {
      id: '5',
      name: 'Love Coordinates',
      artist: 'Maria Ivanova',
      price: 3990,
      image: '/lovable-uploads/0ca5f333-17fd-427b-bcd0-87f71dd6983d.png',
      category: 'jewelry',
      size: 'Кулон',
      rating: 4.9,
      reviews: 87,
      isBestseller: true,
    },
    {
      id: '6',
      name: 'Eternal Moment',
      artist: 'Alessandro Rossi',
      price: 18990,
      image: '/lovable-uploads/0ca5f333-17fd-427b-bcd0-87f71dd6983d.png',
      category: 'maps',
      size: '70×100 см',
      rating: 5.0,
      reviews: 42,
      isNew: true,
    },
    // Страница 2
    {
      id: '7',
      name: 'First Date Memory',
      artist: 'Anna Petrov',
      price: 6990,
      image: '/lovable-uploads/0ca5f333-17fd-427b-bcd0-87f71dd6983d.png',
      category: 'maps',
      size: '30×40 см',
      rating: 4.6,
      reviews: 95,
    },
    {
      id: '8',
      name: 'Wedding Venue',
      artist: 'Igor Volkov',
      price: 14990,
      image: '/lovable-uploads/0ca5f333-17fd-427b-bcd0-87f71dd6983d.png',
      category: 'maps',
      size: '50×70 см',
      rating: 4.8,
      reviews: 156,
      isBestseller: true,
    },
    {
      id: '9',
      name: 'Honeymoon Stars',
      artist: 'Svetlana Korol',
      price: 11990,
      image: '/lovable-uploads/0ca5f333-17fd-427b-bcd0-87f71dd6983d.png',
      category: 'stars',
      size: '40×50 см',
      rating: 4.7,
      reviews: 78,
    },
    {
      id: '10',
      name: 'Anniversary Night',
      artist: 'Pavel Smirnov',
      price: 9990,
      image: '/lovable-uploads/0ca5f333-17fd-427b-bcd0-87f71dd6983d.png',
      category: 'stars',
      size: '30×40 см',
      rating: 4.9,
      reviews: 134,
      isNew: true,
    },
    {
      id: '11',
      name: 'Heart Pendant',
      artist: 'Olga Belova',
      price: 4990,
      image: '/lovable-uploads/0ca5f333-17fd-427b-bcd0-87f71dd6983d.png',
      category: 'jewelry',
      size: 'Кулон',
      rating: 4.8,
      reviews: 67,
    },
    {
      id: '12',
      name: 'Promise Ring Map',
      artist: 'Denis Orlov',
      price: 16990,
      image: '/lovable-uploads/0ca5f333-17fd-427b-bcd0-87f71dd6983d.png',
      category: 'maps',
      size: '60×80 см',
      rating: 5.0,
      reviews: 23,
      isNew: true,
    },
    // Страница 3
    {
      id: '13',
      name: 'Family Home',
      artist: 'Katya Morozova',
      price: 8990,
      image: '/lovable-uploads/0ca5f333-17fd-427b-bcd0-87f71dd6983d.png',
      category: 'maps',
      size: '30×40 см',
      rating: 4.7,
      reviews: 112,
    },
    {
      id: '14',
      name: 'Travel Dreams',
      artist: 'Alex Popov',
      price: 13990,
      image: '/lovable-uploads/0ca5f333-17fd-427b-bcd0-87f71dd6983d.png',
      category: 'maps',
      size: '50×70 см',
      rating: 4.6,
      reviews: 89,
      isBestseller: true,
    },
    {
      id: '15',
      name: 'Birth Star Chart',
      artist: 'Marina Kozlova',
      price: 10990,
      image: '/lovable-uploads/0ca5f333-17fd-427b-bcd0-87f71dd6983d.png',
      category: 'stars',
      size: '40×50 см',
      rating: 4.8,
      reviews: 145,
    },
    {
      id: '16',
      name: 'Destiny Stars',
      artist: 'Roman Fedorov',
      price: 12990,
      image: '/lovable-uploads/0ca5f333-17fd-427b-bcd0-87f71dd6983d.png',
      category: 'stars',
      size: '50×60 см',
      rating: 4.9,
      reviews: 98,
    },
    {
      id: '17',
      name: 'Coordinates Necklace',
      artist: 'Lena Voronova',
      price: 5990,
      image: '/lovable-uploads/0ca5f333-17fd-427b-bcd0-87f71dd6983d.png',
      category: 'jewelry',
      size: 'Кулон',
      rating: 4.7,
      reviews: 156,
      isNew: true,
    },
    {
      id: '18',
      name: 'Grand Adventure',
      artist: 'Viktor Stepanov',
      price: 19990,
      image: '/lovable-uploads/0ca5f333-17fd-427b-bcd0-87f71dd6983d.png',
      category: 'maps',
      size: '70×100 см',
      rating: 5.0,
      reviews: 34,
      isBestseller: true,
    },
  ];

  const filteredProducts = allProducts.filter(product => 
    (selectedCategory === 'all' || product.category === selectedCategory) &&
    product.price >= priceRange[0] && 
    product.price <= priceRange[1]
  );

  // Пагинация
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const products = filteredProducts.slice(startIndex, endIndex);

  // Сброс на первую страницу при изменении фильтров
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (newRange: [number, number]) => {
    setPriceRange(newRange);
    setCurrentPage(1);
  };
  
  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    
    toast.success(`${product.name} добавлен в корзину!`, {
      action: {
        label: "В корзину",
        onClick: () => openCart(),
      },
    });
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="py-12">
          <div className="text-center space-y-4" data-animate>
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-foreground">
              Каталог <span className="text-neon-red">товаров</span>
            </h1>
            <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
              Готовые работы наших художников или создайте свой уникальный дизайн в конструкторе
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-surface rounded-xl p-6 sticky top-24 space-y-6">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-neon-red" />
                <h3 className="font-semibold text-foreground">Фильтры</h3>
              </div>

              {/* Categories */}
              <div className="space-y-3">
                <h4 className="font-medium text-foreground">Категории</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                     <button
                       key={category.id}
                       onClick={() => handleCategoryChange(category.id)}
                       className={`w-full flex justify-between items-center p-3 rounded-lg transition-colors ${
                         selectedCategory === category.id
                           ? 'bg-neon-red text-white'
                           : 'text-foreground-muted hover:bg-surface-hover'
                       }`}
                       data-filter={category.id}
                     >
                      <span>{category.name}</span>
                      <span className="text-sm">{category.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-3">
                <h4 className="font-medium text-foreground">Цена</h4>
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <input
                       type="number"
                       placeholder="От"
                       value={priceRange[0]}
                       onChange={(e) => handlePriceRangeChange([parseInt(e.target.value) || 0, priceRange[1]])}
                       className="input-glass w-full text-sm"
                       data-price-range="min"
                     />
                     <input
                       type="number"
                       placeholder="До"
                       value={priceRange[1]}
                       onChange={(e) => handlePriceRangeChange([priceRange[0], parseInt(e.target.value) || 50000])}
                       className="input-glass w-full text-sm"
                       data-price-range="max"
                     />
                  </div>
                  <div className="flex justify-between text-xs text-foreground-muted">
                    <span>0 ₽</span>
                    <span>50 000 ₽</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-3">
                <Button 
                  className="w-full"
                  data-open-constructor
                >
                  Создать свой дизайн
                </Button>
                <button className="w-full text-sm text-foreground-muted hover:text-neon-red transition-colors">
                  Сбросить фильтры
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div className="flex items-center space-x-4">
                <span className="text-foreground-muted">
                  Показано: <span className="font-semibold text-foreground">{startIndex + 1}-{Math.min(endIndex, filteredProducts.length)}</span> из <span className="font-semibold text-foreground">{filteredProducts.length}</span> товаров
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid' ? 'bg-neon-red text-white' : 'text-foreground-muted hover:bg-surface-hover'
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'list' ? 'bg-neon-red text-white' : 'text-foreground-muted hover:bg-surface-hover'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-glass min-w-48"
                data-sort
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Products List */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map((product, index) => (
                <Link to={`/products/${product.id}`} key={product.id}>
                  <div
                    className="group bg-surface rounded-xl overflow-hidden card-hover"
                    style={{ animationDelay: `${index * 100}ms` }}
                    data-animate
                  >
                    {/* Product Image */}
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {product.isNew && (
                          <span className="bg-neon-red text-white text-xs font-bold px-3 py-1 rounded-full">
                            NEW
                          </span>
                        )}
                        {product.isBestseller && (
                          <span className="bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                            HIT
                          </span>
                        )}
                      </div>

                      {/* Wishlist Button */}
                      <button 
                        onClick={(e) => e.preventDefault()}
                        className="absolute top-4 right-4 p-2 bg-background/80 backdrop-blur-sm rounded-full text-foreground-muted hover:text-neon-red transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Heart className="w-4 h-4" />
                      </button>

                      {/* Quick Add Overlay */}
                      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button 
                          onClick={(e) => handleAddToCart(product, e)}
                          className="transform scale-90 group-hover:scale-100 transition-transform"
                          data-add-to-cart={product.id}
                        >
                          <ShoppingBag className="w-4 h-4 mr-2" />
                          В корзину
                        </Button>
                      </div>
                    </div>

                  {/* Product Info */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground group-hover:text-neon-red transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-sm text-foreground-muted">
                          by {product.artist}
                        </p>
                        <p className="text-sm text-foreground-muted mt-1">
                          {product.size}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium text-foreground">
                            {product.rating}
                          </span>
                          <span className="text-xs text-foreground-muted">
                            ({product.reviews})
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {product.originalPrice && (
                          <span className="text-sm text-foreground-muted line-through">
                            {product.originalPrice.toLocaleString('ru-RU')} ₽
                          </span>
                        )}
                        <span className="text-xl font-bold text-neon-red">
                          {product.price.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                      
                      <Button 
                        onClick={(e) => handleAddToCart(product, e)}
                        variant="outline" 
                        size="sm" 
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        data-add-to-cart={product.id}
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border border-border/30 text-foreground-muted hover:bg-surface-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Предыдущая
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button 
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      currentPage === page 
                        ? 'bg-neon-red text-white' 
                        : 'border border-border/30 text-foreground-muted hover:bg-surface-hover'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button 
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border border-border/30 text-foreground-muted hover:bg-surface-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Следующая
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};