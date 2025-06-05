/**
 * Modern Content Manager - JSON data ile dinamik içerik yönetimi, tema sistemi ve dil desteği
 * Author: İbrahim Atmaca
 */

class ContentManager {
    constructor() {
        this.content = null;
        this.currentTheme = 'dark'; // Default dark theme
        this.currentLanguage = this.detectBrowserLanguage(); // Detect browser language
        this.init();
    }

    async init() {
        await this.loadContent();
        this.setLanguage(this.getStoredLanguage());
        this.populateContent();
        this.initThemeSystem();
        this.initLanguageSystem();
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

    detectBrowserLanguage() {
        // Get browser language
        const browserLang = navigator.language || navigator.userLanguage;
        
        // Check if browser language starts with 'tr' (Turkish)
        if (browserLang.toLowerCase().startsWith('tr')) {
            return 'tr';
        }
        
        // Default to English for other languages
        return 'en';
    }

    getStoredLanguage() {
        // Return stored language if exists, otherwise return detected browser language
        return localStorage.getItem('preferred-language') || this.detectBrowserLanguage();
    }

    setLanguage(language) {
        this.currentLanguage = language;
        localStorage.setItem('preferred-language', language);
        document.documentElement.lang = language;
        
        // Update HTML meta language
        const langMeta = document.querySelector('meta[name="language"]');
        if (langMeta) {
            langMeta.setAttribute('content', language === 'tr' ? 'Turkish' : 'English');
        }
        
        // Update dropdown display
        this.updateLanguageDropdown();
    }

    getCurrentContent() {
        if (!this.content || !this.content.languages) {
            return this.content; // Fallback to old structure
        }
        return this.content.languages[this.currentLanguage] || this.content.languages[this.content.defaultLanguage] || this.content.languages['tr'];
    }

    initLanguageSystem() {
        // Initialize dropdown menu events
        const dropdownItems = document.querySelectorAll('[data-language]');
        
        dropdownItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const selectedLanguage = e.target.getAttribute('data-language');
                
                this.setLanguage(selectedLanguage);
                this.populateContent();
            });
        });
        
        // Initialize dropdown display
        this.updateLanguageDropdown();
    }

    updateLanguageDropdown() {
        const currentLanguageSpan = document.getElementById('current-language');
        const trCheck = document.querySelector('#lang-tr .language-check');
        const enCheck = document.querySelector('#lang-en .language-check');
        
        if (currentLanguageSpan) {
            currentLanguageSpan.textContent = this.currentLanguage === 'tr' ? 'Türkçe' : 'English';
        }
        
        // Update check marks
        if (trCheck && enCheck) {
            if (this.currentLanguage === 'tr') {
                trCheck.style.visibility = 'visible';
                enCheck.style.visibility = 'hidden';
            } else {
                trCheck.style.visibility = 'hidden';
                enCheck.style.visibility = 'visible';
            }
        }
    }

    toggleLanguage() {
        // This method is now replaced by dropdown, but keeping for backward compatibility
        const newLanguage = this.currentLanguage === 'tr' ? 'en' : 'tr';
        this.setLanguage(newLanguage);
        this.populateContent();
    }

    populateContent() {
        const content = this.getCurrentContent();
        if (!content) return;

        // Site meta bilgileri
        this.updateMetaInfo(content);
        
        // Navigation
        this.updateNavigation(content);
        
        // Hero section
        this.updateHeroSection(content);
        
        // About section
        this.updateAboutSection(content);
        
        // Experience section
        this.updateExperienceSection(content);
        
        // Skills section
        this.updateSkillsSection(content);
        
        // Projects section
        this.updateProjectsSection(content);
        
        // Contact section
        this.updateContactSection(content);
        
        // Footer
        this.updateFooter(content);
    }

    updateMetaInfo(content) {
        const { site } = content;
        const titleElement = document.getElementById('page-title');
        const keywordsElement = document.getElementById('page-keywords');
        const descriptionElement = document.getElementById('page-description');
        
        if (titleElement) titleElement.textContent = site.title;
        if (keywordsElement) keywordsElement.setAttribute('content', site.keywords);
        if (descriptionElement) descriptionElement.setAttribute('content', site.description);
    }

    updateNavigation(content) {
        const { navigation } = content;
        const elements = {
            'nav-brand': navigation.brand,
            'nav-home': navigation.home,
            'nav-about': navigation.about,
            'nav-experience': navigation.experience,
            'nav-skills': navigation.skills,
            'nav-projects': navigation.projects,
            'nav-contact': navigation.contact
        };
        
        Object.entries(elements).forEach(([id, text]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = text;
        });
    }

    updateHeroSection(content) {
        const { hero } = content;
        
        // Update name
        const nameElement = document.querySelector('.name-text');
        if (nameElement) {
            nameElement.textContent = hero.name;
        }
        
        // Update hero titles for text slider
        const heroTitlesElement = document.getElementById('hero-titles');
        if (heroTitlesElement) {
            heroTitlesElement.textContent = hero.titles.join(',');
        }
        
        // Update hero intro text
        const heroIntroElement = document.getElementById('hero-intro');
        if (heroIntroElement && hero.intro) {
            heroIntroElement.innerHTML = `<p>${hero.intro}</p>`;
        }
        
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
                        typeSpeed: 60,
                        loop: false,
                        backDelay: 2000,
                        backSpeed: 0,
                        showCursor: true,
                        cursorChar: '|',
                        autoInsertCss: true,
                        onComplete: function(self) {
                            // Hide cursor when typing is complete
                            setTimeout(() => {
                                const cursor = document.querySelector('.typed-cursor');
                                if (cursor) cursor.style.display = 'none';
                            }, 1000);
                        }
                    });
                }
            }
        }, 100);
    }

    updateAboutSection(content) {
        const { about } = content;
        
        // Title
        const titleElement = document.getElementById('about-title');
        if (titleElement) titleElement.textContent = about.title;
        
        // Get localized labels
        const isEnglish = this.currentLanguage === 'en';
        const labels = {
            name: isEnglish ? 'Name:' : 'Ad:',
            position: isEnglish ? 'Position:' : 'Pozisyon:',
            company: isEnglish ? 'Company:' : 'Şirket:',
            email: isEnglish ? 'Email:' : 'Email:',
            education: isEnglish ? 'Education:' : 'Mezuniyet:'
        };
        
        // Personal info
        const aboutInfo = document.getElementById('about-info');
        if (aboutInfo) {
            aboutInfo.innerHTML = `
                <div class="mb-3"><strong>${labels.name}</strong> <span class="text-gradient">${about.personal_info.name}</span></div>
                <div class="mb-3"><strong>${labels.position}</strong> <span class="text-muted">${about.personal_info.position}</span></div>
                <div class="mb-3"><strong>${labels.company}</strong> <span class="text-muted">${about.personal_info.company}</span></div>
                <div class="mb-3"><strong>${labels.email}</strong> <span class="text-muted">${about.personal_info.email}</span></div>
                <div class="mb-3"><strong>${labels.education}</strong> <span class="text-muted">${about.personal_info.education}</span></div>
            `;
        }
        
        // Description
        const aboutDescription = document.getElementById('about-description');
        if (aboutDescription) {
            aboutDescription.innerHTML = about.description.map(p => `<p class="mb-3">${p}</p>`).join('');
        }
    }

    updateExperienceSection(content) {
        const { experience } = content;
        
        const titleElement = document.getElementById('experience-title');
        const subtitleElement = document.getElementById('experience-subtitle');
        const timelineElement = document.getElementById('experience-timeline');
        
        if (titleElement) titleElement.textContent = experience.title;
        if (subtitleElement) subtitleElement.textContent = experience.subtitle;
        
        if (timelineElement) {
            timelineElement.innerHTML = experience.items.map((item, index) => `
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
    }

    updateSkillsSection(content) {
        const { skills } = content;
        
        const titleElement = document.getElementById('skills-title');
        if (titleElement) titleElement.textContent = skills.title;
        
        // Skills categories - single card
        const skillsCategories = document.getElementById('skills-categories');
        if (skillsCategories) {
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
        }
        
        // Services
        const skillsServices = document.getElementById('skills-services');
        if (skillsServices && skills.services) {
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
    }

    updateProjectsSection(content) {
        const { projects } = content;
        
        const titleElement = document.getElementById('projects-title');
        const subtitleElement = document.getElementById('projects-subtitle');
        const projectsContainer = document.getElementById('projects-container');
        
        if (titleElement) titleElement.textContent = projects.title;
        if (subtitleElement) subtitleElement.textContent = projects.subtitle;
        
        if (projectsContainer) {
            // Check if new category structure exists
            if (projects.categories) {
                const categories = Object.entries(projects.categories);
                
                projectsContainer.innerHTML = categories.map(([categoryKey, category]) => {
                    const projectCards = category.items.map(project => {
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
                                    ${project.link && project.link !== '#' ? `<a href="${project.link}" target="_blank" class="text-decoration-none">${projectContent}</a>` : projectContent}
                                </div>
                            </div>
                        `;
                    }).join('');
                    
                    return `
                        <div class="col-12 mb-5">
                            <div class="project-category-section">
                                <h4 class="text-gradient mb-4 d-flex align-items-center">
                                    <i class="${category.icon} me-3"></i>
                                    ${category.title}
                                </h4>
                                <div class="row">
                                    ${projectCards}
                                </div>
                            </div>
                        </div>
                    `;
                }).join('');
            } else {
                // Fallback to old structure for backward compatibility
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
        }
    }

    updateContactSection(content) {
        const { contact } = content;
        
        const titleElement = document.getElementById('contact-title');
        const infoTitleElement = document.getElementById('contact-info-title');
        const descriptionElement = document.getElementById('contact-description');
        const submitElement = document.getElementById('contact-submit');
        
        if (titleElement) titleElement.textContent = contact.title;
        if (infoTitleElement) infoTitleElement.textContent = contact.info_title;
        if (descriptionElement) descriptionElement.textContent = contact.description;
        if (submitElement) submitElement.textContent = contact.form.submit_button;
        
        // Contact details
        const contactDetails = document.getElementById('contact-details');
        if (contactDetails) {
            contactDetails.innerHTML = contact.details.map(detail => {
                if (detail.link) {
                    return `<li class="mb-3"><i class="${detail.icon} me-4"></i><a href="${detail.link}" target="_blank" class="text-decoration-none">${detail.text}</a></li>`;
                }
                return `<li class="mb-3"><i class="${detail.icon} me-4"></i>${detail.text}</li>`;
            }).join('');
        }
        
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
        
        // Update form placeholders
        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const subjectField = document.getElementById('subject');
        const messageField = document.querySelector('textarea[name="message"]');
        
        if (nameField) nameField.placeholder = contact.form.name_placeholder;
        if (emailField) emailField.placeholder = contact.form.email_placeholder;
        if (subjectField) subjectField.placeholder = contact.form.subject_placeholder;
        if (messageField) messageField.placeholder = contact.form.message_placeholder;
        
        // Re-attach form validation with current language
        this.initContactForm(contact);
    }

    initContactForm(contactContent) {
        const form = document.getElementById('contactForm');
        if (!form) return;
        
        // Remove existing event listeners
        const newForm = form.cloneNode(true);
        form.parentNode.replaceChild(newForm, form);
        
        // Add new event listener with current language
        document.getElementById('contactForm').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.querySelector('textarea[name="message"]').value;
            
            // Validation with current language
            if (name.length < 4) {
                this.showFormError(contactContent.form.validation.name_error);
                return;
            }
            
            if (!this.isValidEmail(email)) {
                this.showFormError(contactContent.form.validation.email_error);
                return;
            }
            
            if (subject.length < 8) {
                this.showFormError(contactContent.form.validation.subject_error);
                return;
            }
            
            if (message.length < 1) {
                this.showFormError(contactContent.form.validation.message_error);
                return;
            }
            
            // Show success message
            this.showFormSuccess(contactContent.form.success_message);
            
            // Reset form
            document.getElementById('contactForm').reset();
        });
    }

    showFormError(message) {
        const errorElement = document.getElementById('errormessage');
        const successElement = document.getElementById('sendmessage');
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        if (successElement) {
            successElement.style.display = 'none';
        }
        
        setTimeout(() => {
            if (errorElement) {
                errorElement.style.display = 'none';
            }
        }, 5000);
    }

    showFormSuccess(message) {
        const errorElement = document.getElementById('errormessage');
        const successElement = document.getElementById('sendmessage');
        
        if (successElement) {
            successElement.textContent = message;
            successElement.style.display = 'block';
        }
        if (errorElement) {
            errorElement.style.display = 'none';
        }
        
        setTimeout(() => {
            if (successElement) {
                successElement.style.display = 'none';
            }
        }, 5000);
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    updateFooter(content) {
        const { footer } = content;
        const copyrightElement = document.getElementById('footer-copyright');
        const creditsElement = document.getElementById('footer-credits');
        
        if (copyrightElement) copyrightElement.innerHTML = `&copy; ${footer.copyright}`;
        if (creditsElement) creditsElement.textContent = footer.credits;
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