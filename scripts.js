// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Modal Functions
const modal = document.getElementById('enrollModal');
const modalTitle = document.getElementById('modalTitle');
const enrollForm = document.getElementById('enrollForm');

// Open modal with dynamic title
function openModal(programName) {
    modalTitle.textContent = `Enroll in ${programName}`;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Close modal
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Form submission (simple alert for demo; replace with real backend)
enrollForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(enrollForm);
    const name = formData.get('name') || 'Not provided'; // Note: Add name/email attributes if needed
    const email = formData.get('email') || 'Not provided';
    const message = formData.get('message') || 'Not provided';
    
    alert(`Thank you, ${name}! Your inquiry for "${modalTitle.textContent}" has been submitted. We'll contact you at ${email} soon. Message: ${message}`);
    enrollForm.reset();
    closeModal();
});

// Pricing Toggle
let currentPricing = 'monthly';

function togglePricing(type) {
    currentPricing = type;
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const monthlyPrices = document.querySelectorAll('.price-monthly');
    const yearlyPrices = document.querySelectorAll('.price-yearly');

    // Update button states
    toggleBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    if (type === 'yearly') {
        monthlyPrices.forEach(price => price.classList.add('inactive'));
        yearlyPrices.forEach(price => price.classList.add('active'));
    } else {
        monthlyPrices.forEach(price => price.classList.remove('inactive'));
        yearlyPrices.forEach(price => price.classList.remove('active'));
    }
}

// Scroll Animations (using Intersection Observer for efficiency)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px' // Trigger a bit before entering view
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe sections and cards
document.querySelectorAll('section').forEach(section => observer.observe(section));
document.querySelectorAll('.program-card, .price-card').forEach(card => observer.observe(card));

// Initial load: Make hero visible immediately
document.getElementById('home').classList.add('visible');

// Ensure everything loads after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Any additional setup if needed
});
// scripts.js - nav toggle and scroll behaviour
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const header = document.querySelector('header');
  
    if (hamburger && navLinks) {
      hamburger.addEventListener('click', () => {
        const expanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', String(!expanded));
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
      });
  
      // close mobile menu when a link is clicked
      navLinks.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
          if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
          }
        });
      });
    }
  
    // header background toggle on scroll
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    });
  });
  