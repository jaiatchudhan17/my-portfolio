// Initialize EmailJS
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your actual EmailJS public key
})();

// DOM Elements
const loadingScreen = document.getElementById('loadingScreen');
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const statusMessage = document.getElementById('statusMessage');
const projectModal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const modalBody = document.getElementById('modalBody');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const skillBars = document.querySelectorAll('.skill-progress');

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.body.style.overflow = 'visible';
        
        // Initialize animations
        initializeAnimations();
        initializeSkillBars();
    }, 1000);
});

// Navigation
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'visible';
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSection = link.getAttribute('data-section');
        
        // Close mobile menu
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'visible';
        
        // Navigate to section
        navigateToSection(targetSection);
        
        // Update active nav link
        updateActiveNavLink(link);
    });
});

// Smooth scrolling for hero buttons
document.querySelectorAll('a[data-section]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSection = link.getAttribute('data-section');
        navigateToSection(targetSection);
    });
});

// Navigation functions
function navigateToSection(sectionId) {
    // Hide all sections
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Scroll to top of section
        targetSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Update URL hash
        history.pushState(null, null, `#${sectionId}`);
    }
}

function updateActiveNavLink(activeLink) {
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Project filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        
        // Update active filter button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter projects
        filterProjects(filter);
    });
});

function filterProjects(filter) {
    projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
            card.classList.remove('hidden');
            card.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
            card.classList.add('hidden');
        }
    });
}

// Project modal
function openProjectModal(projectId) {
    const projectData = getProjectData(projectId);
    if (projectData) {
        modalBody.innerHTML = createProjectModalContent(projectData);
        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeProjectModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = 'visible';
}

modalClose.addEventListener('click', closeProjectModal);
projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        closeProjectModal();
    }
});

// Project data
function getProjectData(projectId) {
    const projects = {
        'drowsiness': {
            title: 'Driver Drowsiness Detection System',
            category: 'AI/ML',
            image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600',
            description: 'An intelligent system that uses computer vision and machine learning to detect driver fatigue and prevent accidents. The system monitors eye movements, head position, and facial expressions to determine drowsiness levels.',
            features: [
                'Real-time eye tracking and blink detection',
                'Head pose estimation',
                'Facial landmark detection',
                'Alert system with audio warnings',
                'Data logging and analytics'
            ],
            technologies: ['Python', 'OpenCV', 'TensorFlow', 'Keras', 'Dlib'],
            challenges: 'Handling different lighting conditions and ensuring real-time performance while maintaining accuracy.',
            outcome: 'Successfully achieved 95% accuracy in drowsiness detection with minimal false positives.'
        },
        'skill-recommendation': {
            title: 'Skill Recommendation System for Job Seekers',
            category: 'AI/ML',
            image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
            description: 'An AI-powered platform that analyzes job market trends and recommends relevant skills to job seekers based on their career goals and current skill set.',
            features: [
                'Job market trend analysis',
                'Personalized skill recommendations',
                'Learning path generation',
                'Progress tracking',
                'Industry insights and reports'
            ],
            technologies: ['Python', 'Scikit-learn', 'NLP', 'Pandas', 'Flask'],
            challenges: 'Processing large datasets of job postings and creating accurate skill matching algorithms.',
            outcome: 'Helped over 1000+ users identify relevant skills with 85% satisfaction rate.'
        },
        'edumate': {
            title: 'EduMate AI',
            category: 'AI/ML',
            image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=600',
            description: 'An intelligent educational assistant that provides personalized learning experiences using generative AI technology.',
            features: [
                'Personalized learning paths',
                'Interactive Q&A system',
                'Content generation',
                'Progress assessment',
                'Multi-language support'
            ],
            technologies: ['GenAI', 'Python', 'Flask', 'Natural Language Processing'],
            challenges: 'Ensuring accurate and relevant educational content generation while maintaining engagement.',
            outcome: 'Improved learning outcomes by 40% for students using the platform.'
        },
        'food-charity': {
            title: 'Food Charity App',
            category: 'UI/UX Design',
            image: 'https://images.pexels.com/photos/6995247/pexels-photo-6995247.jpeg?auto=compress&cs=tinysrgb&w=600',
            description: 'A mobile app design that connects food donors with those in need, featuring an intuitive interface and seamless user experience.',
            features: [
                'User-friendly donation interface',
                'Real-time location tracking',
                'Notification system',
                'Rating and review system',
                'Analytics dashboard'
            ],
            technologies: ['Figma', 'UI/UX Design', 'Prototyping', 'User Research'],
            challenges: 'Creating an interface that works for both donors and recipients with varying tech literacy.',
            outcome: 'Design was praised for its accessibility and ease of use, leading to a 60% increase in user engagement.'
        },
        'shopping-app': {
            title: 'Mobile Shopping App Design',
            category: 'UI/UX Design',
            image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600',
            description: 'Complete e-commerce mobile app design with modern interface, smooth navigation, and enhanced shopping experience.',
            features: [
                'Modern and clean interface',
                'Advanced search and filtering',
                'Wishlist and favorites',
                'Secure checkout process',
                'Order tracking system'
            ],
            technologies: ['Figma', 'Mobile Design', 'E-commerce', 'User Experience'],
            challenges: 'Balancing feature richness with simplicity while ensuring fast navigation.',
            outcome: 'Design increased conversion rates by 35% and reduced cart abandonment by 25%.'
        },
        '2d-game': {
            title: '2D Game Development',
            category: 'Game Development',
            image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=600',
            description: 'Engaging 2D games created using Buildbox 3 with creative gameplay mechanics and visual effects.',
            features: [
                'Intuitive gameplay mechanics',
                'Stunning visual effects',
                'Multiple game levels',
                'Achievement system',
                'Leaderboard integration'
            ],
            technologies: ['Buildbox 3', 'Game Design', '2D Graphics', 'Animation'],
            challenges: 'Creating engaging gameplay while optimizing performance across different devices.',
            outcome: 'Games achieved over 10,000 downloads with 4.5-star average rating.'
        }
    };
    
    return projects[projectId];
}

function createProjectModalContent(project) {
    return `
        <div class="project-modal-header">
            <img src="${project.image}" alt="${project.title}" class="project-modal-image">
            <div class="project-modal-info">
                <span class="project-modal-category">${project.category}</span>
                <h2 class="project-modal-title">${project.title}</h2>
            </div>
        </div>
        <div class="project-modal-content">
            <div class="project-modal-description">
                <h3>About This Project</h3>
                <p>${project.description}</p>
            </div>
            <div class="project-modal-features">
                <h3>Key Features</h3>
                <ul>
                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            <div class="project-modal-tech">
                <h3>Technologies Used</h3>
                <div class="tech-tags">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
            <div class="project-modal-challenges">
                <h3>Challenges & Solutions</h3>
                <p>${project.challenges}</p>
            </div>
            <div class="project-modal-outcome">
                <h3>Outcome & Impact</h3>
                <p>${project.outcome}</p>
            </div>
        </div>
    `;
}

// Contact form
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const formButton = contactForm.querySelector('.form-submit');
    const buttonText = formButton.querySelector('.btn-text');
    
    // Show loading state
    buttonText.textContent = 'Sending...';
    formButton.disabled = true;
    
    try {
        // Prepare template parameters
        const templateParams = {
            from_name: formData.get('name'),
            from_email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            to_email: 'jaiatchuthan@gmail.com'
        };
        
        // Send email using EmailJS
        await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams);
        
        showFormStatus('Message sent successfully! I will get back to you soon.', 'success');
        contactForm.reset();
        
    } catch (error) {
        console.error('Error sending email:', error);
        showFormStatus('Failed to send message. Please try again or contact me directly.', 'error');
    } finally {
        // Reset button state
        buttonText.textContent = 'Send Message';
        formButton.disabled = false;
    }
});

function showFormStatus(message, type) {
    statusMessage.textContent = message;
    statusMessage.className = `status-message ${type}`;
    formStatus.style.display = 'block';
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        formStatus.style.display = 'none';
    }, 5000);
}

// Initialize animations
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections except the first one
    sections.forEach((section, index) => {
        if (index > 0) {
            observer.observe(section);
        }
    });
}

// Initialize skill bars animation
function initializeSkillBars() {
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                skillBar.style.width = width;
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Handle initial page load with hash
window.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        setTimeout(() => {
            navigateToSection(hash);
            const activeLink = document.querySelector(`[data-section="${hash}"]`);
            if (activeLink) {
                updateActiveNavLink(activeLink);
            }
        }, 1200);
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Close modal with Escape key
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
        closeProjectModal();
    }
});

// Smooth scroll for anchor links
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

// Add some interactive effects
document.addEventListener('mousemove', (e) => {
    // Parallax effect for hero section
    const hero = document.querySelector('.hero-section');
    if (hero && window.innerWidth > 768) {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        
        hero.style.background = `linear-gradient(135deg, #f8fafc ${x}%, #e2e8f0 ${100 - y}%)`;
    }
});

// Add scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 70px;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--gradient-primary);
        z-index: var(--z-fixed);
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = `${scrolled}%`;
    });
}

// Initialize scroll progress
createScrollProgress();

// Add CSS for project modal
const modalStyles = `
    .project-modal-header {
        position: relative;
        margin-bottom: var(--spacing-xl);
    }
    
    .project-modal-image {
        width: 100%;
        height: 300px;
        object-fit: cover;
        border-radius: var(--radius-lg);
        margin-bottom: var(--spacing-lg);
    }
    
    .project-modal-category {
        display: inline-block;
        padding: var(--spacing-xs) var(--spacing-md);
        background: rgba(99, 102, 241, 0.1);
        color: var(--primary-color);
        font-size: var(--font-size-xs);
        font-weight: 500;
        border-radius: var(--radius-full);
        margin-bottom: var(--spacing-md);
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    
    .project-modal-title {
        font-size: var(--font-size-2xl);
        font-weight: 700;
        color: var(--text-primary);
        margin-bottom: var(--spacing-lg);
    }
    
    .project-modal-content > div {
        margin-bottom: var(--spacing-xl);
    }
    
    .project-modal-content h3 {
        font-size: var(--font-size-lg);
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: var(--spacing-md);
    }
    
    .project-modal-content p {
        color: var(--text-secondary);
        line-height: 1.7;
    }
    
    .project-modal-content ul {
        list-style: none;
        padding: 0;
    }
    
    .project-modal-content li {
        color: var(--text-secondary);
        margin-bottom: var(--spacing-sm);
        padding-left: var(--spacing-lg);
        position: relative;
    }
    
    .project-modal-content li::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: var(--primary-color);
        font-weight: bold;
    }
    
    .tech-tags {
        display: flex;
        gap: var(--spacing-sm);
        flex-wrap: wrap;
    }
`;

// Add modal styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);

// Make openProjectModal globally available
window.openProjectModal = openProjectModal;