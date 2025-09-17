import { useState } from "react";
import { CreditCard, Percent, Package, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";

interface CheckoutForm {
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  address?: string;
  messenger: 'telegram' | 'whatsapp' | 'vk' | '';
  promoCode: string;
  paymentOption: 'prepayment' | 'full';
}

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
}

export const Checkout = () => {
  const navigate = useNavigate();
  const { items: cartItems, total: cartTotal, clearCart } = useCart();
  
  // Redirect if cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-20 bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Корзина пуста</h1>
          <p className="text-foreground-muted mb-6">Добавьте товары в корзину для оформления заказа</p>
          <Button onClick={() => navigate('/products')}>
            Перейти к покупкам
          </Button>
        </div>
      </div>
    );
  }

  const [form, setForm] = useState<CheckoutForm>({
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
    address: '',
    messenger: '',
    promoCode: '',
    paymentOption: 'prepayment',
  });

  const [promoApplied, setPromoApplied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Use actual cart items instead of mock data
  const orderItems = cartItems;
  const subtotal = cartTotal;
  const promoDiscount = promoApplied ? Math.floor(subtotal * 0.1) : 0;
  const paymentDiscount = form.paymentOption === 'full' ? Math.floor(subtotal * 0.05) : 0;
  const delivery = 0; // Free delivery
  const total = subtotal - promoDiscount - paymentDiscount + delivery;

  const updateForm = (updates: Partial<CheckoutForm>) => {
    setForm(prev => ({ ...prev, ...updates }));
  };

  const applyPromoCode = () => {
    if (form.promoCode.toLowerCase() === 'love10') {
      setPromoApplied(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Clear cart after successful order
    clearCart();
    setIsProcessing(false);
    
    // Redirect to success page or show success message
    console.log('Order placed successfully!', { form, orderItems, total });
  };

  const messengers = [
    { id: 'telegram', name: 'Telegram', icon: '📱' },
    { id: 'whatsapp', name: 'WhatsApp', icon: '📱' },
    { id: 'vk', name: 'ВКонтакте', icon: '🌐' },
  ];

  return (
    <div className="min-h-screen pt-20 bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
              Оформление <span className="text-neon-red">заказа</span>
            </h1>
            <p className="text-foreground-muted">
              Заполните данные для доставки и выберите способ оплаты
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Form */}
            <div className="lg:col-span-2 space-y-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Info */}
                <div className="bg-surface rounded-xl p-6 space-y-6">
                  <h2 className="text-xl font-serif font-semibold text-foreground flex items-center">
                    <Package className="w-6 h-6 text-neon-red mr-3" />
                    Контактные данные
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Имя *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.firstName}
                        onChange={(e) => updateForm({ firstName: e.target.value })}
                        className="input-glass w-full"
                        placeholder="Введите ваше имя"
                        data-checkout-name
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Фамилия *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.lastName}
                        onChange={(e) => updateForm({ lastName: e.target.value })}
                        className="input-glass w-full"
                        placeholder="Введите вашу фамилию"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Номер телефона *
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => updateForm({ phone: e.target.value })}
                      className="input-glass w-full"
                      placeholder="+7 (999) 123-45-67"
                      data-checkout-phone
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Город доставки *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.city}
                      onChange={(e) => updateForm({ city: e.target.value })}
                      className="input-glass w-full"
                      placeholder="Москва, Санкт-Петербург, Казань..."
                      data-checkout-city
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Адрес (опционально)
                    </label>
                    <input
                      type="text"
                      value={form.address}
                      onChange={(e) => updateForm({ address: e.target.value })}
                      className="input-glass w-full"
                      placeholder="Улица, дом, квартира"
                    />
                  </div>
                </div>

                {/* Messenger Selection */}
                <div className="bg-surface rounded-xl p-6 space-y-6">
                  <h2 className="text-xl font-serif font-semibold text-foreground flex items-center">
                    <MessageCircle className="w-6 h-6 text-neon-red mr-3" />
                    Способ связи
                  </h2>
                  
                  <div className="space-y-4">
                    <p className="text-foreground-muted text-sm">
                      Выберите мессенджер для связи по заказу
                    </p>
                    
                  <div className="grid grid-cols-3 gap-4">
                    {messengers.map((messenger) => (
                      <button
                        key={messenger.id}
                        type="button"
                        onClick={() => updateForm({ messenger: messenger.id as any })}
                        className={`p-4 rounded-xl border-2 text-center transition-all duration-300 ${
                          form.messenger === messenger.id
                            ? 'border-neon-red bg-neon-red/10'
                            : 'border-border/30 bg-surface-hover hover:border-neon-red/50'
                        }`}
                        data-checkout-messenger={messenger.id}
                      >
                        <div className="text-2xl mb-2">{messenger.icon}</div>
                        <div className="text-sm font-medium text-foreground">
                          {messenger.name}
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  {form.messenger && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {form.messenger === 'telegram' && 'Ваш никнейм в Telegram'}
                        {form.messenger === 'whatsapp' && 'Ссылка на WhatsApp или номер телефона'}
                        {form.messenger === 'vk' && 'Ссылка на профиль ВКонтакте'}
                      </label>
                      <input
                        type="text"
                        value={form.address || ''}
                        onChange={(e) => updateForm({ address: e.target.value })}
                        className="input-glass w-full"
                        placeholder={
                          form.messenger === 'telegram' ? '@username' :
                          form.messenger === 'whatsapp' ? 'https://wa.me/79001234567 или +7 900 123-45-67' :
                          form.messenger === 'vk' ? 'https://vk.com/username' : ''
                        }
                        data-messenger-contact
                      />
                    </div>
                  )}
                  </div>
                </div>

                {/* Promo Code */}
                <div className="bg-surface rounded-xl p-6 space-y-4">
                  <h2 className="text-xl font-serif font-semibold text-foreground flex items-center">
                    <Percent className="w-6 h-6 text-neon-red mr-3" />
                    Промокод
                  </h2>
                  
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      value={form.promoCode}
                      onChange={(e) => updateForm({ promoCode: e.target.value })}
                      className="input-glass flex-1"
                      placeholder="Введите промокод"
                      disabled={promoApplied}
                    />
                    <Button
                      type="button"
                      onClick={applyPromoCode}
                      disabled={promoApplied || !form.promoCode}
                      className=""
                      data-promo-apply
                    >
                      {promoApplied ? 'Применён' : 'Применить'}
                    </Button>
                  </div>
                  
                  {promoApplied && (
                    <div className="text-sm text-green-400 flex items-center">
                      ✅ Промокод применён! Скидка 10%
                    </div>
                  )}
                </div>

                {/* Payment Options */}
                <div className="bg-surface rounded-xl p-6 space-y-6">
                  <h2 className="text-xl font-serif font-semibold text-foreground flex items-center">
                    <CreditCard className="w-6 h-6 text-neon-red mr-3" />
                    Способ оплаты
                  </h2>
                  
                  <div className="space-y-4">
                    <button
                      type="button"
                      onClick={() => updateForm({ paymentOption: 'prepayment' })}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        form.paymentOption === 'prepayment'
                          ? 'border-neon-red bg-neon-red/10'
                          : 'border-border/30 bg-surface-hover hover:border-neon-red/50'
                      }`}
                      data-payment-option="prepayment"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-semibold text-foreground">
                            Предоплата 25% + доплата при получении
                          </div>
                          <div className="text-sm text-foreground-muted mt-1">
                            Сначала платите {Math.floor(total * 0.25).toLocaleString('ru-RU')} ₽, остальное при получении
                          </div>
                        </div>
                        <div className="w-6 h-6 rounded-full border-2 border-neon-red flex items-center justify-center">
                          {form.paymentOption === 'prepayment' && (
                            <div className="w-3 h-3 rounded-full bg-neon-red"></div>
                          )}
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => updateForm({ paymentOption: 'full' })}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        form.paymentOption === 'full'
                          ? 'border-neon-red bg-neon-red/10'
                          : 'border-border/30 bg-surface-hover hover:border-neon-red/50'
                      }`}
                      data-payment-option="full"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-semibold text-foreground flex items-center">
                            100% оплата сразу
                            <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                              -5%
                            </span>
                          </div>
                          <div className="text-sm text-foreground-muted mt-1">
                            Полная оплата со скидкой 5%
                          </div>
                        </div>
                        <div className="w-6 h-6 rounded-full border-2 border-neon-red flex items-center justify-center">
                          {form.paymentOption === 'full' && (
                            <div className="w-3 h-3 rounded-full bg-neon-red"></div>
                          )}
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isProcessing || !form.firstName || !form.lastName || !form.phone || !form.city}
                  className="w-full text-lg py-4"
                  data-checkout-pay
                >
                  {isProcessing ? (
                    <div className="flex items-center">
                      <div className="loader w-5 h-5 mr-3"></div>
                      Обрабатываем заказ...
                    </div>
                  ) : (
                    `Перейти к оплате ${form.paymentOption === 'prepayment' 
                      ? Math.floor(total * 0.25).toLocaleString('ru-RU') 
                      : total.toLocaleString('ru-RU')
                    } ₽`
                  )}
                </Button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-surface rounded-xl p-6 sticky top-24">
                <h2 className="text-xl font-serif font-semibold text-foreground mb-6">
                  Ваш заказ
                </h2>
                
                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground text-sm leading-tight">
                          {item.name}
                        </h3>
                        <p className="text-xs text-foreground-muted mt-1">
                          {item.variant}
                        </p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-foreground-muted">
                            Кол-во: {item.quantity}
                          </span>
                          <span className="font-semibold text-foreground">
                            {item.price.toLocaleString('ru-RU')} ₽
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="space-y-3 border-t border-border/30 pt-6">
                  <div className="flex justify-between text-foreground">
                    <span>Подытог:</span>
                    <span>{subtotal.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  
                  {promoApplied && (
                    <div className="flex justify-between text-green-400">
                      <span>Скидка по промокоду:</span>
                      <span>-{promoDiscount.toLocaleString('ru-RU')} ₽</span>
                    </div>
                  )}
                  
                  {paymentDiscount > 0 && (
                    <div className="flex justify-between text-green-400">
                      <span>Скидка за полную оплату:</span>
                      <span>-{paymentDiscount.toLocaleString('ru-RU')} ₽</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-foreground">
                    <span>Доставка:</span>
                    <span className="text-green-400">Бесплатно</span>
                  </div>
                  
                  <div className="border-t border-border/30 pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-foreground">Итого:</span>
                      <span className="text-neon-red">{total.toLocaleString('ru-RU')} ₽</span>
                    </div>
                  </div>

                  {form.paymentOption === 'prepayment' && (
                    <div className="text-xs text-foreground-muted mt-3 p-3 bg-surface-hover rounded-lg">
                      Доплата при получении: {Math.floor(total * 0.75).toLocaleString('ru-RU')} ₽
                    </div>
                  )}
                </div>

                {/* Security Note */}
                <div className="mt-6 p-4 bg-surface-hover rounded-lg text-center">
                  <div className="text-sm text-foreground-muted">
                    🔒 Безопасная оплата<br />
                    📦 Доставка по всей России<br />
                    ↩️ Возврат в течение 14 дней
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};