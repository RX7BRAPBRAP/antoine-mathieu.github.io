// CV Dropdown in Navbar functionality
const cvDropdown = document.querySelector('.cv-dropdown');
const cvBtnNav = document.querySelector('.cv-btn-nav');
const cvMenuNav = document.querySelector('.cv-menu-nav');

if (cvDropdown && cvBtnNav && cvMenuNav) {
    // Toggle dropdown on button click
    cvBtnNav.addEventListener('click', (e) => {
        e.stopPropagation();
        cvDropdown.classList.toggle('active');
    });

    // Close dropdown when clicking on a CV option
    document.querySelectorAll('.cv-option-nav').forEach(option => {
        option.addEventListener('click', () => {
            cvDropdown.classList.remove('active');
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.cv-dropdown')) {
            cvDropdown.classList.remove('active');
        }
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            const nav = document.querySelector('nav');
            if (nav) {
                nav.classList.remove('mobile-open');
            }
        }
    });
});

// Menu toggle for mobile
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('mobile-open');
        // Close CV dropdown when toggling mobile menu
        const cvDropdown = document.querySelector('.cv-dropdown');
        if (cvDropdown) {
            cvDropdown.classList.remove('active');
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('header')) {
            nav.classList.remove('mobile-open');
            // Also close CV dropdown when clicking outside
            const cvDropdown = document.querySelector('.cv-dropdown');
            if (cvDropdown) {
                cvDropdown.classList.remove('active');
            }
        }
    });
}

// Intersection Observer pour animations au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animating elements on scroll: project cards, skill categories, social cards
const elementsToAnimate = document.querySelectorAll(
    '.project-card, .skill-category, .social-card'
);

elementsToAnimate.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Parallax effect and header shadow on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const floatingShape = document.querySelector('.floating-shape');
    const header = document.querySelector('header');
    
    if (floatingShape) {
        floatingShape.style.transform = `translateY(${scrolled * 0.3}px)`;
    }

    if (header) {
        header.style.boxShadow = scrolled > 50 
            ? '0 4px 30px rgba(0, 0, 0, 0.5)' 
            : '0 2px 20px rgba(0, 0, 0, 0.3)';
    }
});

// Carousel functionality
const initCarousels = () => {
    const carouselContainers = document.querySelectorAll('.carousel-container');
    
    carouselContainers.forEach(container => {
        const carousel = container.querySelector('.carousel');
        const carouselInner = container.querySelector('.carousel-inner');
        const slides = carouselInner ? carouselInner.querySelectorAll('img') : [];
        const prevBtn = container.querySelector('.carousel-control.prev');
        const nextBtn = container.querySelector('.carousel-control.next');
        const indicatorsContainer = container.querySelector('.carousel-indicators');
        const indicators = indicatorsContainer ? indicatorsContainer.querySelectorAll('.indicator') : [];
        
        if (slides.length === 0) return;
        
        let currentSlide = 0;
        
        const showSlide = (index) => {
            // Reset bounds
            if (index >= slides.length) {
                currentSlide = 0;
            } else if (index < 0) {
                currentSlide = slides.length - 1;
            } else {
                currentSlide = index;
            }
            
            // Remove active class from all slides and indicators
            slides.forEach(slide => slide.classList.remove('active'));
            indicators.forEach(indicator => indicator.classList.remove('active'));
            
            // Add active class to current slide and indicator
            if (slides[currentSlide]) {
                slides[currentSlide].classList.add('active');
            }
            if (indicators[currentSlide]) {
                indicators[currentSlide].classList.add('active');
            }
        };
        
        // Previous button
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                showSlide(currentSlide - 1);
            });
        }
        
        // Next button
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                showSlide(currentSlide + 1);
            });
        }
        
        // Indicator dots
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                showSlide(index);
            });
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!carousel) return;
            const carouselInView = carousel.getBoundingClientRect();
            const isCarouselVisible = carouselInView.top < window.innerHeight && carouselInView.bottom > 0;
        });
    });
};

// Initialize carousels when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarousels);
} else {
    initCarousels();
}
