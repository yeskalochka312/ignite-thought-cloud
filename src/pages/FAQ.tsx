import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
export const FAQ = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const faqs: FAQItem[] = [{
    id: '1',
    question: '💰 Сколько стоит картина?',
    answer: "Стоимость зависит от формата и оформления.\nМинимальные цены такие:\n\n- Картина в рамке — от 2490 ₽\n- Картина на холсте — от 2990 ₽\n- Картина под стеклом — от 3490 ₽\n\nТы выбираешь размер — мы делаем магию ✨"
  }, {
    id: '2',
    question: '⏳ Когда будет готов мой заказ?',
    answer: "В среднем — 2–3 рабочих дня. Но если ты очень спешишь, не переживай: мы умеем ускоряться 🚀 и иногда отправляем даже раньше."
  }, {
    id: '3',
    question: '🚚 Куда доставляете?',
    answer: "Мы доставляем по всей России 🇷🇺\nВ другие страны — тоже можно, но обсуждаем индивидуально (логистика же штука разная)."
  }, {
    id: '4',
    question: '🎁 Как упакован мой заказ?',
    answer: "По умолчанию — бережная транспортировочная коробка 📦\nНо если подарок — можем сразу красиво упаковать, добавить праздничный пакет, и ты сразу вручаешь его «как с витрины». Никаких беготни с обёрткой, всё готово 👍"
  }, {
    id: '5',
    question: '✏ Можно внести корректировки в заказ?',
    answer: "Да, но зависит от стадии. Если макет ещё в процессе — без проблем. Если картина уже в печати или пакуется 📦, то могут быть доплаты. Так что лучше уточнять сразу."
  }, {
    id: '6',
    question: '🗺 Соответствует ли карта/дизайн выбранному месту?',
    answer: "Да ✅ Мы используем именно те координаты, которые ты укажешь. Никаких «примерных картинок с интернета»."
  }, {
    id: '7',
    question: '📐 Какие размеры есть?',
    answer: "Выбирай под настроение:\n\nКартина в рамке:\n21×30 | 30×40 | 40×50\n\nКартина на холсте:\n21×30 | 30×40 | 40×50 | 50×70\n\nКартина под стеклом (блестит как глаза при первой встрече):\n30×40 | 40×50 | 50×60\n\nХочешь другой размер? Свяжись с нами — сделаем спецзаказ 🔥"
  }, {
    id: '8',
    question: '😱 Товар пришёл повреждённым. Что делать?',
    answer: "Такое случается редко, но бывает. Поэтому распаковывай при получении. Если есть брак — сразу отказывайся и пиши нам. Ответственность несёт транспортная компания, а мы максимально быстро сделаем и отправим новый экземпляр."
  }, {
    id: '9',
    question: '💡 А если у меня нет идеи?',
    answer: "Не страшно. Мы любим творить из нуля 🚀 Подскажем, накидаем варианты и соберём картину под любой случай."
  }, {
    id: '10',
    question: '📝 Можно добавить фото, цитату или надпись?',
    answer: "Да! 🙌 Фото, фраза, дата, имена — всё, что сделает работу именно твоей."
  }, {
    id: '11',
    question: '🎨 У вас всё по шаблону или реально уникально?',
    answer: "Каждая картина — это уникальная история, которую мы создаём вместе с тобой."
  }, {
    id: '12',
    question: '💳 Как оплачивать заказ?',
    answer: "После оформления вносишь предоплату. Когда заказ готов — можешь оплатить сразу (и получить скидку 5% 💸) или рассчитаться при получении в службе доставки."
  }, {
    id: '13',
    question: '🎁 Можно сразу заказать как подарок?',
    answer: "Да 💝 Упакуем красиво, добавим пакет и отправим получателю напрямую. Только не забудь оплатить заранее, чтобы не вышло недоразумений."
  }, {
    id: '14',
    question: '📐 Могу ли я заказать картину другого формата?',
    answer: "Конечно! Пиши размеры — и мы сделаем под тебя."
  }, {
    id: '15',
    question: '📦 А у вас есть опт?',
    answer: "Да, опт есть. Рассчитываем индивидуально, в зависимости от объёмов."
  }, {
    id: '16',
    question: '❓ Остались вопросы?',
    answer: "Не мучай гугл — пиши нам 💬 Мы живые, отвечаем быстро и по делу (иногда даже с мемом в придачу 😎)."
  }];
  const toggleItem = (id: string) => {
    setOpenItem(prev => prev === id ? null : id);
  };
  return <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16" data-animate>
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
            Frequently Asked{' '}
            <span className="text-neon-red">Questions</span>
          </h1>
          <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
            Найдите ответы на часто задаваемые вопросы о наших работах, доставке и услугах
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => {
            const isOpen = openItem === faq.id;
            return <div key={faq.id} className="bg-surface rounded-xl border border-border/30 overflow-hidden group" style={{
              animationDelay: `${index * 100}ms`
            }} data-animate>
                  <button onClick={() => toggleItem(faq.id)} className="w-full p-6 text-left flex items-center justify-between hover:bg-surface-hover transition-colors focus:outline-none focus:bg-surface-hover" aria-expanded={isOpen}>
                    <h3 className="text-lg font-semibold text-foreground pr-4 group-hover:text-neon-red transition-colors">
                      {faq.question}
                    </h3>
                    <div className={`flex-shrink-0 text-neon-red transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                      {isOpen ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                    </div>
                  </button>
                  
                  <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                    <div className="px-6 pb-6">
                      <div className="prose prose-invert max-w-none">
                        <p className="text-foreground-muted leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                </div>;
          })}
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-20 text-center bg-surface rounded-2xl p-12" data-animate>
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-serif font-bold text-foreground">
              Не нашли ответ на свой вопрос?
            </h2>
            <p className="text-foreground-muted text-lg">
              Свяжитесь с нами любым удобным способом. Мы всегда готовы помочь и ответить на ваши вопросы.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:hello@mapoflove.ru" className="btn-neon inline-flex items-center justify-center px-8 py-4 text-lg font-semibold">
                Написать на почту
              </a>
              <a href="tel:+79991234567" className="btn-outline inline-flex items-center justify-center px-8 py-4 text-lg font-semibold">
                Позвонить нам
              </a>
            </div>
            
            <div className="pt-6 border-t border-border/30">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-foreground-muted">
                <div className="flex items-center gap-2">
                  <span>📧</span>
                  <span>mapoflove@mail.ru</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📱</span>
                  <span>+7 (993) 644-52-26</span>
                </div>
                <div className="flex items-center gap-2">
                  
                  <span>
                </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};