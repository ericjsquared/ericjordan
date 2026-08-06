/* Animate each about-card accordion with a smooth vertical expansion */
document.querySelectorAll('.about-card').forEach((card) => {
  const summary = card.querySelector('summary');
  const body = card.querySelector('.about-card-body');
  if (!summary || !body) return;

  summary.addEventListener('click', (e) => {
    e.preventDefault();

    if (card.open) {
      body.style.maxHeight = body.scrollHeight + 'px';
      requestAnimationFrame(() => {
        body.style.maxHeight = '0';
      });
      body.addEventListener('transitionend', () => {
        card.removeAttribute('open');
      }, { once: true });
    } else {
      card.setAttribute('open', '');
      body.style.maxHeight = body.scrollHeight + 'px';
      body.addEventListener('transitionend', () => {
        body.style.maxHeight = 'none';
      }, { once: true });
    }
  });
});

const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileBackdrop = document.querySelector('.mobile-menu-backdrop');

if (menuToggle && mobileMenu && mobileBackdrop) {
  const closeMenu = () => {
    mobileMenu.classList.remove('open');
    mobileBackdrop.classList.remove('open');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    mobileBackdrop.classList.toggle('open', isOpen);
    menuToggle.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('menu-open', isOpen);
  });

  mobileBackdrop.addEventListener('click', closeMenu);

  document.addEventListener('click', (event) => {
    const clickInsideMenu = mobileMenu.contains(event.target);
    const clickOnToggle = menuToggle.contains(event.target);

    if (!clickInsideMenu && !clickOnToggle && mobileMenu.classList.contains('open')) {
      closeMenu();
    }
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });
}
