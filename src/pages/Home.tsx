import { useEffect, useState } from "react";
import { ArrowRight, Star, Heart, Map, Sparkles } from "lucide-react";
import { InteractiveCard } from "@/components/ui/interactive-card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
const featureMapImage = "/lovable-uploads/1e56b2d0-6c75-407a-b5b0-7118a4ca7758.png";
const featureStarsImage = "/lovable-uploads/2915172a-100d-4361-834a-8735f75b00bb.png";
const featureJewelryImage = "/lovable-uploads/79ac67e5-715e-4ded-929f-dacb5238464e.png";
export const Home = () => {
  const [currentStage, setCurrentStage] = useState(0);

  // Marquee text
  const marqueeText = "Map Of Love • Личный сюжет • Индивидуальный дизайн • Карты мест • Звёздные карты • Кулоны с историей • Дарите эмоции • Уникальная история • Ваш момент • ";

  // Process stages for pinned section
  const processStages = [{
    title: "Ты выбираешь дизайн 🎨",
    subtitle: "Шаг 1",
    description: "Карта места, карта звёзд или кулон — ты решаешь. Мы слушаем и записываем, как секретарь у Купидона."
  }, {
    title: "Мы творим ✍️",
    subtitle: "Шаг 2",
    description: "Включаем фантазию, руки и душу. Создаём так, будто это для нас самих (и чуть лучше)."
  }, {
    title: "Упаковываем и отправляем 🚚",
    subtitle: "Шаг 3",
    description: "Коробка выглядит так, что почтальон подумает, будто внутри золото. На деле — твоя личная история, аккуратно уложенная."
  }, {
    title: "Ты получаешь и удивляешь 🎁",
    subtitle: "Шаг 4",
    description: "Даришь — и ловишь реакцию «вау!». Или вешаешь на стену, и каждый день напоминаешь себе: «Да, у меня реально крутая память»."
  }];
  const features = [{
    icon: <Map className="w-8 h-8" />,
    title: "Карты мест",
    description: "Карта того самого места, где всё началось или закончилось красиво",
    image: featureMapImage,
    filterUrl: "/products?category=maps",
    buttonText: "Смотреть карты"
  }, {
    icon: <Star className="w-8 h-8" />,
    title: "Звёздные карты",
    description: "Карта звёздного неба, каким оно было в самый важный момент",
    image: featureStarsImage,
    filterUrl: "/products?category=stars",
    buttonText: "Смотреть звёзды"
  }, {
    icon: <Heart className="w-8 h-8" />,
    title: "Кулоны с историей",
    description: "Украшения, которые носятся близко к сердцу с вашей историей",
    image: featureJewelryImage,
    filterUrl: "/products?category=jewelry",
    buttonText: "Смотреть кулоны"
  }];
  const values = [{
    icon: <Sparkles className="w-12 h-12" />,
    title: "Индивидуально",
    description: "Мы не гуглим «подарок на годовщину», мы создаём его специально для вас"
  }, {
    icon: <Heart className="w-12 h-12" />,
    title: "Эмоционально",
    description: "Иногда люди плачут от наших работ — мы предупреждали заранее"
  }, {
    icon: <Star className="w-12 h-12" />,
    title: "Дерзко",
    description: "Мы не боимся выйти за рамки — мы их рисуем сами"
  }];
  useEffect(() => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains("animated")) {
          entry.target.classList.add("animate-fade-up", "animated");
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    });
    const animatedElements = document.querySelectorAll("[data-animate]");
    animatedElements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-surface/50 to-background">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-neon-red/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-red/5 rounded-full blur-3xl animate-float" style={{
            animationDelay: '1s'
          }}></div>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8" data-animate>
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-serif font-bold text-foreground leading-tight">
                  <span className="block">Искусство говорить</span>
                  <span className="block">о чувствах</span>
                  <span className="text-neon-red">без слов</span>
                </h1>
                <p className="text-foreground-muted leading-relaxed max-w-lg px-0 mx-0 py-0 my-0 text-xl font-thin">Хочешь удивить, растрогать или оставить «вау» без слов? Создаём персональные карты мест, звёздные карты и кулоны с историей.  </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-start -ml-8">
                <Link to="/constructor">
                  <Button className="text-lg px-8 py-4 w-full sm:w-auto" data-open-constructor>
                    Открыть конструктор
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/products">
                  <Button variant="outline" data-open-products className="text-lg px-8 py-4 w-full sm:w-auto">
                    Смотреть товары
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Content - Interactive Poster */}
            <div className="flex justify-center" data-animate>
              <InteractiveCard className="w-80 h-96 bg-gradient-to-br from-neon-red via-pink-500 to-red-400" showTitle="Ваша история">
                <div className="h-full flex flex-col justify-between p-6 text-white">
                  <div className="text-sm opacity-80">
                </div>
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-serif font-bold">
                  </div>
                    <div className="w-16 h-px bg-white/50 mx-auto"></div>
                    <div className="text-sm">
                  </div>
                    <div className="text-xs opacity-70">
                  </div>
                  </div>
                </div>
              </InteractiveCard>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-8 border-y border-border/30 overflow-hidden">
        <div className="marquee">
          <div className="marquee-content">
            <span className="text-2xl font-serif text-foreground-muted px-8">{marqueeText}</span>
            <span className="text-2xl font-serif text-foreground-muted px-8">{marqueeText}</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-animate>
            <h2 className="text-4xl font-serif font-bold text-foreground mb-6">
              Что мы создаём
            </h2>
            <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
              Каждый предмет рассказывает историю. Мы помогаем сохранить ваши самые важные моменты.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => <div key={index} className="group card-hover bg-surface rounded-xl overflow-hidden" style={{
            animationDelay: `${index * 200}ms`
          }} data-animate>
                <div className="relative h-48 overflow-hidden">
                  <img src={feature.image} alt={feature.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-neon-red to-pink-500 rounded-xl flex items-center justify-center text-white">
                      {feature.icon}
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-6">
                  <h3 className="font-serif text-3xl font-semibold text-[#ff0000]">
                    {feature.title}
                  </h3>
                  <p className="text-foreground-muted">
                    {feature.description}
                  </p>
                  <Link to={feature.filterUrl}>
                    <Button variant="outline" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full mt-4">
                      {feature.buttonText}
                    </Button>
                  </Link>
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {/* Pinned "How We Work" Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left - Scrolling Content */}
            <div className="space-y-16">
              <div className="text-center lg:text-left" data-animate>
                <div className="inline-block px-4 py-2 bg-neon-red/10 text-neon-red text-sm font-medium rounded-full mb-4">Как это работает?</div>
                <h2 className="text-4xl font-serif mb-6 text-white font-extrabold lg:text-4xl">
                  Мы превращаем идею в подарок —<br />
                  от замысла до «вау!»
                </h2>
                <p className="text-xl text-foreground-muted">
                  Мы делаем процесс создания вашей истории простым и понятным, 
                  от первой идеи до готового произведения.
                </p>
              </div>

              {processStages.map((stage, index) => <div key={index} className="bg-surface rounded-2xl p-8 space-y-4" data-animate style={{
              animationDelay: `${index * 300}ms`
            }}>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-neon-red rounded-2xl flex items-center justify-center text-white font-bold px-0 my-0 py-[28px]">
                      {index + 1}
                    </div>
                    <div>
                      <div className="text-sm text-neon-red font-medium">{stage.subtitle}</div>
                      <h3 className="font-serif font-bold text-foreground text-3xl my-0">{stage.title}</h3>
                    </div>
                  </div>
                  <p className="text-foreground-muted leading-relaxed mx-0 my-[37px] text-xl">
                    {stage.description}
                  </p>
                </div>)}
            </div>

            {/* Right - Sticky Image */}
            <div className="lg:sticky lg:top-24">
              <div className="bg-surface rounded-3xl overflow-hidden" data-animate>
                <img src="/lovable-uploads/53b81d4c-900d-4fdb-8d68-a9c78ede7f0d.png" alt="Процесс создания" className="w-full h-[700px] object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-surface/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-animate>
            <h2 className="text-4xl font-serif font-bold text-foreground mb-6">
              Наш подход
            </h2>
            <p className="text-xl text-foreground-muted max-w-2xl mx-auto">Каждый заказ как первый поцелуй: волнительный и особенный</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => <div key={index} className="text-center space-y-6 group" style={{
            animationDelay: `${index * 200}ms`
          }} data-animate>
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-neon-red to-pink-500 rounded-3xl flex items-center justify-center text-white group-hover:scale-110 transition-all duration-500 group-hover:rotate-12">
                  {value.icon}
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-serif font-bold text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-foreground-muted leading-relaxed mx-[8px]">
                    {value.description}
                  </p>
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-8" data-animate>
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-foreground">
              Готовы создать свою <span className="text-neon-red">историю</span>?
            </h2>
            <p className="text-xl text-foreground-muted">
              Начните с конструктора или выберите готовый дизайн из каталога. 
              Мы поможем воплотить вашу идею в жизнь.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start -ml-8">
              <Link to="/constructor">
                <Button className="text-lg px-8 py-4 w-full sm:w-auto" data-open-constructor>
                  Открыть конструктор
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/products">
                <Button variant="outline" className="text-lg px-8 py-4 w-full sm:w-auto">
                  Смотреть товары
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>;
};