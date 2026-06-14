// ============================================================
//  КОМПОНЕНТЫ — переиспользуемые функции рендера
//  Использование:
//    BookComponents.renderCard(parentEl, 'book-id')
//    BookComponents.renderGrid(parentEl, { featured: true })
//    BookComponents.renderGrid(parentEl, { all: true })
//    BookComponents.renderDetail(parentEl, 'book-id')
// ============================================================

const BookComponents = {

  // ── Найти книгу по id ─────────────────────────────────────
  getBook(id) {
    return BOOKS.find(b => b.id === id) || null;
  },

  // ── Карточка книги (для сетки) ───────────────────────────
  renderCard(parent, bookId) {
    const book = this.getBook(bookId);
    if (!book) return;

    const card = document.createElement('article');
    card.className = 'book-card';
    card.innerHTML = `
      <a href="book.html?id=${book.id}" class="book-card__cover-wrap" aria-label="${book.title}">
        <img
          src="${book.coverImage}"
          alt="Обложка: ${book.title}"
          class="book-card__cover"
          loading="lazy"
          onerror="this.onerror=null;this.src='images/cover-placeholder.svg'"
        >
      </a>
      <div class="book-card__body">
        <div class="book-card__genres">
          ${book.genres.map(g => `<span class="genre-tag">${g}</span>`).join('')}
        </div>
        <h3 class="book-card__title">
          <a href="book.html?id=${book.id}">${book.title}</a>
        </h3>
        ${book.subtitle ? `<p class="book-card__subtitle">${book.subtitle}</p>` : ''}
        <p class="book-card__desc">${book.description}</p>
        <a href="book.html?id=${book.id}" class="btn btn--outline">Подробнее</a>
      </div>
    `;
    parent.appendChild(card);
  },

  // ── Сетка книг ───────────────────────────────────────────
  // options: { featured: true } | { all: true } | { ids: ['id1', 'id2'] }
  renderGrid(parent, options = { all: true }) {
    let list = [];
    if (options.ids) {
      list = options.ids.map(id => this.getBook(id)).filter(Boolean);
    } else if (options.featured) {
      list = BOOKS.filter(b => b.featured);
    } else {
      list = [...BOOKS];
    }
    list.forEach(book => this.renderCard(parent, book.id));
  },

  // ── Полная страница книги ────────────────────────────────
  renderDetail(parent, bookId) {
    const book = this.getBook(bookId);

    if (!book) {
      parent.innerHTML = `
        <div class="container" style="padding: 80px 24px; text-align: center;">
          <p style="font-size:1.1rem; color: var(--text-500);">
            Книга не найдена.&nbsp;
            <a href="index.html#books">← На главную</a>
          </p>
        </div>`;
      return;
    }

    document.title = `${book.title} — ${book.author}`;

    const detail = document.createElement('div');
    detail.className = 'book-detail';

    // ─── Хлебная крошка ──────────────────────────────────────
    const breadcrumb = document.createElement('div');
    breadcrumb.className = 'breadcrumb';
    breadcrumb.innerHTML = `
      <div class="container">
        <a href="index.html#books">← Все книги</a>
      </div>`;
    detail.appendChild(breadcrumb);

    // ─── Верхний блок: обложка + мета ────────────────────────
    const headerEl = document.createElement('div');
    headerEl.className = 'book-detail__header';
    headerEl.innerHTML = `
      <div class="container book-detail__header-inner">
        <div class="book-detail__cover-col">
          <img
            src="${book.coverImage}"
            alt="Обложка: ${book.title}"
            class="book-detail__cover-img"
            onerror="this.onerror=null;this.src='images/cover-placeholder.svg'"
            title="Нажмите для увеличения"
          >
          <p class="cover-zoom-hint">Нажмите на обложку для увеличения</p>
        </div>
        <div class="book-detail__info">
          <div class="book-card__genres" style="margin-bottom:14px">
            ${book.genres.map(g => `<span class="genre-tag">${g}</span>`).join('')}
          </div>
          <h1 class="book-detail__title">${book.title}</h1>
          ${book.subtitle ? `<p class="book-detail__subtitle">${book.subtitle}</p>` : ''}
          <p class="book-detail__author">${book.author}</p>
          <p class="book-detail__year">${book.publishedYear} · ${book.pages} стр.</p>
          <p class="book-detail__long-desc">${book.longDescription.replace(/\n/g, '<br>')}</p>
          <div id="buy-${book.id}" class="buy-section"></div>
        </div>
        ${book.excerpt ? `
          <aside class="book-detail__excerpt-col" aria-label="Отрывок">
            ${this._dividerHTML()}
            <h2 class="section-title">Отрывок</h2>
            <blockquote class="excerpt-text">${book.excerpt.replace(/\n/g, '<br>')}</blockquote>
          </aside>
        ` : ''}
      </div>
    `;
    detail.appendChild(headerEl);

    // ─── Развороты ──────────────────────────────────────────
    if (book.spreads && book.spreads.length > 0) {
      const spreadsEl = document.createElement('section');
      spreadsEl.className = 'book-detail__section';
      spreadsEl.innerHTML = `
        <div class="container">
          ${this._dividerHTML()}
          <h2 class="section-title">Развороты</h2>
          <div class="spreads-grid">
            ${book.spreads.map(src => `
              <img src="${src}" alt="Разворот книги" class="spread-img" loading="lazy">
            `).join('')}
          </div>
        </div>`;
      detail.appendChild(spreadsEl);
    }

    // ─── Видео ──────────────────────────────────────────────
    if (book.video) {
      const videoEl = document.createElement('section');
      videoEl.className = 'book-detail__section';
      videoEl.innerHTML = `
        <div class="container container--narrow">
          ${this._dividerHTML()}
          <h2 class="section-title">Видео</h2>
          <div class="video-wrap">
            <iframe
              src="${book.video}"
              title="Видео к книге «${book.title}»"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>`;
      detail.appendChild(videoEl);
    }

    parent.appendChild(detail);

    // Лайтбокс для обложки
    const coverImg = detail.querySelector('.book-detail__cover-img');
    if (coverImg) {
      coverImg.style.cursor = 'zoom-in';
      coverImg.addEventListener('click', () => this._openLightbox(coverImg.src, book.title));
    }

    // Рендерим секцию покупки — после того как el добавлен в DOM
    const buyEl = detail.querySelector(`#buy-${book.id}`);
    if (buyEl) this._renderBuySection(buyEl, book.editions);
  },

  // ── Секция «Купить» ──────────────────────────────────────
  _renderBuySection(parent, editions) {
    if (!editions || editions.length === 0) return;

    const wrap = document.createElement('div');
    wrap.className = 'buy-wrap';

    const heading = document.createElement('p');
    heading.className = 'buy-heading';
    heading.textContent = 'Где купить';
    wrap.appendChild(heading);

    const listEl = document.createElement('div');
    listEl.className = 'edition-list';

    editions.forEach(edition => {
      const enabledRetailers = (edition.retailers || []).filter(r => r.enabled !== false);
      if (enabledRetailers.length === 0) return;

      const row = document.createElement('div');
      row.className = 'edition-row';

      const label = document.createElement('p');
      label.className = 'edition-row__label';
      label.textContent = edition.label;
      row.appendChild(label);

      const links = document.createElement('div');
      links.className = 'edition-row__links';
      this._renderRetailers(links, enabledRetailers);
      row.appendChild(links);

      listEl.appendChild(row);
    });

    wrap.appendChild(listEl);
    parent.appendChild(wrap);
  },

  // ── Ретейлеры одного издания ─────────────────────────────
  _renderRetailers(parent, retailers) {
    retailers.forEach(retailer => {
      if (retailer.enabled === false) return;

      const group = document.createElement('div');
      group.className = 'retailer-group';

      if (retailer.platform === 'amazon') {
        const label = document.createElement('p');
        label.className = 'retailer-label';
        label.innerHTML = '<span class="retailer-icon">&#128230;</span> Amazon';
        group.appendChild(label);

        const regionWrap = document.createElement('div');
        regionWrap.className = 'region-buttons';

        retailer.regions.forEach(r => {
          const a = document.createElement('a');
          a.href      = r.url;
          a.className = 'btn btn--amazon';
          a.innerHTML = `<span>${r.flag}</span><span>${r.label}</span>`;

          if (r.url === '#') {
            a.addEventListener('click', e => {
              e.preventDefault();
              this._showToast('Книга будет доступна через несколько дней');
            });
          } else {
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
          }

          regionWrap.appendChild(a);
        });

        group.appendChild(regionWrap);

      } else if (retailer.platform === 'lulu') {
        const label = document.createElement('p');
        label.className = 'retailer-label';
        label.innerHTML = '<span class="retailer-icon">&#128218;</span> Lulu';
        group.appendChild(label);

        const a = document.createElement('a');
        a.href      = retailer.url;
        a.className = 'btn btn--lulu';
        a.textContent = 'Купить на Lulu';

        if (retailer.url === '#') {
          a.addEventListener('click', e => {
            e.preventDefault();
            this._showToast('Книга будет доступна через несколько дней');
          });
        } else {
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
        }

        group.appendChild(a);
      }

      parent.appendChild(group);
    });
  },

  // ── Лайтбокс ────────────────────────────────────────────
  _openLightbox(src, title) {
    const overlay = document.createElement('div');
    overlay.className = 'lightbox';
    overlay.innerHTML = `
      <div class="lightbox__backdrop"></div>
      <div class="lightbox__content">
        <img src="${src}" alt="${title}" class="lightbox__img">
        <button class="lightbox__close" aria-label="Закрыть">✕</button>
      </div>
    `;

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    // Небольшая задержка для анимации появления
    requestAnimationFrame(() => overlay.classList.add('is-open'));

    const close = () => {
      overlay.classList.remove('is-open');
      overlay.addEventListener('transitionend', () => {
        overlay.remove();
        document.body.style.overflow = '';
      }, { once: true });
    };

    overlay.querySelector('.lightbox__close').addEventListener('click', close);
    overlay.querySelector('.lightbox__backdrop').addEventListener('click', close);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); }, { once: true });
  },

  // ── Декоративный разделитель ─────────────────────────────
  _dividerHTML() {
    return `<div class="section-divider"><span class="divider-ornament">◆</span></div>`;
  },

  _showToast(message) {
    let toast = document.querySelector('.site-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'site-toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add('is-visible');

    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 2600);
  }
};
