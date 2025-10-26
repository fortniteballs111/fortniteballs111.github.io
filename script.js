// ===== ELITE PORTFOLIO INITIALIZATION =====
class ElitePortfolio {
    constructor() {
        this.isInitialized = false;
        this.currentTheme = 'cyber';
        this.aiAssistant = null;
        this.threeScene = null;
        this.init();
    }

    async init() {
        await this.setupPreloader();
        this.setupTheme();
        this.setupNavigation();
        this.setupParticles();
        this.setupAnimations();
        this.setupAIAssistant();
        this.setup3DBackground();
        this.setupVoiceCommands();
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
        
        // Simulate complex loading process
        const steps = [
            { text: "Initializing Zero-Trust Security Framework...", duration: 800 },
            { text: "Loading Advanced Threat Intelligence...", duration: 600 },
            { text: "Compiling Neural Security Models...", duration: 900 },
            { text: "Activating Cyber Defense Systems...", duration: 700 },
            { text: "Deploying AI Security Protocols...", duration: 500 }
        ];

        let progress = 0;
        
        for (let i = 0; i < steps.length; i++) {
            const step = steps[i];
            
            // Update terminal output
            this.addTerminalLine(step.text, 'output');
            
            // Animate progress
            await this.animateProgress(progress, progress + 20, 2000, (value) => {
                progress = value;
                progressFill.style.width = `${progress}%`;
                progressText.textContent = `${Math.round(progress)}%`;
            });
            
            await this.delay(step.duration);
        }

        // Complete loading
        await this.animateProgress(progress, 100, 1000, (value) => {
            progressFill.style.width = `${value}%`;
            progressText.textContent = `${Math.round(value)}%`;
        });

        this.addTerminalLine("System ready. Welcome, bytemalice.", 'success');
        
        await this.delay(1000);
        
        // Fade out preloader
        preloader.style.opacity = '0';
        await this.delay(500);
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
        themeToggle.addEventListener('click', () => this.toggleTheme());

        // System theme detection
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('cyber-theme')) {
                this.currentTheme = e.matches ? 'cyber' : 'light';
                this.applyTheme();
            }
        });
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'cyber' ? 'light' : 'cyber';
        this.applyTheme();
        localStorage.setItem('cyber-theme', this.currentTheme);
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        this.updateThemeIcon();
        
        // Dispatch theme change event for other components
        window.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { theme: this.currentTheme }
        }));
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
            threshold: 0.6,
            rootMargin: '-20% 0px -20% 0px'
        });

        sections.forEach(section => observer.observe(section));
    }

    setupNavbarEffects() {
        const navbar = document.querySelector('.navbar');
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            // Background opacity
            const scrolled = window.scrollY > 100;
            navbar.style.background = scrolled ? 
                'rgba(10, 10, 15, 0.98)' : 
                'rgba(10, 10, 15, 0.95)';
            
            // Hide/show on scroll
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
                        value: 100,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: ['#00f0ff', '#ff003c', '#00ff88', '#b967ff']
                    },
                    shape: {
                        type: 'circle',
                        stroke: {
                            width: 0,
                            color: '#000000'
                        }
                    },
                    opacity: {
                        value: 0.5,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 1,
                            opacity_min: 0.1,
                            sync: false
                        }
                    },
                    size: {
                        value: 3,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 2,
                            size_min: 0.1,
                            sync: false
                        }
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
                        out_mode: 'out',
                        bounce: false,
                        attract: {
                            enable: false,
                            rotateX: 600,
                            rotateY: 1200
                        }
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

    // ===== HERO ANIMATIONS =====
    animateHeroContent() {
        this.animateTypingText();
        this.animateStats();
        this.animateNetworkNodes();
    }

    animateTypingText() {
        const typingElement = document.querySelector('.typing-text');
        const texts = [
            'ELITE RED TEAM SPECIALIST',
            'AI SECURITY RESEARCHER', 
            'PYTHON DEVELOPER',
            'CYBER THREAT HUNTER'
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
        const duration = 2000;
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
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
            node.style.animationDelay = `${index * 0.5}s`;
        });
    }
}

// ===== AI ASSISTANT SYSTEM =====
class AIAssistant {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.init();
    }

    init() {
        this.setupDOM();
        this.setupEventListeners();
        this.loadKnowledgeBase();
        this.showWelcomeMessage();
    }

    setupDOM() {
        this.trigger = document.querySelector('.ai-trigger');
        this.chat = document.querySelector('.ai-chat');
        this.messagesContainer = document.querySelector('.ai-messages');
        this.input = document.querySelector('.ai-input input');
        this.sendButton = document.querySelector('.ai-send');
        this.closeButton = document.querySelector('.ai-close');
    }

    setupEventListeners() {
        this.trigger.addEventListener('click', () => this.toggle());
        this.closeButton.addEventListener('click', () => this.close());
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
    }

    toggle() {
        this.isOpen = !this.isOpen;
        this.chat.classList.toggle('active', this.isOpen);
        
        if (this.isOpen) {
            this.input.focus();
        }
    }

    close() {
        this.isOpen = false;
        this.chat.classList.remove('active');
    }

    async sendMessage() {
        const message = this.input.value.trim();
        if (!message) return;

        this.addMessage(message, 'user');
        this.input.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        // Simulate AI processing
        setTimeout(() => {
            this.removeTypingIndicator();
            const response = this.generateResponse(message);
            this.addMessage(response, 'assistant');
        }, 1000 + Math.random() * 1000);
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.textContent = text;
        
        this.messagesContainer.appendChild(messageDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        
        this.messages.push({ text, sender, timestamp: Date.now() });
    }

    showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'message assistant typing';
        indicator.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
        this.messagesContainer.appendChild(indicator);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    removeTypingIndicator() {
        const indicator = this.messagesContainer.querySelector('.typing');
        if (indicator) {
            indicator.remove();
        }
    }

    loadKnowledgeBase() {
        this.knowledgeBase = {
            greetings: {
                patterns: ['hello', 'hi', 'hey', 'greetings'],
                responses: [
                    "Greetings! I'm the bytemalice AI assistant. How can I help you explore this elite portfolio?",
                    "Hello! Ready to dive into advanced cybersecurity topics?",
                    "Hey there! I'm here to discuss red team operations and Python development."
                ]
            },
            skills: {
                patterns: ['skill', 'what can you do', 'expertise', 'specialization'],
                responses: [
                    "bytemalice specializes in: Red Team Operations, Python Development, AI Security Research, and Advanced Threat Intelligence.",
                    "Core competencies include: Penetration Testing, Security Automation, Machine Learning in Cybersecurity, and Zero-Day Research.",
                    "Technical stack: Python, Linux, Docker, AI/ML, Red Team Tools, and custom security frameworks."
                ]
            },
            projects: {
                patterns: ['project', 'work', 'portfolio', 'what have you built'],
                responses: [
                    "Current operations include: GTO Progress Tracker, Linux Security Lab, AI Threat Detection System, and Custom Red Team Tools.",
                    "Key projects: Advanced Network Scanner, Security Automation Framework, Machine Learning Malware Detection, and Incident Response Platform.",
                    "Recent developments: Real-time Threat Intelligence Dashboard, Automated Vulnerability Assessment, and AI-Powered Security Analytics."
                ]
            },
            contact: {
                patterns: ['contact', 'reach', 'get in touch', 'connect'],
                responses: [
                    "For strategic partnerships: Access the Command Center section or deploy engagement protocols via the action buttons.",
                    "Connect through: TryHackMe (bytemalice), GitHub (fortniteballs111), or initiate secure communication via the contact matrix.",
                    "Available for: Mentorship programs, CTF collaborations, security research, and red team operations discussion."
                ]
            },
            default: {
                responses: [
                    "I specialize in discussing cybersecurity topics, Python development, and red team operations. Try asking about skills, projects, or contact information.",
                    "My knowledge focuses on advanced security research and development. How can I assist with your inquiry?",
                    "I'm designed to provide information about bytemalice's expertise in offensive security and AI-powered defense systems."
                ]
            }
        };
    }

    generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        for (const [category, data] of Object.entries(this.knowledgeBase)) {
            if (category === 'default') continue;
            
            for (const pattern of data.patterns) {
                if (lowerMessage.includes(pattern)) {
                    const responses = data.responses;
                    return responses[Math.floor(Math.random() * responses.length)];
                }
            }
        }
        
        // Default response
        const defaultResponses = this.knowledgeBase.default.responses;
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }

    showWelcomeMessage() {
        setTimeout(() => {
            this.addMessage("AI Assistant initialized. How can I help you explore this elite cybersecurity portfolio?", 'assistant');
        }, 1000);
    }
}
// ===== 3D BACKGROUND SCENE =====
class ThreeScene {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = null;
        this.init();
    }

    init() {
        if (typeof THREE === 'undefined') {
            console.warn('Three.js not loaded');
            return;
        }

        this.setupScene();
        this.createParticles();
        this.animate();
        this.handleResize();
    }

    setupScene() {
        // Scene
        this.scene = new THREE.Scene();

        // Camera
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 50;

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('3d-background'),
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Colors based on theme
        this.updateColors();
    }

    createParticles() {
        const particlesGeometry = new THREE.BufferGeometry();
        const count = 2000;

        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        for (let i = 0; i < count * 3; i += 3) {
            // Positions
            positions[i] = (Math.random() - 0.5) * 100;
            positions[i + 1] = (Math.random() - 0.5) * 100;
            positions[i + 2] = (Math.random() - 0.5) * 100;

            // Colors
            const colorPalette = [
                [0, 0.94, 1],    // Neon Blue
                [1, 0, 0.24],    // Neon Red
                [0, 1, 0.53],    // Neon Green
                [0.73, 0.41, 1]  // Neon Purple
            ];
            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i] = color[0];
            colors[i + 1] = color[1];
            colors[i + 2] = color[2];

            // Sizes
            sizes[i / 3] = Math.random() * 1.5;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.5,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true
        });

        this.particles = new THREE.Points(particlesGeometry, particlesMaterial);
        this.scene.add(this.particles);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        if (this.particles) {
            this.particles.rotation.x += 0.0005;
            this.particles.rotation.y += 0.001;
            
            // Pulsing animation
            const time = Date.now() * 0.001;
            this.particles.material.opacity = 0.6 + Math.sin(time) * 0.2;
        }

        this.renderer.render(this.scene, this.camera);
    }

    handleResize() {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    updateColors() {
        // Update colors based on theme
        if (this.particles) {
            const colors = this.particles.geometry.attributes.color.array;
            
            for (let i = 0; i < colors.length; i += 3) {
                // Dynamic color shifts based on theme
                if (document.documentElement.getAttribute('data-theme') === 'light') {
                    colors[i] *= 0.7;     // R
                    colors[i + 1] *= 0.8; // G
                    colors[i + 2] *= 0.9; // B
                }
            }
            
            this.particles.geometry.attributes.color.needsUpdate = true;
        }
    }
}

// ===== VOICE COMMAND SYSTEM =====
class VoiceCommandSystem {
    constructor() {
        this.recognition = null;
        this.isListening = false;
        this.commands = new Map();
        this.init();
    }

    init() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            this.setupSpeechRecognition();
            this.setupCommands();
            this.createVoiceIndicator();
        }
    }

    setupSpeechRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';

        this.recognition.onresult = (event) => {
            const transcript = Array.from(event.results)
                .map(result => result[0].transcript)
                .join('')
                .toLowerCase();

            this.processCommand(transcript);
        };

        this.recognition.onerror = (event) => {
            console.log('Voice recognition error:', event.error);
        };
    }

    setupCommands() {
        this.commands.set('open portfolio', () => this.scrollToSection('hero'));
        this.commands.set('show skills', () => this.scrollToSection('skills'));
        this.commands.set('view projects', () => this.scrollToSection('projects'));
        this.commands.set('contact info', () => this.scrollToSection('contact'));
        this.commands.set('toggle theme', () => elitePortfolio.toggleTheme());
        this.commands.set('open ai', () => aiAssistant.toggle());
        this.commands.set('start mission', () => this.startMissionProtocol());
        this.commands.set('system status', () => this.showSystemStatus());
    }

    processCommand(transcript) {
        for (const [command, action] of this.commands) {
            if (transcript.includes(command)) {
                action();
                this.showVoiceFeedback(`Executing: ${command}`);
                break;
            }
        }
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    startMissionProtocol() {
        // Simulate mission start sequence
        this.showVoiceFeedback("Initiating mission protocol...");
        
        const missionSteps = [
            "Activating cyber defense systems...",
            "Deploying threat intelligence...",
            "Initializing AI security protocols...",
            "Mission ready. Systems operational."
        ];

        missionSteps.forEach((step, index) => {
            setTimeout(() => {
                this.showVoiceFeedback(step);
            }, index * 1000);
        });
    }

    showSystemStatus() {
        const status = {
            "Threat Level": "LOW",
            "Neural Network": "ACTIVE", 
            "AI Assistant": "READY",
            "Security Protocols": "ENABLED"
        };

        let statusMessage = "System Status:\n";
        for (const [key, value] of Object.entries(status)) {
            statusMessage += `${key}: ${value}\n`;
        }

        this.showVoiceFeedback(statusMessage);
    }

    createVoiceIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'voice-indicator';
        indicator.innerHTML = `
            <div class="voice-pulse"></div>
            <span>🎤 Voice Active</span>
        `;
        document.body.appendChild(indicator);

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .voice-indicator {
                position: fixed;
                bottom: 100px;
                right: 30px;
                background: var(--bg-card);
                border: 1px solid var(--neon-green);
                border-radius: 10px;
                padding: 10px 15px;
                display: flex;
                align-items: center;
                gap: 10px;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            .voice-indicator.active {
                opacity: 1;
            }
            .voice-pulse {
                width: 10px;
                height: 10px;
                background: var(--neon-green);
                border-radius: 50%;
                animation: pulse 1s infinite;
            }
        `;
        document.head.appendChild(style);
    }

    showVoiceFeedback(message) {
        // Create temporary voice feedback
        const feedback = document.createElement('div');
        feedback.className = 'voice-feedback';
        feedback.textContent = message;
        
        feedback.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--bg-card);
            border: 2px solid var(--neon-blue);
            border-radius: 10px;
            padding: 20px;
            color: var(--neon-blue);
            font-weight: bold;
            z-index: 10000;
            box-shadow: var(--shadow-cyber);
            text-align: center;
            max-width: 300px;
        `;
        
        document.body.appendChild(feedback);
        
        // Remove after delay
        setTimeout(() => {
            feedback.style.opacity = '0';
            setTimeout(() => feedback.remove(), 300);
        }, 3000);
    }

    startListening() {
        if (this.recognition && !this.isListening) {
            this.recognition.start();
            this.isListening = true;
            document.querySelector('.voice-indicator')?.classList.add('active');
        }
    }

    stopListening() {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
            this.isListening = false;
            document.querySelector('.voice-indicator')?.classList.remove('active');
        }
    }
}

// ===== CYBER EFFECTS SYSTEM =====
class CyberEffects {
    constructor() {
        this.init();
    }

    init() {
        this.setupGlitchEffects();
        this.setupHoverEffects();
        this.setupScrollEffects();
        this.setupMatrixRain();
    }

    setupGlitchEffects() {
        // Add glitch effect to specific elements on hover
        const glitchElements = document.querySelectorAll('.text-glitch, .stat-card, .component');
        
        glitchElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.triggerGlitchEffect(element);
            });
        });
    }

    triggerGlitchEffect(element) {
        if (element.classList.contains('glitching')) return;
        
        element.classList.add('glitching');
        
        // Store original position
        const originalTransform = element.style.transform;
        
        // Apply glitch animation
        element.style.transform = 'translateX(2px)';
        setTimeout(() => {
            element.style.transform = 'translateX(-2px)';
            setTimeout(() => {
                element.style.transform = 'translateY(2px)';
                setTimeout(() => {
                    element.style.transform = 'translateY(-2px)';
                    setTimeout(() => {
                        element.style.transform = originalTransform;
                        element.classList.remove('glitching');
                    }, 50);
                }, 50);
            }, 50);
        }, 50);
    }

    setupHoverEffects() {
        // Add cyber hover effects to interactive elements
        const interactiveElements = document.querySelectorAll('.btn, .nav-link, .project-card');
        
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

        // Remove existing ripples
        const existingRipples = button.getElementsByClassName('cyber-ripple');
        while (existingRipples[0]) {
            existingRipples[0].remove();
        }

        button.appendChild(circle);
    }

    setupScrollEffects() {
        // Parallax and reveal animations on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('cyber-reveal');
                    
                    // Stagger animation for child elements
                    const children = entry.target.querySelectorAll('.stagger-animate');
                    children.forEach((child, index) => {
                        child.style.animationDelay = `${index * 0.1}s`;
                    });
                }
            });
        }, observerOptions);

        // Observe sections for reveal animations
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    }

    setupMatrixRain() {
        // Create matrix rain effect in background
        const canvas = document.createElement('canvas');
        canvas.className = 'matrix-rain';
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.1;
        `;
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const chars = '01アイウエオカキクケコサシスセソ';
        const charArray = chars.split('');
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = [];

        // Initialize drops
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }

        function drawMatrix() {
            // Dark background with trail effect
            ctx.fillStyle = 'rgba(10, 10, 15, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0f0';
            ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        // Animate matrix rain
        setInterval(drawMatrix, 33);
    }
}

// ===== PERFORMANCE MONITOR =====
class PerformanceMonitor {
    constructor() {
        this.metrics = {
            fps: 0,
            memory: null,
            loadTime: null
        };
        this.init();
    }

    init() {
        this.setupFPSCounter();
        this.setupMemoryMonitor();
        this.captureLoadTime();
        this.setupPerformanceObserver();
    }

    setupFPSCounter() {
        let frameCount = 0;
        let lastTime = performance.now();
        
        const measureFPS = (currentTime) => {
            frameCount++;
            
            if (currentTime - lastTime >= 1000) {
                this.metrics.fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                frameCount = 0;
                lastTime = currentTime;
                
                // Log FPS if it drops below 50
                if (this.metrics.fps < 50) {
                    console.warn(`Low FPS: ${this.metrics.fps}`);
                }
            }
            
            requestAnimationFrame(measureFPS);
        };
        
        requestAnimationFrame(measureFPS);
    }

    setupMemoryMonitor() {
        if ('memory' in performance) {
            setInterval(() => {
                this.metrics.memory = {
                    used: performance.memory.usedJSHeapSize,
                    total: performance.memory.totalJSHeapSize,
                    limit: performance.memory.jsHeapSizeLimit
                };
            }, 5000);
        }
    }

    captureLoadTime() {
        window.addEventListener('load', () => {
            this.metrics.loadTime = performance.now();
        });
    }

    setupPerformanceObserver() {
        if ('PerformanceObserver' in window) {
            // Observe largest contentful paint
            const lcpObserver = new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('LCP:', lastEntry.startTime);
            });
            
            lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

            // Observe layout shifts
            const clsObserver = new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                console.log('CLS entries:', entries);
            });
            
            clsObserver.observe({ type: 'layout-shift', buffered: true });
        }
    }

    getMetrics() {
        return this.metrics;
    }
}

// ===== MAIN INITIALIZATION =====
let elitePortfolio;
let aiAssistant;
let threeScene;
let voiceSystem;
let cyberEffects;
let performanceMonitor;

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Initialize core systems
        elitePortfolio = new ElitePortfolio();
        aiAssistant = new AIAssistant();
        
        // Initialize advanced features
        threeScene = new ThreeScene();
        voiceSystem = new VoiceCommandSystem();
        cyberEffects = new CyberEffects();
        performanceMonitor = new PerformanceMonitor();

        // Setup global event listeners
        setupGlobalInteractions();
        
        console.log('🎯 Elite Portfolio fully operational');
        
    } catch (error) {
        console.error('Initialization error:', error);
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

    // Button action handlers
    document.querySelectorAll('[data-action]').forEach(button => {
        button.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            handleButtonAction(action, this);
        });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Toggle AI assistant with Ctrl + Space
        if (e.ctrlKey && e.code === 'Space') {
            e.preventDefault();
            aiAssistant.toggle();
        }
        
        // Toggle voice commands with Ctrl + V
        if (e.ctrlKey && e.code === 'KeyV') {
            e.preventDefault();
            if (voiceSystem.isListening) {
                voiceSystem.stopListening();
            } else {
                voiceSystem.startListening();
            }
        }
    });

    // Performance optimization: lazy load images
    if ('IntersectionObserver' in window) {
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

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

function handleButtonAction(action, element) {
    switch (action) {
        case 'deploy':
            // Simulate deployment sequence
            simulateDeploymentSequence();
            break;
            
        case 'briefing':
            // Show mission briefing
            showMissionBriefing();
            break;
            
        case 'extract':
            // Download resume/CV
            downloadIntel();
            break;
            
        default:
            console.log('Unknown action:', action);
    }
}

function simulateDeploymentSequence() {
    const steps = [
        "Initializing deployment protocol...",
        "Authenticating security clearance...",
        "Deploying engagement systems...",
        "Mission parameters set. Ready for operation."
    ];

    steps.forEach((step, index) => {
        setTimeout(() => {
            showCyberNotification(step);
        }, index * 800);
    });
}

function showMissionBriefing() {
    const briefing = `
        MISSION BRIEFING - BYTEMALICE
        
        PRIMARY OBJECTIVES:
        • Achieve Junior Red Team Engineer by age 18
        • Master advanced penetration testing techniques
        • Develop AI-powered security tools
        • Contribute to cybersecurity community
        
        CURRENT OPERATIONS:
        • TryHackMe Red Team Path completion
        • Python security tool development
        • Advanced Linux security research
        • CTF competition participation
        
        STATUS: ACTIVE AND OPERATIONAL
    `;
    
    showCyberNotification(briefing, 5000);
}

function downloadIntel() {
    // In a real implementation, this would trigger a download
    showCyberNotification("Intel extraction initiated. Preparing secure download...");
    
    setTimeout(() => {
        showCyberNotification("Security clearance verified. Intel package ready.");
        // Here you would typically trigger a file download
        // window.open('/path/to/resume.pdf', '_blank');
    }, 2000);
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
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// ===== ERROR BOUNDARY =====
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    showCyberNotification('System anomaly detected. Some features may be limited.');
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    event.preventDefault();
});
