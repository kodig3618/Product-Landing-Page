// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initHeroAnimations();
    initScrollAnimations();
    initVideoPlayer();
    initPricingToggle();
    initTestimonialSlider();
    initFAQ();
    initFormHandling();
    initSmoothScrolling();
    initParallaxEffects();
});

// Navigation functionality
function initNavigation() {
    const header = document.getElementById('header');
    const mobileMenu = document.getElementById('mobile-menu');
    const navBar = document.getElementById('nav-bar');
    let lastScrollY = window.scrollY;

    // Mobile menu toggle
    mobileMenu.addEventListener('click', function() {
        navBar.classList.toggle('mobile-open');
        mobileMenu.classList.toggle('active');
    });

    // Header scroll effects
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // Add/remove scrolled class
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/show header on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        
        lastScrollY = currentScrollY;
    });

    // Active nav link highlighting
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

// Hero section animations
function initHeroAnimations() {
    // Animated counters
    const counters = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // Floating elements animation
    const floatingElements = document.querySelectorAll('.floating-elements > div');
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
        element.classList.add('floating');
    });

    // Crochet animation
    const stitches = document.querySelectorAll('.stitch');
    setInterval(() => {
        stitches.forEach((stitch, index) => {
            setTimeout(() => {
                stitch.classList.add('animate');
                setTimeout(() => stitch.classList.remove('animate'), 1000);
            }, index * 200);
        });
    }, 3000);
}

// Counter animation function
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

// Scroll-triggered animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animation]');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animationObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.getAttribute('data-animation');
                
                element.classList.add('animate', animationType);
                animationObserver.unobserve(element);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });
}

// Video player functionality
function initVideoPlayer() {
    const videoContainer = document.querySelector('.video-wrapper');
    const playButton = document.getElementById('play-btn');
    const videoOverlay = document.querySelector('.video-overlay');
    const iframe = document.getElementById('video');

    if (playButton) {
        playButton.addEventListener('click', function() {
            // Hide overlay and play video
            videoOverlay.style.opacity = '0';
            videoOverlay.style.pointerEvents = 'none';
            
            // Add autoplay to iframe src
            const currentSrc = iframe.src;
            iframe.src = currentSrc + '&autoplay=1';
            
            // Add playing class for styling
            videoContainer.classList.add('playing');
        });
    }
}

// Pricing toggle functionality
function initPricingToggle() {
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const priceElements = document.querySelectorAll('.price');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Update prices
            const plan = this.getAttribute('data-plan');
            priceElements.forEach(price => {
                const newPrice = price.getAttribute(`data-${plan}`);
                if (newPrice) {
                    // Animate price change
                    price.style.transform = 'scale(0.8)';
                    price.style.opacity = '0.5';
                    
                    setTimeout(() => {
                        price.textContent = '$' + newPrice;
                        price.style.transform = 'scale(1)';
                        price.style.opacity = '1';
                    }, 150);
                }
            });
        });
    });

    // Kit purchase buttons
    const buyButtons = document.querySelectorAll('.buy-btn');
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const kit = this.getAttribute('data-kit');
            
            // Add loading state
            this.classList.add('loading');
            this.innerHTML = '<span>Processing...</span>';
            
            // Simulate purchase process
            setTimeout(() => {
                this.classList.remove('loading');
                this.classList.add('success');
                this.innerHTML = '<span>Added to Cart!</span>';
                
                // Reset after 2 seconds
                setTimeout(() => {
                    this.classList.remove('success');
                    this.innerHTML = `Choose ${kit.charAt(0).toUpperCase() + kit.slice(1)}`;
                }, 2000);
            }, 1500);
            
            // Track purchase attempt
            console.log(`Kit selected: ${kit}`);
        });
    });
}

// Testimonial slider
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    const navDots = document.querySelectorAll('.nav-dot');
    let currentSlide = 0;
    const slideInterval = 5000;

    function showSlide(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.toggle('active', i === index);
        });
        
        navDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentSlide = index;
    }

    // Navigation dots
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    // Auto-advance slides
    setInterval(() => {
        currentSlide = (currentSlide + 1) % testimonials.length;
        showSlide(currentSlide);
    }, slideInterval);

    // Pause on hover
    const sliderContainer = document.querySelector('.testimonials-slider');
    if (sliderContainer) {
        let autoSlide = true;
        
        sliderContainer.addEventListener('mouseenter', () => autoSlide = false);
        sliderContainer.addEventListener('mouseleave', () => autoSlide = true);
    }
}

// FAQ accordion functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');

        question.addEventListener('click', function() {
            const isOpen = item.classList.contains('open');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('open');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    otherAnswer.style.maxHeight = '0';
                }
            });

            // Toggle current item
            if (isOpen) {
                item.classList.remove('open');
                answer.style.maxHeight = '0';
            } else {
                item.classList.add('open');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}

// Form handling
function initFormHandling() {
    const form = document.getElementById('form');
    const emailInput = document.getElementById('email');
    const submitButton = document.getElementById('submit');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // Add loading state
                submitButton.classList.add('loading');
                submitButton.innerHTML = '<span>Subscribing...</span>';
                
                // Simulate form submission
                setTimeout(() => {
                    submitButton.classList.remove('loading');
                    submitButton.classList.add('success');
                    submitButton.innerHTML = '<span>Welcome aboard!</span>';
                    
                    // Show success message
                    showNotification('Thank you for subscribing! Check your email for your first free pattern.', 'success');
                    
                    // Reset form
                    setTimeout(() => {
                        emailInput.value = '';
                        submitButton.classList.remove('success');
                        submitButton.innerHTML = '<span>Get Started</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
                    }, 3000);
                }, 1500);
            } else {
                showNotification('Please enter a valid email address.', 'error');
                emailInput.focus();
            }
        });

        // Real-time email validation
        emailInput.addEventListener('input', function() {
            const email = this.value.trim();
            if (email && !validateEmail(email)) {
                this.classList.add('invalid');
            } else {
                this.classList.remove('invalid');
            }
        });
    }
}

// Email validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;

    // Add to page
    document.body.appendChild(notification);

    // Show with animation
    setTimeout(() => notification.classList.add('show'), 100);

    // Auto remove after 5 seconds
    setTimeout(() => removeNotification(notification), 5000);

    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    notification.classList.add('hide');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Parallax effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-visual, .floating-elements');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${parallax}px)`;
        });
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance optimizations
const debouncedScroll = debounce(() => {
    // Handle scroll-dependent operations
}, 10);

const throttledResize = throttle(() => {
    // Handle resize operations
}, 250);

window.addEventListener('scroll', debouncedScroll);
window.addEventListener('resize', throttledResize);

// Add loading animation for page
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-title, .hero-description, .hero-stats, .primary-cta');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('animate-in');
            }, index * 200);
        });
    }, 300);
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navBar = document.getElementById('nav-bar');
        const mobileMenu = document.getElementById('mobile-menu');
        if (navBar.classList.contains('mobile-open')) {
            navBar.classList.remove('mobile-open');
            mobileMenu.classList.remove('active');
        }
    }
});

// Add CSS for animations and transitions
const style = document.createElement('style');
style.textContent = `
    /* Header animations */
    #header {
        transition: all 0.3s ease;
    }
    
    #header.scrolled {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
    
    #header.hidden {
        transform: translateY(-100%);
    }
    
    .nav-link.active {
        color: #8B5CF6;
        font-weight: 600;
    }
    
    /* Button animations */
    .cta-button, .buy-btn, .submit-btn {
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
    }
    
    .cta-button:hover, .buy-btn:hover, .submit-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(139, 92, 246, 0.3);
    }
    
    .buy-btn.loading {
        pointer-events: none;
        opacity: 0.7;
    }
    
    .buy-btn.success {
        background: #10B981;
        border-color: #10B981;
    }
    
    /* Scroll animations */
    [data-animation] {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    [data-animation].animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .slide-up.animate {
        animation: slideUp 0.6s ease forwards;
    }
    
    .fade-in.animate {
        animation: fadeIn 0.8s ease forwards;
    }
    
    @keyframes slideUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeIn {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Hero animations */
    .hero-title, .hero-description, .hero-stats, .primary-cta {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.8s ease;
    }
    
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    /* Floating elements */
    .floating {
        animation: float 6s ease-in-out infinite;
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
    }
    
    /* Stitch animation */
    .stitch {
        transition: all 0.3s ease;
    }
    
    .stitch.animate {
        transform: scale(1.2);
        opacity: 0.8;
    }
    
    /* FAQ animations */
    .faq-item {
        transition: all 0.3s ease;
    }
    
    .faq-answer {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease;
    }
    
    .faq-icon {
        transition: transform 0.3s ease;
    }
    
    .faq-item.open .faq-icon {
        transform: rotate(180deg);
    }
    
    /* Testimonial transitions */
    .testimonial {
        opacity: 0;
        transform: translateX(50px);
        transition: all 0.5s ease;
        position: absolute;
        width: 100%;
    }
    
    .testimonial.active {
        opacity: 1;
        transform: translateX(0);
        position: relative;
    }
    
    /* Form validation */
    .invalid {
        border-color: #EF4444 !important;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
    }
    
    /* Notifications */
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification.hide {
        transform: translateX(100%);
    }
    
    .notification.success {
        border-left: 4px solid #10B981;
    }
    
    .notification.error {
        border-left: 4px solid #EF4444;
    }
    
    .notification-close {
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
        opacity: 0.7;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
    
    /* Mobile menu animations */
    .mobile-menu-toggle {
        transition: all 0.3s ease;
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    /* Loading states */
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body.loaded {
        overflow: visible;
    }
    
    /* Responsive animations */
    @media (max-width: 768px) {
        [data-animation] {
            transform: translateY(20px);
        }
        
        .notification {
            right: 10px;
            left: 10px;
            max-width: none;
        }
    }
`;

document.head.appendChild(style);