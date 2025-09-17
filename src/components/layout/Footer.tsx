import { SocialButtons } from "@/components/ui/social-buttons";
export const Footer = () => {
  const navLinks = [{
    name: "Главная",
    href: "/"
  }, {
    name: "Товары",
    href: "/products"
  }, {
    name: "Конструктор",
    href: "/constructor"
  }, {
    name: "FAQ",
    href: "/faq"
  }, {
    name: "О нас",
    href: "/about"
  }];
  return <footer className="bg-surface border-t border-border/30 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="text-2xl font-serif font-bold text-foreground bg-[#392b2b]/0">
              <span className="text-[#ff0000]">Map</span> <span className="text-neon-red">Of Love</span>
            </div>
            <p className="text-foreground-muted text-sm leading-relaxed">
              Искусство говорить о чувствах без слов. Создаём персональные карты и украшения с историей.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Навигация</h3>
            <ul className="space-y-2">
              {navLinks.map(link => <li key={link.name}>
                  <a href={link.href} className="text-foreground-muted hover:text-neon-red transition-colors text-sm">
                    {link.name}
                  </a>
                </li>)}
            </ul>
          </div>

          {/* Contacts */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Контакты</h3>
            <div className="space-y-2 text-sm text-foreground-muted">
              <p>📧 mapoflove@mail.ru</p>
              <p>📱 +7 (993) 644-52-26</p>
              <p>
            </p>
            </div>
          </div>

          {/* Social & Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Мы в соцсетях</h3>
            <SocialButtons />
            <div className="text-sm text-foreground-muted mt-4">
              <p className="font-medium">📦 Доставка по всей России</p>
              <p className="mt-1 opacity-80">Упаковываем так, что коробка приедет быстрее, чем вы распакуете</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/30 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-foreground-muted">
          <div className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-4">
            <p>© 2024 Map Of Love. Все права защищены.</p>
            <p className="text-xs">© Map data © OpenStreetMap contributors, © Mapbox</p>
          </div>
          <p className="mt-2 md:mt-0">
            Сделано с <span className="text-neon-red">❤️</span> любовью
          </p>
        </div>
      </div>
    </footer>;
};