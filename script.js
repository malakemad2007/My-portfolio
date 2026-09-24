document.addEventListener('DOMContentLoaded', () => {
  const prefersTouch = window.matchMedia('(pointer: coarse)').matches;
  const body = document.body;
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');

  if (!prefersTouch && dot && ring) {
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let ringX = x;
    let ringY = y;
    window.addEventListener('mousemove', (event) => { x = event.clientX; y = event.clientY; });
    const moveCursor = () => {
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      ringX += (x - ringX) * 0.16;
      ringY += (y - ringY) * 0.16;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      requestAnimationFrame(moveCursor);
    };
    moveCursor();
    document.querySelectorAll('a, button, .experience-row, .work-item, .skills-cloud span').forEach((element) => {
      element.addEventListener('mouseenter', () => body.classList.add('cursor-hover'));
      element.addEventListener('mouseleave', () => body.classList.remove('cursor-hover'));
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

  const mobileButton = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  mobileButton?.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    mobileButton.setAttribute('aria-expanded', String(isOpen));
  });
  mobileNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    mobileButton?.setAttribute('aria-expanded', 'false');
  }));

  const sections = [...document.querySelectorAll('main section[id]')];
  const links = [...document.querySelectorAll('.nav-link')];
  const setActive = () => {
    const current = sections.reduce((active, section) => {
      return window.scrollY + 140 >= section.offsetTop ? section.id : active;
    }, 'home');
    links.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
  };
  window.addEventListener('scroll', setActive, { passive: true });
  setActive();
});
