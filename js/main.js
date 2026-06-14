// ============================================================
//  ИНИЦИАЛИЗАЦИЯ СТРАНИЦ
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;

  highlightNav();
  initBuyHelpModal();
  initAuthorHelpModal();

  if (page === 'home') {
    initScrollHeader();
  }

  switch (page) {
    case 'home': initHome(); break;
    case 'book': initBook(); break;
  }
});

// ── Главная ──────────────────────────────────────────────────
function initHome() {
  const grid = document.getElementById('all-books');
  if (grid) {
    BookComponents.renderGrid(grid, { all: true });
  }
}

// ── Страница книги ────────────────────────────────────────────
function initBook() {
  const params    = new URLSearchParams(window.location.search);
  const bookId    = params.get('id');
  const container = document.getElementById('book-detail');
  if (!container) return;

  if (!bookId) {
    container.innerHTML = `
      <div class="container" style="padding: 100px 24px; text-align: center;">
        <p style="font-size:1.1rem; color: var(--text-500);">
          Книга не указана.&nbsp;<a href="index.html">← На главную</a>
        </p>
      </div>`;
    return;
  }

  BookComponents.renderDetail(container, bookId);
}

// ── Навигация: подсвечиваем текущую страницу ──────────────────
function highlightNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('is-active');
    }
  });
}

// ── Попап с инструкцией покупки ──────────────────────────────
function initBuyHelpModal() {
  const triggers = document.querySelectorAll('[data-buy-help]');
  if (!triggers.length) return;

  let modal = null;
  let closeButton = null;

  const closeModal = () => {
    if (!modal) return;

    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKeydown);
    modal.addEventListener('transitionend', () => {
      modal.remove();
      modal = null;
      closeButton = null;
    }, { once: true });
  };

  const onKeydown = event => {
    if (event.key === 'Escape') closeModal();
  };

  const openModal = () => {
    if (modal) return;

    modal = document.createElement('div');
    modal.className = 'buy-help-modal';
    modal.innerHTML = `
      <div class="buy-help-modal__backdrop" data-buy-help-close></div>
      <section class="buy-help-modal__panel" role="dialog" aria-modal="true" aria-labelledby="buy-help-title">
        <button type="button" class="buy-help-modal__close" data-buy-help-close aria-label="Закрыть">×</button>
        <h2 id="buy-help-title">Как купить книги?</h2>
        <p>Выберите книгу, откройте страницу с описанием и нажмите кнопку доступной площадки. Заказ, оплата и доставка оформляются на сайте продавца.</p>
      </section>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    closeButton = modal.querySelector('.buy-help-modal__close');

    modal.querySelectorAll('[data-buy-help-close]').forEach(element => {
      element.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', onKeydown);
    requestAnimationFrame(() => {
      modal.classList.add('is-open');
      closeButton.focus();
    });
  };

  triggers.forEach(trigger => trigger.addEventListener('click', openModal));
}

function initAuthorHelpModal() {
  const triggers = document.querySelectorAll('[data-author-help]');
  if (!triggers.length) return;

  let modal = null;
  let closeButton = null;

  const closeModal = () => {
    if (!modal) return;

    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKeydown);
    modal.addEventListener('transitionend', () => {
      modal.remove();
      modal = null;
      closeButton = null;
    }, { once: true });
  };

  const onKeydown = event => {
    if (event.key === 'Escape') closeModal();
  };

  const openModal = () => {
    if (modal) return;

    const paragraphs = typeof SITE_CONTENT !== 'undefined' && SITE_CONTENT.authorBio
      ? SITE_CONTENT.authorBio.map(paragraph => `<p>${paragraph}</p>`).join('')
      : '<p>Информация об авторе скоро появится.</p>';

    modal = document.createElement('div');
    modal.className = 'buy-help-modal';
    modal.innerHTML = `
      <div class="buy-help-modal__backdrop" data-author-help-close></div>
      <section class="buy-help-modal__panel buy-help-modal__panel--author" role="dialog" aria-modal="true" aria-labelledby="author-help-title">
        <button type="button" class="buy-help-modal__close" data-author-help-close aria-label="Закрыть">×</button>
        <h2 id="author-help-title">Об авторе</h2>
        ${paragraphs}
      </section>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    closeButton = modal.querySelector('.buy-help-modal__close');

    modal.querySelectorAll('[data-author-help-close]').forEach(element => {
      element.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', onKeydown);
    requestAnimationFrame(() => {
      modal.classList.add('is-open');
      closeButton.focus();
    });
  };

  triggers.forEach(trigger => trigger.addEventListener('click', openModal));
}

// ── Прозрачный хедер → тёмный при скролле ───────────────────
function initScrollHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
