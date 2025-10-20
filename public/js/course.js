document.addEventListener('DOMContentLoaded', () => {

    const courses = [
        { title: "The Complete Python Pro Bootcamp", description: "Go from zero to hero in Python. Learn to build real-world applications and automate tasks.", image: "https://placehold.co/600x400/818cf8/0d1117?text=Python", category: "python", bestseller: true },
        { title: "The Complete Full-Stack Web Dev", description: "Master HTML, CSS, Javascript, React, Node.js, and more. Become a complete developer.", image: "https://placehold.co/600x400/f472b6/0d1117?text=JS+React", category: "webdev", bestseller: true },
        { title: "Agentic AI Engineering Course (2025)", description: "Dive into the future of AI. Learn to build and deploy intelligent, autonomous agents.", image: "https://placehold.co/600x400/60a5fa/0d1117?text=AI", category: "ai", bestseller: false },
        { title: "AWS Certified Cloud Practitioner", description: "Your first step into the cloud. Master AWS fundamentals and prepare for the certification exam.", image: "https://placehold.co/600x400/f59e0b/0d1117?text=Cloud", category: "cloud", bestseller: true },
        { title: "Advanced React & State Management", description: "Take your React skills to the next level with advanced patterns and state management libraries.", image: "https://placehold.co/600x400/34d399/0d1117?text=React", category: "webdev", bestseller: false },
        { title: "Data Science with Python", description: "Learn NumPy, Pandas, Matplotlib, and Scikit-learn for data analysis and machine learning.", image: "https://placehold.co/600x400/a78bfa/0d1117?text=Data+Science", category: "python", bestseller: false }
    ];

    const courseGrid = document.getElementById('course-grid');
    const filterContainer = document.getElementById('filter-container');
    const footerCategoryLinks = document.querySelectorAll('.footer-column a[data-footer-filter]');

    function renderCourses(filter = 'all') {
        courseGrid.innerHTML = '';
        const filteredCourses = (filter === 'all') ? courses : courses.filter(course => course.category === filter);

        filteredCourses.forEach(course => {
            const card = document.createElement('div');
            card.className = 'course-card visible';
            let bestsellerTag = course.bestseller ? '<span class="bestseller-tag">Bestseller</span>' : '';
            card.innerHTML = `
                <div class="card-image-container"><img src="${course.image}" alt="${course.title}"></div>
                <div class="course-card-content">
                    ${bestsellerTag}<h3>${course.title}</h3><p>${course.description}</p>
                    <a href="#" class="enroll-link">Enroll Now &rarr;</a>
                </div>`;
            courseGrid.appendChild(card);
        });
    }

    function setActiveFilter(filterValue) {
        filterContainer.querySelectorAll('.filter-pill').forEach(pill => {
            pill.classList.remove('active');
            if(pill.dataset.filter === filterValue) {
                pill.classList.add('active');
            }
        });
    }

    renderCourses();

    filterContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const filterValue = e.target.dataset.filter;
            setActiveFilter(filterValue);
            renderCourses(filterValue);
        }
    });

    footerCategoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const filterValue = link.dataset.footerFilter;
            setActiveFilter(filterValue);
            renderCourses(filterValue);
            document.querySelector('#courses').scrollIntoView({ behavior: 'smooth' });
        });
    });

    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    menuToggle.addEventListener('click', () => { mainNav.classList.toggle('active'); });

    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                     window.scrollTo({ top: targetSection.offsetTop - 80, behavior: 'smooth' });
                }
                if (mainNav.classList.contains('active')) { mainNav.classList.remove('active'); }
            }
        });
    });

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            if (pageYOffset >= section.offsetTop - 90) { current = section.id; }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) { link.classList.add('active'); }
        });
    });

    const scrollTopBtn = document.getElementById('scrollTopBtn');
    window.onscroll = () => {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    };
    scrollTopBtn.addEventListener('click', () => { window.scrollTo({top: 0, behavior: 'smooth'}); });
});
