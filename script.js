document.addEventListener("DOMContentLoaded", () => {
  // ========== Experience Data Object ==========
  const experienceData = [
    {
      title: "U-Reporter (Youth Advocate)",
      org: "UNICEF",
      date: "Jan 2026 - Present",
      desc: "Participating in youth-led data collection and surveys addressing education, climate, and social issues. Contributing youth perspectives to UNICEF-supported advocacy and policy insights while engaging with a global network to amplify community-driven solutions.",
    },
    {
      title: "Founder & Program Director",
      org: "Dear Future Luminary",
      date: "May 2024 - Present",
      desc: "Founded a youth-led initiative dedicated to guiding high school students toward scholarships, global programs, and intentional personal growth. Designed the vision, structure, and long-term roadmap. Currently developing a professional website to centralize resources.",
    },
    {
      title: "Project Manager & Scholar",
      org: "Kode With Klossy",
      date: "Feb 2023 - Present",
      desc: "Led the planning and execution of web-based projects within a structured, intensive coding program. Coordinated task distribution, timelines, and team communication while contributing to front-end development using HTML, CSS, and JavaScript.",
    },
    {
      title: "Youth Advocate",
      org: "International Organization of Youth",
      date: "Feb 2024 - Present",
      desc: "Participated in a global youth advocacy program focused on climate action, policy, and sustainability. Designed and contributed to awareness campaigns that reached over 1,000 online viewers.",
    },
    {
      title: "Head of Operations & Platform Manager",
      org: "Mohandes El Math",
      date: "2024 - Present",
      desc: "Founding member responsible for taking the platform from idea to live operation. Led coordination with external development teams and fully manage the Admin Panel and WhatsApp customer support system.",
    },
    {
      title: "Project Manager",
      org: "The New York Academy of Sciences",
      date: "Feb 2023 - Present",
      desc: "Managed collaborative research projects within international youth teams. Coordinated timelines, deliverables, and team communication in a research-driven environment.",
    },
    {
      title: "Researcher",
      org: "Junior Academy",
      date: "Jan 2023 - Present",
      desc: "Conducted independent, team-based research under mentorship of international scientists. Developed evidence-based insights addressing challenges in climate change and sustainability.",
    },
    {
      title: "Game Developer",
      org: "Girls Who Code",
      date: "Jun 2024 - Aug 2024",
      desc: "Completed a structured coding program with a focus on Python and game development. Built a capstone project centered on environmental data visualization and mentored younger participants.",
    },
    {
      title: "Program Facilitator",
      org: "Soliya",
      date: "May 2024 - Aug 2024",
      desc: "Facilitated intercultural dialogue sessions with participants from diverse backgrounds. Led discussions on global issues and trained peers in communication and diplomacy.",
    },
    {
      title: "English Language Trainee",
      org: "International House Cairo",
      date: "2023 - 2024",
      desc: "Completed a 40-hour intermediate English course with teaching practice. Developed strong communication, instructional, and public speaking skills.",
    },
    {
      title: "Scholar",
      org: "AFS Intercultural Programs",
      date: "2023 - 2024",
      desc: "Participated in intercultural STEM projects focused on sustainability and global challenges. Collaborated with international students to design solution-oriented proposals.",
    },
    {
      title: "Participant",
      org: "UWC International",
      date: "2023 - 2024",
      desc: "Completed a short course focused on building a sustainable future. Engaged in intercultural exchanges with participants from 40+ countries and contributed to community action projects.",
    },
    {
      title: "Python Developer",
      org: "Stanford University",
      date: "2023 - 2024",
      desc: "Completed a Python-focused programming course (Code in Place). Developed algorithms for data analysis and visualization, including agricultural optimization models.",
    },
    {
      title: "Operations Lead",
      org: "TEDxEtTagammo",
      date: "Apr 2023 - Sep 2023",
      desc: "Coordinated backstage operations and speaker logistics for 10+ speakers. Trained and supervised volunteers to ensure seamless stage transitions and event flow.",
    },
    {
      title: "Head of Social Media & Training Facilitator",
      org: "Resala STEM",
      date: "Mar 2023 - Aug 2023",
      desc: "Led social media strategy across platforms, increasing engagement by 2x. Designed and delivered interactive training sessions for 100+ students on content creation and branding.",
    },
    {
      title: "Front-End Developer & Researcher",
      org: "Star Girls Africa",
      date: "Feb 2023 - Apr 2023",
      desc: "Developed responsive front-end components for an educational platform. Translated research findings into user-centered digital solutions through cross-functional collaboration.",
    },
  ];

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

  // ========== Experience Showcase Functionality ==========
  window.showExp = function (index) {
    const items = document.querySelectorAll(".exp-item");
    const detailBox = document.getElementById("exp-detail-box");
    const title = document.getElementById("detail-title");
    const org = document.getElementById("detail-org");
    const date = document.getElementById("detail-date");
    const desc = document.getElementById("detail-desc");

    items.forEach((item) => item.classList.remove("active"));
    items[index].classList.add("active");

    detailBox.classList.remove("active");
    setTimeout(() => {
      const data = experienceData[index];
      title.textContent = data.title;
      org.textContent = data.org;
      date.textContent = data.date;
      desc.textContent = data.desc;
      detailBox.classList.add("active");
    }, 10);
  };

  // ========== Smooth Scrolling ==========
  document.querySelectorAll("a[href^=\'#\']").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // ========== Contact Form Functionality ==========
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector("button");
      btn.textContent = "Sending...";
      btn.disabled = true;

      // Simulate form submission
      setTimeout(() => {
        formStatus.textContent = "Message sent! Malak will be in touch soon.";
        formStatus.style.color = "var(--dark-blue)";
        btn.textContent = "Send Message";
        btn.disabled = false;
        contactForm.reset();
        setTimeout(() => (formStatus.textContent = ""), 5000);
      }, 1500);
    });
  }

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

  // Initial calls
  reveal();
  showExp(0);
});
