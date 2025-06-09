document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 70;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
        }
    });

    // Intersection Observer for scroll animations
    const sections = document.querySelectorAll('section');
    const skillTags = document.querySelectorAll('.skill-tag');
    const projectCards = document.querySelectorAll('.project-card');
    const timelineItems = document.querySelectorAll('.timeline-item');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Special animations for different elements
                if (entry.target.classList.contains('skills')) {
                    animateSkillTags();
                }
                
                if (entry.target.classList.contains('projects')) {
                    animateProjectCards();
                }
                
                if (entry.target.classList.contains('experience')) {
                    animateTimelineItems();
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections except hero
    sections.forEach(section => {
        if (section.id !== 'home') {
            observer.observe(section);
        }
    });

    // Fallback: Check if sections are in viewport on scroll
    function checkSectionsInViewport() {
        sections.forEach(section => {
            if (section.id !== 'home' && !section.classList.contains('visible')) {
                const rect = section.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                
                if (isVisible) {
                    section.classList.add('visible');
                    
                    // Trigger special animations
                    if (section.classList.contains('skills')) {
                        animateSkillTags();
                    }
                    if (section.classList.contains('projects')) {
                        animateProjectCards();
                    }
                    if (section.classList.contains('experience')) {
                        animateTimelineItems();
                    }
                }
            }
        });
    }

    // Add scroll listener for fallback
    window.addEventListener('scroll', checkSectionsInViewport);
    
    // Check on page load
    setTimeout(checkSectionsInViewport, 100);

    // Animate skill tags with stagger effect
    function animateSkillTags() {
        skillTags.forEach((tag, index) => {
            setTimeout(() => {
                tag.style.opacity = '1';
                tag.style.transform = 'translateY(0) scale(1)';
            }, index * 50);
        });
    }

    // Animate project cards with stagger effect
    function animateProjectCards() {
        projectCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    // Animate timeline items
    function animateTimelineItems() {
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 300);
        });
    }

    // Initialize skill tag animations
    skillTags.forEach(tag => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(20px) scale(0.8)';
        tag.style.transition = 'all 0.3s ease';
    });

    // Initialize project card animations
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
    });

    // Initialize timeline animations
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        if (index % 2 === 0) {
            item.style.transform = 'translateX(50px)';
        } else {
            item.style.transform = 'translateX(-50px)';
        }
        item.style.transition = 'all 0.6s ease';
    });

    // Contact form handling (basic)
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelector('input[type="text"]:nth-of-type(2)').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (name && email && subject && message) {
                // Here you would typically send the form data to a server
                alert('Thank you for your message! I will get back to you soon.');
                this.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const titleText = "Hi, I'm ";
        const nameText = "Awais Akram";
        heroTitle.innerHTML = '';
        
        setTimeout(() => {
            let i = 0;
            const typeWriter = () => {
                if (i < titleText.length) {
                    heroTitle.innerHTML += titleText.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                } else if (i === titleText.length) {
                    // Add the highlighted name
                    heroTitle.innerHTML += '<span class="highlight">' + nameText + '</span>';
                    i++;
                }
            };
            typeWriter();
        }, 800);
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});

// Add CSS for loading state
const style = document.createElement('style');
style.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body:not(.loaded)::after {
        content: 'Loading...';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 1.5rem;
        font-weight: 600;
        z-index: 10000;
        animation: pulse 1.5s ease-in-out infinite;
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 0.6; }
        50% { opacity: 1; }
    }
    
    .loaded::before,
    .loaded::after {
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.5s ease;
    }
`;
document.head.appendChild(style); 