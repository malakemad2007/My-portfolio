document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('navbar');
  const menuButton = document.querySelector('.workspace-menu, .menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  menuButton?.addEventListener('click', () => {
    const open = mobileMenu?.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(Boolean(open)));
  });

  mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }));

  window.addEventListener('scroll', () => {
    header?.classList.toggle('scrolled', window.scrollY > 24);
  }, { passive: true });
});
