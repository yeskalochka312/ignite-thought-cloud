import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { SocialButtons } from "@/components/ui/social-buttons";
interface HeaderProps {
  onCartClick?: () => void;
  cartItemCount?: number;
}
export const Header = ({
  onCartClick,
  cartItemCount = 0
}: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navLinks = [{
    name: "Главная",
    href: "/",
    key: "home"
  }, {
    name: "Товары",
    href: "/products",
    key: "products"
  }, {
    name: "Конструктор",
    href: "/constructor",
    key: "constructor"
  }, {
    name: "FAQ",
    href: "/faq",
    key: "faq"
  }, {
    name: "О нас",
    href: "/about",
    key: "about"
  }];
  return <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "glass backdrop-blur-glass" : "bg-transparent"}`} data-header>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 mx-0 px-0 py-0 my-[12px] rounded-none">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2 group" data-nav-link="home">
                <div className="text-2xl font-serif font-bold text-foreground group-hover:text-neon-red transition-colors">
                  <span>M</span><span className="text-neon-red">L</span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map(link => <Link key={link.key} to={link.href} className={`relative hover:text-neon-red transition-all duration-300 group ${location.pathname === link.href ? 'text-neon-red' : 'text-foreground'}`} data-nav-link={link.key}>
                  <span className="relative">
                    {link.name}
                    <span className={`absolute left-0 bottom-0 w-full h-0.5 bg-neon-red transition-transform duration-300 origin-left ${location.pathname === link.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                  </span>
                </Link>)}
            </nav>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Social Icons (Desktop) */}
              <SocialButtons className="hidden lg:flex" />

              {/* Cart */}
              <button onClick={onCartClick} className="relative p-2 text-foreground hover:text-neon-red transition-colors" data-open-cart aria-label={`Корзина (${cartItemCount} товаров)`}>
                <ShoppingBag className="w-6 h-6" />
                {cartItemCount > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-neon-red text-white text-xs font-bold rounded-full flex items-center justify-center animate-scale-in">
                    {cartItemCount > 9 ? "9+" : cartItemCount}
                  </span>}
              </button>

              {/* Mobile Menu Button */}
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 text-foreground hover:text-neon-red transition-colors" aria-label="Меню">
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="absolute inset-0 bg-background/95 backdrop-blur-md">
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              {navLinks.map((link, index) => <Link key={link.key} to={link.href} className={`text-2xl font-serif hover:text-neon-red transition-all duration-300 ${location.pathname === link.href ? 'text-neon-red' : 'text-foreground'}`} style={{
            animationDelay: `${index * 100}ms`
          }} data-nav-link={link.key} onClick={() => setIsMobileMenuOpen(false)}>
                  {link.name}
                </Link>)}
              
              {/* Mobile Social Icons */}
              <SocialButtons className="mt-8" />
            </div>
          </div>
        </div>}
    </>;
};