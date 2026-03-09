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
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('header')) {
            nav.classList.remove('mobile-open');
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

// Chercher tous les éléments à animer
const elementsToAnimate = document.querySelectorAll(
    '.project-card, .skill-category, .highlight-stat, .experience-item, .social-card'
);

elementsToAnimate.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Parallax effect au scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const floatingShape = document.querySelector('.floating-shape');
    if (floatingShape) {
        floatingShape.style.transform = `translateY(${scrolled * 0.3}px)`;
    }

    // Update header shadow on scroll
    const header = document.querySelector('header');
    if (header) {
        if (scrolled > 50) {
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        } else {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        }
    }
});

// Hover effect for project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add animation to buttons on hover
const buttons = document.querySelectorAll('.btn, .link-btn');
buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Count animation for stats
const animateStats = () => {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = stat.textContent;
        const number = parseInt(target);
        
        if (isNaN(number)) return;
        
        let current = 0;
        const increment = number / 30; // Animation duration
        
        const counter = setInterval(() => {
            current += increment;
            if (current >= number) {
                current = number;
                clearInterval(counter);
            }
            stat.textContent = target.includes('+') ? 
                Math.ceil(current) + '+' : 
                Math.ceil(current) + '%';
        }, 30);
    });
};

// Run animation when stats are visible
const statsSection = document.querySelector('.about-highlights');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Add active class to nav links based on scroll position
const updateActiveLink = () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === currentSection) {
            link.style.color = 'var(--primary)';
        } else {
            link.style.color = 'var(--light)';
        }
    });
};

window.addEventListener('scroll', updateActiveLink);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // ESC to close mobile menu
    if (e.key === 'Escape') {
        const nav = document.querySelector('nav');
        if (nav) {
            nav.classList.remove('mobile-open');
        }
    }
});

// Animate elements as they enter the viewport
const animateOnScroll = () => {
    const elements = document.querySelectorAll('[data-scroll]');
    
    elements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const elementBottom = el.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            el.classList.add('animate');
        } else {
            el.classList.remove('animate');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Add smooth page load
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Prevent layout shift on page load
document.documentElement.style.scrollBehavior = 'smooth';

// Print friendly styling
const printStyle = () => {
    window.addEventListener('beforeprint', () => {
        const header = document.querySelector('header');
        if (header) header.style.position = 'static';
    });
};
printStyle();
