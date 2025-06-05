/**
 * Modern Content Manager - JSON data ile dinamik içerik yönetimi ve tema sistemi
 * Author: İbrahim Atmaca
 */

class ContentManager {
    constructor() {
        this.content = null;
        this.currentTheme = 'dark'; // Default dark theme
        this.init();
    }

    async init() {
        await this.loadContent();
        this.populateContent();
        this.initThemeSystem();
        this.initAnimations();
        this.initMatrixAnimation();
    }

    async loadContent() {
        try {
            const response = await fetch('data/content.json');
            this.content = await response.json();
        } catch (error) {
            console.error('İçerik yüklenirken hata oluştu:', error);
            this.content = this.getFallbackContent();
        }
    }

    populateContent() {
        if (!this.content) return;

        // Site meta bilgileri
        this.updateMetaInfo();
        
        // Navigation
        this.updateNavigation();
        
        // Hero section
        this.updateHeroSection();
        
        // About section
        this.updateAboutSection();
        
        // Experience section
        this.updateExperienceSection();
        
        // Skills section
        this.updateSkillsSection();
        
        // Projects section
        this.updateProjectsSection();
        
        // Contact section
        this.updateContactSection();
        
        // Footer
        this.updateFooter();
    }

    updateMetaInfo() {
        const { site } = this.content;
        document.getElementById('page-title').textContent = site.title;
        document.getElementById('page-keywords').setAttribute('content', site.keywords);
        document.getElementById('page-description').setAttribute('content', site.description);
    }

    updateNavigation() {
        const { navigation } = this.content;
        document.getElementById('nav-brand').textContent = navigation.brand;
        document.getElementById('nav-home').textContent = navigation.home;
        document.getElementById('nav-about').textContent = navigation.about;
        document.getElementById('nav-experience').textContent = navigation.experience;
        document.getElementById('nav-skills').textContent = navigation.skills;
        document.getElementById('nav-projects').textContent = navigation.projects;
        document.getElementById('nav-contact').textContent = navigation.contact;
    }

    updateHeroSection() {
        const { hero } = this.content;
        
        // Update name
        const nameElement = document.querySelector('.name-text');
        if (nameElement) {
            nameElement.textContent = hero.name;
        }
        
        // Update hero titles for text slider
        document.getElementById('hero-titles').textContent = hero.titles.join(',');
        
        // Initialize text slider animation after content is loaded
        this.initTextSlider();
    }

    initTextSlider() {
        // Wait for DOM to be ready and then initialize typed.js
        setTimeout(() => {
            if (typeof Typed !== 'undefined' && $('.text-slider').length === 1) {
                // Destroy existing typed instance if it exists
                if (window.typedInstance) {
                    window.typedInstance.destroy();
                }
                
                var typed_strings = $('.text-slider-items').text();
                if (typed_strings) {
                    window.typedInstance = new Typed('.text-slider', {
                        strings: typed_strings.split(','),
                        typeSpeed: 80,
                        loop: true,
                        backDelay: 1500,
                        backSpeed: 40,
                        fadeOut: true,
                        fadeOutClass: 'typed-fade-out',
                        fadeOutDelay: 500
                    });
                }
            }
        }, 100);
    }

    updateAboutSection() {
        const { about } = this.content;
        
        // Title
        document.getElementById('about-title').textContent = about.title;
        
        // Personal info
        const aboutInfo = document.getElementById('about-info');
        aboutInfo.innerHTML = `
            <div class="mb-3"><strong>Ad:</strong> <span class="text-gradient">${about.personal_info.name}</span></div>
            <div class="mb-3"><strong>Pozisyon:</strong> <span class="text-muted">${about.personal_info.position}</span></div>
            <div class="mb-3"><strong>Şirket:</strong> <span class="text-muted">${about.personal_info.company}</span></div>
            <div class="mb-3"><strong>Email:</strong> <span class="text-muted">${about.personal_info.email}</span></div>
            <div class="mb-3"><strong>Mezuniyet:</strong> <span class="text-muted">${about.personal_info.education}</span></div>
        `;
        
        // Description
        const aboutDescription = document.getElementById('about-description');
        aboutDescription.innerHTML = about.description.map(p => `<p class="mb-3">${p}</p>`).join('');
    }

    updateExperienceSection() {
        const { experience } = this.content;
        
        document.getElementById('experience-title').textContent = experience.title;
        document.getElementById('experience-subtitle').textContent = experience.subtitle;
        
        const timeline = document.getElementById('experience-timeline');
        timeline.innerHTML = experience.items.map((item, index) => `
            <div class="timeline-item-modern animate-on-scroll">
                <div class="timeline-content-modern">
                    <h3 class="text-gradient">${item.position}</h3>
                    <h4 class="mb-2"><strong>${item.company}</strong></h4>
                    <div class="mb-2">
                        <span class="badge bg-gradient me-2">${item.period}</span>
                        <span class="badge bg-gradient me-2">${item.location}</span>
                        <span class="badge bg-gradient">${item.employment_type}</span>
                    </div>
                    <p class="mb-3">${item.description}</p>
                    <ul class="list-unstyled">
                        ${item.achievements.map(achievement => `<li class="mb-2"><i class="fa fa-check text-success me-2"></i>${achievement}</li>`).join('')}
                    </ul>
                </div>
                <div class="timeline-marker-modern"></div>
            </div>
        `).join('');
    }

    updateSkillsSection() {
        const { skills } = this.content;
        
        document.getElementById('skills-title').textContent = skills.title;
        
        // Skills categories - single card
        const skillsCategories = document.getElementById('skills-categories');
        const categories = Object.values(skills.categories);
        
        skillsCategories.innerHTML = `
            <div class="col-12">
                <div class="card-modern animate-on-scroll">
                    ${categories.map((category, index) => `
                        <div class="skills-section ${index < categories.length - 1 ? 'mb-5' : ''}">
                            <h5 class="text-gradient mb-4">
                                ${category.items[0]?.icon ? `<i class="${category.items[0].icon} me-2"></i>` : ''}
                                ${category.title}
                            </h5>
                            <div class="skills-list">
                                ${category.items.map(skill => `
                                    <div class="skill-modern">
                                        <div class="skill-name">
                                            <span>
                                                ${skill.icon ? `<i class="${skill.icon}"></i>` : ''}
                                                ${skill.name}
                                            </span>
                                        </div>
                                        <div class="skill-badges">
                                            ${skill.certification ? '<span class="badge bg-warning">Certified</span>' : ''}
                                            ${skill.endorsements > 0 ? `<span class="badge bg-success">${skill.endorsements}+ endorsements</span>` : ''}
                                            ${!skill.certification && skill.endorsements === 0 ? '<span class="badge bg-primary">Professional</span>' : ''}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        // Services
        const skillsServices = document.getElementById('skills-services');
        skillsServices.innerHTML = skills.services.map(service => `
            <div class="col-lg-4 mb-4">
                <div class="card-modern text-center animate-on-scroll">
                    <div class="mb-4">
                        <div class="d-inline-flex align-items-center justify-content-center bg-gradient rounded-circle" style="width: 80px; height: 80px;">
                            <i class="fa ${service.icon} fa-2x text-white"></i>
                        </div>
                    </div>
                    <h5 class="text-gradient mb-3">${service.title}</h5>
                    <p class="text-muted">${service.description}</p>
                </div>
            </div>
        `).join('');
    }

    updateProjectsSection() {
        const { projects } = this.content;
        
        document.getElementById('projects-title').textContent = projects.title;
        document.getElementById('projects-subtitle').textContent = projects.subtitle;
        
        const projectsContainer = document.getElementById('projects-container');
        projectsContainer.innerHTML = projects.items.map(project => {
            const techBadges = project.technologies.map(tech => {
                return `<span class="badge project-badge">${tech}</span>`;
            }).join('');
            
            const projectContent = `
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}" class="img-fluid">
                    <div class="project-overlay">
                        <i class="fa fa-external-link fa-2x text-white"></i>
                    </div>
                </div>
                <div class="project-content">
                    <h5 class="text-gradient mb-2">${project.title}</h5>
                    <div class="text-muted mb-3">
                        <small>${project.category} • ${project.date}</small>
                    </div>
                    <p class="mb-3">${project.description}</p>
                    <div class="project-badges">${techBadges}</div>
                </div>
            `;
            
            return `
                <div class="col-lg-6 col-md-6 mb-4">
                    <div class="project-card animate-on-scroll">
                        ${project.link ? `<a href="${project.link}" target="_blank" class="text-decoration-none">${projectContent}</a>` : projectContent}
                    </div>
                </div>
            `;
        }).join('');
    }

    updateContactSection() {
        const { contact } = this.content;
        
        document.getElementById('contact-title').textContent = contact.title;
        document.getElementById('contact-info-title').textContent = contact.info_title;
        document.getElementById('contact-description').textContent = contact.description;
        document.getElementById('contact-submit').textContent = contact.form.submit_button;
        
        // Contact details
        const contactDetails = document.getElementById('contact-details');
        contactDetails.innerHTML = contact.details.map(detail => {
            if (detail.link) {
                return `<li class="mb-3"><i class="${detail.icon} me-4"></i><a href="${detail.link}" target="_blank" class="text-decoration-none">${detail.text}</a></li>`;
            }
            return `<li class="mb-3"><i class="${detail.icon} me-4"></i>${detail.text}</li>`;
        }).join('');
        
        // Update social links
        if (contact.social_links) {
            const socialContainer = document.getElementById('social-links');
            if (socialContainer) {
                socialContainer.innerHTML = contact.social_links.map(social => `
                    <a href="${social.link}" target="_blank" class="social-link-modern" title="${social.label}">
                        <i class="${social.icon}"></i>
                    </a>
                `).join('');
            }
        }
    }

    updateFooter() {
        const { footer } = this.content;
        document.getElementById('footer-copyright').innerHTML = `&copy; ${footer.copyright}`;
        document.getElementById('footer-credits').textContent = footer.credits;
    }

    getTechBadgeClass(tech) {
        return 'bg-gradient'; // Tüm teknolojiler için aynı gradient
    }

    initThemeSystem() {
        // Get saved theme or use default
        const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
        this.setTheme(savedTheme, false);
        
        // Theme toggle button event
        const themeToggle = document.getElementById('theme-toggle');
        
        if (themeToggle) {
            themeToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleTheme();
            });
        } else {
            console.error('Theme toggle button not found!');
        }
    }

    setTheme(theme, save = true) {
        this.currentTheme = theme;
        const html = document.documentElement;
        const themeIcon = document.getElementById('theme-icon');
        const themeText = document.getElementById('theme-text');
        
        // Update data-theme attribute
        html.setAttribute('data-theme', theme);
        
        // Update icon and text
        if (themeIcon && themeText) {
            if (theme === 'dark') {
                themeIcon.className = 'fa fa-sun-o';
                themeText.textContent = 'Light';
            } else {
                themeIcon.className = 'fa fa-moon-o';
                themeText.textContent = 'Dark';
            }
        }
        
        // Save to localStorage
        if (save) {
            localStorage.setItem('portfolio-theme', theme);
        }
        
        // Trigger theme change event for any additional components
        window.dispatchEvent(new CustomEvent('themeChange', { detail: { theme } }));
        
        console.log(`Theme switched to: ${theme}`);
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
        
        // Add visual feedback
        const button = document.getElementById('theme-toggle');
        if (button) {
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 150);
        }
    }

    initAnimations() {
        // Intersection Observer for scroll animations
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

        // Observe all elements with animate-on-scroll class
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    initMatrixAnimation() {
        const matrixRain = document.getElementById('matrix-rain');
        if (!matrixRain) return;

        // Mobile Developer Characters (with mobile tech symbols)
        const characters = '01İÖÇŞÜĞABCDEFGHIJKLMNOPQRSTUVWXYZ{}[]()<>+*/=.,:;?!@#$%^&*-_~`|\\';
        
        // Create matrix characters - increased for full page coverage
        for (let i = 0; i < 80; i++) {
            this.createMatrixChar(matrixRain, characters);
        }

        // Listen for theme changes to update matrix colors
        window.addEventListener('themeChange', (e) => {
            this.updateMatrixTheme(e.detail.theme);
        });
    }

    createMatrixChar(container, characters) {
        const char = document.createElement('div');
        char.className = 'matrix-char';
        char.textContent = characters[Math.floor(Math.random() * characters.length)];
        
        // Random position
        char.style.left = Math.random() * 100 + '%';
        char.style.animationDelay = Math.random() * 10 + 's';
        char.style.animationDuration = (Math.random() * 5 + 5) + 's';
        
        container.appendChild(char);
        
        // Remove and recreate after animation
        setTimeout(() => {
            if (char.parentNode) {
                char.parentNode.removeChild(char);
                this.createMatrixChar(container, characters);
            }
        }, (Math.random() * 5 + 5) * 1000);
    }

    updateMatrixTheme(theme) {
        // Update matrix character colors when theme changes
        const matrixChars = document.querySelectorAll('.matrix-char');
        matrixChars.forEach(char => {
            // Force CSS update
            char.style.opacity = '0';
            setTimeout(() => {
                char.style.opacity = theme === 'dark' ? '0.7' : '0.5';
            }, 50);
        });
        
        console.log(`Matrix theme updated to: ${theme}`);
    }

    getFallbackContent() {
        return {
            site: {
                title: "İbrahim Atmaca - Senior Mobile Developer",
                description: "MoneyPay'de çalışan Senior Mobile Developer",
                keywords: "İbrahim Atmaca, Senior Mobile Developer, MoneyPay"
            },
            navigation: {
                brand: "İbrahim Atmaca",
                home: "Ana Sayfa",
                about: "Hakkımda",
                experience: "Deneyim",
                skills: "Yetenekler",
                projects: "Projeler",
                contact: "İletişim"
            }
        };
    }
}

// Initialize content manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContentManager();
}); 