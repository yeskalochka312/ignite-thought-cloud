import { X, ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "./button";
import { useNavigate } from "react-router-dom";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onRemoveItem?: (id: string) => void;
  onCheckout?: () => void;
}

export const CartDrawer = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}: CartDrawerProps) => {
  const navigate = useNavigate();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    onCheckout?.();
    navigate('/checkout');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div 
        className="fixed right-0 top-0 h-full w-full max-w-md bg-surface glass border-l border-border/30 z-50 animate-slide-in-right"
        data-cart-drawer
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border/30">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-neon-red" />
              <h2 className="text-xl font-serif font-semibold text-foreground">
                Корзина ({itemCount})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-foreground-muted hover:text-foreground transition-colors"
              aria-label="Закрыть корзину"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="w-16 h-16 text-foreground-muted mb-4 opacity-50" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Корзина пуста
                </h3>
                <p className="text-foreground-muted">
                  Добавьте товары из каталога или создайте свой дизайн в конструкторе
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="bg-surface-hover rounded-lg p-4 space-y-3">
                    <div className="flex space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground text-sm truncate">
                          {item.name}
                        </h3>
                        {item.variant && (
                          <p className="text-xs text-foreground-muted mt-1">
                            {item.variant}
                          </p>
                        )}
                        <p className="text-neon-red font-semibold mt-2">
                          {item.price.toLocaleString('ru-RU')} ₽
                        </p>
                      </div>
                      <button
                        onClick={() => onRemoveItem?.(item.id)}
                        className="p-1 text-foreground-muted hover:text-neon-red transition-colors"
                        aria-label="Удалить товар"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onUpdateQuantity?.(item.id, Math.max(0, item.quantity - 1))}
                          className="w-8 h-8 rounded-full bg-surface border border-border/30 flex items-center justify-center hover:bg-surface-hover transition-colors"
                          aria-label="Уменьшить количество"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center font-semibold text-foreground">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity?.(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-surface border border-border/30 flex items-center justify-center hover:bg-surface-hover transition-colors"
                          aria-label="Увеличить количество"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="font-semibold text-foreground">
                        {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-border/30 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-foreground">Итого:</span>
                <span className="text-xl font-bold text-neon-red">
                  {total.toLocaleString('ru-RU')} ₽
                </span>
              </div>
              
              <Button 
                className="w-full h-12 font-semibold"
                onClick={handleCheckout}
              >
                Оформить заказ
              </Button>
              
              <p className="text-xs text-foreground-muted text-center">
                Доставка по России • Безопасная оплата
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};