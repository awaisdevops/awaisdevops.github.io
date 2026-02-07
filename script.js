// ===================================
// CONFIGURATION
// ===================================
const config = {
    terminal: {
        typingSpeed: 80,
        deletingSpeed: 50,
        pauseDuration: 2000,
        commands: [
            'whoami',
            'cat profile.txt',
            'ls -la skills/',
            'docker ps',
            'kubectl get pods',
            'terraform plan'
        ],
        outputs: {
            'whoami': 'Lead DevOps Engineer | Cloud Architect | Platform Engineer',
            'cat profile.txt': '5+ years building cloud-native infrastructure\nSpecializing in AWS, GCP, Kubernetes, Terraform\nPassionate about automation and DevSecOps',
            'ls -la skills/': 'drwxr-xr-x  kubernetes/\ndrwxr-xr-x  terraform/\ndrwxr-xr-x  aws/\ndrwxr-xr-x  docker/\ndrwxr-xr-x  python/',
            'docker ps': 'CONTAINER ID   STATUS    PORTS\nf5a3b2c1       Up 5min   0.0.0.0:80->80\ne2d4a1f6       Up 10min  0.0.0.0:443->443',
            'kubectl get pods': 'NAME                    READY   STATUS\napp-deployment-1        1/1     Running\napp-deployment-2        1/1     Running\napp-deployment-3        1/1     Running',
            'terraform plan': 'Plan: 15 to add, 0 to change, 0 to destroy'
        }
    },
    network: {
        nodeCount: 50,
        maxDistance: 150,
        nodeSpeed: 0.3,
        lineOpacity: 0.15,
        nodeSize: 2
    },
    skills: {
        items: [
            { name: 'AWS', category: 'cloud', proficiency: 95, years: 5, color: '#FF9900' },
            { name: 'GCP', category: 'cloud', proficiency: 85, years: 3, color: '#4285F4' },
            { name: 'Azure', category: 'cloud', proficiency: 75, years: 2, color: '#0078D4' },
            { name: 'Kubernetes', category: 'container', proficiency: 93, years: 4, color: '#326CE5' },
            { name: 'Docker', category: 'container', proficiency: 95, years: 5, color: '#2496ED' },
            { name: 'Terraform', category: 'devops', proficiency: 95, years: 5, color: '#7B42BC' },
            { name: 'Ansible', category: 'devops', proficiency: 90, years: 4, color: '#EE0000' },
            { name: 'Jenkins', category: 'devops', proficiency: 92, years: 5, color: '#D24939' },
            { name: 'GitLab CI', category: 'devops', proficiency: 88, years: 4, color: '#FC6D26' },
            { name: 'Prometheus', category: 'monitoring', proficiency: 92, years: 4, color: '#E6522C' },
            { name: 'Grafana', category: 'monitoring', proficiency: 90, years: 4, color: '#F46800' },
            { name: 'Python', category: 'devops', proficiency: 90, years: 5, color: '#3776AB' },
            { name: 'Bash', category: 'devops', proficiency: 92, years: 5, color: '#4EAA25' },
            { name: 'EKS', category: 'container', proficiency: 90, years: 4, color: '#FF9900' },
            { name: 'Helm', category: 'container', proficiency: 85, years: 3, color: '#0F1689' },
            { name: 'Airflow', category: 'devops', proficiency: 82, years: 2, color: '#017CEE' },
            { name: 'Vault', category: 'security', proficiency: 88, years: 3, color: '#000000' }
        ]
    }
};

// ===================================
// UTILITY FUNCTIONS
// ===================================
const utils = {
    sleep: (ms) => new Promise(resolve => setTimeout(resolve, ms)),
    
    randomRange: (min, max) => Math.random() * (max - min) + min,
    
    distance: (x1, y1, x2, y2) => {
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    },
    
    lerp: (start, end, t) => {
        return start + (end - start) * t;
    },
    
    easeOutQuad: (t) => {
        return t * (2 - t);
    }
};

// ===================================
// TERMINAL TYPING ANIMATION
// ===================================
class TerminalAnimator {
    constructor() {
        this.commandElement = document.getElementById('typedCommand');
        this.outputElement = document.getElementById('terminalOutput');
        this.cursor = document.querySelector('.cursor');
        this.currentCommandIndex = 0;
        this.isTyping = false;
    }

    async start() {
        await utils.sleep(1000);
        this.loop();
    }

    async loop() {
        while (true) {
            const command = config.terminal.commands[this.currentCommandIndex];
            
            // Type command
            await this.typeText(command);
            await utils.sleep(500);
            
            // Show output
            await this.showOutput(command);
            await utils.sleep(config.terminal.pauseDuration);
            
            // Clear for next command
            await this.clearTerminal();
            
            this.currentCommandIndex = (this.currentCommandIndex + 1) % config.terminal.commands.length;
        }
    }

    async typeText(text) {
        this.isTyping = true;
        for (let i = 0; i <= text.length; i++) {
            this.commandElement.textContent = text.substring(0, i);
            await utils.sleep(config.terminal.typingSpeed);
        }
        this.isTyping = false;
    }

    async showOutput(command) {
        const output = config.terminal.outputs[command];
        if (output) {
            const lines = output.split('\n');
            this.outputElement.innerHTML = '';
            
            for (const line of lines) {
                const lineElement = document.createElement('div');
                lineElement.textContent = line;
                lineElement.style.color = '#8B949E';
                this.outputElement.appendChild(lineElement);
                await utils.sleep(100);
            }
        }
    }

    async clearTerminal() {
        await utils.sleep(500);
        // Delete command
        const currentText = this.commandElement.textContent;
        for (let i = currentText.length; i >= 0; i--) {
            this.commandElement.textContent = currentText.substring(0, i);
            await utils.sleep(config.terminal.deletingSpeed);
        }
        this.outputElement.innerHTML = '';
    }
}

// ===================================
// NETWORK BACKGROUND ANIMATION
// ===================================
class NetworkBackground {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.nodes = [];
        this.mouse = { x: null, y: null };
        this.init();
    }

    init() {
        this.resize();
        this.createNodes();
        window.addEventListener('resize', () => this.resize());
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });
        this.animate();
    }

    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    createNodes() {
        this.nodes = [];
        for (let i = 0; i < config.network.nodeCount; i++) {
            this.nodes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * config.network.nodeSpeed,
                vy: (Math.random() - 0.5) * config.network.nodeSpeed,
                radius: config.network.nodeSize
            });
        }
    }

    updateNodes() {
        this.nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;

            // Bounce off edges
            if (node.x < 0 || node.x > this.canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > this.canvas.height) node.vy *= -1;

            // Mouse interaction
            if (this.mouse.x && this.mouse.y) {
                const dx = this.mouse.x - node.x;
                const dy = this.mouse.y - node.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 100) {
                    const force = (100 - dist) / 100;
                    node.x -= dx * force * 0.01;
                    node.y -= dy * force * 0.01;
                }
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw connections
        this.ctx.strokeStyle = 'rgba(0, 217, 255, ' + config.network.lineOpacity + ')';
        this.ctx.lineWidth = 0.5;

        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const dist = utils.distance(
                    this.nodes[i].x, this.nodes[i].y,
                    this.nodes[j].x, this.nodes[j].y
                );

                if (dist < config.network.maxDistance) {
                    const opacity = (1 - dist / config.network.maxDistance) * config.network.lineOpacity;
                    this.ctx.strokeStyle = `rgba(0, 217, 255, ${opacity})`;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.nodes[i].x, this.nodes[i].y);
                    this.ctx.lineTo(this.nodes[j].x, this.nodes[j].y);
                    this.ctx.stroke();
                }
            }
        }

        // Draw nodes
        this.nodes.forEach(node => {
            this.ctx.fillStyle = '#00D9FF';
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    animate() {
        this.updateNodes();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// ===================================
// INTERACTIVE SKILLS CLOUD
// ===================================
class SkillsCloud {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.skills = [];
        this.mouse = { x: null, y: null };
        this.hoveredSkill = null;
        this.currentFilter = 'all';
        this.tooltip = document.getElementById('skillTooltip');
        this.init();
    }

    init() {
        this.resize();
        this.createSkills();
        this.setupEventListeners();
        this.animate();
    }

    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    createSkills() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        this.skills = config.skills.items.map((skill, index) => {
            const angle = (Math.PI * 2 * index) / config.skills.items.length;
            const radius = Math.min(this.canvas.width, this.canvas.height) * 0.3;
            
            return {
                ...skill,
                x: centerX + Math.cos(angle) * radius,
                y: centerY + Math.sin(angle) * radius,
                targetX: centerX + Math.cos(angle) * radius,
                targetY: centerY + Math.sin(angle) * radius,
                vx: 0,
                vy: 0,
                radius: 30 + skill.proficiency / 10,
                angle: angle,
                orbitRadius: radius,
                visible: true
            };
        });
    }

    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.resize();
            this.createSkills();
        });

        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
            this.checkHover();
        });

        this.canvas.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
            this.hoveredSkill = null;
            if (this.tooltip) {
                this.tooltip.classList.remove('active');
            }
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.category;
                this.filterSkills();
            });
        });
    }

    filterSkills() {
        this.skills.forEach(skill => {
            skill.visible = this.currentFilter === 'all' || skill.category === this.currentFilter;
        });
    }

    checkHover() {
        this.hoveredSkill = null;
        
        for (const skill of this.skills) {
            if (!skill.visible) continue;
            
            const dist = utils.distance(this.mouse.x, this.mouse.y, skill.x, skill.y);
            if (dist < skill.radius) {
                this.hoveredSkill = skill;
                this.showTooltip(skill);
                return;
            }
        }
        
        if (this.tooltip) {
            this.tooltip.classList.remove('active');
        }
    }

    showTooltip(skill) {
        if (!this.tooltip) return;
        
        this.tooltip.innerHTML = `
            <div style="font-weight: 600; margin-bottom: 4px; color: ${skill.color}">${skill.name}</div>
            <div style="font-size: 0.85rem; color: #8B949E;">
                Proficiency: ${skill.proficiency}%<br>
                Experience: ${skill.years} years
            </div>
        `;
        
        this.tooltip.style.left = (this.mouse.x + 20) + 'px';
        this.tooltip.style.top = (this.mouse.y + 20) + 'px';
        this.tooltip.classList.add('active');
    }

    updateSkills() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;

        this.skills.forEach((skill, index) => {
            // Orbital movement
            skill.angle += 0.001;
            skill.targetX = centerX + Math.cos(skill.angle) * skill.orbitRadius;
            skill.targetY = centerY + Math.sin(skill.angle) * skill.orbitRadius;

            // Mouse repulsion
            if (this.mouse.x && this.mouse.y) {
                const dx = skill.x - this.mouse.x;
                const dy = skill.y - this.mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 150) {
                    const force = (150 - dist) / 150;
                    skill.targetX += dx * force * 0.5;
                    skill.targetY += dy * force * 0.5;
                }
            }

            // Smooth movement
            skill.vx += (skill.targetX - skill.x) * 0.02;
            skill.vy += (skill.targetY - skill.y) * 0.02;
            skill.vx *= 0.9;
            skill.vy *= 0.9;
            skill.x += skill.vx;
            skill.y += skill.vy;
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw connections between related skills
        this.skills.forEach((skill1, i) => {
            if (!skill1.visible) return;
            
            this.skills.forEach((skill2, j) => {
                if (i >= j || !skill2.visible) return;
                if (skill1.category !== skill2.category) return;
                
                const dist = utils.distance(skill1.x, skill1.y, skill2.x, skill2.y);
                if (dist < 200) {
                    const opacity = (1 - dist / 200) * 0.15;
                    this.ctx.strokeStyle = `rgba(0, 217, 255, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(skill1.x, skill1.y);
                    this.ctx.lineTo(skill2.x, skill2.y);
                    this.ctx.stroke();
                }
            });
        });

        // Draw skills
        this.skills.forEach(skill => {
            if (!skill.visible) return;

            const isHovered = this.hoveredSkill === skill;
            const radius = isHovered ? skill.radius * 1.2 : skill.radius;

            // Glow effect for hovered skill
            if (isHovered) {
                this.ctx.shadowBlur = 20;
                this.ctx.shadowColor = skill.color;
            }

            // Outer circle
            this.ctx.fillStyle = skill.color + '40';
            this.ctx.beginPath();
            this.ctx.arc(skill.x, skill.y, radius, 0, Math.PI * 2);
            this.ctx.fill();

            // Inner circle
            this.ctx.fillStyle = skill.color;
            this.ctx.beginPath();
            this.ctx.arc(skill.x, skill.y, radius * 0.6, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.shadowBlur = 0;

            // Text
            this.ctx.fillStyle = '#E6EDF3';
            this.ctx.font = `bold ${isHovered ? '14px' : '12px'} ${getComputedStyle(document.documentElement).getPropertyValue('--font-primary')}`;
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(skill.name, skill.x, skill.y + radius + 20);
        });
    }

    animate() {
        this.updateSkills();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// ===================================
// SCROLL PROGRESS INDICATOR
// ===================================
class ScrollProgress {
    constructor() {
        this.progressBar = document.getElementById('scrollProgress');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.update());
    }

    update() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        this.progressBar.style.width = scrolled + '%';
    }
}

// ===================================
// METRICS COUNTER ANIMATION
// ===================================
class MetricsCounter {
    constructor() {
        this.counters = document.querySelectorAll('.metric-value');
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

        this.counters.forEach(counter => observer.observe(counter));
    }

    animateCounters() {
        this.counters.forEach(counter => {
            const target = parseFloat(counter.dataset.target);
            const duration = 2000;
            const startTime = Date.now();
            const isDecimal = target % 1 !== 0;

            const updateCounter = () => {
                const now = Date.now();
                const progress = Math.min((now - startTime) / duration, 1);
                const eased = utils.easeOutQuad(progress);
                const current = eased * target;
                
                counter.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = isDecimal ? target.toFixed(1) : target;
                }
            };

            updateCounter();
        });
    }
}

// ===================================
// MOBILE MENU
// ===================================
class MobileMenu {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.init();
    }

    init() {
        if (!this.hamburger || !this.navMenu) return;

        this.hamburger.addEventListener('click', () => {
            this.hamburger.classList.toggle('active');
            this.navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                this.hamburger.classList.remove('active');
                this.navMenu.classList.remove('active');
            });
        });
    }
}

// ===================================
// THEME TOGGLE
// ===================================
class ThemeToggle {
    constructor() {
        this.toggleBtn = document.getElementById('themeToggle');
        this.init();
    }

    init() {
        if (!this.toggleBtn) return;

        this.toggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            document.body.classList.toggle('dark-mode');
            
            const icon = this.toggleBtn.querySelector('i');
            if (document.body.classList.contains('light-mode')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });
    }
}

// ===================================
// SMOOTH SCROLL
// ===================================
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const offset = 80;
                    const targetPosition = target.offsetTop - offset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ===================================
// PROJECT CARD ANIMATIONS
// ===================================
class ProjectAnimations {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('.deploy-btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                const progress = btn.querySelector('.deploy-progress');
                if (progress) {
                    progress.style.width = '100%';
                }
            });

            btn.addEventListener('mouseleave', () => {
                const progress = btn.querySelector('.deploy-progress');
                if (progress) {
                    setTimeout(() => {
                        progress.style.width = '0';
                    }, 300);
                }
            });
        });
    }
}

// ===================================
// INITIALIZE EVERYTHING
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize terminal animation
    const terminal = new TerminalAnimator();
    terminal.start();

    // Initialize network background
    const network = new NetworkBackground('networkCanvas');

    // Initialize skills cloud
    const skillsCloud = new SkillsCloud('skillsCanvas');

    // Initialize scroll progress
    const scrollProgress = new ScrollProgress();

    // Initialize metrics counter
    const metricsCounter = new MetricsCounter();

    // Initialize mobile menu
    const mobileMenu = new MobileMenu();

    // Initialize theme toggle
    const themeToggle = new ThemeToggle();

    // Initialize smooth scroll
    const smoothScroll = new SmoothScroll();

    // Initialize project animations
    const projectAnimations = new ProjectAnimations();

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 22, 40, 0.95)';
        } else {
            navbar.style.background = 'rgba(10, 22, 40, 0.9)';
        }
    });

    // Add fade-in animation to sections on scroll
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('section:not(#home)').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        sectionObserver.observe(section);
    });

    console.log('%c🚀 Portfolio Loaded Successfully!', 'color: #00D9FF; font-size: 20px; font-weight: bold;');
    console.log('%cBuilt with: Vanilla JS, Canvas API, and ❤️', 'color: #8B949E; font-size: 12px;');
});
