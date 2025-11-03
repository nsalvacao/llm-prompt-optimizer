/**
 * LLM Prompt Optimizer - Landing Page JavaScript
 * Modern, interactive UI components
 */

// ============================================
// NAVBAR FUNCTIONALITY
// ============================================
class Navbar {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navToggle = document.getElementById('navToggle');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');

        this.init();
    }

    init() {
        // Scroll effect
        window.addEventListener('scroll', () => this.handleScroll());

        // Mobile menu toggle
        this.navToggle.addEventListener('click', () => this.toggleMenu());

        // Close menu when clicking links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navbar.contains(e.target)) {
                this.closeMenu();
            }
        });

        // Active link on scroll
        this.initScrollSpy();
    }

    handleScroll() {
        if (window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }

    toggleMenu() {
        this.navMenu.classList.toggle('active');
        this.animateToggle();
    }

    closeMenu() {
        this.navMenu.classList.remove('active');
    }

    animateToggle() {
        const spans = this.navToggle.querySelectorAll('span');
        if (this.navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(7px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-7px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }

    initScrollSpy() {
        const sections = document.querySelectorAll('section[id]');

        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;

            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 100;
                const sectionId = section.getAttribute('id');
                const link = document.querySelector(`.nav-link[href="#${sectionId}"]`);

                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    this.navLinks.forEach(l => l.classList.remove('active'));
                    if (link) link.classList.add('active');
                }
            });
        });
    }
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, this.observerOptions);

        // Observe all animated elements
        const animatedElements = document.querySelectorAll(
            '.feature-card, .skill-category, .tech-category, .cta-content'
        );

        animatedElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(el);
        });
    }
}

// ============================================
// SMOOTH SCROLL
// ============================================
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');

                // Skip if it's just "#"
                if (href === '#') return;

                e.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    const offsetTop = target.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ============================================
// STATS COUNTER ANIMATION
// ============================================
class StatsCounter {
    constructor() {
        this.stats = document.querySelectorAll('.stat-number');
        this.animated = false;
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated) {
                    this.animateCounters();
                    this.animated = true;
                }
            });
        }, { threshold: 0.5 });

        const statsSection = document.querySelector('.hero-stats');
        if (statsSection) {
            observer.observe(statsSection);
        }
    }

    animateCounters() {
        this.stats.forEach(stat => {
            const target = stat.textContent;
            const isNumber = !isNaN(target);

            if (isNumber) {
                const targetNum = parseInt(target);
                const duration = 2000;
                const increment = targetNum / (duration / 16);
                let current = 0;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= targetNum) {
                        stat.textContent = targetNum;
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(current);
                    }
                }, 16);
            }
        });
    }
}

// ============================================
// CODE WINDOW TYPEWRITER EFFECT
// ============================================
class TypewriterEffect {
    constructor() {
        this.codeElement = document.querySelector('.window-content code');
        this.delay = false; // Set to true to enable typewriter effect

        if (this.delay && this.codeElement) {
            this.init();
        }
    }

    init() {
        const originalText = this.codeElement.innerHTML;
        this.codeElement.innerHTML = '';
        this.codeElement.style.opacity = '1';

        let index = 0;
        const speed = 10;

        const type = () => {
            if (index < originalText.length) {
                this.codeElement.innerHTML += originalText.charAt(index);
                index++;
                setTimeout(type, speed);
            }
        };

        // Start typing after hero is visible
        setTimeout(type, 500);
    }
}

// ============================================
// PARTICLE BACKGROUND (Optional Enhancement)
// ============================================
class ParticleBackground {
    constructor() {
        this.enabled = false; // Set to true to enable particles

        if (this.enabled) {
            this.init();
        }
    }

    init() {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '-2';
        canvas.style.opacity = '0.3';
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 50;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 2;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw() {
                ctx.fillStyle = 'rgba(99, 102, 241, 0.5)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            requestAnimationFrame(animate);
        };

        animate();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
}

// ============================================
// PERFORMANCE MONITORING
// ============================================
class PerformanceMonitor {
    constructor() {
        this.enabled = false; // Set to true for debugging

        if (this.enabled) {
            this.init();
        }
    }

    init() {
        window.addEventListener('load', () => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;

            console.log(`Page Load Time: ${pageLoadTime}ms`);
            console.log(`DOM Ready: ${perfData.domContentLoadedEventEnd - perfData.navigationStart}ms`);
        });
    }
}

// ============================================
// INITIALIZE ALL COMPONENTS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Core functionality
    new Navbar();
    new SmoothScroll();
    new ScrollAnimations();
    new StatsCounter();

    // Optional enhancements
    new TypewriterEffect();
    new ParticleBackground();
    new PerformanceMonitor();

    // Add loading state removal
    document.body.classList.add('loaded');

    // Console easter egg
    console.log('%c🚀 LLM Prompt Optimizer', 'font-size: 20px; font-weight: bold; background: linear-gradient(135deg, #6366f1, #a855f7); color: white; padding: 10px 20px; border-radius: 8px;');
    console.log('%cBuilt with React 19, TypeScript, and AI ✨', 'font-size: 14px; color: #6366f1;');
    console.log('%cView source: https://github.com/nsalvacao/llm-prompt-optimizer', 'font-size: 12px; color: #94a3b8;');
});

// ============================================
// EXTERNAL LINK TRACKING (Optional)
// ============================================
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.href;
        console.log(`External link clicked: ${href}`);
        // Add analytics tracking here if needed
    });
});

// ============================================
// KEYBOARD SHORTCUTS
// ============================================
document.addEventListener('keydown', (e) => {
    // Press 'G' to go to GitHub
    if (e.key === 'g' || e.key === 'G') {
        if (!e.target.matches('input, textarea')) {
            window.open('https://github.com/nsalvacao/llm-prompt-optimizer', '_blank');
        }
    }

    // Press 'R' to view README
    if (e.key === 'r' || e.key === 'R') {
        if (!e.target.matches('input, textarea')) {
            window.open('https://github.com/nsalvacao/llm-prompt-optimizer#readme', '_blank');
        }
    }
});
