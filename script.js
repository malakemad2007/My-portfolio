// ========== Mobile Navigation Toggle ==========
const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.getElementById('navbar');

menuToggle.addEventListener('click', () => {
  navbar.classList.toggle('active');
});

// ========== Navigation Active State ==========
const navLinks = document.querySelectorAll('.nav-link');

function setActiveLink() {
  const scrollPosition = window.scrollY + 100;
  navLinks.forEach(link => {
    const section = document.querySelector(link.getAttribute('href'));
    if (section && section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', setActiveLink);
setActiveLink();

// ========== Sticky Navigation Background ==========
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});

// ========== Smooth Scrolling for Navigation Links ==========
navLinks.forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
      if (navbar.classList.contains('active')) {
        navbar.classList.remove('active');
      }
    }
  });
});

// ========== Experience Tab Filtering ==========
const tabButtons = document.querySelectorAll('.tab-btn');
const experienceItems = document.querySelectorAll('.experience-item');
const loadMoreBtn = document.querySelector('.load-more-btn');
let visibleItemsCount = 6;

function filterItems(filter) {
  let visibleCount = 0;
  let totalMatchingItems = 0;
  experienceItems.forEach(item => {
    const categories = item.getAttribute('data-category').split(' ');
    if (filter === 'all' || categories.includes(filter)) {
      totalMatchingItems++;
      if (visibleCount < visibleItemsCount) {
        item.style.display = 'block';
        item.style.opacity = '0';
        setTimeout(() => {
          item.style.transition = 'opacity 0.3s ease';
          item.style.opacity = '1';
        }, 10);
        visibleCount++;
      } else {
        item.style.display = 'none';
      }
    } else {
      item.style.transition = 'opacity 0.3s ease';
      item.style.opacity = '0';
      setTimeout(() => {
        item.style.display = 'none';
      }, 300);
    }
  });
  loadMoreBtn.style.display = visibleItemsCount < totalMatchingItems ? 'block' : 'none';
}

// Tab button click handlers
tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    tabButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    visibleItemsCount = 6;
    filterItems(button.getAttribute('data-filter'));
  });
});

// Load More button handler
if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', () => {
    visibleItemsCount += 6;
    const activeButton = document.querySelector('.tab-btn.active');
    const currentFilter = activeButton ? activeButton.getAttribute('data-filter') : 'all';
    filterItems(currentFilter);
  });
}

// ========== Popup Functionality ==========
const globalPopup = document.querySelector('.global-popup-overlay');
const globalPopupTitle = document.getElementById('global-popup-title');
const globalPopupDetails = document.getElementById('global-popup-details');
const globalPopupClose = document.querySelector('.global-popup-close');
const moreAboutMeCards = document.querySelectorAll('.more-about-me-card');
const projectItems = document.querySelectorAll('.project-card');
const achievementItems = document.querySelectorAll('.achievement-item');

const popupContent = {
  skills: {
    title: 'Professional Skills',
    details: `
      <div class="global-popup-item">
        <i class="fas fa-code"></i>
        <div class="global-popup-item-content">
          <strong>Web Development</strong>
          <p>Front-end development with HTML, CSS, and JavaScript; building responsive and visually appealing websites from scratch.</p>
        </div>
      </div>
      <div class="global-popup-item">
        <i class="fas fa-chart-line"></i>
        <div class="global-popup-item-content">
          <strong>Content Strategy & Social Media</strong>
          <p>Expertise in creating engaging content, managing social media campaigns, and building online communities.</p>
        </div>
      </div>
      <div class="global-popup-item">
        <i class="fas fa-users"></i>
        <div class="global-popup-item-content">
          <strong>Leadership & Team Management</strong>
          <p>Proven ability to lead teams, organize events, and drive initiatives with measurable impact.</p>
        </div>
      </div>
      <div class="global-popup-item">
        <i class="fas fa-lightbulb"></i>
        <div class="global-popup-item-content">
          <strong>Problem Solving & Critical Thinking</strong>
          <p>Excelled in STEM challenges, climate competitions, and strategic planning with analytical decision-making skills.</p>
        </div>
      </div>
      <div class="global-popup-item">
        <i class="fas fa-globe-africa"></i>
        <div class="global-popup-item-content">
          <strong>Global Collaboration</strong>
          <p>Worked in international research teams, cross-cultural collaborations, and virtual exchange programs.</p>
        </div>
      </div>
      <div class="global-popup-item">
        <i class="fas fa-chalkboard-teacher"></i>
        <div class="global-popup-item-content">
          <strong>Training & Mentorship</strong>
          <p>Created and led training sessions on STEM, summer programs, sustainability, and personal development for youth.</p>
        </div>
      </div>
      <div class="global-popup-item">
        <i class="fas fa-rocket"></i>
        <div class="global-popup-item-content">
          <strong>Entrepreneurship & Innovation</strong>
          <p>Facilitated entrepreneurship bootcamps, developed solutions for African challenges, and pitched innovative ideas.</p>
        </div>
      </div>
    `
  },
  hobbies: {
    title: 'Hobbies & Interests',
    details: `
      <div class="global-popup-item">
        <i class="fas fa-robot"></i>
        <div class="global-popup-item-content">
          <strong>STEM Exploration</strong>
          <p>Building tech projects, experimenting with hardware, and diving into programming challenges.</p>
        </div>
      </div>
      <div class="global-popup-item">
        <i class="fas fa-star"></i>
        <div class="global-popup-item-content">
          <strong>Astronomy</strong>
          <p>Following space missions, attending NASA-related events, and exploring the cosmos.</p>
        </div>
      </div>
      <div class="global-popup-item">
        <i class="fas fa-leaf"></i>
        <div class="global-popup-item-content">
          <strong>Environmental Advocacy</strong>
          <p>Passionate about climate change awareness, sustainability campaigns, and eco-friendly solutions.</p>
        </div>
      </div>
      <div class="global-popup-item">
        <i class="fas fa-users"></i>
        <div class="global-popup-item-content">
          <strong>Community Leadership</strong>
          <p>Mentoring peers, organizing events, and empowering youth through initiatives like Dear Future Luminary.</p>
        </div>
      </div>
      <div class="global-popup-item">
        <i class="fas fa-palette"></i>
        <div class="global-popup-item-content">
          <strong>Creative Design</strong>
          <p>Exploring design trends, creating digital art, and developing unique brand aesthetics.</p>
        </div>
      </div>
      <div class="global-popup-item">
        <i class="fas fa-car"></i>
        <div class="global-popup-item-content">
          <strong>Cars & Automotive Knowledge</strong>
          <p>Learning everything about car engineering, models, and innovations in the automotive industry.</p>
        </div>
      </div>
      <div class="global-popup-item">
        <i class="fas fa-puzzle-piece"></i>
        <div class="global-popup-item-content">
          <strong>Puzzle Solving & Cryptography</strong>
          <p>Enjoying logic puzzles, codebreaking challenges, and critical thinking games.</p>
        </div>
      </div>
      <div class="global-popup-item">
        <i class="fas fa-yoga"></i>
        <div class="global-popup-item-content">
          <strong>Yoga & Mindfulness</strong>
          <p>Practicing yoga for mental clarity, balance, and focus.</p>
        </div>
      </div>
      <div class="global-popup-item">
        <i class="fas fa-globe"></i>
        <div class="global-popup-item-content">
          <strong>Travel & Cultural Exchange</strong>
          <p>Meeting people from different backgrounds, learning languages, and exploring new cultures.</p>
        </div>
      </div>
    `
  },
  languages: {
    title: 'Languages',
    details: `
      <div class="global-popup-item">
        <i class="fas fa-globe"></i>
        <div class="global-popup-item-content">
          <strong>Arabic</strong>
          <p>Native proficiency.</p>
          <div class="star-rating">
            <i class="fas fa-star filled"></i>
            <i class="fas fa-star filled"></i>
            <i class="fas fa-star filled"></i>
            <i class="fas fa-star filled"></i>
            <i class="fas fa-star filled"></i>
          </div>
        </div>
      </div>
      <div class="global-popup-item">
        <i class="fas fa-globe"></i>
        <div class="global-popup-item-content">
          <strong>English</strong>
          <p>Proficient in written and spoken English.</p>
          <div class="star-rating">
            <i class="fas fa-star filled"></i>
            <i class="fas fa-star filled"></i>
            <i class="fas fa-star filled"></i>
            <i class="fas fa-star filled"></i>
            <i class="fas fa-star"></i>
          </div>
        </div>
      </div>
      <div class="global-popup-item">
        <i class="fas fa-globe"></i>
        <div class="global-popup-item-content">
          <strong>Spanish</strong>
          <p>Beginner level.</p>
          <div class="star-rating">
            <i class="fas fa-star filled"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
        </div>
      </div>
      <div class="global-popup-item">
        <i class="fas fa-globe"></i>
        <div class="global-popup-item-content">
          <strong>German</strong>
          <p>Beginner level.</p>
          <div class="star-rating">
            <i class="fas fa-star filled"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
        </div>
      </div>
    `
  }
};

const experiencePopupContent = {
  'Founder | Dear Future Luminary': {
    title: 'Founder | Dear Future Luminary',
    details: `
      <p><i class="fas fa-user-tie"></i> <strong>Role:</strong> Founder and Lead Strategist</p>
      <p><i class="fas fa-calendar"></i> <strong>Duration:</strong> Jan 2025 – Present</p>
      <p><i class="fas fa-map-marker-alt"></i> <strong>Location:</strong> Remote</p>
      <p><i class="fas fa-info-circle"></i> <strong>Description:</strong> Founded an initiative to guide students toward scholarships, STEM opportunities, and personal growth. Developed branding, curated resources, and led global outreach efforts.</p>
      <p><i class="fas fa-trophy"></i> <strong>Key Achievements:</strong></p>
      <ul>
        <li>Reached over 1,000 students with scholarship resources.</li>
        <li>Designed engaging social media campaigns.</li>
        <li>Delivered 10+ workshops on leadership and STEM.</li>
      </ul>
      <div class="global-popup-tags">
        <span class="global-popup-tag">Leadership</span>
        <span class="global-popup-tag">STEM</span>
        <span class="global-popup-tag">Content Creation</span>
      </div>
    `
  },
  'Scholar | AFS Global STEM Academies': {
    title: 'Scholar | AFS Global STEM Academies',
    details: `
      <p><i class="fas fa-user-graduate"></i> <strong>Role:</strong> Scholar</p>
      <p><i class="fas fa-calendar"></i> <strong>Duration:</strong> 2024</p>
      <p><i class="fas fa-map-marker-alt"></i> <strong>Location:</strong> Remote</p>
      <p><i class="fas fa-info-circle"></i> <strong>Description:</strong> Completed a capstone project addressing environmental challenges through innovative STEM solutions.</p>
      <p><i class="fas fa-trophy"></i> <strong>Key Achievements:</strong></p>
      <ul>
        <li>Developed a sustainable environmental project.</li>
        <li>Collaborated with global peers on STEM initiatives.</li>
      </ul>
      <div class="global-popup-tags">
        <span class="global-popup-tag">STEM</span>
        <span class="global-popup-tag">Global Citizenship</span>
      </div>
    `
  }
};

const achievementPopupContent = {
  'Gold Medal Winner – Climate Science Olympiad': {
    title: 'Gold Medal Winner – Climate Science Olympiad',
    details: `
      <p><i class="fas fa-calendar"></i> <strong>Date & Location:</strong> 2024 | International</p>
      <p><i class="fas fa-info-circle"></i> <strong>Description:</strong> Achieved Gold Medal for proposing innovative climate change solutions through data-driven analysis.</p>
      <div class="global-popup-tags">
        <span class="global-popup-tag">Sustainability</span>
        <span class="global-popup-tag">Policy Solutions</span>
        <span class="global-popup-tag">Critical Thinking</span>
      </div>
    `
  },
  'Best Scientific Team Award – Egyptian Students\' Union': {
    title: 'Best Scientific Team Award – Egyptian Students\' Union',
    details: `
      <p><i class="fas fa-calendar"></i> <strong>Date & Location:</strong> 2023–2024 | Egypt</p>
      <p><i class="fas fa-info-circle"></i> <strong>Description:</strong> Recognized as the best scientific team for leadership, collaboration, and innovative project work.</p>
      <div class="global-popup-tags">
        <span class="global-popup-tag">STEM Leadership</span>
        <span class="global-popup-tag">Teamwork</span>
      </div>
    `
  },
  'First Place Winner – Entrepreneurship Summer Camp': {
    title: 'First Place Winner – Entrepreneurship Summer Camp',
    details: `
      <p><i class="fas fa-calendar"></i> <strong>Date & Location:</strong> 2024 | Remote</p>
      <p><i class="fas fa-info-circle"></i> <strong>Description:</strong> Led team to first place by designing and pitching a business solution addressing African market challenges.</p>
      <div class="global-popup-tags">
        <span class="global-popup-tag">Entrepreneurship</span>
        <span class="global-popup-tag">Innovation</span>
        <span class="global-popup-tag">Public Speaking</span>
      </div>
    `
  }
};

const projectPopupContent = {
  'Optimizing Crop Growth: Temperature-Based Control': {
    title: 'Optimizing Crop Growth: Temperature-Based Control',
    details: `
      <p><i class="fas fa-calendar"></i> <strong>Date:</strong> 2023 | Individual Project</p>
      <p><i class="fas fa-info-circle"></i> <strong>Description:</strong> Designed a system using temperature and soil humidity sensors to automate watering for crops, reducing water waste. Integrated hardware with software logic for environmental sustainability.</p>
      <p><i class="fas fa-trophy"></i> <strong>Key Skills:</strong></p>
      <ul>
        <li>IoT</li>
        <li>Sensors</li>
        <li>Problem Solving</li>
      </ul>
      <div class="global-popup-tags">
        <span class="global-popup-tag">IoT</span>
        <span class="global-popup-tag">Sensors</span>
        <span class="global-popup-tag">Problem Solving</span>
      </div>
    `
  },
  'Personal Portfolio Website': {
    title: 'Personal Portfolio Website',
    details: `
      <p><i class="fas fa-calendar"></i> <strong>Date:</strong> May 2025 | Independent Project</p>
      <p><i class="fas fa-info-circle"></i> <strong>Description:</strong> Designed and developed a personal website to showcase experience, leadership roles, and projects. Implemented responsive design and clean UI using modern web technologies.</p>
      <p><i class="fas fa-trophy"></i> <strong>Key Skills:</strong></p>
      <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
        <li>UI/UX</li>
      </ul>
      <div class="global-popup-tags">
        <span class="global-popup-tag">HTML</span>
        <span class="global-popup-tag">CSS</span>
        <span class="global-popup-tag">JavaScript</span>
        <span class="global-popup-tag">UI/UX</span>
      </div>
    `
  }
};

// Popup Event Listeners
experienceItems.forEach(item => {
  item.addEventListener('click', () => {
    const title = item.querySelector('.experience-title').textContent;
    if (experiencePopupContent[title]) {
      globalPopupTitle.textContent = experiencePopupContent[title].title;
      globalPopupDetails.innerHTML = experiencePopupContent[title].details;
      globalPopup.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });
});

achievementItems.forEach(item => {
  item.addEventListener('click', () => {
    const title = item.querySelector('.achievement-title').textContent;
    if (achievementPopupContent[title]) {
      globalPopupTitle.textContent = achievementPopupContent[title].title;
      globalPopupDetails.innerHTML = achievementPopupContent[title].details;
      globalPopup.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });
});

projectItems.forEach(item => {
  item.addEventListener('click', () => {
    const title = item.querySelector('.project-title').textContent;
    if (projectPopupContent[title]) {
      globalPopupTitle.textContent = projectPopupContent[title].title;
      globalPopupDetails.innerHTML = projectPopupContent[title].details;
      globalPopup.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });
});

moreAboutMeCards.forEach(card => {
  card.addEventListener('click', () => {
    const category = card.getAttribute('data-category');
    if (popupContent[category]) {
      globalPopupTitle.textContent = popupContent[category].title;
      globalPopupDetails.innerHTML = popupContent[category].details;
      globalPopup.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });
});

globalPopupClose.addEventListener('click', () => {
  globalPopup.classList.remove('active');
  document.body.style.overflow = 'auto';
});

globalPopup.addEventListener('click', (e) => {
  if (e.target === globalPopup) {
    globalPopup.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// Initialize default tab
filterItems('all');
