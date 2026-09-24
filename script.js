document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.getElementById('custom-cursor');
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
  if (!coarsePointer && cursor) {
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    window.addEventListener('mousemove', (event) => {
      x = event.clientX;
      y = event.clientY;
      cursor.style.left = `${x}px`;
      cursor.style.top = `${y}px`;
      cursor.style.opacity = '1';
    });
    document.querySelectorAll('a, button, .experience-item, .work-item, .skill-grid article').forEach((element) => {
      element.addEventListener('mouseenter', () => cursor.classList.add('cursor-active'));
      element.addEventListener('mouseleave', () => cursor.classList.remove('cursor-active'));
    });
  }

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

  const header = document.getElementById('navbar');
  const menuButton = document.querySelector('.menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  menuButton?.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
  mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }));

  window.addEventListener('scroll', () => {
    header?.classList.toggle('scrolled', window.scrollY > 24);
  }, { passive: true });
});
