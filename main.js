import {
    servicesData, cinemaServices, designServices,
    projectsData, cinemaProjects, designProjects,
    statsData, statsDataCinema, statsDataDesign,
    testimonialsData, testimonialsDataCinema, testimonialsDataDesign
} from './data.js';

document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // 0. LENIS SMOOTH SCROLLING (MOTIONSITES / FRAMER TOUCH)
    // =========================================
    let lenis = null;
    if (typeof Lenis !== 'undefined') {
        lenis = new Lenis({
            duration: 0.7,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1.0,
            touchMultiplier: 1.5,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Smooth scroll for internal anchor links (with snappy immediate response)
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href && href !== '#' && href !== '#showreel' && !this.hasAttribute('data-showreel-trigger')) {
                    if (href === '#contact' && document.getElementById('contact-modal')) {
                        // Handled by contact modal listener
                        return;
                    }
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        lenis.scrollTo(target, { offset: -24, duration: 0.65 });
                    }
                }
            });
        });
    }

    // =========================================
    // 1. MOBILE MENU TOGGLE & SEKECO DROPDOWN
    // =========================================
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const homeDropdown = document.getElementById('home-dropdown-wrap');
    const homeTrigger = document.getElementById('home-nav-trigger');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            mobileBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile drawer when clicking regular navigation links
        navLinks.querySelectorAll('.nav-link:not(.nav-link-dropdown), .popover-item, .popover-item-min, .popover-footer-cta').forEach(link => {
            link.addEventListener('click', () => {
                mobileBtn.classList.remove('active');
                navLinks.classList.remove('active');
                if (homeDropdown) homeDropdown.classList.remove('is-open');
            });
        });

        // Mobile accordion toggle for Home dropdown
        if (homeTrigger && homeDropdown) {
            homeTrigger.addEventListener('click', (e) => {
                if (window.innerWidth <= 900) {
                    e.preventDefault();
                    homeDropdown.classList.toggle('is-open');
                    const expanded = homeDropdown.classList.contains('is-open');
                    homeTrigger.setAttribute('aria-expanded', expanded ? 'true' : 'false');
                }
            });
        }
    }

    // =========================================
    // 1.2 THEME TOGGLE (LIGHT / DARK MODE - SIANG & MALAM)
    // =========================================
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const savedTheme = localStorage.getItem('portfolio_theme');

    function applyTheme(theme) {
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            if (themeToggleBtn) {
                themeToggleBtn.setAttribute('title', 'Mode Siang Aktif — Klik untuk Beralih ke Mode Malam');
                themeToggleBtn.setAttribute('aria-label', 'Beralih ke Mode Malam');
            }
        } else {
            document.documentElement.removeAttribute('data-theme');
            if (themeToggleBtn) {
                themeToggleBtn.setAttribute('title', 'Mode Malam Aktif — Klik untuk Beralih ke Mode Siang');
                themeToggleBtn.setAttribute('aria-label', 'Beralih ke Mode Siang');
            }
        }
    }

    if (savedTheme === 'light') {
        applyTheme('light');
    } else {
        applyTheme('dark');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isLight = document.documentElement.getAttribute('data-theme') === 'light';
            const targetTheme = isLight ? 'dark' : 'light';
            applyTheme(targetTheme);
            localStorage.setItem('portfolio_theme', targetTheme);
        });
    }

    // Clean up any lingering atmosphere attribute
    document.documentElement.removeAttribute('data-atmosphere');
    try { localStorage.removeItem('portfolio_atmosphere'); } catch (e) {}

    // =========================================
    // 1.5 TOOLS TICKER INTERACTION (Pause on Hover & Touch)
    // =========================================
    const tickerWrapper = document.getElementById('ticker-wrapper');
    const tickerTrack = document.getElementById('ticker-track');
    if (tickerWrapper && tickerTrack) {
        tickerWrapper.addEventListener('mouseenter', () => {
            tickerTrack.style.animationPlayState = 'paused';
        });

        tickerWrapper.addEventListener('mouseleave', () => {
            tickerTrack.style.animationPlayState = 'running';
        });

        tickerWrapper.addEventListener('touchstart', () => {
            tickerTrack.style.animationPlayState = 'paused';
        }, { passive: true });

        tickerWrapper.addEventListener('touchend', () => {
            tickerTrack.style.animationPlayState = 'running';
        }, { passive: true });
    }

    // =========================================
    // LINEAR & VERCEL SPOTLIGHT EFFECT (Optimized High-Performance RAF Tracking)
    // =========================================
    const initSpotlightTracking = () => {
        const cards = document.querySelectorAll('.spotlight-card, .project-card, .service-card, .hero-bio-card, .about-card, .testimonial-card, .portal-card, .arsenal-card');
        cards.forEach(card => {
            if (!card.dataset.spotlightInit) {
                card.dataset.spotlightInit = 'true';
                let rect = null;
                let ticking = false;

                const setPos = (clientX, clientY) => {
                    if (!rect) rect = card.getBoundingClientRect();
                    const x = clientX - rect.left;
                    const y = clientY - rect.top;
                    card.style.setProperty('--mouse-x', `${x.toFixed(1)}px`);
                    card.style.setProperty('--mouse-y', `${y.toFixed(1)}px`);
                };

                card.addEventListener('pointerenter', (e) => {
                    rect = card.getBoundingClientRect();
                    setPos(e.clientX, e.clientY);
                }, { passive: true });

                card.addEventListener('pointermove', (e) => {
                    if (!ticking) {
                        ticking = true;
                        requestAnimationFrame(() => {
                            setPos(e.clientX, e.clientY);
                            ticking = false;
                        });
                    }
                }, { passive: true });

                card.addEventListener('pointerleave', () => {
                    rect = null;
                    card.style.setProperty('--mouse-x', `-500px`);
                    card.style.setProperty('--mouse-y', `-500px`);
                }, { passive: true });
            }
        });
    };

    // =========================================
    // HERO SCROLL PARALLAX (Linear Cinematic Depth)
    // =========================================
    const heroSection = document.getElementById('hero');
    const heroContainer = document.querySelector('.hero-container');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (heroSection && heroContainer && !prefersReducedMotion) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const heroHeight = heroSection.offsetHeight;
            if (scrollY < heroHeight) {
                const progress = scrollY / heroHeight;
                const opacity = Math.max(0, 1 - progress * 1.4);
                const scale = Math.max(0.96, 1 - progress * 0.04);
                const translateY = progress * 40;
                heroContainer.style.opacity = opacity.toFixed(3);
                heroContainer.style.transform = `translateY(${translateY.toFixed(1)}px) scale(${scale.toFixed(3)})`;
            }
        }, { passive: true });
    }

    // =========================================
    // HERO PORTRAIT 3D GYROSCOPIC TILT & PARALLAX (Immediate, Responsive & Smooth)
    // =========================================
    const initPortrait3DTilt = () => {
        const heroCenter = document.querySelector('.hero-center');
        const img = document.querySelector('.hero-framed-img');
        const watermark = document.querySelector('.hero-outline-watermark');
        const tunnel = document.querySelector('.hero-perspective-tunnel');
        const aura = document.querySelector('.backlight-aura-sphere');
        const backdrop = document.querySelector('.hero-portal-arch-backdrop');
        if (!heroCenter || !img) return;

        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) return;

        let targetRotateX = 0, targetRotateY = 0;
        let targetTransX = 0, targetTransY = 0;
        let currentRotateX = 0, currentRotateY = 0;
        let currentTransX = 0, currentTransY = 0;

        const updatePhysics = () => {
            // Highly responsive damping (0.20 for immediate cursor synchronization)
            currentRotateX += (targetRotateX - currentRotateX) * 0.20;
            currentRotateY += (targetRotateY - currentRotateY) * 0.20;
            currentTransX += (targetTransX - currentTransX) * 0.20;
            currentTransY += (targetTransY - currentTransY) * 0.20;

            // Foto tilt halus
            img.style.transform = `perspective(1200px) rotateX(${currentRotateX.toFixed(2)}deg) rotateY(${currentRotateY.toFixed(2)}deg) translate3d(${currentTransX.toFixed(1)}px, ${currentTransY.toFixed(1)}px, 0)`;

            if (watermark) {
                watermark.style.transform = `translate(calc(-50% + ${(-currentTransX * 1.2).toFixed(1)}px), calc(-50% + ${(-currentTransY * 1.2).toFixed(1)}px))`;
            }

            if (tunnel) {
                tunnel.style.transform = `translateX(-50%) translate3d(${(-currentTransX * 0.45).toFixed(1)}px, ${(-currentTransY * 0.35).toFixed(1)}px, 0) rotateX(${(-currentRotateX * 0.35).toFixed(2)}deg) rotateY(${(-currentRotateY * 0.35).toFixed(2)}deg)`;
            }

            if (aura) {
                aura.style.transform = `translate(calc(-50% + ${(currentTransX * 0.5).toFixed(1)}px), ${(currentTransY * 0.5).toFixed(1)}px) scale(${heroCenter.matches(':hover') ? 1.22 : 1})`;
            }

            if (backdrop) {
                backdrop.style.transform = `translateX(-50%) translate3d(${(currentTransX * 0.35).toFixed(1)}px, ${(currentTransY * 0.25).toFixed(1)}px, 0)`;
            }

            requestAnimationFrame(updatePhysics);
        };

        requestAnimationFrame(updatePhysics);

        window.addEventListener('mousemove', (e) => {
            const normX = (e.clientX / window.innerWidth) * 2 - 1;
            const normY = (e.clientY / window.innerHeight) * 2 - 1;

            targetRotateX = -normY * 2.8;
            targetRotateY = normX * 2.8;
            targetTransX = normX * 8;
            targetTransY = normY * 6;
        }, { passive: true });

        window.addEventListener('mouseleave', () => {
            targetRotateX = 0;
            targetRotateY = 0;
            targetTransX = 0;
            targetTransY = 0;
        });
    };

    initPortrait3DTilt();

    // =========================================
    // SCROLL REVEAL — IntersectionObserver (MotionSites.ai / Framer Style)
    // =========================================
    const observeRevealElements = () => {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        document.querySelectorAll('.reveal:not(.active)').forEach(el => {
            revealObserver.observe(el);
        });

        initSpotlightTracking();
    };

    // Trigger immediate observer & spotlight for hero & elements in initial viewport
    observeRevealElements();
    setTimeout(observeRevealElements, 80);

    // =========================================
    // MULTI-PAGE & DUAL CONCENTRATION CONTEXT
    // =========================================
    const currentPage = document.body.getAttribute('data-page') || 'home';
    let currentServices = servicesData;
    let currentProjects = projectsData;
    let currentStats = statsData;
    let currentTestimonials = testimonialsData;
    let filterConfigs = [];

    let servicesEyebrow = "SERVICES &amp; EXPERTISE";
    let servicesTitle = `Services &amp; <span class="title-serif text-accent">Expertise</span>`;
    let servicesLead = `Comprehensive visual production and strategic brand engineering — delivering high-retention video editing, cinematic drone filming, and scalable visual identities built for performance.`;

    let workEyebrow = "CURATED PORTFOLIO";
    let workTitle = `Selected <span class="title-serif text-accent">Works</span>`;
    let workLead = `Koleksi karya visual pilihan berfokus pada storytelling ritmis, estetika sinematik, dan dampak engagement nyata bagi brand.`;

    if (currentPage === 'cinema') {
        currentServices = cinemaServices;
        currentProjects = cinemaProjects;
        currentStats = statsDataCinema;
        currentTestimonials = testimonialsDataCinema;
        servicesEyebrow = "AUDIO-VISUAL REPERTOIRE";
        servicesTitle = `Cinema &amp; Media <span class="title-serif text-accent">Services</span>`;
        servicesLead = `Spesialisasi produksi visual bergerak — dari video pendek vertikal (Reels/TikTok), videografi udara sinematik, hingga color retouching filmis.`;

        workEyebrow = "CINEMATIC SHOWCASE";
        workTitle = `Cinema &amp; Video <span class="title-serif text-accent">Repertoire</span>`;
        workLead = `Rangkaian karya videografi komersial, liputan drone 4K, fashion reels beritme cepat, dan foto bernuansa sinematik.`;

        filterConfigs = [
            { label: 'All Works', filter: 'All' },
            { label: 'Reels & Short Form', filter: 'Reels & Short Form', key: 'subCategory' },
            { label: 'Videography & Drone', filter: 'Videography & Drone', key: 'subCategory' },
            { label: 'Photography & Retouch', filter: 'Photography & Retouch', key: 'subCategory' }
        ];
    } else if (currentPage === 'design') {
        currentServices = designServices;
        currentProjects = designProjects;
        currentStats = statsDataDesign;
        currentTestimonials = testimonialsDataDesign;
        servicesEyebrow = "COMMUNICATION &amp; SYSTEMS";
        servicesTitle = `Graphic &amp; UI/UX <span class="title-serif text-accent">Services</span>`;
        servicesLead = `Perancangan visual berkarakter kuat — dari antarmuka digital (UI/UX) web &amp; mobile, identitas visual brand, carousel edukatif, hingga poster tipografi.`;

        workEyebrow = "DESIGN SHOWCASE";
        workTitle = `Graphic &amp; Product <span class="title-serif text-accent">Showcase</span>`;
        workLead = `Studi kasus antarmuka aplikasi digital, sistem identitas visual brand, carousel edukatif berslide banyak, dan poster modern.`;

        filterConfigs = [
            { label: 'All Designs', filter: 'All' },
            { label: 'UI/UX Design', filter: 'UI/UX Design', key: 'category' },
            { label: 'Brand Identity', filter: 'Brand Identity', key: 'category' },
            { label: 'Social Carousel', filter: 'Social Carousel', key: 'category' },
            { label: 'Poster Design', filter: 'Poster Design', key: 'category' }
        ];
    } else {
        // Home Gateway
        currentServices = servicesData;
        currentProjects = projectsData;
        currentStats = statsData;
        currentTestimonials = testimonialsData;
        filterConfigs = [
            { label: 'All Curated', filter: 'All' },
            { label: 'Video Editing', filter: 'Video Editing', key: 'category' },
            { label: 'Videography', filter: 'Videography', key: 'category' },
            { label: 'UI/UX Design', filter: 'UI/UX Design', key: 'category' },
            { label: 'Brand Identity', filter: 'Brand Identity', key: 'category' }
        ];
    }

    // =========================================
    // 2. RENDER SERVICES SECTION (Sekeco Style)
    // =========================================
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
        let servicesHTML = `
            <div class="section-header-split reveal">
                <div class="section-header-left">
                    <div class="section-eyebrow">
                        <span class="eyebrow-text">${servicesEyebrow}</span>
                    </div>
                    <h2 class="section-title">${servicesTitle}</h2>
                </div>
                <div class="section-header-right">
                    <p class="section-lead-desc text-muted">${servicesLead}</p>
                </div>
            </div>
            <div class="services-grid-sekeco mt-lg">
        `;

        currentServices.forEach((service, i) => {
            const indexStr = String(i + 1).padStart(2, '0');
            const toolsHTML = (service.tools || []).map(t => `<span class="service-tool-tag">${t}</span>`).join('');
            servicesHTML += `
                <div class="service-card-sekeco spotlight-card reveal reveal-delay-${(i % 4) + 1} rounded-card group" data-color="${service.color || 'cyan'}">
                    <div class="service-card-top flex items-center justify-between">
                        <div class="service-badge-icon color-${service.color || 'cyan'}">
                            ${service.icon || '✦'}
                        </div>
                        <span class="service-pill-tag">${service.badge || service.category}</span>
                    </div>
                    
                    <div class="service-body mt-md">
                        <h3 class="service-heading">${service.title}</h3>
                        <p class="service-desc text-muted mt-xs">${service.description}</p>
                    </div>

                    <div class="service-tools-row flex flex-wrap gap-xs mt-md">
                        ${toolsHTML}
                    </div>

                    <div class="service-card-footer mt-md flex items-center justify-between">
                        <a href="${service.link || '#work'}" class="service-action-link">
                            <span>Explore Repertoire</span>
                            <span class="action-arrow">↗</span>
                        </a>
                        <span class="service-number font-mono">// ${indexStr}</span>
                    </div>
                </div>
            `;
        });

        servicesHTML += `</div>`;
        servicesSection.innerHTML = servicesHTML;
        initSpotlightTracking();
    }

    // =========================================
    // 3. RENDER PROJECTS (WORK) SECTION WITH FILTERS
    // =========================================
    const workSection = document.getElementById('work');
    if (workSection) {
        // Bangun tombol filter sesuai konfigurasi halaman
        const filterButtonsHTML = filterConfigs.map((cfg, idx) => {
            let count = currentProjects.length;
            if (cfg.filter !== 'All') {
                count = currentProjects.filter(p => {
                    if (cfg.key === 'subCategory') return p.subCategory === cfg.filter;
                    return p.category === cfg.filter;
                }).length;
            }
            return `<button class="filter-btn ${idx === 0 ? 'active' : ''}" data-filter="${cfg.filter}" data-key="${cfg.key || ''}">${cfg.label} <span class="filter-count">${count}</span></button>`;
        }).join('');

        workSection.innerHTML = `
            <div class="section-header-split reveal mt-xl mb-lg">
                <div class="section-header-left">
                    <div class="section-eyebrow">
                        <span class="eyebrow-text">${workEyebrow}</span>
                    </div>
                    <h2 class="section-title">${workTitle}</h2>
                </div>
                <div class="section-header-right">
                    <p class="section-lead-desc text-muted">${workLead}</p>
                </div>
            </div>
            <div class="project-filters flex gap-sm flex-wrap justify-start mb-lg" id="project-filters">
                <span class="filter-sliding-pill" id="filter-sliding-pill" aria-hidden="true"></span>
                ${filterButtonsHTML}
            </div>
            <div class="grid grid-cols-2 gap-lg projects-grid" id="projects-container" style="transition: opacity 0.3s ease;"></div>
        `;

        const projectsContainer = document.getElementById('projects-container');
        const filterBtns = document.querySelectorAll('.filter-btn');

        // Sliding Pill Controller
        const updateSlidingPill = (activeBtn) => {
            const pill = document.getElementById('filter-sliding-pill');
            const container = document.getElementById('project-filters');
            if (!pill || !activeBtn || !container) return;

            const btnRect = activeBtn.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            const leftOffset = btnRect.left - containerRect.left;
            const topOffset = btnRect.top - containerRect.top;

            pill.style.width = `${btnRect.width}px`;
            pill.style.height = `${btnRect.height}px`;
            pill.style.transform = `translate(${leftOffset}px, ${topOffset}px)`;
            pill.style.opacity = '1';
        };

        window._updateFilterSlidingPill = updateSlidingPill;

        // Initialize sliding pill position
        requestAnimationFrame(() => {
            const initialActive = workSection.querySelector('.filter-btn.active');
            if (initialActive) updateSlidingPill(initialActive);
        });

        window.addEventListener('resize', () => {
            const currentActive = workSection.querySelector('.filter-btn.active');
            if (currentActive) updateSlidingPill(currentActive);
        }, { passive: true });

        const renderProjects = (filterCategory, filterKey) => {
            // Immediate snappy transition
            projectsContainer.style.opacity = 0.4;

            setTimeout(() => {
                let filteredData = currentProjects;

                if (filterCategory !== 'All') {
                    filteredData = currentProjects.filter(p => {
                        if (filterKey === 'subCategory') return p.subCategory === filterCategory;
                        return p.category === filterCategory || p.subCategory === filterCategory;
                    });
                }

                projectsContainer.innerHTML = filteredData.map((project, i) => {
                    const formatLabel = project.aspectRatio === '9/16' ? '9:16 Vertical Reel' : (project.videoType === 'youtube' ? '16:9 Cinema 4K' : (project.specs && project.specs.format ? project.specs.format.split(' ')[0] : 'Visual Design'));
                    const primarySoftware = (project.specs && project.specs.software) ? project.specs.software.split(' & ')[0] : (project.tags ? project.tags[0] : 'Creative Suite');

                    return `
                    <div class="project-card spotlight-card reveal reveal-delay-${(i % 4) + 1} rounded-card group" data-id="${project.id}" style="cursor: pointer;">
                        <div class="project-image-wrapper">
                            <img src="${project.image}" alt="${project.title}" class="project-image" loading="lazy" onerror="this.style.opacity='0';">
                            <span class="project-badge-tag">${project.tag || project.category}</span>
                            
                            <!-- Software Tool & Format Pill -->
                            <div class="project-software-badge">
                                <span class="software-dot"></span>
                                <span class="software-name">${primarySoftware}</span>
                                <span class="software-sep">·</span>
                                <span class="software-format">${formatLabel}</span>
                            </div>

                            <div class="project-overlay-trigger">
                                <span class="trigger-circle">
                                    <span class="trigger-arrow">↗</span>
                                </span>
                            </div>
                        </div>
                        <div class="project-content">
                            <div class="project-meta-row flex items-center justify-between">
                                <span class="project-category text-accent">${project.category}</span>
                                <span class="project-year font-mono">// 2026</span>
                            </div>
                            <h3 class="project-title flex items-center justify-between">
                                <span>${project.title}</span>
                                <span class="project-title-arrow">↗</span>
                            </h3>
                            <p class="project-short-desc text-muted mt-xs">${project.description}</p>
                            <div class="project-tags flex gap-sm flex-wrap mt-sm">
                                ${(project.tags || []).map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                    `;
                }).join('');

                // Re-observe newly injected .reveal elements and spotlight tracking
                observeRevealElements();

                // Fade in
                projectsContainer.style.opacity = 1;
            }, 50);
        };

        // Render awal semua projek
        renderProjects('All', '');

        // Logic ketika filter diklik
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetBtn = e.target.closest('.filter-btn');
                if (targetBtn) {
                    filterBtns.forEach(b => b.classList.remove('active'));
                    targetBtn.classList.add('active');
                    updateSlidingPill(targetBtn);
                    renderProjects(targetBtn.dataset.filter, targetBtn.dataset.key);
                }
            });
        });
    }

    // =========================================
    // 4. RENDER IMPACT SECTION
    // =========================================
    const impactSection = document.getElementById('impact');
    if (impactSection) {
        let impactHTML = `
            <div class="section-header-split reveal mb-lg">
                <div class="section-header-left">
                    <div class="section-eyebrow">
                        <span class="eyebrow-text">MEASURABLE VALUE</span>
                    </div>
                    <h2 class="section-title">Proven <span class="title-serif text-accent">Impact</span></h2>
                </div>
                <div class="section-header-right">
                    <p class="section-lead-desc text-muted">
                        Konsistensi kualitas, ketepatan tenggat waktu, dan kepuasan klien yang terbukti dalam setiap karya visual yang kami rilis.
                    </p>
                </div>
            </div>
            <div class="impact-grid border-t border-b">
        `;

        currentStats.forEach(stat => {
            impactHTML += `
                <div class="stat-item reveal">
                    <div class="stat-value">${stat.value}</div>
                    <div class="stat-label">${stat.label}</div>
                </div>
            `;
        });

        impactHTML += `</div>`;
        impactSection.innerHTML = impactHTML;

        const gridEl = impactSection.querySelector('.impact-grid');
        if (gridEl) {
            gridEl.style.borderTop = "1px solid var(--border-default)";
            gridEl.style.borderBottom = "1px solid var(--border-default)";
            gridEl.style.paddingBlock = "60px";
        }
    }

    // =========================================
    // 5. RENDER TESTIMONIALS SECTION
    // =========================================
    const testimonialsSection = document.getElementById('testimonials');
    if (testimonialsSection) {
        let trackHTML = currentTestimonials.map(testi => `
            <div class="testimonial-card">
                <div class="quote-icon">“</div>
                <p class="testimonial-quote">${testi.quote}</p>
                <div class="testimonial-author">
                    <img src="${testi.avatar}" alt="${testi.name}" class="author-avatar" loading="lazy">
                    <div class="author-info">
                        <div class="author-name">${testi.name}</div>
                        <div class="author-role">${testi.role}</div>
                    </div>
                </div>
            </div>
        `).join('');

        testimonialsSection.innerHTML = `
            <div class="section-header-split reveal mb-lg">
                <div class="section-header-left">
                    <div class="section-eyebrow">
                        <span class="eyebrow-text">CLIENT TESTIMONIALS</span>
                    </div>
                    <h2 class="section-title">Client <span class="title-serif text-accent">Feedback</span></h2>
                </div>
                <div class="section-header-right">
                    <p class="section-lead-desc text-muted">
                        Apa kata para brand owner, kreator konten, dan tim komersial tentang kolaborasi kreatif bersama Mohammad Ikhsan.
                    </p>
                </div>
            </div>
            <div class="testimonial-slider reveal reveal-delay-2">
                <div class="testimonial-track" id="testimonial-track">
                    ${trackHTML}
                </div>
                <div class="slider-nav">
                    <button class="slider-btn" id="prev-testi" aria-label="Previous testimonial">
                        <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
                    </button>
                    <button class="slider-btn" id="next-testi" aria-label="Next testimonial">
                        <svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
                    </button>
                </div>
            </div>
        `;

        const track = document.getElementById('testimonial-track');
        const prevBtn = document.getElementById('prev-testi');
        const nextBtn = document.getElementById('next-testi');

        if (track && prevBtn && nextBtn) {
            let currentIndex = 0;
            const totalTestimonials = currentTestimonials.length;

            const updateSlider = () => {
                track.style.transform = `translateX(-${currentIndex * 100}%)`;
            };

            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalTestimonials - 1;
                updateSlider();
            });

            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex < totalTestimonials - 1) ? currentIndex + 1 : 0;
                updateSlider();
            });
        }
    }

    // =========================================
    // 6. SCROLL REVEAL — Run & Tag Static Elements
    // =========================================

    // Pasang class reveal ke elemen statis di HTML
    document.querySelectorAll('.cta-box').forEach(el => {
        el.classList.add('reveal');
    });

    // Jalankan observer pertama kali setelah semua section selesai di-render
    observeRevealElements();

    // =========================================
    // 7. MODAL SYSTEM (Project Detail & Contact)
    // =========================================

    // --- Modal Helpers ---
    const openModal = (modalEl) => {
        if (!modalEl) return;
        modalEl.classList.add('active');
        modalEl.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = (modalEl) => {
        if (!modalEl) return;
        modalEl.classList.remove('active');
        modalEl.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    // --- 1. Project Detail Modal ---
    const projectModal = document.getElementById('project-modal');
    const closeProjectModalBtn = document.getElementById('close-project-modal');
    const modalMediaWrapper = document.getElementById('modal-media-wrapper');
    const modalProjectVideo = document.getElementById('modal-project-video');
    const modalProjectIframe = document.getElementById('modal-project-iframe');
    const modalProjectImg = document.getElementById('modal-project-img');
    const modalMediaBadge = document.getElementById('modal-media-badge');
    const modalMediaBadgeText = document.getElementById('modal-media-badge-text');
    const modalProjectCategory = document.getElementById('modal-project-category');
    const modalProjectClient = document.getElementById('modal-project-client');
    const modalProjectTitle = document.getElementById('modal-project-title');
    const modalProjectTags = document.getElementById('modal-project-tags');
    const modalProjectDesc = document.getElementById('modal-project-desc');
    const modalProjectUrl = document.getElementById('modal-project-url');
    const modalInquireBtn = document.getElementById('modal-inquire-btn');
    const specSoftware = document.getElementById('spec-software');
    const specFormat = document.getElementById('spec-format');
    const specScope = document.getElementById('spec-scope');

    // Menghentikan playback & membersihkan resource saat modal ditutup
    const closeProjectDetailModal = () => {
        if (!projectModal) return;
        closeModal(projectModal);

        if (modalProjectVideo) {
            modalProjectVideo.pause();
            modalProjectVideo.currentTime = 0;
            modalProjectVideo.removeAttribute('src');
            modalProjectVideo.load();
            modalProjectVideo.style.display = 'none';
        }

        if (modalProjectIframe) {
            modalProjectIframe.src = '';
            modalProjectIframe.style.display = 'none';
        }

        if (modalProjectImg) {
            modalProjectImg.src = '';
            modalProjectImg.style.display = 'none';
        }

        if (modalMediaWrapper) {
            modalMediaWrapper.classList.remove('aspect-9-16', 'aspect-16-9', 'aspect-image');
        }
    };

    if (closeProjectModalBtn && projectModal) {
        closeProjectModalBtn.addEventListener('click', closeProjectDetailModal);

        // Tutup saat area luar modal (backdrop) diklik
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                closeProjectDetailModal();
            }
        });
    }

    // Event Delegation: Ketika .project-card diklik
    const workElem = document.getElementById('work');
    if (workElem && projectModal) {
        workElem.addEventListener('click', (e) => {
            const card = e.target.closest('.project-card');
            if (!card) return;

            const projectId = card.dataset.id;
            const allAvailableProjects = [...cinemaProjects, ...designProjects, ...projectsData];
            const project = allAvailableProjects.find(p => String(p.id) === String(projectId));
            if (!project) return;

            // Reset media state
            if (modalProjectVideo) {
                modalProjectVideo.pause();
                modalProjectVideo.currentTime = 0;
                modalProjectVideo.removeAttribute('src');
                modalProjectVideo.style.display = 'none';
            }
            if (modalProjectIframe) {
                modalProjectIframe.src = '';
                modalProjectIframe.style.display = 'none';
            }
            if (modalProjectImg) {
                modalProjectImg.style.display = 'none';
            }
            if (modalMediaWrapper) {
                modalMediaWrapper.classList.remove('aspect-9-16', 'aspect-16-9', 'aspect-image');
            }

            // Tentukan rasio & tipe media
            const isVerticalReel = project.aspectRatio === '9/16';
            const ratioClass = isVerticalReel ? 'aspect-9-16' : 'aspect-16-9';
            const videoType = project.videoType || (project.videoUrl ? 'video' : (project.youtubeId ? 'youtube' : 'image'));

            if (modalMediaWrapper) {
                modalMediaWrapper.classList.add(videoType === 'image' ? 'aspect-image' : ratioClass);
            }

            if (videoType === 'video' && project.videoUrl) {
                if (modalProjectVideo) {
                    modalProjectVideo.src = project.videoUrl;
                    modalProjectVideo.poster = project.image || '';
                    modalProjectVideo.style.display = 'block';
                }
                if (modalMediaBadgeText) {
                    modalMediaBadgeText.textContent = isVerticalReel ? 'REELS PREVIEW (9:16)' : 'VIDEO PREVIEW (16:9)';
                }
            } else if (videoType === 'youtube' && project.youtubeId) {
                if (modalProjectIframe) {
                    modalProjectIframe.src = `https://www.youtube-nocookie.com/embed/${project.youtubeId}?autoplay=1&mute=0&rel=0`;
                    modalProjectIframe.style.display = 'block';
                }
                if (modalMediaBadgeText) {
                    modalMediaBadgeText.textContent = 'YOUTUBE EMBED';
                }
            } else {
                if (modalProjectImg) {
                    modalProjectImg.src = project.image || '';
                    modalProjectImg.alt = project.title || 'Project Preview';
                    modalProjectImg.style.display = 'block';
                }
                if (modalMediaBadgeText) {
                    modalMediaBadgeText.textContent = 'IMAGE SHOWCASE';
                }
            }

            // Isi konten teks & meta
            if (modalProjectCategory) modalProjectCategory.textContent = project.category || 'Portfolio';
            if (modalProjectClient) modalProjectClient.textContent = project.client ? `Client: ${project.client}` : '';
            if (modalProjectTitle) modalProjectTitle.textContent = project.title || 'Judul Proyek';
            if (modalProjectDesc) modalProjectDesc.textContent = project.description || 'Proyek portofolio unggulan dengan arsitektur visual modern dan presisi tinggi.';

            // Technical Specs Grid
            if (project.specs) {
                if (specSoftware) specSoftware.textContent = project.specs.software || 'Premiere Pro';
                if (specFormat) specFormat.textContent = project.specs.format || (isVerticalReel ? '9:16 Vertical Reel' : '16:9 Widescreen');
                if (specScope) specScope.textContent = project.specs.scope || 'Full Production & Edit';
            } else {
                if (specSoftware) specSoftware.textContent = 'Premiere & After Effects';
                if (specFormat) specFormat.textContent = isVerticalReel ? '9:16 Vertical Reel' : '16:9 Widescreen';
                if (specScope) specScope.textContent = 'Full Edit & Color Grading';
            }

            // Render dinamis tombol tautan eksternal ("Lihat Postingan Klien")
            const targetLink = project.link || project.liveUrl || '';
            if (modalProjectUrl) {
                if (targetLink && targetLink !== '#') {
                    modalProjectUrl.style.display = 'inline-flex';
                    modalProjectUrl.href = targetLink;
                    modalProjectUrl.target = '_blank';
                    modalProjectUrl.rel = 'noopener noreferrer';

                    let btnLabel = 'Lihat Postingan Klien';
                    if (project.linkLabel) {
                        btnLabel = project.linkLabel;
                    } else if (targetLink.includes('instagram.com/reel') || targetLink.includes('tiktok.com')) {
                        btnLabel = 'Tonton di Instagram Reels';
                    } else if (targetLink.includes('youtube.com') || targetLink.includes('youtu.be')) {
                        btnLabel = 'Tonton di YouTube';
                    } else if (targetLink.includes('instagram.com')) {
                        btnLabel = 'Lihat di Instagram';
                    } else {
                        btnLabel = 'Lihat Postingan Klien';
                    }

                    modalProjectUrl.innerHTML = `
                        <span>${btnLabel}</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 8px;">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                    `;
                } else {
                    modalProjectUrl.style.display = 'none';
                }
            }

            // Quick Inquire Action: Auto-prefill contact modal
            if (modalInquireBtn) {
                modalInquireBtn.onclick = () => {
                    closeProjectDetailModal();
                    const contactModalEl = document.getElementById('contact-modal');
                    if (contactModalEl) {
                        openModal(contactModalEl);
                        const msgInput = document.getElementById('contact-message');
                        if (msgInput) {
                            msgInput.value = `Halo Mohammad Ikhsan! Saya tertarik memesan proyek serupa dengan: "${project.title}" (${project.category}). Mohon info estimasi biaya dan timeline pengerjaannya.`;
                            msgInput.focus();
                        }
                    }
                };
            }

            // Tags
            if (modalProjectTags) {
                modalProjectTags.innerHTML = (project.tags || [])
                    .map(tag => `<span class="project-tag">${tag}</span>`)
                    .join('');
            }

            openModal(projectModal);
        });
    }

    // --- 2. Contact Modal ("Let's Talk") ---
    const contactModal = document.getElementById('contact-modal');
    const closeContactModalBtn = document.getElementById('close-contact-modal');
    const contactForm = document.getElementById('contact-form');
    const contactSubmitBtn = document.getElementById('contact-submit-btn');

    if (closeContactModalBtn && contactModal) {
        closeContactModalBtn.addEventListener('click', () => closeModal(contactModal));

        // Tutup saat area luar modal (backdrop) diklik
        contactModal.addEventListener('click', (e) => {
            if (e.target === contactModal) {
                closeModal(contactModal);
            }
        });
    }

    // Trigger tombol "Let's Talk" / "Contact" di navbar, CTA banner, atau tombol lainnya
    document.addEventListener('click', (e) => {
        const contactTrigger = e.target.closest('a[href="#contact"]');
        if (contactTrigger) {
            e.preventDefault();
            if (contactModal) {
                openModal(contactModal);
            } else {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    if (lenis) {
                        lenis.scrollTo(contactSection, { offset: -24, duration: 0.65 });
                    } else {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }
        }
    });

    // Pengiriman form kontak ke email iechantwiranata@gmail.com
    if (contactForm && contactSubmitBtn) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('contact-name');
            const emailInput = document.getElementById('contact-email');
            const messageInput = document.getElementById('contact-message');

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();

            if (!name || !email || !message) return;

            // Ubah state tombol ke proses pengiriman
            const originalText = contactSubmitBtn.innerHTML;
            contactSubmitBtn.disabled = true;
            contactSubmitBtn.innerHTML = '<span>Sending Message...</span>';

            try {
                // Kirim langsung ke email via FormSubmit API (tanpa perlu backend)
                const response = await fetch('https://formsubmit.co/ajax/iechantwiranata@gmail.com', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        message: message,
                        _subject: `New Portfolio Message from ${name}`,
                        _template: 'table'
                    })
                });

                const data = await response.json();

                if (response.ok || data.success === 'true' || data.success === true) {
                    contactSubmitBtn.classList.add('success-state');
                    contactSubmitBtn.innerHTML = '<span>✓ Message Sent Successfully!</span>';

                    setTimeout(() => {
                        closeModal(contactModal);
                        contactForm.reset();
                        contactSubmitBtn.classList.remove('success-state');
                        contactSubmitBtn.innerHTML = originalText;
                        contactSubmitBtn.disabled = false;
                    }, 2000);
                } else {
                    throw new Error('Service response not ok');
                }
            } catch (err) {
                // Fallback: Jika offline atau diblokir adblocker, buka mailto client langsung
                console.warn('FormSubmit API fallback triggered:', err);
                contactSubmitBtn.classList.add('success-state');
                contactSubmitBtn.innerHTML = '<span>Opening Mail Client...</span>';

                const mailtoUrl = `mailto:iechantwiranata@gmail.com?subject=${encodeURIComponent('Portfolio Inquiry from ' + name)}&body=${encodeURIComponent('Nama: ' + name + '\nEmail: ' + email + '\n\nPesan:\n' + message)}`;
                window.location.href = mailtoUrl;

                setTimeout(() => {
                    closeModal(contactModal);
                    contactForm.reset();
                    contactSubmitBtn.classList.remove('success-state');
                    contactSubmitBtn.innerHTML = originalText;
                    contactSubmitBtn.disabled = false;
                }, 1800);
            }
        });
    }

    // --- 3. Showreel Video Modal ---
    const showreelModal = document.getElementById('showreel-modal');
    const closeShowreelModalBtn = document.getElementById('close-showreel-modal');
    const showreelVideo = document.getElementById('showreel-video');

    const closeShowreel = () => {
        if (!showreelModal) return;
        closeModal(showreelModal);
        if (showreelVideo) {
            showreelVideo.pause();
        }
    };

    if (closeShowreelModalBtn && showreelModal) {
        closeShowreelModalBtn.addEventListener('click', closeShowreel);

        // Tutup saat area luar modal (backdrop) diklik
        showreelModal.addEventListener('click', (e) => {
            if (e.target === showreelModal) {
                closeShowreel();
            }
        });
    }

    // Trigger tombol "Play Showreel" (a[href="#showreel"] atau [data-showreel-trigger])
    document.addEventListener('click', (e) => {
        const showreelTrigger = e.target.closest('a[href="#showreel"], [data-showreel-trigger]');
        if (showreelTrigger) {
            e.preventDefault();
            if (showreelModal) {
                openModal(showreelModal);
                if (showreelVideo) {
                    showreelVideo.currentTime = 0;
                    showreelVideo.play().catch(() => {
                        // Browser autoplay policy catch jika diblokir
                    });
                }
            }
        }
    });

    // =========================================
    // 8. BACK TO TOP BUTTON
    // =========================================
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 350) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }, { passive: true });

        backToTopBtn.addEventListener('click', () => {
            if (lenis) {
                lenis.scrollTo(0, { duration: 1.2 });
            } else {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }

    // --- Global: Tutup modal ketika tombol 'Escape' ditekan ---
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' || e.key === 'Esc') {
            if (projectModal && projectModal.classList.contains('active')) {
                closeProjectDetailModal();
            }
            if (contactModal && contactModal.classList.contains('active')) {
                closeModal(contactModal);
            }
            if (showreelModal && showreelModal.classList.contains('active')) {
                closeShowreel();
            }
        }
    });
});
