document.addEventListener('DOMContentLoaded', () => {
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

    mobileMenu?.addEventListener('click', () => {
        navBar?.classList.toggle('mobile-open');
        mobileMenu.classList.toggle('active');
    });

    // Combine scroll listeners
    window.addEventListener('scroll', throttle(() => {
        const currentScrollY = window.scrollY;

        // Header scroll effects
        if (currentScrollY > 100) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header?.classList.add('hidden');
        } else {
            header?.classList.remove('hidden');
        }
        lastScrollY = currentScrollY;

        // Active nav link highlighting
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');
        let current = '';
        sections.forEach(section => {
            if (scrollY >= (section.offsetTop - 200)) {
                current = section.id;
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href')?.includes(current));
        });
    }, 100), { passive: true });
}

// Hero section animations
function initHeroAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    const observerOptions = { threshold: 0.5, rootMargin: '0px' };
    const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => counterObserver.observe(counter));

    document.querySelectorAll('.floating-elements > div').forEach((el, i) => {
        el.style.animationDelay = `${i * 0.5}s`;
        el.classList.add('floating');
    });

    const stitches = document.querySelectorAll('.stitch');
    setInterval(() => {
        stitches.forEach((stitch, i) => {
            setTimeout(() => {
                stitch.classList.add('animate');
                setTimeout(() => stitch.classList.remove('animate'), 1000);
            }, i * 200);
        });
    }, 3000);
}

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
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const animationObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                el.classList.add('animate', el.getAttribute('data-animation'));
                animationObserver.unobserve(el);
            }
        });
    }, observerOptions);
    animatedElements.forEach(el => animationObserver.observe(el));
}

// Video player functionality
function initVideoPlayer() {
    const videoContainer = document.querySelector('.video-wrapper');
    const playButton = document.getElementById('play-btn');
    const videoOverlay = document.querySelector('.video-overlay');
    const iframe = document.getElementById('video');
    playButton?.addEventListener('click', () => {
        videoOverlay.style.opacity = '0';
        videoOverlay.style.pointerEvents = 'none';
        if (iframe && !iframe.src.includes('autoplay=1')) {
            iframe.src += (iframe.src.includes('?') ? '&' : '?') + 'autoplay=1';
        }
        videoContainer?.classList.add('playing');
    });
}

// Pricing toggle functionality
function initPricingToggle() {
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const priceElements = document.querySelectorAll('.price');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const plan = this.getAttribute('data-plan');
            priceElements.forEach(price => {
                const newPrice = price.getAttribute(`data-${plan}`);
                if (newPrice) {
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
    document.querySelectorAll('.buy-btn').forEach(button => {
        button.addEventListener('click', function() {
            const kit = this.getAttribute('data-kit');
            this.classList.add('loading');
            this.innerHTML = '<span>Processing...</span>';
            setTimeout(() => {
                this.classList.remove('loading');
                this.classList.add('success');
                this.innerHTML = '<span>Added to Cart!</span>';
                setTimeout(() => {
                    this.classList.remove('success');
                    this.innerHTML = `Choose ${kit.charAt(0).toUpperCase() + kit.slice(1)}`;
                }, 2000);
            }, 1500);
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
        testimonials.forEach((t, i) => t.classList.toggle('active', i === index));
        navDots.forEach((d, i) => d.classList.toggle('active', i === index));
        currentSlide = index;
    }
    navDots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));
    setInterval(() => {
        currentSlide = (currentSlide + 1) % testimonials.length;
        showSlide(currentSlide);
    }, slideInterval);
}

// FAQ accordion functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        question?.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            faqItems.forEach(other => {
                if (other !== item) {
                    other.classList.remove('open');
                    other.querySelector('.faq-answer').style.maxHeight = '0';
                }
            });
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
        form.addEventListener('submit', e => {
            e.preventDefault();
            const email = emailInput.value.trim();
            if (validateEmail(email)) {
                submitButton.classList.add('loading');
                submitButton.innerHTML = '<span>Subscribing...</span>';
                setTimeout(() => {
                    submitButton.classList.remove('loading');
                    submitButton.classList.add('success');
                    submitButton.innerHTML = '<span>Welcome aboard!</span>';
                    showNotification('Thank you for subscribing! Check your email for your first free pattern.', 'success');
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
        emailInput?.addEventListener('input', function() {
            this.classList.toggle('invalid', this.value.trim() && !validateEmail(this.value.trim()));
        });
    }
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showNotification(message, type = 'info') {
    document.querySelector('.notification')?.remove();
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `<span>${message}</span><button class="notification-close">&times;</button>`;
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => removeNotification(notification), 5000);
    notification.querySelector('.notification-close').addEventListener('click', () => removeNotification(notification));
}

function removeNotification(notification) {
    notification.classList.add('hide');
    setTimeout(() => notification.remove(), 300);
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = document.getElementById('header')?.offsetHeight ?? 0;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });
}

// Parallax effects (requestAnimationFrame)
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-visual, .floating-elements');
    let lastScrollY = window.scrollY;
    function updateParallax() {
        const scrolled = window.pageYOffset;
        if (scrolled !== lastScrollY) {
            const parallax = scrolled * 0.5;
            parallaxElements.forEach(el => {
                el.style.transform = `translateY(${parallax}px)`;
            });
            lastScrollY = scrolled;
        }
        requestAnimationFrame(updateParallax);
    }
    requestAnimationFrame(updateParallax);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance optimizations
window.addEventListener('resize', throttle(() => {
    // Handle resize operations
}, 250));

// Add loading animation for page
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    setTimeout(() => {
        document.querySelectorAll('.hero-title, .hero-description, .hero-stats, .primary-cta').forEach((el, i) => {
            setTimeout(() => el.classList.add('animate-in'), i * 200);
        });
    }, 300);
});

// Keyboard navigation support
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        const navBar = document.getElementById('nav-bar');
        const mobileMenu = document.getElementById('mobile-menu');
        if (navBar?.classList.contains('mobile-open')) {
            navBar.classList.remove('mobile-open');
            mobileMenu?.classList.remove('active');
        }
    }
});

// CSS injection (unchanged)
const style = document.createElement('style');
style.textContent = `/* ... your CSS ... */`;
document.head.appendChild(style);
