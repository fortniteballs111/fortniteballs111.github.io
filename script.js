// Enterprise-grade Portfolio JavaScript
class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupTheme();
        this.setupPreloader();
        this.setupNavigation();
        this.setupParticles();
        this.setupAnimations();
        this.setupFormHandling();
        this.setupMetrics();
        this.setupIntersectionObserver();
        this.setupPerformanceMonitoring();
    }

    // Theme Management System
    setupTheme() {
        this.theme = localStorage.getItem('theme') || 
                    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        
        document.documentElement.setAttribute('data-theme', this.theme);
        this.updateThemeIcon();

        // Theme toggle handler
        document.querySelector('.theme-toggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.theme = e.matches ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', this.theme);
                this.updateThemeIcon();
            }
        });
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.theme);
        localStorage.setItem('theme', this.theme);
        this.updateThemeIcon();
        
        // Dispatch custom event for any theme-dependent components
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: this.theme } }));
    }

    updateThemeIcon() {
        const icon = document.querySelector('.theme-icon');
        icon.textContent = this.theme === 'light' ? '🌙' : '☀️';
    }

    // Advanced Preloader with Progress Simulation
    setupPreloader() {
        const preloader = document.querySelector('.preloader');
        const terminalText = document.querySelector('.terminal-text');
        
        if (!preloader) return;

        const commands = [
            '$ loading system modules...',
            '$ initializing portfolio engine...',
            '$ compiling assets...',
            '$ starting application...',
            '$ ready!'
        ];

        let currentCommand = 0;

        const simulateLoading = () => {
            if (currentCommand < commands.length) {
                terminalText.innerHTML = `
                    <span class="command">${commands[currentCommand]}</span>
                    <span class="blink">▊</span>
                `;
                currentCommand++;
                setTimeout(simulateLoading, 500 + Math.random() * 300);
            } else {
                // Add fade-out animation
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                    // Dispatch loaded event
                    window.dispatchEvent(new CustomEvent('portfolioLoaded'));
                }, 500);
            }
        };

        // Start loading simulation
        setTimeout(simulateLoading, 1000);
    }

    // Navigation System with Scroll Spy
    setupNavigation() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        const navbar = document.querySelector('.navbar');

        // Mobile menu toggle
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            
            // Animate hamburger
            navToggle.classList.toggle('active');
        });

        // Close mobile menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.classList.remove('active');
            });
        });

        // Navbar background on scroll
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY > 100;
            navbar.style.background = scrolled ? 
                'rgba(255, 255, 255, 0.95)' : 
                'rgba(255, 255, 255, 0.8)';
            
            if (this.theme === 'dark') {
                navbar.style.background = scrolled ? 
                    'rgba(15, 23, 42, 0.95)' : 
                    'rgba(15, 23, 42, 0.8)';
            }

            // Hide navbar on scroll down
            if (window.scrollY > lastScrollY && window.scrollY > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            lastScrollY = window.scrollY;
        });

        // Active link highlighting
        this.setupScrollSpy(navLinks);
    }

    setupScrollSpy(navLinks) {
        const sections = document.querySelectorAll('section[id]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '-20% 0px -20% 0px'
        });

        sections.forEach(section => observer.observe(section));
    }

    // Particles.js Background
    setupParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: {
                        value: 80,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: this.theme === 'light' ? '#0ea5e9' : '#38bdf8'
                    },
                    shape: {
                        type: 'circle'
                    },
                    opacity: {
                        value: 0.5,
                        random: true
                    },
                    size: {
                        value: 3,
                        random: true
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: this.theme === 'light' ? '#0ea5e9' : '#38bdf8',
                        opacity: 0.2,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: 'none',
                        random: true,
                        straight: false,
                        out_mode: 'out',
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: {
                            enable: true,
                            mode: 'grab'
                        },
                        onclick: {
                            enable: true,
                            mode: 'push'
                        },
                        resize: true
                    }
                },
                retina_detect: true
            });
        }
    }

    // Advanced Animation System
    setupAnimations() {
        // GSAP animations would be integrated here in a real enterprise project
        this.setupScrollAnimations();
        this.setupFloatingAnimations();
        this.setupTypewriterEffect();
    }

    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.expertise-card, .case-study, .principle-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(el);
        });
    }

    setupFloatingAnimations() {
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            shape.style.animationDelay = `${index * 2}s`;
        });
    }

    setupTypewriterEffect() {
        const heroTitle = document.querySelector('.hero-title .title-greeting');
        if (heroTitle) {
            const text = heroTitle.textContent;
            heroTitle.textContent = '';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    heroTitle.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            };
            
            // Start typing after preloader
            window.addEventListener('portfolioLoaded', typeWriter);
        }
    }

    // Form Handling with Validation
    setupFormHandling() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            try {
                // Simulate API call
                await this.submitForm(new FormData(form));
                
                this.showNotification('Success! Your message has been sent.', 'success');
                form.reset();
                
            } catch (error) {
                this.showNotification('Error sending message. Please try again.', 'error');
                console.error('Form submission error:', error);
            } finally {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        });

        // Real-time validation
        this.setupFormValidation(form);
    }

    setupFormValidation(form) {
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                this.clearFieldError(input);
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let message = '';

        switch (field.type) {
            case 'email':
                isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                message = isValid ? '' : 'Please enter a valid email address';
                break;
            case 'text':
                if (field.required && value.length < 2) {
                    isValid = false;
                    message = 'This field is required';
                }
                break;
            case 'textarea':
                if (field.required && value.length < 10) {
                    isValid = false;
                    message = 'Please provide more details (min. 10 characters)';
                }
                break;
        }

        if (!isValid) {
            this.showFieldError(field, message);
        } else {
            this.clearFieldError(field);
        }

        return isValid;
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        field.classList.add('error');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: var(--error);
            font-size: var(--text-sm);
            margin-top: var(--space-2);
        `;
        
        field.parentNode.appendChild(errorElement);
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    async submitForm(formData) {
        // Simulate API call - replace with actual endpoint
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate random success/failure for demo
                Math.random() > 0.2 ? resolve() : reject(new Error('Server error'));
            }, 2000);
        });
    }

    // Animated Metrics Counter
    setupMetrics() {
        const metrics = document.querySelectorAll('.metric-value[data-count]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        metrics.forEach(metric => observer.observe(metric));
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000; // ms
        const step = target / (duration / 16); // 60fps
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }

    // Intersection Observer for Performance
    setupIntersectionObserver() {
        // Lazy load images when they come into view
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Performance Monitoring
    setupPerformanceMonitoring() {
        // Monitor Core Web Vitals
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    console.log(`${entry.name}: ${entry.value}`);
                }
            });

            observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] });
        }

        // Error tracking
        window.addEventListener('error', (event) => {
            console.error('Application error:', event.error);
            // In production, send to error tracking service
        });

        // Unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
        });
    }

    // Notification System
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close" aria-label="Close notification">×</button>
            </div>
        `;

        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--bg-secondary);
            border: 1px solid var(--border-primary);
            border-radius: var(--radius-lg);
            padding: var(--space-4);
            box-shadow: var(--shadow-xl);
            z-index: var(--z-toast);
            max-width: 400px;
            transform: translateX(400px);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            this.hideNotification(notification);
        });

        // Auto hide after 5 seconds
        setTimeout(() => {
            this.hideNotification(notification);
        }, 5000);
    }

    hideNotification(notification) {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
}

// Custom Cursor System
class CustomCursor {
    constructor() {
        this.cursor = document.querySelector('.cursor');
        this.follower = document.querySelector('.cursor-follower');
        
        if (this.cursor && this.follower) {
            this.init();
        }
    }

    init() {
        this.mouse = { x: 0, y: 0 };
        this.followerPos = { x: 0, y: 0 };
        
        document.addEventListener('mousemove', (e) => this.onMouseMove(e));
        this.animate();
        
        // Interactive elements
        this.setupInteractiveElements();
    }

    onMouseMove(e) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
    }

    animate() {
        // Smooth follower movement
        this.followerPos.x += (this.mouse.x - this.followerPos.x) * 0.1;
        this.followerPos.y += (this.mouse.y - this.followerPos.y) * 0.1;
        
        this.cursor.style.transform = `translate3d(${this.mouse.x}px, ${this.mouse.y}px, 0)`;
        this.follower.style.transform = `translate3d(${this.followerPos.x - 20}px, ${this.followerPos.y - 20}px, 0)`;
        
        requestAnimationFrame(() => this.animate());
    }

    setupInteractiveElements() {
        const interactiveElements = document.querySelectorAll('a, button, [data-cursor]');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('hover');
                this.follower.classList.add('hover');
            });
            
            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('hover');
                this.follower.classList.remove('hover');
            });
        });
    }
}

// Service Worker Registration for PWA capabilities
class ServiceWorkerManager {
    constructor() {
        this.init();
    }

    async init() {
        if ('serviceWorker' in navigator) {
            try {
                await navigator.serviceWorker.register('/sw.js');
                console.log('Service Worker registered successfully');
            } catch (error) {
                console.log('Service Worker registration failed:', error);
            }
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main application
    window.portfolioApp = new PortfolioApp();
    
    // Initialize custom cursor
    window.customCursor = new CustomCursor();
    
    // Initialize service worker (optional)
    if (process.env.NODE_ENV === 'production') {
        window.serviceWorkerManager = new ServiceWorkerManager();
    }
    
    // Add loading class for initial animations
    document.body.classList.add('loaded');
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PortfolioApp, CustomCursor, ServiceWorkerManager };
}
