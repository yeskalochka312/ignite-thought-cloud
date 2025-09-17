import { Heart, Star, Sparkles, Users, Award, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const About = () => {
  const values = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Индивидуально",
      description: "Мы не гуглим «подарок на годовщину», мы создаём его специально для вас. Каждая работа уникальна, как и ваша история."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Эмоционально", 
      description: "Иногда люди плачут от наших работ — мы предупреждали заранее. Мы создаём не просто картины, а эмоциональные переживания."
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Дерзко",
      description: "Мы не боимся выйти за рамки — мы их рисуем сами. Экспериментируем со стилями и подходами, чтобы удивить вас."
    }
  ];

  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      number: "5000+",
      label: "Счастливых клиентов",
      description: "Довериться нам уже успели"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      number: "12000+", 
      label: "Созданных работ",
      description: "Каждая с уникальной историей"
    },
    {
      icon: <Award className="w-8 h-8" />,
      number: "50+",
      label: "Талантливых художников",
      description: "В нашей творческой команде"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      number: "99%",
      label: "Положительных отзывов",
      description: "Наши клиенты нас рекомендуют"
    }
  ];

  const team = [
    {
      name: "Анна Карташова",
      role: "Основатель и арт-директор",
      image: "/api/placeholder/300/400",
      description: "Влюблена в искусство с детства. Создала Map Of Love, чтобы помочь людям выражать чувства через красоту."
    },
    {
      name: "Михаил Волков", 
      role: "Главный дизайнер",
      image: "/api/placeholder/300/400",
      description: "Превращает ваши истории в визуальные шедевры. Специализируется на персональных картах и звёздном небе."
    },
    {
      name: "София Петрова",
      role: "Менеджер по качеству",
      image: "/api/placeholder/300/400", 
      description: "Следит за тем, чтобы каждая работа была безупречной. Ваше удовлетворение — её главная задача."
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-surface/30 to-background">
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-neon-red/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-neon-red/3 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8" data-animate>
              <div className="space-y-6">
                <div className="inline-block px-4 py-2 bg-neon-red/10 text-neon-red text-sm font-medium rounded-full">
                  О нас
                </div>
                <h1 className="text-4xl lg:text-5xl font-serif font-bold text-foreground leading-tight">
                  <span className="block">Map Of Love —</span>
                  <span className="block text-neon-red">запустить историю,</span>
                  <span className="block">сохранить момент</span>
                </h1>
                <p className="text-xl text-foreground-muted leading-relaxed">
                  Мы создаём персональные произведения искусства, которые рассказывают ваши истории. 
                  Иногда с юмором, иногда без, но всегда с любовью.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products">
                  <Button className="text-lg px-8 py-4">
                    Смотреть товары
                  </Button>
                </Link>
                <Link to="/constructor">
                  <Button variant="outline" className="text-lg px-8 py-4">
                    Открыть конструктор
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Content - Image Stack */}
            <div className="relative" data-animate>
              <div className="relative">
                {/* Main image */}
                <div className="bg-surface rounded-3xl overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <img 
                    src="/lovable-uploads/40f6b0ff-8215-4463-a815-25d0148471b3.png" 
                    alt="Персонажи Map Of Love с чашками кофе" 
                    className="w-full h-96 object-contain"
                  />
                </div>
                
                {/* Floating cards */}
                <div className="absolute -top-8 -left-8 bg-neon-red rounded-2xl p-4 text-white transform -rotate-12 hover:rotate-0 transition-transform duration-500 shadow-card">
                  <div className="text-2xl font-bold">5000+</div>
                  <div className="text-sm opacity-90">Счастливых клиентов</div>
                </div>
                
                <div className="absolute -bottom-8 -right-8 bg-surface rounded-2xl p-4 transform rotate-12 hover:rotate-0 transition-transform duration-500 shadow-card">
                  <div className="text-2xl font-bold text-neon-red">99%</div>
                  <div className="text-sm text-foreground-muted">Довольных заказчиков</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-surface/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-animate>
            <h2 className="text-4xl font-serif font-bold text-foreground mb-6">
              Наши принципы
            </h2>
            <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
              Три главных принципа, которые делают нашу работу особенной
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-surface rounded-2xl p-8 text-center space-y-6 group hover:bg-surface-hover transition-all duration-300 card-hover"
                style={{ animationDelay: `${index * 200}ms` }}
                data-animate
              >
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-neon-red to-pink-500 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-serif font-bold text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-foreground-muted leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center space-y-4 group"
                style={{ animationDelay: `${index * 150}ms` }}
                data-animate
              >
                <div className="w-16 h-16 mx-auto bg-surface rounded-2xl flex items-center justify-center text-neon-red group-hover:bg-neon-red group-hover:text-white transition-all duration-300">
                  {stat.icon}
                </div>
                <div className="space-y-2">
                  <div className="text-3xl lg:text-4xl font-bold text-neon-red">
                    {stat.number}
                  </div>
                  <div className="font-semibold text-foreground">
                    {stat.label}
                  </div>
                  <div className="text-sm text-foreground-muted">
                    {stat.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-surface/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-animate>
            <h2 className="text-4xl font-serif font-bold text-foreground mb-6">
              Наша команда
            </h2>
            <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
              Познакомьтесь с людьми, которые превращают ваши истории в произведения искусства
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-surface rounded-2xl overflow-hidden group card-hover"
                style={{ animationDelay: `${index * 200}ms` }}
                data-animate
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-foreground">
                      {member.name}
                    </h3>
                    <p className="text-neon-red font-medium">
                      {member.role}
                    </p>
                  </div>
                  <p className="text-foreground-muted text-sm leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12" data-animate>
            <div className="text-center space-y-6">
              <h2 className="text-4xl font-serif font-bold text-foreground">
                Наша история
              </h2>
              <div className="prose prose-lg prose-invert max-w-none text-foreground-muted leading-relaxed">
                <p>
                  Всё началось с простой идеи: что, если подарки могут рассказывать истории? 
                  В 2020 году мы создали первую персональную карту звёздного неба для годовщины наших друзей.
                </p>
                <p>
                  Их реакция была настолько искренней и трогательной, что мы поняли — 
                  мы нашли способ помочь людям выражать самые глубокие чувства через искусство.
                </p>
                <p>
                  Сегодня Map Of Love — это команда талантливых художников, дизайнеров и мечтателей, 
                  которые каждый день создают уникальные произведения искусства. 
                  Мы верим, что каждая история заслуживает быть рассказанной красиво.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-surface/50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8" data-animate>
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-foreground">
              Готовы создать свою <span className="text-neon-red">историю</span>?
            </h2>
            <p className="text-xl text-foreground-muted">
              Свяжитесь с нами, и мы поможем воплотить ваши идеи в жизнь. 
              Каждая история уникальна, как и наш подход к её воплощению.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Button className="text-lg px-8 py-4" onClick={() => window.location.href = '/products'}>
                 Открыть товары
               </Button>
               <Button variant="outline" className="text-lg px-8 py-4">
                 Смотреть работы
               </Button>
            </div>
            
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-foreground-muted">
              <div className="flex items-center gap-2">
                <span>📧</span>
                <span>hello@mapoflove.ru</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📱</span>
                <span>+7 (999) 123-45-67</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};