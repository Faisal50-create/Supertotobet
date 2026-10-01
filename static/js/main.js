document.addEventListener('DOMContentLoaded', function () {

  /* =========================
     Mobile Menu
  ========================== */
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-navigation');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function () {
      this.classList.toggle('open');
      mainNav.classList.toggle('show');

      const isExpanded = this.classList.contains('open');
      this.setAttribute('aria-expanded', isExpanded);

      document.body.style.overflow = isExpanded ? 'hidden' : '';
    });
  } else {
    console.error('Mobile menu elements not found!');
  }

  /* =========================
     Theme Toggle (Dark / Light)
  ========================== */
  const toggle = document.getElementById('themeToggle');

  if (toggle) {
    // Load saved or default theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    // On toggle click
    toggle.addEventListener('click', () => {
      const newTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    });

    function applyTheme(theme) {
      document.documentElement.dataset.theme = theme;
    }
  } else {
    console.warn('Theme toggle button not found!');
  }

  /* =========================
     Match API Placeholder
  ========================== */
  const matchContainer = document.getElementById('match-api-container');
  if (matchContainer) {
    matchContainer.innerHTML = `
      <div class="match-card">
        <h3>Match Data Loading...</h3>
        <p>Live match data will appear here</p>
      </div>
    `;
  }

  /* =========================
     Load More TV Channels
  ========================== */
  const loadMoreBtn = document.getElementById('loadMoreTv');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      document.querySelectorAll('.hidden-tv').forEach(el => {
        el.classList.remove('hidden-tv');
      });
      loadMoreBtn.remove();
    });
  }

  /* =========================
     Post Category Filter
  ========================== */
  const buttons = document.querySelectorAll('.filter-btn');
  const posts = Array.from(document.querySelectorAll('.post-card'));

  const normalize = s => String(s || '').trim().toLowerCase();

  function getPostCats(post) {
    const raw =
      post.dataset.category ||
      post.getAttribute('data-category') ||
      '';
    return raw
      .split(/[\s,;]+/)
      .map(c => normalize(c))
      .filter(Boolean);
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = normalize(btn.getAttribute('data-category'));

      posts.forEach(post => {
        const postCats = getPostCats(post);
        post.style.display =
          category === 'all' || postCats.includes(category)
            ? ''
            : 'none';
      });
    });
  });

  /* =========================
     FAQ Always Visible
  ========================== */
  document.querySelectorAll('.faq-answer').forEach(ans => {
    ans.style.display   = 'block';
    ans.style.maxHeight = 'none';
    ans.style.visibility= 'visible';
    ans.style.opacity   = '1';
  });

});
