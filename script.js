document.addEventListener('DOMContentLoaded', () => {
  // ========== Sticky Navigation (Command Center) ==========
  const navbar = document.getElementById('navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
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
          item.style.animation = 'slideInLeft 0.5s ease-out forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // ========== Smooth Scrolling for Navigation Links ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 100,
          behavior: 'smooth'
        });
        if (navLinks && navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
        }
      }
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

  // Close popup on background click
  if (successPopup) {
    successPopup.addEventListener('click', (e) => {
      if (e.target === successPopup) {
        successPopup.style.display = 'none';
      }
    });
  }

  // ========== Scroll Animations for Elements ==========
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.exp-item, .project-row').forEach(el => {
    observer.observe(el);
  });
});
