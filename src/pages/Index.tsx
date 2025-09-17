import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, ShoppingBag, Star, Truck, Shield, RotateCcw, Zap, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
interface ProductImage {
  id: string;
  url: string;
  alt: string;
}
interface Product {
  id: string;
  name: string;
  artist: string;
  price: number;
  originalPrice?: number;
  images: ProductImage[];
  description: string;
  category: string;
  size: string[];
  materials: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  estimatedDelivery: string;
}
interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}
export default function ProductPage() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('30x40');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');
  
  const { addItem, openCart } = useCart();

  // Mock product data
  const product: Product = {
    id: id || '1',
    name: 'Crimson Dreams',
    artist: 'Elena Vasquez',
    price: 7990,
    originalPrice: 9990,
    images: [{
      id: '1',
      url: '/api/placeholder/600/800',
      alt: 'Crimson Dreams - основное изображение'
    }, {
      id: '2',
      url: '/api/placeholder/600/800',
      alt: 'Crimson Dreams - детализированный вид'
    }, {
      id: '3',
      url: '/api/placeholder/600/800',
      alt: 'Crimson Dreams - в интерьере'
    }],
    description: 'Эта картина представляет собой уникальное произведение искусства, созданное специально для вас. Яркие оттенки красного создают атмосферу страсти и романтики, идеально подходящую для спальни или гостиной.',
    category: 'Карты мест',
    size: ['21x30', '30x40', '40x50', '50x70'],
    materials: ['Холст', 'Масляные краски', 'Деревянная рамка'],
    rating: 4.9,
    reviews: 127,
    inStock: true,
    estimatedDelivery: '5-7 дней'
  };
  const reviews: Review[] = [{
    id: '1',
    author: 'Анна К.',
    rating: 5,
    date: '2024-01-15',
    comment: 'Потрясающая работа! Качество превзошло все ожидания. Очень довольна покупкой.',
    verified: true
  }, {
    id: '2',
    author: 'Михаил П.',
    rating: 4,
    date: '2024-01-10',
    comment: 'Красивая картина, хорошее качество. Доставили быстро и аккуратно упаковали.',
    verified: true
  }, {
    id: '3',
    author: 'Елена С.',
    rating: 5,
    date: '2024-01-08',
    comment: 'Заказывала в подарок мужу. Он в восторге! Смотрится очень стильно в нашей гостиной.',
    verified: true
  }];
  const sizeOptions = [{
    id: '21x30',
    name: '21×30 см',
    price: 4990
  }, {
    id: '30x40',
    name: '30×40 см',
    price: 7990
  }, {
    id: '40x50',
    name: '40×50 см',
    price: 12990
  }, {
    id: '50x70',
    name: '50×70 см',
    price: 18990
  }];
  const getCurrentPrice = () => {
    const basePrice = sizeOptions.find(s => s.id === selectedSize)?.price || product.price;
    return basePrice * quantity;
  };
  
  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: getCurrentPrice() / quantity, // Individual item price
      image: product.images[0]?.url || '',
      variant: `${selectedSize} см`,
    });
    
    toast.success(`${product.name} добавлен в корзину!`, {
      action: {
        label: "В корзину",
        onClick: () => openCart(),
      },
    });
  };
  return <div className="min-h-screen pt-20 bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/products" className="inline-flex items-center text-foreground-muted hover:text-neon-red transition-colors mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Вернуться к каталогу
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-[4/5] bg-surface rounded-xl overflow-hidden">
              <img src={product.images[selectedImage]?.url} alt={product.images[selectedImage]?.alt} className="w-full h-full object-cover" />
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="flex space-x-4">
              {product.images.map((image, index) => <button key={image.id} onClick={() => setSelectedImage(index)} className={`aspect-square w-20 bg-surface rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === index ? 'border-neon-red' : 'border-transparent hover:border-border'}`}>
                  <img src={image.url} alt={image.alt} className="w-full h-full object-cover" />
                </button>)}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm text-neon-red font-medium">{product.category}</span>
                {!product.inStock && <span className="text-sm text-warning bg-warning/10 px-2 py-1 rounded-full">
                    Под заказ
                  </span>}
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-2">
                {product.name}
              </h1>
              
              <p className="text-foreground-muted mb-4">
                by {product.artist}
              </p>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-6">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map(star => <Star key={star} className={`w-5 h-5 ${star <= Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />)}
                </div>
                <span className="font-semibold text-foreground">{product.rating}</span>
                <span className="text-foreground-muted">({product.reviews} отзывов)</span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                {product.originalPrice && <span className="text-xl text-foreground-muted line-through">
                    {product.originalPrice.toLocaleString('ru-RU')} ₽
                  </span>}
                <span className="text-3xl font-bold text-neon-red">
                  {getCurrentPrice().toLocaleString('ru-RU')} ₽
                </span>
              </div>
              {product.originalPrice && <div className="text-sm text-success">
                  Скидка {Math.round((1 - product.price / product.originalPrice) * 100)}%
                </div>}
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Размер</h3>
              <div className="grid grid-cols-2 gap-2">
                {sizeOptions.map(size => <button key={size.id} onClick={() => setSelectedSize(size.id)} className={`p-3 rounded-lg border-2 text-left transition-all ${selectedSize === size.id ? 'border-neon-red bg-neon-red/10' : 'border-border/30 bg-surface-hover hover:border-neon-red/50'}`}>
                    <div className="font-medium text-foreground">{size.name}</div>
                    <div className="text-sm text-neon-red">{size.price.toLocaleString('ru-RU')} ₽</div>
                  </button>)}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Количество</h3>
              <div className="flex items-center space-x-4">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 rounded-full border border-border/30 flex items-center justify-center hover:bg-surface-hover transition-colors">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-semibold text-foreground text-lg">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 rounded-full border border-border/30 flex items-center justify-center hover:bg-surface-hover transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex space-x-4">
                <Button className="flex-1 py-4" onClick={handleAddToCart} data-add-to-cart>
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Добавить в корзину
                </Button>
                <Button variant="outline" className="p-4">
                  <Heart className="w-5 h-5" />
                </Button>
              </div>
              
              <Link to="/constructor" className="w-full">
                <Button variant="outline" className="w-full py-4">
                  <Zap className="w-5 h-5 mr-2" />
                  Открыть конструктор с этим стилем
                </Button>
              </Link>
            </div>

            {/* Delivery Info */}
            <div className="bg-surface rounded-xl p-6 space-y-4">
              <h3 className="font-semibold text-foreground flex items-center">
                <Truck className="w-5 h-5 mr-2 text-neon-red" />
                Информация о доставке
              </h3>
              <div className="grid gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-foreground-muted">Срок доставки:</span>
                  <span className="text-foreground">{product.estimatedDelivery}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground-muted">Доставка по России:</span>
                  <span className="text-success">От 99 рублей</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="border-t border-border/30 pt-12">
          <div className="flex space-x-8 mb-8">
            {[{
            id: 'description',
            label: 'Описание'
          }, {
            id: 'specs',
            label: 'Характеристики'
          }, {
            id: 'reviews',
            label: `Отзывы (${product.reviews})`
          }].map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`pb-2 border-b-2 transition-colors ${activeTab === tab.id ? 'border-neon-red text-neon-red' : 'border-transparent text-foreground-muted hover:text-foreground'}`}>
                {tab.label}
              </button>)}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {activeTab === 'description' && <div className="prose prose-invert max-w-none">
                  <p className="text-foreground-muted leading-relaxed text-lg">
                    {product.description}
                  </p>
                  
                  <div className="mt-8 grid md:grid-cols-3 gap-6">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-8 h-8 text-neon-red" />
                      <div>
                        <h4 className="font-semibold text-foreground">Гарантия качества</h4>
                        <p className="text-sm text-foreground-muted">Качественная упаковка</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Truck className="w-8 h-8 text-neon-red" />
                      <div>
                        <h4 className="font-semibold text-foreground">Быстрая доставка</h4>
                        <p className="text-sm text-foreground-muted">По всей России</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RotateCcw className="w-8 h-8 text-neon-red" />
                      <div>
                        <h4 className="font-semibold text-foreground">Обмен и возврат</h4>
                        <p className="text-sm text-foreground-muted">В течение 14 дней</p>
                      </div>
                    </div>
                  </div>
                </div>}

              {activeTab === 'specs' && <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-foreground mb-4">Технические характеристики</h3>
                    <div className="grid gap-3">
                      <div className="flex justify-between py-2 border-b border-border/30">
                        <span className="text-foreground-muted">Категория:</span>
                        <span className="text-foreground">{product.category}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-border/30">
                        <span className="text-foreground-muted">Материалы:</span>
                        <span className="text-foreground">{product.materials.join(', ')}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-border/30">
                        <span className="text-foreground-muted">Доступные размеры:</span>
                        <span className="text-foreground">{product.size.join(', ')} см</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-foreground-muted">Автор:</span>
                        <span className="text-foreground">{product.artist}</span>
                      </div>
                    </div>
                  </div>
                </div>}

              {activeTab === 'reviews' && <div className="space-y-6">
                  {reviews.map(review => <div key={review.id} className="bg-surface rounded-xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-semibold text-foreground">{review.author}</span>
                            {review.verified && <span className="text-xs bg-success/20 text-success px-2 py-1 rounded-full">
                                Проверено
                              </span>}
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map(star => <Star key={star} className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />)}
                            </div>
                            <span className="text-sm text-foreground-muted">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-foreground-muted leading-relaxed">
                        {review.comment}
                      </p>
                    </div>)}
                </div>}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-surface rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4">Похожие товары</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map(item => <Link key={item} to={`/products/${item + 10}`} className="flex space-x-3 group">
                      <div className="w-16 h-20 bg-surface-hover rounded-lg overflow-hidden">
                        <img src="/api/placeholder/64/80" alt="Похожий товар" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground group-hover:text-neon-red transition-colors">
                          Midnight Blues
                        </h4>
                        <p className="text-sm text-foreground-muted">by Artist Name</p>
                        <p className="text-sm font-semibold text-neon-red mt-1">
                          {(5990 + item * 1000).toLocaleString('ru-RU')} ₽
                        </p>
                      </div>
                    </Link>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
}