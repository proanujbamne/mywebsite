/* script.js - interactions: nav toggle, scroll header, reveals, smooth offsets, scroll-to-top */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const header = document.getElementById('site-header');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const navLinkEls = document.querySelectorAll('.nav-link');
  const scrollTopBtn = document.getElementById('scroll-top');
  const yearEl = document.getElementById('year');
  const revealItems = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-card');

  // Set current year
  if (yearEl) yearEl.textContent = (new Date()).getFullYear();

  // Mobile nav toggle
  hamburger.addEventListener('click', () => {
    const expanded = hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  });

  // Close mobile nav when a link is clicked
  navLinkEls.forEach(a => {
    a.addEventListener('click', (e) => {
      // For same-page anchors: smooth scroll with offset
      const href = a.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        navigateToHash(href);
      }
      // close mobile menu
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Smooth scroll that accounts for sticky header height
  function navigateToHash(hash) {
    const target = document.querySelector(hash);
    if (!target) return;
    const headerHeight = header.offsetHeight + 8;
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
    window.scrollTo({ top, behavior: 'smooth' });
    // update active link classes
    setActiveLink(hash);
  }

  function setActiveLink(hash) {
    navLinkEls.forEach(link => {
      if (link.getAttribute('href') === hash) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Header: change to solid on scroll
  function handleHeaderOnScroll() {
    const scrolled = window.scrollY > 30;
    header.classList.toggle('solid', scrolled);
    header.classList.toggle('transparent', !scrolled);
  }

  // Scroll to top visibility
  function handleScrollTopVisibility() {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }

  // Scroll-to-top click
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Scroll reveal (IntersectionObserver)
  const observerOpts = { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.12 };
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // once visible, unobserve for performance
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOpts);

  revealItems.forEach(el => revealObserver.observe(el));

  // Make sure hero links that are anchor-linked directly work on load
  if (location.hash) {
    // small timeout to allow header measurement
    setTimeout(() => navigateToHash(location.hash), 120);
  }

  // On scroll handlers
  window.addEventListener('scroll', () => {
    handleHeaderOnScroll();
    handleScrollTopVisibility();
    updateActiveSection();
  }, { passive: true });

  // Update active link by currently visible section (simple approach)
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  function updateActiveSection(){
    const scrollPos = window.scrollY + header.offsetHeight + 24;
    let current = sections[0]?.id || '';
    for (const sec of sections) {
      if (sec.offsetTop <= scrollPos) current = sec.id;
    }
    setActiveLink('#' + current);
  }

  // Small animation for hero visual on load
  const heroVisual = document.querySelector('.hero-visual img');
  if (heroVisual) {
    setTimeout(() => heroVisual.style.transform = 'translateY(-6px) scale(1.02)', 850);
  }

  // Basic contact form handling (client-side demo)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Visual feedback
      const btn = contactForm.querySelector('button[type="submit"]');
      const orig = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      // Simulate server request (replace with real AJAX / fetch in production)
      setTimeout(() => {
        btn.textContent = 'Sent ✓';
        contactForm.reset();
        setTimeout(() => {
          btn.textContent = orig;
          btn.disabled = false;
        }, 1400);
      }, 900);
    });
  }

  // Accessibility: close nav when clicking outside
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target) && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded','false');
    }
  });
});
