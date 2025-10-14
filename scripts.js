document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const header = document.getElementById('site-header');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const navLinkEls = document.querySelectorAll('.nav-link');
  const scrollTopBtn = document.getElementById('scroll-top');
  const yearEl = document.getElementById('year');
  const revealItems = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-card');

  // --- Initialization ---

  // Set current year
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- Nav and Scroll Logic ---

  // Mobile nav toggle
  if (hamburger && navLinks) {
      hamburger.addEventListener('click', () => {
          const expanded = hamburger.classList.toggle('active');
          navLinks.classList.toggle('open');
          hamburger.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      });
  }

  // Close mobile nav and smooth scroll when a link is clicked
  navLinkEls.forEach(a => {
      a.addEventListener('click', (e) => {
          const href = a.getAttribute('href');
          if (href && href.startsWith('#')) {
              e.preventDefault();
              navigateToHash(href);
          }
          if (navLinks.classList.contains('open')) {
              navLinks.classList.remove('open');
              hamburger.classList.remove('active');
              hamburger.setAttribute('aria-expanded', 'false');
          }
      });
  });

  // Smooth scroll with offset for sticky header
  function navigateToHash(hash) {
      const target = document.querySelector(hash);
      if (!target) return;
      // Adjust for sticky header height
      const headerHeight = header.offsetHeight + 20;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({
          top,
          behavior: 'smooth'
      });
      setActiveLink(hash);
  }

  // Set active class on nav links
  function setActiveLink(hash) {
      navLinkEls.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === hash);
      });
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
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });

  // Update active link by currently visible section
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  function updateActiveSection() {
      // Offset below the header
      const scrollPos = window.scrollY + header.offsetHeight + 100;
      let current = sections[0]?.id || '';
      for (const sec of sections) {
          // Check if scroll position is past the section start
          if (sec.offsetTop <= scrollPos) current = sec.id;
      }
      setActiveLink('#' + current);
  }


  // --- Animations ---

  // Scroll reveal (IntersectionObserver)
  const observerOpts = {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              revealObserver.unobserve(entry.target);
          }
      });
  }, observerOpts);

  revealItems.forEach(el => revealObserver.observe(el));


  // --- Event Listeners ---

  window.addEventListener('scroll', () => {
      handleScrollTopVisibility();
      updateActiveSection();
  }, {
      passive: true
  });

  // Handle hash on load (for direct deep-links)
  if (location.hash) {
      // small timeout to allow all elements to render
      setTimeout(() => navigateToHash(location.hash), 120);
  }

  // Accessibility: close nav when clicking outside
  document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !hamburger.contains(e.target) && navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          hamburger.classList.remove('active');
          hamburger.setAttribute('aria-expanded', 'false');
      }
  });
});