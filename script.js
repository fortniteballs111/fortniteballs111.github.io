// ===== GLOBAL ERROR HANDLER =====
window.addEventListener('error', function(e) {
    console.error('Global error caught:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
});

// ===== ELITE PORTFOLIO INITIALIZATION =====
class ElitePortfolio {
    constructor() {
        this.isInitialized = false;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = null;
        this.init();
    }

    async init() {
        try {
            await this.setupPreloader();
            this.setupNavigation();
            this.setupParticles();
            this.setupAnimations();
            this.setup3DBackground();
            this.setupCyberEffects();
            this.setupEventListeners();
            this.setupPerformanceMonitor();
            
            this.isInitialized = true;
            console.log('🚀 Elite Portfolio Initialized');
        } catch (error) {
            console.error('Initialization error:', error);
            this.fallbackToContent();
        }
    }

    fallbackToContent() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.display = 'none';
        }
        document.body.style.visibility = 'visible';
    }

    // ===== ADVANCED PRELOADER =====
    async setupPreloader() {
        const preloader = document.querySelector('.preloader');
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        
        if (!preloader) {
            console.warn('Preloader not found, skipping');
            return;
        }

        const steps = [
            { text: "Initializing Security Framework...", duration: 400 },
            { text: "Loading Threat Intelligence...", duration: 400 },
            { text: "Activating Defense Systems...", duration: 400 }
        ];

        let progress = 0;
        
        for (let i = 0; i < steps.length; i++) {
            const step = steps[i];
            
            if (this.addTerminalLine) {
                this.addTerminalLine(step.text, 'output');
            }
            
            await this.animateProgress(progress, progress + 33, 400, (value) => {
                progress = value;
                if (progressFill) progressFill.style.width = `${progress}%`;
                if (progressText) progressText.textContent = `${Math.round(progress)}%`;
            });
            
            await this.delay(step.duration);
        }

        await this.animateProgress(progress, 100, 300, (value) => {
            if (progressFill) progressFill.style.width = `${value}%`;
            if (progressText) progressText.textContent = `${Math.round(value)}%`;
        });

        if (this.addTerminalLine) {
            this.addTerminalLine("System ready. Welcome, bytemalice.", 'success');
        }
        
        await this.delay(300);
        
        preloader.style.opacity = '0';
        await this.delay(200);
        preloader.style.display = 'none';
        
        this.animateHeroContent();
    }

    addTerminalLine(text, type = 'output') {
        const terminalBody = document.querySelector('.terminal-body');
        if (!terminalBody) return;
        
        const line = document.createElement('div');
        line.className = 'terminal-line';
        
        if (type === 'command') {
            line.innerHTML = `<span class="prompt">$</span><span class="command">${text}</span>`;
        } else if (type === 'success') {
            line.innerHTML = `<span class="output" style="color: #00ff88">${text}</span>`;
        } else {
            line.innerHTML = `<span class="output">${text}</span>`;
        }
        
        terminalBody.appendChild(line);
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    animateProgress(from, to, duration, onUpdate) {
        return new Promise(resolve => {
            const startTime = performance.now();
            
            const updateProgress = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const value = from + (to - from) * easeOut;
                
                onUpdate(value);
                
                if (progress < 1) {
                    requestAnimationFrame(updateProgress);
                } else {
                    resolve();
                }
            };
            requestAnimationFrame(updateProgress);
        });
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // ===== ADVANCED NAVIGATION =====
    setupNavigation() {
        this.setupMobileMenu();
        this.setupScrollSpy();
        this.setupNavbarEffects();
        this.setupSmoothScrolling();
    }

    setupMobileMenu() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (!navToggle || !navMenu) return;

        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    setupScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (sections.length === 0 || navLinks.length === 0) return;

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
        }, { threshold: 0.5 });

        sections.forEach(section => observer.observe(section));
    }

    setupNavbarEffects() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY > 100;
            navbar.style.background = scrolled ? 
                'rgba(10, 10, 15, 0.98)' : 
                'rgba(10, 10, 15, 0.95)';
            
            if (window.scrollY > lastScrollY && window.scrollY > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            lastScrollY = window.scrollY;
        });
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // ===== PARTICLE BACKGROUND =====
    setupParticles() {
        if (typeof particlesJS === 'undefined') {
            console.warn('Particles.js not loaded');
            return;
        }

        try {
            particlesJS('particles-js', {
                particles: {
                    number: { value: 60, density: { enable: true, value_area: 800 } },
                    color: { value: ['#00f0ff', '#ff003c', '#00ff88', '#b967ff'] },
                    shape: { type: 'circle' },
                    opacity: { value: 0.5, random: true },
                    size: { value: 3, random: true },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#00f0ff',
                        opacity: 0.2,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: 'none',
                        random: true,
                        straight: false,
                        out_mode: 'out'
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: { enable: true, mode: 'grab' },
                        onclick: { enable: true, mode: 'push' }
                    }
                },
                retina_detect: true
            });
        } catch (error) {
            console.warn('Particles.js initialization failed:', error);
        }
    }

    // ===== HERO ANIMATIONS =====
    animateHeroContent() {
        this.animateTypingText();
        this.animateStats();
        this.animateNetworkNodes();
        this.animateSkillBars();
    }

    animateTypingText() {
        const typingElement = document.querySelector('.typing-text');
        if (!typingElement) return;

        const texts = [
            'ASPIRING RED TEAM SPECIALIST',
            'PYTHON DEVELOPER', 
            'SECURITY ENTHUSIAST',
            'CTF PLAYER'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isPaused = false;
        
        const type = () => {
            if (isPaused) return;
            
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                isPaused = true;
                setTimeout(() => {
                    isPaused = false;
                    isDeleting = true;
                    type();
                }, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(type, 500);
            } else {
                setTimeout(type, isDeleting ? 50 : 100);
            }
        };
        
        setTimeout(type, 1000);
    }

    animateStats() {
        const stats = document.querySelectorAll('.stat-value[data-count]');
        if (stats.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(stat => observer.observe(stat));
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeOut = 1 - Math.pow(1 - progress, 4);
            const value = Math.floor(easeOut * target);
            
            element.textContent = value.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };
        
        requestAnimationFrame(updateCounter);
    }

    animateNetworkNodes() {
        const nodes = document.querySelectorAll('.node');
        nodes.forEach((node, index) => {
            node.style.animationDelay = `${index * 0.2}s`;
        });
    }

    animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        if (skillBars.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.getAttribute('data-width');
                    entry.target.style.width = width + '%';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        skillBars.forEach(bar => observer.observe(bar));
    }

    // ===== 3D BACKGROUND =====
    setup3DBackground() {
        if (typeof THREE === 'undefined') {
            console.warn('Three.js not loaded');
            return;
        }

        try {
            this.setupThreeScene();
        } catch (error) {
            console.warn('3D background failed:', error);
        }
    }

    setupThreeScene() {
        const canvas = document.getElementById('3d-background');
        if (!canvas) return;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 50;

        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        this.createParticles();
        this.animate3D();

        window.addEventListener('resize', () => this.handleResize());
    }

    createParticles() {
        const count = 300;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        for (let i = 0; i < count * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 200;
            positions[i + 1] = (Math.random() - 0.5) * 200;
            positions[i + 2] = (Math.random() - 0.5) * 200;

            const color = this.getParticleColor();
            colors[i] = color[0];
            colors[i + 1] = color[1];
            colors[i + 2] = color[2];
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 2,
            vertexColors: true,
            transparent: true,
            opacity: 0.6
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    getParticleColor() {
        const colors = [
            [0, 0.94, 1],    // Neon Blue
            [1, 0, 0.24],    // Neon Red
            [0, 1, 0.53],    // Neon Green
        ];
        
        return colors[Math.floor(Math.random() * colors.length)];
    }

    animate3D() {
        if (!this.particles || !this.scene || !this.camera || !this.renderer) return;

        requestAnimationFrame(() => this.animate3D());
        
        this.particles.rotation.x += 0.0002;
        this.particles.rotation.y += 0.0005;
        this.renderer.render(this.scene, this.camera);
    }

    handleResize() {
        if (!this.camera || !this.renderer) return;
        
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // ===== CYBER EFFECTS =====
    setupCyberEffects() {
        this.setupGlitchEffects();
        this.setupHoverEffects();
        this.setupScrollAnimations();
    }

    setupGlitchEffects() {
        const glitchElements = document.querySelectorAll('.text-glitch');
        
        glitchElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.triggerGlitchEffect(element);
            });
        });
    }

    triggerGlitchEffect(element) {
        if (element.classList.contains('glitching')) return;
        
        element.classList.add('glitching');
        
        const originalTransform = element.style.transform;
        
        element.style.transform = 'translateX(2px)';
        setTimeout(() => {
            element.style.transform = 'translateX(-2px)';
            setTimeout(() => {
                element.style.transform = originalTransform;
                element.classList.remove('glitching');
            }, 80);
        }, 80);
    }

    setupHoverEffects() {
        const interactiveElements = document.querySelectorAll('.btn, .project-card, .skill-item');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.createRippleEffect(e);
            });
        });
    }

    createRippleEffect(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
        circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
        circle.classList.add('cyber-ripple');

        const existingRipples = button.getElementsByClassName('cyber-ripple');
        while (existingRipples[0]) {
            existingRipples[0].remove();
        }

        button.appendChild(circle);

        setTimeout(() => circle.remove(), 600);
    }

    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('cyber-reveal');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('section, .project-card, .skill-item').forEach(element => {
            observer.observe(element);
        });
    }

    // ===== EVENT LISTENERS =====
    setupEventListeners() {
        this.setupFormHandlers();
        this.removeUnwantedButtons();
    }

    setupFormHandlers() {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault(); // Важно: предотвращаем перезагрузку страницы
                this.handleFormSubmit(contactForm);
            });
        }
    }

    // Убираем ненужные кнопки
    removeUnwantedButtons() {
        // Убираем кнопки DEPLOY/ACCESS/EXTRACT
        const actionButtons = document.querySelectorAll('[data-action="deploy"], [data-action="briefing"], [data-action="extract"]');
        actionButtons.forEach(button => {
            button.style.display = 'none';
        });

        // Убираем переключатель темы
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.style.display = 'none';
        }
    }

    handleFormSubmit(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        console.log('Form submitted:', data);
        this.showCyberNotification('Thank you! Your message has been sent successfully.');
        form.reset();
    }

    showCyberNotification(message, duration = 4000) {
        const existingNotification = document.querySelector('.cyber-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = 'cyber-notification';
        notification.innerHTML = `
            <div class="notification-header">
                <span class="notification-icon">⚠️</span>
                <span class="notification-title">SYSTEM ALERT</span>
            </div>
            <div class="notification-content">${message}</div>
        `;
        
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: '#1a1a2f',
            border: '1px solid #00f0ff',
            borderRadius: '8px',
            padding: '15px',
            maxWidth: '400px',
            boxShadow: '0 0 20px rgba(0, 240, 255, 0.3)',
            zIndex: '10000',
            transform: 'translateX(400px)',
            transition: 'transform 0.3s ease',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.9rem',
            color: '#e0e0e0'
        });
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, duration);
    }

    // ===== PERFORMANCE MONITOR =====
    setupPerformanceMonitor() {
        let frameCount = 0;
        let lastTime = performance.now();
        
        const measureFPS = (currentTime) => {
            frameCount++;
            
            if (currentTime - lastTime >= 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                
                if (fps < 45) {
                    console.warn(`Low FPS: ${fps}. Consider reducing animations.`);
                }
                
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(measureFPS);
        };
        
        requestAnimationFrame(measureFPS);
    }

    // ===== CLEANUP =====
    destroy() {
        if (this.renderer) {
            this.renderer.dispose();
        }
        window.removeEventListener('resize', this.handleResize);
        this.isInitialized = false;
    }
}

// ===== GLOBAL INITIALIZATION =====
let elitePortfolio;

document.addEventListener('DOMContentLoaded', () => {
    elitePortfolio = new ElitePortfolio();
});

// ===== PAGE VISIBILITY HANDLING =====
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Page hidden - optimizing performance');
    }
});
