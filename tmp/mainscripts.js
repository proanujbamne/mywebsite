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
  
  
    // --- Courses Carousel Logic ---
    const coursesGrid = document.getElementById('courses-grid');
    const leftArrow = document.getElementById('arrow-left');
    const rightArrow = document.getElementById('arrow-right');
  
    if(coursesGrid) {
      const coursesData = [
          {
            "id": 1,
            "title": "100 Days of Code: The Complete Python Pro Bootcamp",
            "instructor": "Dr. Angela Yu, Developer and Lead...",
            "rating": 4.7,
            "ratingsCount": 395598,
            "price": 3199,
            "isBestseller": true,
            "imageUrl": "https://img-c.udemycdn.com/course/480x270/2776760_f176_10.jpg"
          },
          {
            "id": 2,
            "title": "The Complete Agentic AI Engineering Course (2025)",
            "instructor": "Ed Donner, Listency",
            "rating": 4.7,
            "ratingsCount": 17342,
            "price": 2109,
            "isBestseller": true,
            "imageUrl": "https://img-c.udemycdn.com/course/480x270/5942400_3473_4.jpg"
          },
          {
            "id": 3,
            "title": "The Complete Full-Stack Web Development Bootcamp",
            "instructor": "Dr. Angela Yu, Developer and Lead...",
            "rating": 4.7,
            "ratingsCount": 454804,
            "price": 3199,
            "isBestseller": true,
            "imageUrl": "https://img-c.udemycdn.com/course/480x270/1565838_e54e_18.jpg"
          },
          {
            "id": 4,
            "title": "[NEW] Ultimate AWS Certified Cloud Practitioner CLF-C02",
            "instructor": "Stephane Maarek | AWS Certified...",
            "rating": 4.7,
            "ratingsCount": 267252,
            "price": 3469,
            "isBestseller": true,
            "imageUrl": "https://img-c.udemycdn.com/course/480x270/3142166_a637_5.jpg"
          },
          {
            "id": 5,
            "title": "The Complete 2024 Web Development Bootcamp",
            "instructor": "Dr. Angela Yu",
            "rating": 4.7,
            "ratingsCount": 350123,
            "price": 2999,
            "isBestseller": true,
            "imageUrl": "https://img-c.udemycdn.com/course/480x270/1565838_e54e_18.jpg"
          },
          {
            "id": 6,
            "title": "React - The Complete Guide (incl Hooks, React Router, Redux)",
            "instructor": "Maximilian Schwarzmüller",
            "rating": 4.6,
            "ratingsCount": 185432,
            "price": 3099,
            "isBestseller": true,
            "imageUrl": "https://img-c.udemycdn.com/course/480x270/705264_caa9_13.jpg"
          },
          {
            "id": 7,
            "title": "Machine Learning A-Z™: AI, Python & R + ChatGPT Bonus [2024]",
            "instructor": "Kirill Eremenko, Hadelin de Ponteves",
            "rating": 4.5,
            "ratingsCount": 165890,
            "price": 3299,
            "isBestseller": true,
            "imageUrl": "https://img-c.udemycdn.com/course/480x270/950390_270f_3.jpg"
          }
        ];
        
        function createCourseCard(course) {
            const bestsellerTag = course.isBestseller 
                ? `<div class="tag bestseller">Bestseller</div>` 
                : '';
  
            return `
                <div class="course-card">
                    <div class="course-image-container">
                         <img src="${course.imageUrl}" alt="${course.title}" onerror="this.onerror=null;this.src='https://placehold.co/600x400/131b2d/CCCCCC?text=Course+Image';">
                    </div>
                    <div class="course-info">
                        <h3 class="course-title">${course.title}</h3>
                        <p class="course-instructor">${course.instructor}</p>
                        <div class="course-rating">
                            <span class="rating-score">${course.rating.toFixed(1)}</span>
                            <span class="rating-count">(${course.ratingsCount.toLocaleString()})</span>
                        </div>
                        <div class="course-tags">
                            ${bestsellerTag}
                        </div>
                        <p class="course-price">₹${course.price.toLocaleString()}</p>
                    </div>
                </div>
            `;
        }
        
        function updateArrowVisibility() {
            const buffer = 2;
            const scrollableWidth = coursesGrid.scrollWidth - coursesGrid.clientWidth;
            
            if (scrollableWidth <= 0) {
                leftArrow.classList.add('hidden');
                rightArrow.classList.add('hidden');
                return;
            }
            
            leftArrow.classList.toggle('hidden', coursesGrid.scrollLeft <= buffer);
            rightArrow.classList.toggle('hidden', coursesGrid.scrollLeft >= scrollableWidth - buffer);
        }
  
        if (coursesData && coursesData.length > 0) {
            coursesGrid.innerHTML = coursesData.map(createCourseCard).join('');
            setTimeout(updateArrowVisibility, 100);
        } else {
            coursesGrid.innerHTML = '<p>No courses to display.</p>';
            updateArrowVisibility();
        }
        
        const scrollAmount = 300; 
  
        leftArrow.addEventListener('click', () => {
            coursesGrid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
  
        rightArrow.addEventListener('click', () => {
            coursesGrid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
        
        coursesGrid.addEventListener('scroll', () => window.requestAnimationFrame(updateArrowVisibility));
        window.addEventListener('resize', () => window.requestAnimationFrame(updateArrowVisibility));
    }
  
  
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

  // Filter logic
const filterButtons = document.querySelectorAll('.filter-btn');
const courseCards = document.querySelectorAll('.course-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    document.querySelector('.filter-btn.active').classList.remove('active');
    button.classList.add('active');
    const category = button.dataset.category;

    courseCards.forEach(card => {
      if (category === 'all' || card.dataset.category === category) {
        card.style.display = 'block';
        setTimeout(() => card.classList.remove('fade-out'), 100);
      } else {
        card.classList.add('fade-out');
        setTimeout(() => (card.style.display = 'none'), 300);
      }
    });
  });
});

// Smooth fade effect
const style = document.createElement('style');
style.innerHTML = `
.fade-out {
  opacity: 0;
  transform: scale(0.95);
  transition: all 0.3s ease;
}`;
document.head.appendChild(style);
