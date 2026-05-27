const themeToggle = document.getElementById('themeToggle');
const langToggle = document.getElementById('langToggle');
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');
const yearEl = document.getElementById('year');
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const headline = document.getElementById('headline');
const heroDesc = document.getElementById('heroDesc');
const headlineTexts = {
  id: 'Saya Laode Rajantara, Frontend Developer & UI Enthusiast',
  en: 'I am Laode Rajantara, a Frontend Developer & UI Enthusiast'
};
const heroDescTexts = {
  id: 'Membuat website cepat, responsif, dan modern untuk portofolio profesional dengan fokus GitHub, proyek, dan pengalaman kerja nyata.',
  en: 'Building fast, responsive, modern websites for professional portfolios focused on GitHub, projects, and real experience.'
};

const translations = {
  id: {
    'home': 'Home',
    'about': 'About',
    'skills': 'Skills',
    'portfolio': 'Portfolio',
    'experience': 'Experience',
    'contact': 'Contact',
    'download': 'Download CV',
    'viewProject': 'Lihat Proyek',
    'demo': 'Demo',
    'blog': 'Blog',
    'github': 'GitHub',
    'contactTitle': 'Hubungi saya untuk proyek dan kolaborasi.',
    'submitMessage': 'Kirim Pesan',
  },
  en: {
    'home': 'Home',
    'about': 'About',
    'skills': 'Skills',
    'portfolio': 'Portfolio',
    'experience': 'Experience',
    'contact': 'Contact',
    'download': 'Download CV',
    'viewProject': 'View Projects',
    'demo': 'Demo',
    'blog': 'Blog',
    'github': 'GitHub',
    'contactTitle': 'Connect with me for projects and collaboration.',
    'submitMessage': 'Send Message',
  }
};

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('site-theme', theme);
  themeToggle.textContent = theme === 'dark' ? 'Light' : 'Dark';
}

function setLanguage(lang) {
  document.documentElement.lang = lang;
  langToggle.textContent = lang.toUpperCase();
  headline.textContent = heroDescTexts[lang] ? headlineTexts[lang] : headlineTexts.id;
  heroDesc.textContent = heroDescTexts[lang];
  document.querySelectorAll('nav a').forEach((link) => {
    const key = link.textContent.trim().toLowerCase();
    const newText = translations[lang][key];
    if (newText) link.textContent = newText;
  });
  document.querySelectorAll('.btn-primary, .btn-secondary, .btn-link').forEach((button) => {
    if (button.textContent.includes('Download') || button.textContent.includes('Kirim')) {
      button.textContent = translations[lang]['download'] || translations.id['download'];
    }
  });
}

function initializeTheme() {
  const savedTheme = localStorage.getItem('site-theme') || 'light';
  setTheme(savedTheme);
}

function initializeLanguage() {
  const savedLang = localStorage.getItem('site-lang') || 'id';
  setLanguage(savedLang);
  langToggle.textContent = savedLang.toUpperCase();
}

navToggle.addEventListener('click', () => {
  siteNav.classList.toggle('open');
});

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
});

langToggle.addEventListener('click', () => {
  const currentLang = document.documentElement.lang === 'en' ? 'id' : 'en';
  setLanguage(currentLang);
  localStorage.setItem('site-lang', currentLang);
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  if (!name || !email || !message) {
    formStatus.textContent = 'Mohon lengkapi semua bidang.';
    return;
  }
  formStatus.textContent = 'Pesan berhasil dikirim! Terima kasih.';
  form.reset();
});

function revealOnScroll() {
  const items = document.querySelectorAll('.animate-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });
  items.forEach((item) => observer.observe(item));
}

function initializeCarousels() {
  document.querySelectorAll('.project-carousel').forEach((carousel) => {
    const slider = carousel.querySelector('.project-slider');
    const slides = carousel.querySelectorAll('.project-slide');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const dots = Array.from(carousel.querySelectorAll('.carousel-dot'));
    let currentIndex = 0;

    function updateSlider() {
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSlider();
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlider();
    });

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentIndex = index;
        updateSlider();
      });
    });
  });
}

function openCertificatePreview(type, src) {
  const modal = document.getElementById('certificateModal');
  const preview = document.getElementById('certificatePreview');
  if (!modal || !preview) return;

  preview.innerHTML = '';

  if (type === 'image') {
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Preview sertifikat';
    preview.appendChild(img);
  } else if (type === 'pdf') {
    const iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.title = 'Preview PDF Sertifikat';
    preview.appendChild(iframe);
  }

  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeCertificateModal() {
  const modal = document.getElementById('certificateModal');
  const preview = document.getElementById('certificatePreview');
  if (!modal || !preview) return;

  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
  preview.innerHTML = '';
  document.body.style.overflow = '';
}

function initializeCertificateViewer() {
  document.querySelectorAll('.certificate-viewer-button').forEach((button) => {
    button.addEventListener('click', () => {
      openCertificatePreview(button.dataset.type, button.dataset.src);
    });
  });

  const closeButton = document.getElementById('certificateModalClose');
  const backdrop = document.getElementById('certificateModalBackdrop');

  if (closeButton) closeButton.addEventListener('click', closeCertificateModal);
  if (backdrop) backdrop.addEventListener('click', closeCertificateModal);

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && document.getElementById('certificateModal')?.classList.contains('show')) {
      closeCertificateModal();
    }
  });
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
  }
}

function onLoad() {
  yearEl.textContent = new Date().getFullYear();
  initializeTheme();
  initializeLanguage();
  revealOnScroll();
  initializeCarousels();
  initializeCertificateViewer();
  registerServiceWorker();
}

window.addEventListener('DOMContentLoaded', onLoad);
