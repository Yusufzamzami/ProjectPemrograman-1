

// ========================================
// DOCUMENT READY & INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize semua fungsi
    initHeroSwiper();
    initSmoothScroll();
    initScrollAnimations();
    initNavbarScroll();
    initMobileMenu();
    initContactForm();
    initLazyLoading();
    
    console.log('🌟 Tegal Tourism Website Loaded Successfully!');
});

// ========================================
// HERO SWIPER INITIALIZATION
// ========================================

function initHeroSwiper() {
    const heroSwiper = new Swiper('.hero-swiper', {
        // Konfigurasi dasar
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        speed: 1000,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        
        // Navigation
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        
        // Pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        
        // Responsive breakpoints
        breakpoints: {
            768: {
                autoplay: {
                    delay: 6000,
                }
            }
        },
        
        // Event listeners
        on: {
            slideChange: function() {
                // Animasi ulang untuk konten hero
                const activeSlide = this.slides[this.activeIndex];
                const heroContent = activeSlide.querySelector('.hero-content');
                
                if (heroContent) {
                    heroContent.style.animation = 'none';
                    setTimeout(() => {
                        heroContent.style.animation = 'fadeInUp 1s ease-out';
                    }, 100);
                }
            }
        }
    });
    
    // Pause autoplay saat hover
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', () => {
            heroSwiper.autoplay.stop();
        });
        
        heroSection.addEventListener('mouseleave', () => {
            heroSwiper.autoplay.start();
        });
    }
}

// ========================================
// SMOOTH SCROLL NAVIGATION
// ========================================

function initSmoothScroll() {
    // Ambil semua link navigasi
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // 80px untuk navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(targetId);
                
                // Close mobile menu jika terbuka
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
            }
        });
    });
}

// Update active navigation link
function updateActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

// ========================================
// SCROLL ANIMATIONS
// ========================================

function initScrollAnimations() {
    // Intersection Observer untuk animasi scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe semua elemen yang perlu animasi
    const animatedElements = document.querySelectorAll(
        '.destination-card, .culinary-card, .contact-item, .section-title, .section-subtitle'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================

function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Change navbar style on scroll
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
            navbar.style.background = 'rgba(0, 95, 153, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.background = 'linear-gradient(135deg, #005f99, #0077cc)';
            navbar.style.backdropFilter = 'none';
        }
        
        // Hide/Show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        
        // Update active section
        updateActiveSection();
    });
}

// Update active section based on scroll position
function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            updateActiveNavLink(`#${sectionId}`);
        }
    });
}

// ========================================
// MOBILE MENU FUNCTIONALITY
// ========================================

function initMobileMenu() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        // Toggle mobile menu
        navbarToggler.addEventListener('click', () => {
            navbarCollapse.classList.toggle('show');
            navbarToggler.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
                navbarCollapse.classList.remove('show');
                navbarToggler.classList.remove('active');
            }
        });
        
        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbarCollapse.classList.remove('show');
                navbarToggler.classList.remove('active');
            });
        });
    }
}

// ========================================
// CONTACT FORM FUNCTIONALITY
// ========================================

function initContactForm() {
    // Animasi hover untuk contact items
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Click to copy contact info (jika diperlukan)
    const contactTexts = document.querySelectorAll('.contact-item p');
    
    contactTexts.forEach(text => {
        text.addEventListener('click', function() {
            const textContent = this.textContent.trim();
            
            // Copy to clipboard
            if (navigator.clipboard) {
                navigator.clipboard.writeText(textContent).then(() => {
                    showNotification('Informasi kontak berhasil disalin!', 'success');
                });
            }
        });
    });
}

// ========================================
// LAZY LOADING IMAGES
// ========================================

function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} notification`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        animation: slideInRight 0.3s ease-out;
    `;
    notification.innerHTML = `
        <i class="bi bi-check-circle-fill me-2"></i>
        ${message}
        <button type="button" class="btn-close ms-2" onclick="this.parentElement.remove()"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 3000);
}

// Debounce function untuk optimasi performa
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

// Throttle function untuk scroll events
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

// ========================================
// CARD INTERACTIONS
// ========================================

// Destination cards hover effects
document.addEventListener('DOMContentLoaded', function() {
    const destinationCards = document.querySelectorAll('.destination-card');
    
    destinationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Culinary cards hover effects
    const culinaryCards = document.querySelectorAll('.culinary-card');
    
    culinaryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });
});

// ========================================
// KEYBOARD NAVIGATION
// ========================================

// Improve accessibility with keyboard navigation
document.addEventListener('keydown', function(e) {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        const navbarToggler = document.querySelector('.navbar-toggler');
        
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
            navbarToggler.classList.remove('active');
        }
    }
});

// ========================================
// PERFORMANCE OPTIMIZATIONS
// ========================================

// Optimize scroll events
const optimizedScrollHandler = throttle(function() {
    // Handle scroll events here if needed
}, 100);

window.addEventListener('scroll', optimizedScrollHandler);

// Optimize resize events
const optimizedResizeHandler = debounce(function() {
    // Recalculate dimensions if needed
    console.log('Window resized');
}, 250);

window.addEventListener('resize', optimizedResizeHandler);

// ========================================
// SOCIAL MEDIA SHARING (OPTIONAL)
// ========================================

function shareOnSocialMedia(platform, url, text) {
    const shareUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
        telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
    };
    
    if (shareUrls[platform]) {
        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
}

// ========================================
// ERROR HANDLING
// ========================================

// Global error handler
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // Optionally show user-friendly error message
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
    e.preventDefault();
});

// ========================================
// ADDITIONAL FEATURES
// ========================================

// Back to top button (optional enhancement)
function addBackToTopButton() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    backToTopBtn.className = 'btn btn-warning position-fixed';
    backToTopBtn.style.cssText = `
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: none;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    document.body.appendChild(backToTopBtn);
}

// Initialize back to top button
document.addEventListener('DOMContentLoaded', addBackToTopButton);

// ========================================
// ANALYTICS & TRACKING (PLACEHOLDER)
// ========================================

// Function to track user interactions
function trackEvent(category, action, label) {
    // Placeholder for analytics tracking
    console.log(`Track Event: ${category} - ${action} - ${label}`);
    
    // Example: Google Analytics 4
    // gtag('event', action, {
    //     event_category: category,
    //     event_label: label
    // });
}

// Track navigation clicks
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const linkText = this.textContent.trim();
            trackEvent('Navigation', 'Click', linkText);
        });
    });
    
    // Track button clicks
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            trackEvent('Button', 'Click', buttonText);
        });
    });
});

console.log('🚀 All JavaScript modules loaded successfully!');