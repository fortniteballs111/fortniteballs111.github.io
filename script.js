// ===== GLOBAL ERROR HANDLER =====
window.addEventListener('error', function(e) {
    console.error('Global error caught:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    e.preventDefault();
});
// ===== ELITE PORTFOLIO INITIALIZATION =====
class ElitePortfolio {
    constructor() {
        this.isInitialized = false;
        this.currentTheme = 'cyber';
        this.init();
    }

    async init() {
        await this.setupPreloader();
        this.setupTheme();
        this.setupNavigation();
        this.setupParticles();
        this.setupAnimations();
        this.setup3DBackground();
        this.setupCyberEffects();
        this.setupPerformanceMonitor();
        
        this.isInitialized = true;
        console.log('🚀 Elite Portfolio Initialized');
    }

    // ===== ADVANCED PRELOADER =====
    async setupPreloader() {
        const preloader = document.querySelector('.preloader');
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        
        // Быстрая загрузка - максимум 3 секунды
        const steps = [
            { text: "Initializing Security Framework...", duration: 600 },
            { text: "Loading Threat Intelligence...", duration: 600 },
            { text: "Activating Defense Systems...", duration: 600 }
        ];

        let progress = 0;
        
        for (let i = 0; i < steps.length; i++) {
            const step = steps[i];
            
            // Update terminal output
            this.addTerminalLine(step.text, 'output');
            
            // Быстрая анимация прогресса
            await this.animateProgress(progress, progress + 33, 600, (value) => {
                progress = value;
                progressFill.style.width = `${progress}%`;
                progressText.textContent = `${Math.round(progress)}%`;
            });
            
            await this.delay(step.duration);
        }

        // Complete loading
        await this.animateProgress(progress, 100, 400, (value) => {
            progressFill.style.width = `${value}%`;
            progressText.textContent = `${Math.round(value)}%`;
        });

        this.addTerminalLine("System ready. Welcome, bytemalice.", 'success');
        
        await this.delay(500);
        
        // Быстрое исчезновение прелоадера
        preloader.style.opacity = '0';
        await this.delay(300);
        preloader.style.display = 'none';
        
        // Initialize main content animations
        this.animateHeroContent();
    }

    addTerminalLine(text, type = 'output') {
        const terminalBody = document.querySelector('.terminal-body');
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
                const value = from + (to - from) * progress;
                
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

    // ===== CYBER THEME SYSTEM =====
setupTheme() {
    this.currentTheme = localStorage.getItem('cyber-theme') || 'cyber';
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    this.updateThemeIcon();

    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => this.toggleTheme());
    }
}

toggleTheme() {
    this.currentTheme = this.currentTheme === 'cyber' ? 'light' : 'cyber';
    this.applyTheme();
    localStorage.setItem('cyber-theme', this.currentTheme);
}

applyTheme() {
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    this.updateThemeIcon();
}

updateThemeIcon() {
    const icon = document.querySelector('.theme-icon');
    if (icon) {
        icon.textContent = this.currentTheme === 'cyber' ? '☀️' : '🌙';
    }
}

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'cyber' ? 'light' : 'cyber';
        this.applyTheme();
        localStorage.setItem('cyber-theme', this.currentTheme);
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        this.updateThemeIcon();
    }

    updateThemeIcon() {
        const icon = document.querySelector('.theme-icon');
        icon.textContent = this.currentTheme === 'cyber' ? '💠' : '☀️';
    }

    // ===== ADVANCED NAVIGATION =====
    setupNavigation() {
        this.setupMobileMenu();
        this.setupScrollSpy();
        this.setupNavbarEffects();
    }

    setupMobileMenu() {
        const navToggle = document.createElement('button');
        navToggle.className = 'nav-toggle';
        navToggle.setAttribute('aria-label', 'Toggle navigation');
        navToggle.innerHTML = `
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        `;

        const navContainer = document.querySelector('.nav-container');
        navContainer.appendChild(navToggle);

        const navMenu = document.querySelector('.nav-menu');
        
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu on link click
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

    setupNavbarEffects() {
        const navbar = document.querySelector('.navbar');
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

    // ===== PARTICLE BACKGROUND =====
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
                        value: ['#00f0ff', '#ff003c', '#00ff88', '#b967ff']
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
                        onhover: {
                            enable: true,
                            mode: 'grab'
                        },
                        onclick: {
                            enable: true,
                            mode: 'push'
                        }
                    }
                },
                retina_detect: true
            });
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
        const texts = [
    'ASPIRING RED TEAM SPECIALIST',
    'PYTHON DEVELOPER', 
    'SECURITY ENTHUSIAST',
    'CTF PLAYER'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        const type = () => {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(type, 2000);
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
        const duration = 1500;
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const value = Math.floor(easeOutQuart * target);
            
            element.textContent = value;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };
        
        requestAnimationFrame(updateCounter);
    }

    animateNetworkNodes() {
        const nodes = document.querySelectorAll('.node');
        nodes.forEach((node, index) => {
            node.style.animationDelay = `${index * 0.3}s`;
        });
    }

    animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
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
            console.warn('3D background failed, continuing without it:', error);
        }
    }

    setupThreeScene() {
        const canvas = document.getElementById('3d-background');
        if (!canvas) return;

        // Scene
        const scene = new THREE.Scene();

        // Camera
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 50;

        // Renderer
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Simple particles
        const particlesGeometry = new THREE.BufferGeometry();
        const count = 500; // Меньше частиц для производительности

        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        for (let i = 0; i < count * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 100;
            positions[i + 1] = (Math.random() - 0.5) * 100;
            positions[i + 2] = (Math.random() - 0.5) * 100;

            const colorPalette = [
                [0, 0.94, 1],    // Neon Blue
                [1, 0, 0.24],    // Neon Red
                [0, 1, 0.53],    // Neon Green
            ];
            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i] = color[0];
            colors[i + 1] = color[1];
            colors[i + 2] = color[2];
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 1,
            vertexColors: true,
            transparent: true,
            opacity: 0.6
        });

        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);

        // Animation
        const animate = () => {
            requestAnimationFrame(animate);
            particles.rotation.x += 0.0002;
            particles.rotation.y += 0.0005;
            renderer.render(scene, camera);
        };
        animate();

        // Handle resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
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
            }, 100);
        }, 100);
    }

    setupHoverEffects() {
        const interactiveElements = document.querySelectorAll('.btn, .project-card');
        
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

        // Remove after animation
        setTimeout(() => circle.remove(), 600);
    }

    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('cyber-reveal');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    }

    // ===== PERFORMANCE MONITOR =====
    setupPerformanceMonitor() {
        // Простой мониторинг FPS
        let frameCount = 0;
        let lastTime = performance.now();
        
        const measureFPS = (currentTime) => {
            frameCount++;
            
            if (currentTime - lastTime >= 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                if (fps < 45) {
                    console.warn(`Low FPS: ${fps}`);
                }
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(measureFPS);
        };
        
        requestAnimationFrame(measureFPS);
    }
}

// ===== GLOBAL INITIALIZATION =====
let elitePortfolio;

document.addEventListener('DOMContentLoaded', async () => {
    try {
        elitePortfolio = new ElitePortfolio();
        setupGlobalInteractions();
        console.log('🎯 Elite Portfolio fully operational');
    } catch (error) {
        console.error('Initialization error:', error);
        // Fallback - hide preloader and show content
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.display = 'none';
        }
    }
});

// ===== GLOBAL INTERACTIONS =====
function setupGlobalInteractions() {
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
            }
        });
    });
// === ДОБАВЬ ЭТОТ КОД ===
    // Button action handlers
    document.querySelectorAll('[data-action]').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.getAttribute('data-action');
            handleButtonAction(action, this);
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showCyberNotification('Thank you! Your message has been sent.');
            this.reset();
        });
    }
    // === КОНЕЦ ДОБАВЛЕННОГО КОДА ===
}
    // Button action handlers
    document.querySelectorAll('[data-action]').forEach(button => {
        button.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            handleButtonAction(action, this);
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showCyberNotification('Message transmitted securely. Standby for response.');
            this.reset();
        });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Theme toggle with T key
        if (e.key === 't' && e.ctrlKey) {
            e.preventDefault();
            elitePortfolio.toggleTheme();
        }
    });
}

function handleButtonAction(action, element) {
    switch (action) {
        case 'deploy':
            simulateDeploymentSequence();
            break;
            
        case 'briefing':
            showMissionBriefing();
            break;
            
        case 'extract':
            downloadIntel();
            break;
    }
}

function simulateDeploymentSequence() {
    const steps = [
        "Initializing deployment protocol...",
        "Authenticating security clearance...",
        "Mission parameters set. Ready for operation."
    ];

    steps.forEach((step, index) => {
        setTimeout(() => {
            showCyberNotification(step);
        }, index * 600);
    });
}

function showMissionBriefing() {
    const briefing = `
        ACTIVE OPERATIONS:
        • TryHackMe Red Team Path
        • Python Security Tools
        • Linux Security Research
        • CTF Competition Training
        
        STATUS: OPERATIONAL
    `;
    
    showCyberNotification(briefing, 4000);
}

function downloadIntel() {
    showCyberNotification("Preparing secure intel package...");
    
    setTimeout(() => {
        showCyberNotification("Intel package ready for extraction.");
        // Здесь будет реальная загрузка файла
    }, 1500);
}

function showCyberNotification(message, duration = 3000) {
    const notification = document.createElement('div');
    notification.className = 'cyber-notification';
    notification.innerHTML = `
        <div class="notification-header">
            <span class="notification-icon">⚠️</span>
            <span class="notification-title">SYSTEM ALERT</span>
        </div>
        <div class="notification-content">${message}</div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-card);
        border: 1px solid var(--neon-blue);
        border-radius: 10px;
        padding: 15px;
        max-width: 400px;
        box-shadow: var(--shadow-cyber);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.9rem;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    event.preventDefault();
});

// ===== PERFORMANCE OPTIMIZATIONS =====
// Отложенная загрузка тяжелых ресурсов
window.addEventListener('load', () => {
    // Можно добавить отложенную загрузку дополнительных ресурсов
    console.log('Page fully loaded');
});
// ===== BUTTON ACTIONS =====
function handleButtonAction(action, element) {
    switch (action) {
        case 'deploy':
            showCyberNotification('Portfolio engagement activated');
            break;
            
        case 'briefing':
            document.getElementById('skills')?.scrollIntoView({ 
                behavior: 'smooth' 
            });
            break;
            
        case 'extract':
            document.getElementById('contact')?.scrollIntoView({ 
                behavior: 'smooth' 
            });
            break;
    }
}

// ===== NOTIFICATION SYSTEM =====
function showCyberNotification(message, duration = 3000) {
    const notification = document.createElement('div');
    notification.innerHTML = `
        <div style="padding: 10px; background: #1a1a2f; border: 1px solid #00f0ff; border-radius: 5px; color: white;">
            ${message}
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, duration);
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.log('Error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.log('Promise error:', e.reason);
});


