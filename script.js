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
          item.style.animation = 'fadeIn 0.5s ease forwards';
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
        if (navLinks.classList.contains('active')) {
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

  // ========== Testimonials Logic ==========
  const testimonialsContainer = document.getElementById('testimonials-container');
  const testimonialModal = document.getElementById('testimonial-modal');
  const openModalBtn = document.getElementById('open-testimonial-modal');
  const closeModalBtn = document.querySelector('.close-modal');
  const testimonialForm = document.getElementById('testimonial-form');
  const stars = document.querySelectorAll('.stars i');
  const ratingInput = document.getElementById('rating-value');

  // Initial Testimonials
  const initialTestimonials = [
    {
      name: "Sarah Johnson",
      relation: "Peer at STEM Academy",
      rating: 5,
      opinion: "Malak is an incredible leader. Her dedication to STEM and community impact is truly inspiring!",
      pic: "https://i.pravatar.cc/150?u=sarah"
    },
    {
      name: "Ahmed Ali",
      relation: "Mentor at Resala STEM",
      rating: 5,
      opinion: "Working with Malak was a pleasure. She has a unique ability to simplify complex problems and lead teams effectively.",
      pic: "https://i.pravatar.cc/150?u=ahmed"
    }
  ];

  function renderTestimonials(tests) {
    testimonialsContainer.innerHTML = '';
    tests.forEach(test => {
      const card = document.createElement('div');
      card.className = 'testimonial-card';
      
      let starsHtml = '';
      for (let i = 0; i < 5; i++) {
        starsHtml += `<i class="fas fa-star ${i < test.rating ? 'active' : ''}"></i>`;
      }

      card.innerHTML = `
        <div class="test-stars">${starsHtml}</div>
        <p class="test-opinion">"${test.opinion}"</p>
        <div class="test-user">
          <img src="${test.pic || 'https://i.pravatar.cc/150?u=default'}" alt="${test.name}" class="test-img">
          <div class="test-info">
            <h4>${test.name}</h4>
            <span>${test.relation}</span>
          </div>
        </div>
      `;
      testimonialsContainer.appendChild(card);
    });
  }

  renderTestimonials(initialTestimonials);

  // Modal Handling
  if (openModalBtn) {
    openModalBtn.onclick = () => testimonialModal.style.display = 'block';
  }
  if (closeModalBtn) {
    closeModalBtn.onclick = () => testimonialModal.style.display = 'none';
  }
  window.onclick = (event) => {
    if (event.target == testimonialModal) {
      testimonialModal.style.display = 'none';
    }
  };

  // Star Rating Handling
  stars.forEach(star => {
    star.onclick = () => {
      const val = star.getAttribute('data-value');
      ratingInput.value = val;
      stars.forEach(s => {
        if (s.getAttribute('data-value') <= val) {
          s.classList.add('active');
        } else {
          s.classList.remove('active');
        }
      });
    };
  });

  // Form Submission
  if (testimonialForm) {
    testimonialForm.onsubmit = (e) => {
      e.preventDefault();
      const newTest = {
        name: document.getElementById('test-name').value,
        relation: document.getElementById('test-relation').value,
        rating: parseInt(ratingInput.value),
        opinion: document.getElementById('test-opinion').value,
        pic: document.getElementById('test-pic').value
      };
      
      initialTestimonials.unshift(newTest);
      renderTestimonials(initialTestimonials);
      testimonialModal.style.display = 'none';
      testimonialForm.reset();
      // Reset stars
      stars.forEach(s => s.classList.remove('active'));
      stars[4].classList.add('active'); // Default back to 5
    };
  }
});
