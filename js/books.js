// ============================================================
//  ДАННЫЕ О КНИГАХ
//  Замените url: "#" реальными ссылками.
//  Обложки: images/covers/<id>.jpg
// ============================================================

const AMAZON_REGIONS = [
  { code: "US", label: "amazon.com",    flag: "🇺🇸", baseUrl: "https://www.amazon.com",    featured: true, note: "Самый удобный для доставки по США:" },
  { code: "DE", label: "amazon.de",     flag: "🇩🇪", baseUrl: "https://www.amazon.de",     featured: true, note: "Самый удобный для доставки в Израиль:" },
  { code: "UK", label: "amazon.co.uk",  flag: "🇬🇧", baseUrl: "https://www.amazon.co.uk" },
  { code: "CA", label: "amazon.ca",     flag: "🇨🇦", baseUrl: "https://www.amazon.ca" },
  { code: "FR", label: "amazon.fr",     flag: "🇫🇷", baseUrl: "https://www.amazon.fr" },
  { code: "IT", label: "amazon.it",     flag: "🇮🇹", baseUrl: "https://www.amazon.it" },
  { code: "SE", label: "amazon.se",     flag: "🇸🇪", baseUrl: "https://www.amazon.se" },
  { code: "ES", label: "amazon.es",     flag: "🇪🇸", baseUrl: "https://www.amazon.es" },
  { code: "NL", label: "amazon.nl",     flag: "🇳🇱", baseUrl: "https://www.amazon.nl" },
  { code: "PL", label: "amazon.pl",     flag: "🇵🇱", baseUrl: "https://www.amazon.pl" },
  { code: "BE", label: "amazon.com.be", flag: "🇧🇪", baseUrl: "https://www.amazon.com.be" },
  { code: "IE", label: "amazon.ie",     flag: "🇮🇪", baseUrl: "https://www.amazon.ie" },
  { code: "SG", label: "amazon.sg",     flag: "🇸🇬", baseUrl: "https://www.amazon.sg" },
  { code: "AU", label: "amazon.com.au", flag: "🇦🇺", baseUrl: "https://www.amazon.com.au" },
  { code: "MX", label: "amazon.com.mx", flag: "🇲🇽", baseUrl: "https://www.amazon.com.mx" },
  { code: "BR", label: "amazon.com.br", flag: "🇧🇷", baseUrl: "https://www.amazon.com.br" }
];

const BOOKS = [
  {
    id: "shir-hadash",

    title:    "Шир Хадаш",
    subtitle: "Поэтические переводы избранных псалмов Давида",
    author:   "Мордехай Гутерман",

    description:     "В этот сборник вошли поэтические переводы пятидесяти Псалмов Давида. В первую очередь, это псалмы, часто читаемые в синагогах во время молитвы - на каждый день недели, hалель, встреча Субботы и другие.  При переводе автор попытался совместить возвышенное содержание оригинального текста с поэтикой, близкой современному читателю.",
    longDescription: "В этот сборник вошли поэтические переводы пятидесяти Псалмов Давида. В первую очередь, это псалмы, часто читаемые в синагогах во время молитвы - на каждый день недели, hалель, встреча Субботы и другие.  При переводе автор попытался совместить возвышенное содержание оригинального текста с поэтикой, близкой современному читателю.",

    coverImage:    "images/covers/shir-hadash.jpg",
    genres:        ["Перевод", "Религиозная поэзия"],
    publishedYear: 2026,
    pages:         149,

    excerpt: "ПСАЛОМ 1\n\nСчастлив тот, кто злодею\n&nbsp;&nbsp;&nbsp;&nbsp;себя не позволил вести,\nКто не верит в идею,\n&nbsp;&nbsp;&nbsp;&nbsp;что с грешным ему по пути,\nКто, ища развлечений,\n&nbsp;&nbsp;&nbsp;&nbsp;не рвался к насмешнику в дом,\nНо о Б-жьем Учении\n&nbsp;&nbsp;&nbsp;&nbsp;думал и ночью, и днём.\nБудет он словно древо,\n&nbsp;&nbsp;&nbsp;&nbsp;чьи вовремя зреют плоды,\nВедь и справа и слева\n&nbsp;&nbsp;&nbsp;&nbsp;струятся потоки воды,\nЧья листва не падёт,\n&nbsp;&nbsp;&nbsp;&nbsp;ну а тень для прохожих мила.\nИ успех его ждет,\n&nbsp;&nbsp;&nbsp;&nbsp;за какие б ни брался дела.\nА злодей - как труха,\n&nbsp;&nbsp;&nbsp;&nbsp;что разносится ветром везде.\nИ ему от греха\n&nbsp;&nbsp;&nbsp;&nbsp;не уйти на последнем суде.\nБ-г рассудит людей - \n&nbsp;&nbsp;&nbsp;&nbsp;кто был праведен, кто нагрешил.\nИ исчезнет злодей,\n&nbsp;&nbsp;&nbsp;&nbsp;будто вовсе на свете не жил.",

    spreads: [
      // "images/spreads/shir-hadash-1.jpg",
      // "images/spreads/shiапr-hadash-2.jpg"
    ],

    video: null,
    // video: "https://www.youtube.com/embed/XXXXXXXXXXX",

    editions: [
      {
        type:  "hardcover",
        label: "Твёрдая обложка",
        isbn:  "",
        retailers: [
          {
            platform: "amazon",
            asin: "B0H5LJQCHV",
            regions: AMAZON_REGIONS
          },
          {
            platform: "lulu",
            enabled: false,
            url: "#"
          }
        ]
      },
      {
        type:  "paperback",
        label: "Мягкая обложка",
        isbn:  "",
        retailers: [
          {
            platform: "amazon",
            asin: "B0H5HR37NL",
            regions: AMAZON_REGIONS
          },
          {
            platform: "lulu",
            enabled: false,
            url: "#"
          }
        ]
      }
    ]
  },

  // ──────────────────────────────────────────────────────────

  {
    id: "shimru-shabtotai",

    title:    "Шимру Шабтотай",
    subtitle: "Поэтические переводы субботних песен",
    author:   "Мордехай Гутерман",

    description:     "На русский язык переведены песни, которые мы поём во время субботних трапез. Их тексты имеют древнюю историю и наполнены глубоким смыслом. Теперь их можно прочесть по-русски, а некоторые даже петь на ту же мелодию, что и оригинал.",
    longDescription: "На русский язык переведены песни, которые мы поём во время субботних трапез. Их тексты имеют древнюю историю и наполнены глубоким смыслом. Теперь их можно прочесть по-русски, а некоторые даже петь на ту же мелодию, что и оригинал.",

    coverImage:    "images/covers/shimru-shabtotay.jpg",
    genres:        ["Перевод", "Шаббат", "Религиозная поэзия"],
    publishedYear: 2024,
    pages:         47,

    excerpt: "Ко‐Рибон\n\nО, мой Б‐г, Господин надо всеми мирами,\nО, мой Царь, Властелин надо всеми царями,\nО деяниях славных Твоих с чудесами \nВсем поведать уста мои просятся сами.\n\nДень и ночь восхвалять Тебя, Г‐споди, рады \nСотворённых Тобою существ мириады.\nЛюди, ангелы, звери, подводные гады,\nПтичьи стаи, парящие под небесами.\n\nКаждый миг Ты творишь миллионы вселенных.\nГордых клонишь к земле, распрямляешь согбенных.\nИ за тысячу жизней ‐ коротких и тленных ‐ \nМощь твоя не была бы постигнута нами.\n\nБ‐г мой, Ты ‐ средоточие силы и власти.\nТак спаси нас из львиной оскаленной пасти,  \nИз изгнанья верни, сбереги от напасти \nТот народ, что назвал Ты Своими сынами.\n\nВ Храм вернись, чтобы снова он стал обитаем.\nВ город света ‐ прекраснейший Йерушалаим.\nПесней праведных душ будешь Ты восхваляем \nИ столица наполнится их голосами.",

    spreads: [],
    video:   null,

    editions: [
      {
        type:  "paperback",
        label: "Мягкая обложка",
        isbn:  "",
        retailers: [
          {
            platform: "amazon",
            regions: AMAZON_REGIONS
          },
          {
            platform: "lulu",
            enabled: false,
            url: "#"
          }
        ]
      }
    ]
  }
];
