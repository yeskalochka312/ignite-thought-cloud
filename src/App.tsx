import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Loader } from "@/components/layout/Loader";
import { CartDrawer } from "@/components/ui/cart-drawer";
import { CartProvider, useCart } from "@/contexts/CartContext";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { Constructor } from "./pages/Constructor";
import { FAQ } from "./pages/FAQ";
import { About } from "./pages/About";
import { Checkout } from "./pages/Checkout";
import MapporaEmbed from "./pages/MapporaEmbed";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const AppContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { items, itemCount, isOpen, openCart, closeCart, updateQuantity, removeItem } = useCart();

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Toaster />
      <Sonner />
      <Loader isVisible={isLoading} />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header onCartClick={openCart} cartItemCount={itemCount} />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<Index />} />
              <Route path="/constructor" element={<Constructor />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/about" element={<About />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/mappora" element={<MapporaEmbed />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <CartDrawer 
          isOpen={isOpen}
          onClose={closeCart}
          items={items}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeItem}
        />
      </BrowserRouter>
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
