// ============================================================
//  CONTENT FOR BOOK DETAIL TABS
//  toc: structured table of contents
//  pages: images of real printed pages/spreads
// ============================================================

const BOOK_CONTENT = {
  "shir-hadash": {
    toc: [
      { type: "item", title: "Предисловие от автора", page: 1 },
      { type: "item", title: "О двух авторах этой книги.", page: 2 },
      { type: "item", title: "Псалом 1", page: 8 },
      { type: "item", title: "Псалом 2", page: 10 },
      { type: "item", title: "Псалом 13", page: 14 },
      { type: "item", title: "Псалом 15", page: 16 },
      { type: "item", title: "Псалом 20", page: 18 },
      { type: "item", title: "Псалом 23", page: 20 },
      { type: "item", title: "Псалом 24", page: 22 },
      { type: "item", title: "Псалом 27", page: 26 },
      { type: "item", title: "Псалом 29", page: 32 },
      { type: "item", title: "Псалом 43", page: 34 },
      { type: "item", title: "Псалом 48", page: 36 },
      { type: "item", title: "Псалом 60", page: 40 },
      { type: "item", title: "Псалом 81", page: 44 },
      { type: "item", title: "Псалом 82", page: 48 },
      { type: "item", title: "Псалом 83", page: 50 },
      { type: "item", title: "Псалом 92", page: 54 },
      { type: "item", title: "Псалом 93", page: 58 },
      { type: "item", title: "Псалом 94", page: 60 },
      { type: "item", title: "Псалом 95", page: 64 },
      { type: "item", title: "Псалом 96", page: 66 },
      { type: "item", title: "Псалом 97", page: 68 },
      { type: "item", title: "Псалом 98", page: 70 },
      { type: "item", title: "Псалом 99", page: 72 },
      { type: "item", title: "Псалом 100", page: 74 },
      { type: "item", title: "Псалом 113", page: 76 },
      { type: "item", title: "Псалом 114", page: 78 },
      { type: "item", title: "Псалом 115", page: 80 },
      { type: "item", title: "Псалом 116", page: 84 },
      { type: "item", title: "Псалом 117", page: 88 },
      { type: "item", title: "Псалом 118", page: 90 },
      { type: "item", title: "Псалом 120", page: 96 },
      { type: "item", title: "Псалом 121", page: 98 },
      { type: "item", title: "Псалом 122", page: 100 },
      { type: "item", title: "Псалом 123", page: 102 },
      { type: "item", title: "Псалом 124", page: 104 },
      { type: "item", title: "Псалом 125", page: 106 },
      { type: "item", title: "Псалом 126", page: 108 },
      { type: "item", title: "Псалом 127", page: 110 },
      { type: "item", title: "Псалом 128", page: 112 },
      { type: "item", title: "Псалом 129", page: 116 },
      { type: "item", title: "Псалом 130", page: 118 },
      { type: "item", title: "Псалом 131", page: 120 },
      { type: "item", title: "Псалом 132", page: 122 },
      { type: "item", title: "Псалом 133", page: 126 },
      { type: "item", title: "Псалом 134", page: 128 },
      { type: "item", title: "Псалом 136", page: 130 },
      { type: "item", title: "Псалом 137", page: 134 },
      { type: "item", title: "Псалом 142", page: 136 },
      { type: "item", title: "Псалом 145", page: 140 },
      { type: "item", title: "Псалом 150", page: 144 }
    ],
    pages: [
      {
        layout: "spread",
        image: "images/pages/shir-hadash/pages-108-109.jpg",
        alt: "Разворот книги «Шир Хадаш», страницы 108-109"
      },
      {
        layout: "page",
        image: "images/pages/shir-hadash/page-149.jpg",
        alt: "Страница группового указателя псалмов в книге «Шир Хадаш»"
      }
    ]
  },

  "shimru-shabtotai": {
    toc: [
      { type: "heading", title: "Песни для вечера пятницы", visible: true },
      { type: "item", title: "Коль Мекадеш Швии", page: 2 },
      { type: "item", title: "Менуха ве-симха", page: 4 },
      { type: "item", title: "Ма Йедидут", page: 6 },
      { type: "item", title: "Йом зе ле Исраэль.", page: 10 },
      { type: "item", title: "Ко-Рибон", page: 14 },
      { type: "item", title: "Цама нафши", page: 16 },
      { type: "item", title: "Цур-мишело", page: 22 },

      { type: "heading", title: "Песни для утра Субботы", visible: true },
      { type: "item", title: "Барух кэль-эльон", page: 26 },
      { type: "item", title: "Йом зе мехубад", page: 30 },
      { type: "item", title: "Йом шабатон", page: 34 },
      { type: "item", title: "Ки Эшмера Шабат", page: 36 },
      { type: "item", title: "Дрор йикра", page: 40 },
      { type: "item", title: "Шимру Шабтотай", page: 42 },

      { type: "heading", title: "Песни для третьей трапезы", visible: true },
      { type: "item", title: "Мизмор ле Давид (псалом 23)", page: 48 },
      { type: "item", title: "Йедит нефеш.", page: 50 },

      {
        type: "heading",
        title: "Псалмы, читаемые в благословении после трапезы (биркат-а-мазон)",
        visible: true
      },
      { type: "item", title: "Шир-а-маалот (псалом 126)", page: 52 },
      { type: "item", title: "На реках вавилонских (псалом 137)", page: 54 }
    ],
    pages: [
      {
        layout: "spread",
        image: "images/pages/shimru-shabtotai/pages-10-11.jpg?v=20260709-3",
        alt: "Разворот книги «Шимру Шабтотай», страницы 10-11"
      },
      {
        layout: "spread",
        image: "images/pages/shimru-shabtotai/pages-30-31.jpg?v=20260709-3",
        alt: "Разворот книги «Шимру Шабтотай», страницы 30-31"
      }
    ]
  }
};
