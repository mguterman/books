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
    if (book.soon) {
      this.renderSoonCard(parent);
      return;
    }

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

  renderSoonCard(parent) {
    const card = document.createElement('article');
    card.className = 'book-card book-card--soon';
    card.innerHTML = `
      <div class="book-card__cover-wrap book-card__cover-wrap--soon" aria-label="Новая книга готовится к выпуску">
        <div class="book-card__soon-art">
          <span class="book-card__soon-kicker">Новая книга</span>
          <strong>готовится к<br>выпуску</strong>
        </div>
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

    if (!book || book.soon) {
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
        ${this._renderBookTabsHTML(book)}
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

    this._initBookTabs(detail);
  },

  // ── Вкладки: отрывок, оглавление, страницы ────────────────
  _renderBookTabsHTML(book) {
    const content = typeof BOOK_CONTENT !== 'undefined' ? BOOK_CONTENT[book.id] : null;
    const hasExcerpt = Boolean(book.excerpt);
    const hasToc = Boolean(content && content.toc && content.toc.length > 0);
    const hasPages = Boolean(content && content.pages && content.pages.length > 0);

    if (!hasExcerpt && !hasToc && !hasPages) return '';

    return `
      <aside class="book-detail__excerpt-col book-tabs" aria-label="Материалы книги">
        <div class="book-tabs__list" role="tablist" aria-label="Материалы книги">
          <button type="button" class="book-tabs__tab is-active" role="tab" aria-selected="true" aria-controls="tab-excerpt-${book.id}" id="tab-excerpt-button-${book.id}" data-book-tab="excerpt">Отрывок</button>
          <button type="button" class="book-tabs__tab" role="tab" aria-selected="false" aria-controls="tab-toc-${book.id}" id="tab-toc-button-${book.id}" data-book-tab="toc">Оглавление</button>
          <button type="button" class="book-tabs__tab" role="tab" aria-selected="false" aria-controls="tab-pages-${book.id}" id="tab-pages-button-${book.id}" data-book-tab="pages">Страницы</button>
        </div>

        <div class="book-tabs__panel is-active" role="tabpanel" id="tab-excerpt-${book.id}" aria-labelledby="tab-excerpt-button-${book.id}" data-book-panel="excerpt">
          ${hasExcerpt ? `<blockquote class="excerpt-text">${book.excerpt.replace(/\n/g, '<br>')}</blockquote>` : '<p class="book-tabs__empty">Отрывок скоро появится.</p>'}
        </div>

        <div class="book-tabs__panel" role="tabpanel" id="tab-toc-${book.id}" aria-labelledby="tab-toc-button-${book.id}" data-book-panel="toc" hidden>
          ${hasToc ? this._renderTocHTML(content.toc) : '<p class="book-tabs__empty">Оглавление скоро появится.</p>'}
        </div>

        <div class="book-tabs__panel" role="tabpanel" id="tab-pages-${book.id}" aria-labelledby="tab-pages-button-${book.id}" data-book-panel="pages" hidden>
          ${hasPages ? this._renderPagesHTML(content.pages) : '<p class="book-tabs__empty">Страницы печатного издания скоро появятся.</p>'}
        </div>
      </aside>
    `;
  },

  _renderTocHTML(toc) {
    return `
      <div class="toc-list">
        ${toc.map(entry => {
          if (entry.type === 'heading') {
            if (entry.visible === false) return '';
            return `<h3 class="toc-list__heading">${entry.title}</h3>`;
          }

          return `
            <div class="toc-list__item">
              <span class="toc-list__title">${entry.title}</span>
              <span class="toc-list__dots" aria-hidden="true"></span>
              <span class="toc-list__page">${entry.page}</span>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  _renderPagesHTML(pages) {
    return `
      <div class="page-preview-grid">
        ${pages.map(page => {
          const layout = page.layout || 'page';

          return `
          <button type="button" class="page-preview page-preview--${layout}" data-page-image="${page.image}" data-page-title="${page.alt || ''}" data-page-layout="${layout}" aria-label="${page.alt || 'Страница книги'}">
            <img src="${page.image}" alt="${page.alt || page.title}" loading="lazy">
          </button>
        `;
        }).join('')}
      </div>
    `;
  },

  _initBookTabs(root) {
    root.querySelectorAll('.book-tabs').forEach(tabs => {
      const tabButtons = tabs.querySelectorAll('[data-book-tab]');
      const panels = tabs.querySelectorAll('[data-book-panel]');

      tabButtons.forEach(button => {
        button.addEventListener('click', () => {
          const target = button.dataset.bookTab;

          tabButtons.forEach(tab => {
            const isActive = tab === button;
            tab.classList.toggle('is-active', isActive);
            tab.setAttribute('aria-selected', String(isActive));
          });

          panels.forEach(panel => {
            const isActive = panel.dataset.bookPanel === target;
            panel.classList.toggle('is-active', isActive);
            panel.hidden = !isActive;
          });
        });
      });

      tabs.querySelectorAll('[data-page-image]').forEach(button => {
        button.addEventListener('click', () => {
          this._openLightbox(button.dataset.pageImage, button.dataset.pageTitle || '', button.dataset.pageLayout || 'page');
        });
      });
    });
  },

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
        const regions = this._prepareAmazonRegions(retailer.regions || [], retailer)
          .filter(r => r.enabled !== false);
        const featuredRegions = regions.filter(r => r.featured);
        const otherRegions = regions.filter(r => !r.featured);

        if (featuredRegions.length > 0) {
          const featuredWrap = document.createElement('div');
          featuredWrap.className = 'featured-region-list';

          featuredRegions.forEach(r => {
            const option = document.createElement('div');
            option.className = 'amazon-region-option';

            if (r.note) {
              const note = document.createElement('p');
              note.className = 'amazon-region-note';
              note.textContent = r.note;
              option.appendChild(note);
            }

            option.appendChild(this._createAmazonRegionLink(r));
            featuredWrap.appendChild(option);
          });

          group.appendChild(featuredWrap);
        }

        if (otherRegions.length > 0) {
          const details = document.createElement('details');
          details.className = 'amazon-more';

          const summary = document.createElement('summary');
          summary.textContent = 'Купить на других Amazon сайтах';
          details.appendChild(summary);

          const regionWrap = document.createElement('div');
          regionWrap.className = 'region-buttons';

          otherRegions.forEach(r => {
            regionWrap.appendChild(this._createAmazonRegionLink(r));
          });

          details.appendChild(regionWrap);
          group.appendChild(details);
        }

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

  _createAmazonRegionLink(region) {
    const a = document.createElement('a');
    a.href = region.url;
    a.className = 'btn btn--amazon';
    a.innerHTML = `<span>${region.flag}</span><span>${region.label}</span>`;

    if (region.url === '#') {
      a.addEventListener('click', e => {
        e.preventDefault();
        this._showToast('Книга будет доступна через несколько дней');
      });
    } else {
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    }

    return a;
  },

  _prepareAmazonRegions(regions, retailer) {
    const overrides = retailer.regionOverrides || {};

    return regions.map(region => {
      const override = overrides[region.code] || {};
      const asinUrl = retailer.asin && region.baseUrl
        ? `${region.baseUrl}/dp/${retailer.asin}`
        : '#';

      return {
        ...region,
        url: asinUrl,
        ...override
      };
    });
  },

  // ── Лайтбокс ────────────────────────────────────────────
  _openLightbox(src, title, layout = 'image') {
    const layoutClass = layout === 'spread' ? ' lightbox__content--spread' : '';
    const overlay = document.createElement('div');
    overlay.className = 'lightbox';
    overlay.innerHTML = `
      <div class="lightbox__backdrop"></div>
      <div class="lightbox__content${layoutClass}">
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
