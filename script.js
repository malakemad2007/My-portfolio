document.addEventListener("DOMContentLoaded", () => {
  // ========== Sticky Navigation ==========
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // ========== Mobile Menu Toggle ==========
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      const isVisible = navLinks.style.display === "flex";
      navLinks.style.display = isVisible ? "none" : "flex";
      if (!isVisible) {
        navLinks.style.flexDirection = "column";
        navLinks.style.position = "absolute";
        navLinks.style.top = "80px";
        navLinks.style.right = "20px";
        navLinks.style.width = "200px";
        navLinks.style.background = "white";
        navLinks.style.padding = "20px";
        navLinks.style.borderRadius = "12px";
        navLinks.style.boxShadow = "0 10px 15px rgba(0,0,0,0.1)";
      }
    });
  }

  // ========== Smooth Scrolling ==========
  document.querySelectorAll("a[href^=\'#\']").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // ========== Contact Form & Popup Functionality ==========
  const contactForm = document.getElementById("contact-form");
  const successPopup = document.getElementById("success-popup");
  const closePopup = document.getElementById("close-popup");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector("button");
      btn.textContent = "Sending...";
      btn.disabled = true;

      // Simulate form submission
      setTimeout(() => {
        // Show success popup
        successPopup.style.display = "flex";
        
        // Reset button and form
        btn.textContent = "Send Message";
        btn.disabled = false;
        contactForm.reset();
      }, 1500);
    });
  }

  if (closePopup) {
    closePopup.addEventListener("click", () => {
      successPopup.style.display = "none";
    });
  }

  // Close popup when clicking outside content
  window.addEventListener("click", (e) => {
    if (e.target === successPopup) {
      successPopup.style.display = "none";
    }
  });

  // ========== Scroll Reveal Animation ==========
  const reveal = () => {
    const reveals = document.querySelectorAll(".reveal");
    for (let i = 0; i < reveals.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = reveals[i].getBoundingClientRect().top;
      const elementVisible = 100;
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  };
  window.addEventListener("scroll", reveal);

  // Initial call
  reveal();
});
