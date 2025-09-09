// Global variables
let particles = [];
let mouse = { x: 0, y: 0 };
let animationId;

// Project data
const projects = [
    {
        title: "Fake Product Identification by QR Code Using Blockchain",
        duration: "Jul 2025 - Present",
        status: "Active",
        description: "Designed blockchain-backed system with unique QR codes for tamper-proof authenticity verification and product traceability.",
        technologies: ["Blockchain", "Ethereum", "Python", "HTML", "CSS", "JavaScript", "QR Code Libraries"],
        achievements: [
            "Blockchain-backed system with unique QR codes for tamper-proof authenticity verification",
            "Implemented decentralized storage and scan interface, reducing counterfeit risk",
            "Developed smart contracts for automated product registration and ownership transfer",
            "Ensured immutable supply chain records from manufacturer to consumer with real-time verification"
        ],
        github: "https://github.com/Saiprakassh",
        category: "blockchain"
    },
    {
        title: "Steganography-Based Secure Data Transmission System",
        duration: "Dec 2024 - May 2025",
        status: "Completed",
        description: "Developed a secure image steganography application using Python, OpenCV, and AES encryption to embed and extract encrypted messages within digital images for covert communication.",
        technologies: ["Python", "OpenCV", "NumPy", "Tkinter", "Cryptography", "AES Encryption"],
        achievements: [
            "Secure image steganography with AES encryption for covert communication",
            "Integrated AES-256 encryption with Fernet cryptography for double-layer security",
            "Designed intuitive GUI interface with Tkinter featuring custom-styled buttons",
            "Drag-and-drop file selection with real-time feedback for seamless user experience"
        ],
        github: "https://github.com/Saiprakassh/Projects/blob/main/Steganography%20based%20secured-%20communication%20.md",
        category: "security"
    },
    {
        title: "HR Analytics Dashboard",
        duration: "June 2025 - Aug 2025",
        status: "Completed",
        description: "Generated client-ready reports using SQL and Python, validated data accuracy, and maintained documentation of KPIs for decision-making.",
        technologies: ["Python", "NumPy", "Plotly", "Matplotlib", "Streamlit", "SQL"],
        achievements: [
            "Interactive HR analytics dashboard to visualize employee attendance and performance metrics",
            "Generated client-ready reports using SQL and Python with validated data accuracy",
            "Maintained documentation of KPIs for data-driven decision-making",
            "Documented dashboard configuration and workflow for easy replication"
        ],
        github: "https://github.com/Saiprakassh",
        category: "analytics"
    },
    {
        title: "Bidirectional Translation System",
        duration: "Jul 2024 - Dec 2024",
        status: "Completed",
        description: "Developed a desktop-based Multilingual Translation Studio using Python and Tkinter, integrating Google Translate API to support real-time translation in 25+ languages for both text and speech.",
        technologies: ["Python", "Tkinter", "Google Translate API"],
        achievements: [
            "Desktop-based Multilingual Translation Studio supporting 25+ languages",
            "Real-time translation for both text and speech input",
            "Support for uploading and processing text, Word documents, and audio files",
            "Enabled saving translated results in both text (.txt) and audio (.mp3) formats"
        ],
        github: "https://github.com/Saiprakassh/Projects",
        category: "application"
    }
];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading screen
    initLoadingScreen();
    
    // Initialize all components
    initNavigation();
    initParticles();
    initScrollAnimations();
    initCounters();
    initSkillBars();
    initProjectFilters();
    initContactForm();
    initMobileMenu();
    initCopyButtons();
    initKeyboardNavigation();
});

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const progressFill = document.getElementById('progress-fill');
    
    // Simulate loading progress
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            
            // Hide loading screen and start animations
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    initTypingAnimation();
                    initializeAnimations();
                }, 500);
            }, 800);
        }
        progressFill.style.width = progress + '%';
    }, 200);
}

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll event for navbar
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Add scrolled class
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }

            // Close mobile menu if open
            closeMobileMenu();
        });
    });

    // Initialize navigation highlighting
    initNavHighlight();
}

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
}

function closeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

// Particles animation
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        createParticles();
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function createParticles() {
        particles = [];
        const numberOfParticles = Math.floor((canvas.width * canvas.height) / 20000);
        
        for (let i = 0; i < numberOfParticles; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.6 + 0.2
            });
        }
    }

    function updateParticles() {
        particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Mouse interaction
            const dx = mouse.x - particle.x;
            const dy = mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.x -= dx * force * 0.01;
                particle.y -= dy * force * 0.01;
            }

            // Wrap around edges
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.y > canvas.height) particle.y = 0;
            if (particle.y < 0) particle.y = canvas.height;
        });
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            ctx.save();
            ctx.globalAlpha = particle.opacity;
            ctx.fillStyle = '#32a0b4';
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });

        // Draw connections
        particles.forEach((particleA, indexA) => {
            particles.slice(indexA + 1).forEach(particleB => {
                const distance = Math.sqrt(
                    Math.pow(particleA.x - particleB.x, 2) + 
                    Math.pow(particleA.y - particleB.y, 2)
                );

                if (distance < 120) {
                    ctx.save();
                    ctx.globalAlpha = (120 - distance) / 120 * 0.4;
                    ctx.strokeStyle = '#32a0b4';
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particleA.x, particleA.y);
                    ctx.lineTo(particleB.x, particleB.y);
                    ctx.stroke();
                    ctx.restore();
                }
            });
        });
    }

    function animate() {
        updateParticles();
        drawParticles();
        animationId = requestAnimationFrame(animate);
    }

    createParticles();
    animate();

    // Mouse interaction
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    canvas.addEventListener('mouseleave', () => {
        mouse.x = -100;
        mouse.y = -100;
    });
}

// Typing animation
function initTypingAnimation() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;
    
    const text = "CHIGULLAPALLY SAI PRAKASH";
    let index = 0;

    function typeText() {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeText, 80 + Math.random() * 40);
        } else {
            // Add completed class for additional effects
            typingElement.classList.add('typing-complete');
        }
    }

    setTimeout(typeText, 1000);
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Navigation highlighting
function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-100px 0px -60% 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));
}

// Counter animations
function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    
    const observerOptions = {
        threshold: 0.7
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const steps = 60;
    const stepValue = target / steps;
    const stepDuration = duration / steps;
    
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
        current += stepValue;
        step++;
        
        if (step >= steps) {
            current = target;
            clearInterval(timer);
        }
        
        element.textContent = Math.floor(current);
    }, stepDuration);
}

// Skill bar animations
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-fill[data-width]');
    
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                
                setTimeout(() => {
                    skillBar.style.width = width + '%';
                }, 300);
                
                observer.unobserve(skillBar);
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => observer.observe(bar));
}

// Project filtering
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Project modal functionality
function openProjectModal(projectIndex) {
    const project = projects[projectIndex];
    const modal = document.getElementById('project-modal');
    
    if (!project || !modal) return;
    
    // Populate modal content
    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-duration').textContent = project.duration;
    document.getElementById('modal-status').textContent = project.status;
    document.getElementById('modal-description').textContent = project.description;
    document.getElementById('modal-github-link').href = project.github;
    
    // Set status class
    const statusElement = document.getElementById('modal-status');
    statusElement.className = 'modal-status';
    if (project.status === 'Active') {
        statusElement.classList.add('status--success');
    } else {
        statusElement.classList.add('status--info');
    }
    
    // Add technologies
    const techContainer = document.getElementById('modal-tech');
    techContainer.innerHTML = '';
    project.technologies.forEach(tech => {
        const techTag = document.createElement('span');
        techTag.className = 'tech-tag';
        techTag.textContent = tech;
        techContainer.appendChild(techTag);
    });
    
    // Add achievements
    const achievementsList = document.getElementById('modal-achievements-list');
    achievementsList.innerHTML = '';
    project.achievements.forEach(achievement => {
        const li = document.createElement('li');
        li.textContent = achievement;
        achievementsList.appendChild(li);
    });
    
    // Show modal
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Focus management
    modal.querySelector('.modal-close').focus();
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    if (!modal) return;
    
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    const submitBtn = contactForm.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    // Form validation
    const inputs = contactForm.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField({ target: input })) {
                isValid = false;
            }
        });
        
        if (!isValid) return;
        
        // Simulate form submission
        btnText.style.display = 'none';
        btnLoader.classList.remove('hidden');
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            btnLoader.classList.add('hidden');
            btnText.textContent = 'Message Sent Successfully!';
            btnText.style.display = 'block';
            submitBtn.style.background = 'var(--color-success)';
            
            // Reset form after delay
            setTimeout(() => {
                contactForm.reset();
                btnText.textContent = 'Send Message';
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }, 2000);
    });
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    let isValid = true;
    
    // Remove existing error
    clearFieldError(e);
    
    // Validation rules
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        isValid = false;
    } else if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            isValid = false;
        }
    }
    
    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('error');
    field.style.borderColor = 'var(--color-error)';
    
    let errorElement = field.parentNode.querySelector('.field-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.style.color = 'var(--color-error)';
        errorElement.style.fontSize = 'var(--font-size-sm)';
        errorElement.style.marginTop = 'var(--space-4)';
        field.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

function clearFieldError(e) {
    const field = e.target;
    field.classList.remove('error');
    field.style.borderColor = '';
    
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// Copy to clipboard functionality
function initCopyButtons() {
    window.copyToClipboard = function(text) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Copied to clipboard!', 'success');
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showNotification('Copied to clipboard!', 'success');
        });
    };
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--color-${type === 'success' ? 'success' : 'primary'});
        color: var(--color-btn-primary-text);
        padding: var(--space-12) var(--space-20);
        border-radius: var(--radius-base);
        font-weight: var(--font-weight-medium);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all var(--duration-fast) var(--ease-standard);
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide notification
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Keyboard navigation
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Close modal on Escape
        if (e.key === 'Escape') {
            const modal = document.getElementById('project-modal');
            if (modal && !modal.classList.contains('hidden')) {
                closeProjectModal();
            }
        }
        
        // Navigate sections with arrow keys (when not in input)
        if (!e.target.matches('input, textarea, select')) {
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                navigateToNextSection();
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                navigateToPreviousSection();
            }
        }
    });
}

function navigateToNextSection() {
    const sections = document.querySelectorAll('section[id]');
    const currentSection = getCurrentSection();
    const currentIndex = Array.from(sections).findIndex(s => s.id === currentSection);
    
    if (currentIndex < sections.length - 1) {
        sections[currentIndex + 1].scrollIntoView({ behavior: 'smooth' });
    }
}

function navigateToPreviousSection() {
    const sections = document.querySelectorAll('section[id]');
    const currentSection = getCurrentSection();
    const currentIndex = Array.from(sections).findIndex(s => s.id === currentSection);
    
    if (currentIndex > 0) {
        sections[currentIndex - 1].scrollIntoView({ behavior: 'smooth' });
    }
}

function getCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 200;
    
    for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].offsetTop <= scrollPosition) {
            return sections[i].id;
        }
    }
    return sections[0].id;
}

// Initialize all animations after loading
function initializeAnimations() {
    // Trigger counter animations when they come into view
    initCounters();
    
    // Add parallax effect to floating shapes
    window.addEventListener('scroll', throttle(handleParallaxScroll, 16));
    
    // Add hover effects to interactive elements
    addInteractiveEffects();
    
    // Initialize smooth transitions
    initSmoothTransitions();
}

// Parallax scrolling effect
function handleParallaxScroll() {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.floating-shapes .shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.3 + (index * 0.1);
        const yPos = -(scrolled * speed);
        shape.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
    });
    
    // Parallax for hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        const heroParallax = scrolled * 0.5;
        heroContent.style.transform = `translateY(${heroParallax}px)`;
    }
}

// Add interactive effects
function addInteractiveEffects() {
    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) rotateX(5deg) rotateY(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Tech tag interactions
    const techTags = document.querySelectorAll('.tech-tag');
    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Smooth transitions
function initSmoothTransitions() {
    // Add smooth loading for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.opacity = '0';
        img.addEventListener('load', function() {
            this.style.transition = 'opacity 0.3s ease';
            this.style.opacity = '1';
        });
    });
}

// Performance optimization utilities
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

function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Resize handler
window.addEventListener('resize', debounce(() => {
    // Reinitialize particles on significant size changes
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}, 250));

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
});

// Accessibility improvements
function initAccessibility() {
    // Add skip link functionality
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only';
    skipLink.style.cssText = `
        position: absolute;
        left: -10000px;
        top: auto;
        width: 1px;
        height: 1px;
        overflow: hidden;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.cssText = `
            position: absolute;
            left: 6px;
            top: 7px;
            width: auto;
            height: auto;
            overflow: visible;
            background: var(--color-primary);
            color: var(--color-btn-primary-text);
            padding: var(--space-8) var(--space-16);
            border-radius: var(--radius-base);
            text-decoration: none;
            z-index: 10000;
        `;
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.cssText = `
            position: absolute;
            left: -10000px;
            top: auto;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add proper focus management
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
}

// Initialize accessibility features
initAccessibility();

// Make functions globally available for onclick handlers
window.openProjectModal = openProjectModal;
window.closeProjectModal = closeProjectModal;

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (perfData.loadEventEnd - perfData.loadEventStart > 3000) {
                console.warn('Page load time is slower than expected');
            }
        }, 0);
    });
}

// Service worker registration (for future PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker registration can be added here for PWA features
        console.log('Service Worker support detected');
    });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website initialized successfully');
});