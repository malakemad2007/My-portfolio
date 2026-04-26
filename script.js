document.addEventListener('DOMContentLoaded', () => {
  // ========== Sticky Navigation ==========
  const navbar = document.getElementById('navbar');
  
  // Home page starts transparent, others start scrolled
  if (!document.body.classList.contains('home-page')) {
    navbar.classList.add('scrolled');
  }

  window.addEventListener('scroll', () => {
    if (document.body.classList.contains('home-page')) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });

  // ========== Mobile Menu Toggle ==========
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // ========== Experience Tab Filtering ==========
  const tabBtns = document.querySelectorAll('.tab-btn');
  const experienceItems = document.querySelectorAll('.exp-item');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      experienceItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // ========== Contact Form Submission & Success Popup ==========
  const contactForm = document.getElementById('contact-form');
  const successPopup = document.getElementById('success-popup');
  const closePopup = document.getElementById('close-popup');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      successPopup.style.display = 'flex';
      contactForm.reset();
    });
  }

  if (closePopup) {
    closePopup.addEventListener('click', () => {
      successPopup.style.display = 'none';
    });
  }

  // ========== Skill Bar Animation ==========
  const skillFills = document.querySelectorAll('.skill-fill');
  if (skillFills.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          // Trigger animation by setting width from data or style
          // Since I used inline style for width in HTML, I'll re-apply it
          const targetWidth = fill.getAttribute('style').match(/width:\s*(\d+)%/)[1] + '%';
          fill.style.width = '0';
          setTimeout(() => {
            fill.style.width = targetWidth;
          }, 100);
          observer.unobserve(fill);
        }
      });
    }, { threshold: 0.5 });

    skillFills.forEach(fill => observer.observe(fill));
  }
});
