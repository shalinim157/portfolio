/* ==========================================================================
   Shalini Madheswaran - Portfolio Interactions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileMenu();
  initSmoothScroll();
});

// Theme Toggle (Dark / Light)
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme') || 'dark';

  if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    themeToggle.innerHTML = newTheme === 'light' 
      ? '<i class="fa-solid fa-sun"></i>' 
      : '<i class="fa-solid fa-moon"></i>';
  });
}

// Mobile Menu Navigation
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = navMenu.style.display === 'flex';
    if (isOpen) {
      navMenu.style.display = 'none';
      toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    } else {
      navMenu.style.display = 'flex';
      navMenu.style.flexDirection = 'column';
      navMenu.style.position = 'absolute';
      navMenu.style.top = '72px';
      navMenu.style.left = '0';
      navMenu.style.right = '0';
      navMenu.style.background = 'var(--bg-secondary)';
      navMenu.style.padding = '20px';
      navMenu.style.borderBottom = '1px solid var(--border-color)';
      toggleBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    }
  });

  // Close mobile menu on click
  const links = navMenu.querySelectorAll('.nav-link');
  links.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navMenu.style.display = 'none';
        toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
      }
    });
  });
}

// Smooth scroll & active nav tracking
function initSmoothScroll() {
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (pageYOffset >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });
}

// Copy Email Utility
function copyEmail() {
  const email = 'shalinim96157@gmail.com';
  navigator.clipboard.writeText(email).then(() => {
    const copyText = document.getElementById('copy-text');
    const originalText = copyText.innerText;
    copyText.innerText = 'Copied to Clipboard!';
    setTimeout(() => {
      copyText.innerText = originalText;
    }, 2500);
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}

// Interactive API Playground Simulator
const mockResponses = [
  {
    status: "success",
    student_id: "STU-8924",
    student: "Aravind Kumar",
    gpa: 3.82,
    attendance_rate: "96.4%",
    active_courses: ["Distributed Systems", "PostgreSQL Internals", "Applied AI"],
    ai_diagnostic: "Consistently excels in asynchronous API workflows and data normalization. Ranked in top 5% of cohort.",
    evaluated_at: new Date().toISOString()
  },
  {
    status: "success",
    student_id: "STU-9102",
    student: "Divya Ramesh",
    gpa: 3.71,
    attendance_rate: "94.8%",
    active_courses: ["FastAPI Microservices", "Database Indexing", "Cloud Deployment"],
    ai_diagnostic: "Demonstrates strong understanding of Pydantic validation and transaction safety. High project delivery speed.",
    evaluated_at: new Date().toISOString()
  }
];

let responseIndex = 0;

function simulateApiCall(projectId) {
  const statusEl = document.getElementById('api-status-code');
  const latencyEl = document.getElementById('api-latency');
  const outputEl = document.getElementById('api-output-code');
  const runBtn = document.querySelector('.run-api-btn');

  if (!statusEl || !latencyEl || !outputEl) return;

  runBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
  runBtn.disabled = true;

  setTimeout(() => {
    responseIndex = (responseIndex + 1) % mockResponses.length;
    const response = mockResponses[responseIndex];
    const latency = Math.floor(Math.random() * 25) + 35; // 35ms - 60ms

    statusEl.innerText = "200 OK";
    latencyEl.innerText = `${latency}ms`;
    outputEl.innerText = JSON.stringify(response, null, 2);

    runBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Run Request';
    runBtn.disabled = false;
  }, 450);
}

// Contact Form Handler
function handleContactSubmit(event) {
  event.preventDefault();
  const formFeedback = document.getElementById('form-feedback');
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  formFeedback.className = 'form-feedback success';
  formFeedback.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you ${name}! Opening default mail client...`;

  // Pre-fill mailto link
  const mailtoUrl = `mailto:shalinim96157@gmail.com?subject=Interview/Role Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(message + '\n\nSender Contact: ' + email)}`;
  
  setTimeout(() => {
    window.location.href = mailtoUrl;
    formFeedback.innerHTML = `<i class="fa-solid fa-circle-check"></i> Ready to send to shalinim96157@gmail.com`;
  }, 600);
}
