document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const header = document.getElementById('site-header');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const navLinkEls = document.querySelectorAll('.nav-link');
    const scrollTopBtn = document.getElementById('scroll-top');
    const yearEl = document.getElementById('year');
    const revealItems = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-card');
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

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
    if(scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Update active link by currently visible section
    const sections = Array.from(document.querySelectorAll('main section[id]'));
    function updateActiveSection() {
        const scrollPos = window.scrollY + header.offsetHeight + 100;
        let current = sections[0]?.id || '';
        for (const sec of sections) {
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

    // --- Courses Logic ---
    const coursesGrid = document.getElementById('courses-grid');
    if (coursesGrid) {
        const coursesData = [
            { id: 1, title: "100 Days of Code: The Complete Python Pro Bootcamp", instructor: "Dr. Angela Yu", rating: 4.7, ratingsCount: 395598, price: 3199, isBestseller: true, imageUrl: "https://img-c.udemycdn.com/course/480x270/2776760_f176_10.jpg", category: "python" },
            { id: 2, title: "The Complete Agentic AI Engineering Course (2025)", instructor: "Ed Donner, Listency", rating: 4.7, ratingsCount: 17342, price: 2109, isBestseller: true, imageUrl: "https://img-c.udemycdn.com/course/480x270/5942400_3473_4.jpg", category: "ai" },
            { id: 3, title: "The Complete Full-Stack Web Development Bootcamp", instructor: "Dr. Angela Yu", rating: 4.7, ratingsCount: 454804, price: 3199, isBestseller: true, imageUrl: "https://img-c.udemycdn.com/course/480x270/1565838_e54e_18.jpg", category: "webdev" },
            { id: 4, title: "[NEW] Ultimate AWS Certified Cloud Practitioner CLF-C02", instructor: "Stephane Maarek", rating: 4.7, ratingsCount: 267252, price: 3469, isBestseller: true, imageUrl: "https://img-c.udemycdn.com/course/480x270/3142166_a637_5.jpg", category: "cloud" },
            { id: 5, title: "The Complete 2024 Web Development Bootcamp", instructor: "Dr. Angela Yu", rating: 4.7, ratingsCount: 350123, price: 2999, isBestseller: true, imageUrl: "https://img-c.udemycdn.com/course/480x270/1565838_e54e_18.jpg", category: "webdev" },
            { id: 6, title: "React - The Complete Guide (incl Hooks, React Router)", instructor: "Maximilian Schwarzmüller", rating: 4.6, ratingsCount: 185432, price: 3099, isBestseller: true, imageUrl: "https://img-c.udemycdn.com/course/480x270/705264_caa9_13.jpg", category: "webdev" },
            { id: 7, title: "Machine Learning A-Z™: AI, Python & R + ChatGPT Bonus", instructor: "Kirill Eremenko", rating: 4.5, ratingsCount: 165890, price: 3299, isBestseller: true, imageUrl: "https://img-c.udemycdn.com/course/480x270/950390_270f_3.jpg", category: "ai" }
        ];

        function createCourseCard(course) {
            const bestsellerTag = course.isBestseller ? `<div class="tag bestseller">Bestseller</div>` : '';
            return `
                <div class="course-card" data-category="${course.category}">
                    <div class="course-image-container">
                         <img src="${course.imageUrl}" alt="${course.title}" loading="lazy" onerror="this.onerror=null;this.src='https://placehold.co/600x400/131b2d/CCCCCC?text=Course+Image';">
                    </div>
                    <div class="course-info">
                        <h3 class="course-title">${course.title}</h3>
                        <p class="course-instructor">${course.instructor}</p>
                        <div class="course-rating">
                            <span class="rating-score">${course.rating.toFixed(1)}</span>
                            <span class="rating-count">(${course.ratingsCount.toLocaleString()})</span>
                        </div>
                        <div class="course-tags">${bestsellerTag}</div>
                        <p class="course-price">₹${course.price.toLocaleString()}</p>
                    </div>
                </div>
            `;
        }

        if (coursesData && coursesData.length > 0) {
            // Duplicate the data for a seamless loop effect
            const duplicatedCourses = [...coursesData, ...coursesData];
            coursesGrid.innerHTML = duplicatedCourses.map(createCourseCard).join('');
        } else {
            coursesGrid.innerHTML = '<p>No courses to display.</p>';
        }

        // --- Filter Logic ---
        const filterButtons = document.querySelectorAll('.filter-btn');
        const courseCards = document.querySelectorAll('.course-card'); // This now selects the generated cards
        const carouselWrapper = document.querySelector('.carousel-wrapper');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Manage active state
                document.querySelector('.filter-btn.active').classList.remove('active');
                button.classList.add('active');

                const category = button.dataset.category;
                
                // Pause animation when filtering
                carouselWrapper.style.animation = 'none';
                coursesGrid.style.animation = 'none';

                courseCards.forEach(card => {
                    const cardCategory = card.dataset.category;
                    if (category === 'all' || cardCategory === category) {
                        card.style.display = 'flex'; // Use flex to maintain layout
                    } else {
                        card.style.display = 'none';
                    }
                });

                if (category === 'all') {
                   // Resume animation if "All" is selected
                   carouselWrapper.style.animation = '';
                   coursesGrid.style.animation = '';
                }
            });
        });
    }

    // --- Contact Form Logic ---
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = contactForm.querySelector('#name').value.trim();
            const email = contactForm.querySelector('#email').value.trim();
            const message = contactForm.querySelector('#message').value.trim();

            if (!name || !email || !message) {
                formStatus.textContent = 'Please fill out all fields.';
                formStatus.className = 'form-status error';
                return;
            }

            const formData = { name, email, message, submittedAt: new Date().toISOString() };
            const jsonString = JSON.stringify(formData, null, 2);
            const blob = new Blob([jsonString], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = `contact_${Date.now()}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            formStatus.textContent = 'Success! Your inquiry has been downloaded.';
            formStatus.className = 'form-status success';
            contactForm.reset();

            setTimeout(() => {
                formStatus.textContent = '';
                formStatus.className = 'form-status';
            }, 5000);
        });
    }

    // --- Global Event Listeners ---
    window.addEventListener('scroll', () => {
        handleScrollTopVisibility();
        updateActiveSection();
    }, { passive: true });

    // Handle hash on load
    if (location.hash) {
        setTimeout(() => navigateToHash(location.hash), 120);
    }

    // Accessibility: close nav when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks && hamburger && !navLinks.contains(e.target) && !hamburger.contains(e.target) && navLinks.classList.contains('open')) {
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
});


// contact form
document.getElementById('contact-form').addEventListener('submit', function(event) {
    // Prevent the default form submission
    event.preventDefault();

    // Get the form status element
    const status = document.getElementById('form-status');
    
    // Simulate a form submission
    // In a real application, this is where you would send data to a server.
    status.innerHTML = "Sending...";
    status.style.color = "blue";

    // Simulate a successful response after 2 seconds
    setTimeout(() => {
        status.innerHTML = "Message sent successfully!";
        status.style.color = "green";
        
        // Clear the form
        document.getElementById('contact-form').reset();
    }, 2000);
});
