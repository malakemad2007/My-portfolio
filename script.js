document.addEventListener('DOMContentLoaded', () => {
  // ========== Sticky Navigation ==========
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

  // Close mobile menu when a link is clicked
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
      }
    });
  });

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

  document.querySelectorAll('.exp-item, .project-card, .program-card, .achievement-card, .skill-category').forEach(el => {
    observer.observe(el);
  });

  // ========== Active Navigation Link Highlighting ==========
  const sections = document.querySelectorAll('section[id]');
  const navLinkElements = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinkElements.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });

  // ========== Skill Bar Animation ==========
  const skillBars = document.querySelectorAll('.skill-fill');
  let skillsAnimated = false;

  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !skillsAnimated) {
        skillsAnimated = true;
        skillBars.forEach(bar => {
          const width = bar.style.width;
          bar.style.width = '0';
          setTimeout(() => {
            bar.style.transition = 'width 1s ease-out';
            bar.style.width = width;
          }, 100);
        });
      }
    });
  }, { threshold: 0.5 });

  document.querySelector('.skills-section')?.let(el => skillsObserver.observe(el));
});
