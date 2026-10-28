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
    // 1. MOBILE MENU TOGGLE & SEKECO DROPDOWNS (HOME & WORKS)
    // =========================================
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const dropdownWraps = document.querySelectorAll('.nav-item-dropdown');

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
                dropdownWraps.forEach(d => {
                    d.classList.remove('is-open');
                    const trig = d.querySelector('.nav-link-dropdown');
                    if (trig) trig.setAttribute('aria-expanded', 'false');
                });
            });
        });

        // Mobile accordion toggle for all dropdowns (Home & Works)
        dropdownWraps.forEach(dropdown => {
            const trigger = dropdown.querySelector('.nav-link-dropdown');
            if (trigger) {
                trigger.addEventListener('click', (e) => {
                    if (window.innerWidth <= 900) {
                        e.preventDefault();
                        const wasOpen = dropdown.classList.contains('is-open');
                        // Close any other open dropdown in accordion
                        dropdownWraps.forEach(other => {
                            if (other !== dropdown) {
                                other.classList.remove('is-open');
                                const otherTrigger = other.querySelector('.nav-link-dropdown');
                                if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
                            }
                        });
                        dropdown.classList.toggle('is-open', !wasOpen);
                        trigger.setAttribute('aria-expanded', !wasOpen ? 'true' : 'false');
                    }
                });
            }
        });
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
    // LINEAR & VERCEL SPOTLIGHT EFFECT (High-Precision Direct Cursor Tracking)
    // =========================================
    const initSpotlightTracking = () => {
        const cards = document.querySelectorAll('.spotlight-card, .project-card, .service-card, .service-card-sekeco, .hero-bio-card, .about-card, .testimonial-card, .portal-card, .arsenal-card');
        cards.forEach(card => {
            if (!card.dataset.spotlightInit) {
                card.dataset.spotlightInit = 'true';

                const updateCoords = (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    card.style.setProperty('--mouse-x', `${x.toFixed(1)}px`);
                    card.style.setProperty('--mouse-y', `${y.toFixed(1)}px`);
                };

                card.addEventListener('pointerenter', updateCoords, { passive: true });
                card.addEventListener('pointermove', updateCoords, { passive: true });
                card.addEventListener('pointerleave', () => {
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

    let servicesEyebrow = "EXPERTISE &amp; CAPABILITIES";
    let servicesTitle = `Creative <span class="title-serif text-accent">Services</span>`;
    let servicesLead = `Layanan produksi visual terpadu — dari editing reels dinamis, pengambilan gambar drone sinematik, hingga identitas desain grafis berdaya saing global.`;

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
            servicesHTML += `
                <a href="${service.link || '#work'}" class="service-card-sekeco spotlight-card reveal reveal-delay-${(i % 3) + 1} rounded-card group" data-color="${service.color || 'cyan'}">
                    <div class="service-badge-icon color-${service.color || 'cyan'}" aria-hidden="true">
                        ${service.icon || '✦'}
                    </div>
                    
                    <div class="service-body">
                        <h3 class="service-heading">${service.title}</h3>
                        <p class="service-desc text-muted">${service.description}</p>
                    </div>
                </a>
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
                    const tag1 = project.category || 'Creative Work';
                    let tag2 = project.subCategory || (project.specs && project.specs.format ? project.specs.format.split(' ')[0] : (project.tags ? project.tags[0] : ''));
                    if (tag2 && tag2.toLowerCase() === tag1.toLowerCase()) {
                        tag2 = (project.tags && project.tags[1]) ? project.tags[1] : (project.tags && project.tags[0] ? project.tags[0] : '');
                    }

                    return `
                    <div class="project-card spotlight-card reveal reveal-delay-${(i % 4) + 1} rounded-card group" data-id="${project.id}" style="cursor: pointer;">
                        <div class="project-card-inner">
                            <div class="project-card-content">
                                <div class="project-card-tags">
                                    <span class="project-tag-pill">${tag1}</span>
                                    ${tag2 ? `<span class="project-tag-pill">${tag2}</span>` : ''}
                                </div>
                                <h3 class="project-title">
                                    <span>${project.title}</span>
                                    <span class="project-title-arrow" aria-hidden="true">↗</span>
                                </h3>
                                <p class="project-short-desc text-muted">${project.description}</p>
                            </div>
                            <div class="project-card-media">
                                <img src="${project.image}" alt="${project.title}" class="project-image" loading="lazy" onerror="this.style.opacity='0';">
                            </div>
                        </div>
                    </div>
                    `;
                }).join('');

                // Re-observe newly injected .reveal elements and spotlight tracking
                observeRevealElements();
                initSpotlightTracking();

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
        document.body.classList.add('modal-open');
        document.documentElement.classList.add('modal-open');
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
    };

    const closeModal = (modalEl) => {
        if (!modalEl) return;
        modalEl.classList.remove('active');
        modalEl.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        document.documentElement.classList.remove('modal-open');
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
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
    const modalProjectUrlBadge = document.getElementById('modal-project-url-badge');
    const modalProjectClient = document.getElementById('modal-project-client');
    const modalProjectTitle = document.getElementById('modal-project-title');
    const modalProjectTags = document.getElementById('modal-project-tags');
    const modalProjectDesc = document.getElementById('modal-project-desc');
    const modalProjectUrl = document.getElementById('modal-project-url');
    const modalInquireBtn = document.getElementById('modal-inquire-btn');
    const specSoftware = document.getElementById('spec-software');
    const specFormat = document.getElementById('spec-format');
    const specScope = document.getElementById('spec-scope');
    const modalProjectReelLink = document.getElementById('modal-project-reel-link');
    const modalReelPoster = document.getElementById('modal-reel-poster');
    const modalReelCtaPlatform = document.getElementById('modal-reel-cta-platform');
    const modalCarouselSlider = document.getElementById('modal-carousel-slider');
    const modalCarouselTrack = document.getElementById('modal-carousel-track');
    const carouselPrevBtn = document.getElementById('carousel-prev-btn');
    const carouselNextBtn = document.getElementById('carousel-next-btn');
    const carouselCounter = document.getElementById('carousel-counter');
    const carouselCurrentIndex = document.getElementById('carousel-current-index');
    const carouselTotalSlides = document.getElementById('carousel-total-slides');
    const carouselDots = document.getElementById('carousel-dots');
    const modalImageFrame = document.getElementById('modal-image-frame');

    let currentCarouselIndex = 0;
    let currentCarouselSlides = [];

    const updateCarouselPosition = (index) => {
        if (!modalCarouselTrack || currentCarouselSlides.length === 0) return;
        currentCarouselIndex = (index + currentCarouselSlides.length) % currentCarouselSlides.length;
        modalCarouselTrack.style.transform = `translateX(-${currentCarouselIndex * 100}%)`;
        if (carouselCurrentIndex) carouselCurrentIndex.textContent = String(currentCarouselIndex + 1);
        if (carouselDots) {
            const dots = carouselDots.querySelectorAll('.carousel-dot');
            dots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === currentCarouselIndex);
            });
        }
    };

    if (carouselPrevBtn) {
        carouselPrevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            updateCarouselPosition(currentCarouselIndex - 1);
        });
    }
    if (carouselNextBtn) {
        carouselNextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            updateCarouselPosition(currentCarouselIndex + 1);
        });
    }
    if (carouselDots) {
        carouselDots.addEventListener('click', (e) => {
            const dot = e.target.closest('.carousel-dot');
            if (dot && dot.dataset.gotoSlide !== undefined) {
                e.stopPropagation();
                updateCarouselPosition(parseInt(dot.dataset.gotoSlide, 10));
            }
        });
    }
    if (modalCarouselSlider) {
        let touchStartX = 0;
        let touchEndX = 0;
        modalCarouselSlider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        modalCarouselSlider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diffX = touchEndX - touchStartX;
            if (Math.abs(diffX) > 40 && currentCarouselSlides.length > 1) {
                if (diffX < 0) {
                    updateCarouselPosition(currentCarouselIndex + 1);
                } else {
                    updateCarouselPosition(currentCarouselIndex - 1);
                }
            }
        }, { passive: true });
    }

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

        if (modalProjectReelLink) {
            modalProjectReelLink.style.display = 'none';
            modalProjectReelLink.href = '#';
        }

        if (modalReelPoster) {
            modalReelPoster.src = '';
        }

        if (modalProjectImg) {
            modalProjectImg.src = '';
            modalProjectImg.style.display = 'none';
        }

        if (modalImageFrame) {
            modalImageFrame.style.display = 'none';
        }

        if (modalCarouselSlider) {
            modalCarouselSlider.style.display = 'none';
        }

        if (modalCarouselTrack) {
            modalCarouselTrack.innerHTML = '';
            modalCarouselTrack.style.transform = 'translateX(0%)';
        }

        currentCarouselSlides = [];
        currentCarouselIndex = 0;

        if (modalMediaWrapper) {
            modalMediaWrapper.classList.remove('aspect-9-16', 'aspect-16-9', 'aspect-image', 'aspect-portrait');
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

    // Reusable function untuk membuka modal detail proyek berdasarkan ID
    const openProjectById = (projectId) => {
        if (!projectModal) return;
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
        if (modalProjectReelLink) {
            modalProjectReelLink.style.display = 'none';
            modalProjectReelLink.href = '#';
        }
        if (modalReelPoster) {
            modalReelPoster.src = '';
        }
        if (modalProjectImg) {
            modalProjectImg.src = '';
            modalProjectImg.style.display = 'none';
        }
        if (modalImageFrame) {
            modalImageFrame.style.display = 'none';
        }
        if (modalCarouselSlider) {
            modalCarouselSlider.style.display = 'none';
        }
        if (modalCarouselTrack) {
            modalCarouselTrack.innerHTML = '';
            modalCarouselTrack.style.transform = 'translateX(0%)';
        }
        currentCarouselSlides = [];
        currentCarouselIndex = 0;
        if (modalMediaWrapper) {
            modalMediaWrapper.classList.remove('aspect-9-16', 'aspect-16-9', 'aspect-image', 'aspect-portrait');
        }

        // Deteksi platform dan format tautan
        const targetLink = project.link || project.liveUrl || '';
        let platform = 'default';
        if (targetLink.includes('instagram.com')) {
            platform = 'instagram';
        } else if (targetLink.includes('tiktok.com')) {
            platform = 'tiktok';
        } else if (project.youtubeId || targetLink.includes('youtube.com') || targetLink.includes('youtu.be')) {
            platform = 'youtube';
        } else if (project.category === 'UI/UX Design' || (targetLink && targetLink.includes('figma.com'))) {
            platform = 'design';
        }

        const isCarousel = project.videoType === 'carousel' || project.category === 'Social Carousel' || (Array.isArray(project.slides) && project.slides.length > 0);
        const isVisualDesignOrPhoto = !isCarousel && (project.videoType === 'image' || project.category === 'Photography' || project.category === 'Poster Design' || project.category === 'UI/UX Design' || project.category === 'Brand Identity');
        const isNativeVideo = !isCarousel && !isVisualDesignOrPhoto && Boolean(project.videoUrl) && (project.videoType === 'video' || !project.videoType);
        const isYouTube = !isCarousel && !isVisualDesignOrPhoto && project.videoType === 'youtube' && Boolean(project.youtubeId);
        const isVideoReel = !isCarousel && !isVisualDesignOrPhoto && !isNativeVideo && !isYouTube && (project.videoType === 'reel' || platform === 'tiktok' || (platform === 'instagram' && (project.category === 'Video Editing' || project.category === 'Videography')));
        const isVerticalReel = isVideoReel || project.aspectRatio === '9/16';
        const isPortraitFeed = project.aspectRatio === '3/4' || project.category === 'Social Carousel' || project.category === 'Poster Design' || project.category === 'Photography';

        if (modalMediaWrapper) {
            if (isCarousel || (isVisualDesignOrPhoto && isPortraitFeed)) {
                modalMediaWrapper.classList.add('aspect-portrait');
            } else if (isVideoReel || isVerticalReel) {
                modalMediaWrapper.classList.add('aspect-9-16');
            } else if (isNativeVideo || isYouTube || project.category === 'UI/UX Design') {
                modalMediaWrapper.classList.add('aspect-16-9');
            } else {
                modalMediaWrapper.classList.add('aspect-image');
            }
        }

        // Tampilkan media sesuai prioritas kebersihan & kualitas visual (zero external iframe chrome)
        if (isCarousel) {
            // Multi-Slide Instagram / Design Carousel Slider (No Play Button)
            currentCarouselSlides = Array.isArray(project.slides) && project.slides.length > 0 ? project.slides : [project.image];
            currentCarouselIndex = 0;

            if (modalCarouselTrack) {
                modalCarouselTrack.innerHTML = currentCarouselSlides.map((slideSrc, idx) => `
                    <div class="carousel-slide" data-slide-index="${idx}">
                        <img src="${slideSrc}" alt="${project.title || 'Slide'} - Slide ${idx + 1}" loading="lazy">
                    </div>
                `).join('');
                modalCarouselTrack.style.transform = 'translateX(0%)';
            }

            if (carouselTotalSlides) carouselTotalSlides.textContent = String(currentCarouselSlides.length);
            if (carouselCurrentIndex) carouselCurrentIndex.textContent = '1';

            if (carouselDots) {
                if (currentCarouselSlides.length > 1) {
                    carouselDots.style.display = 'flex';
                    carouselDots.innerHTML = currentCarouselSlides.map((_, idx) => `
                        <button type="button" class="carousel-dot ${idx === 0 ? 'active' : ''}" data-goto-slide="${idx}" aria-label="Buka slide ${idx + 1}"></button>
                    `).join('');
                } else {
                    carouselDots.style.display = 'none';
                }
            }

            if (carouselPrevBtn) carouselPrevBtn.style.display = currentCarouselSlides.length > 1 ? 'flex' : 'none';
            if (carouselNextBtn) carouselNextBtn.style.display = currentCarouselSlides.length > 1 ? 'flex' : 'none';
            if (carouselCounter) carouselCounter.style.display = currentCarouselSlides.length > 1 ? 'flex' : 'none';
            if (modalCarouselSlider) modalCarouselSlider.style.display = 'block';

            if (modalMediaBadgeText) {
                modalMediaBadgeText.textContent = `INSTAGRAM CAROUSEL (1080×1440 · ${currentCarouselSlides.length} SLIDES)`;
            }
        } else if (isVisualDesignOrPhoto) {
            // Static Design / Photography / Poster Showcase (Framed 1080x1440, NO PLAY BUTTON)
            if (modalProjectImg) {
                modalProjectImg.src = project.image || '';
                modalProjectImg.alt = project.title || 'Project Preview';
                modalProjectImg.style.display = 'block';
            }
            if (modalImageFrame) {
                modalImageFrame.style.display = 'flex';
            }
            if (modalMediaBadgeText) {
                if (project.category === 'Poster Design') {
                    modalMediaBadgeText.textContent = 'POSTER DESIGN (1080×1440)';
                } else if (project.category === 'Photography') {
                    modalMediaBadgeText.textContent = 'PHOTOGRAPHY (1080×1440)';
                } else if (project.category === 'UI/UX Design') {
                    modalMediaBadgeText.textContent = 'UI/UX PREVIEW';
                } else {
                    modalMediaBadgeText.textContent = 'DESIGN SHOWCASE';
                }
            }
        } else if (isNativeVideo) {
            // Native HTML5 Video
            if (modalProjectVideo) {
                modalProjectVideo.src = project.videoUrl;
                modalProjectVideo.poster = project.image || '';
                modalProjectVideo.style.display = 'block';
                modalProjectVideo.currentTime = 0;
                const playPromise = modalProjectVideo.play();
                if (playPromise !== undefined) {
                    playPromise.catch(() => {
                        modalProjectVideo.muted = true;
                        modalProjectVideo.play().catch(() => {});
                    });
                }
            }
            if (modalMediaBadgeText) {
                modalMediaBadgeText.textContent = isVerticalReel ? 'REELS PREVIEW (9:16)' : 'VIDEO PREVIEW (16:9)';
            }
        } else if (isYouTube) {
            // YouTube Embed
            if (modalProjectIframe) {
                modalProjectIframe.src = `https://www.youtube-nocookie.com/embed/${project.youtubeId}?autoplay=1&mute=0&rel=0`;
                modalProjectIframe.style.display = 'block';
            }
            if (modalMediaBadgeText) {
                modalMediaBadgeText.textContent = 'YOUTUBE 4K (16:9)';
            }
        } else if (isVideoReel) {
            // Clean Cinematic Reel Frame (Play Button for real video reels)
            if (modalProjectReelLink) {
                modalProjectReelLink.style.display = 'block';
                modalProjectReelLink.href = targetLink || '#';
            }
            if (modalReelPoster) {
                modalReelPoster.src = project.image || '';
                modalReelPoster.alt = project.title || 'Video Showcase';
            }
            if (modalReelCtaPlatform) {
                if (platform === 'tiktok') {
                    modalReelCtaPlatform.innerHTML = `
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.89-4.49V8.62a8.27 8.27 0 0 0 4.88 1.57V6.74a4.88 4.88 0 0 1-1-.05z"/>
                        </svg>
                        <span>Tonton di TikTok</span>
                    `;
                } else {
                    modalReelCtaPlatform.innerHTML = `
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                        <span>Tonton di Instagram Reel</span>
                    `;
                }
            }
            if (modalMediaBadgeText) {
                modalMediaBadgeText.textContent = platform === 'tiktok' ? 'TIKTOK VIDEO (9:16)' : (isVerticalReel ? 'INSTAGRAM REEL (9:16)' : 'INSTAGRAM (16:9)');
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

        // Render tombol tawaran platform langsung ("Tonton di Instagram / TikTok / YouTube")
        if (modalProjectUrl) {
            modalProjectUrl.classList.remove('btn-platform-instagram', 'btn-platform-tiktok', 'btn-platform-youtube');

            if (targetLink && targetLink !== '#') {
                modalProjectUrl.style.display = 'inline-flex';
                modalProjectUrl.href = targetLink;
                modalProjectUrl.target = '_blank';
                modalProjectUrl.rel = 'noopener noreferrer';

                let btnIconSvg = '';
                let btnText = 'Lihat Postingan Klien';

                if (platform === 'instagram') {
                    modalProjectUrl.classList.add('btn-platform-instagram');
                    btnText = isCarousel ? 'Lihat Carousel di Instagram' : (isVisualDesignOrPhoto ? 'Lihat di Instagram' : 'Tonton di Instagram Reel');
                    btnIconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>`;
                } else if (platform === 'tiktok') {
                    modalProjectUrl.classList.add('btn-platform-tiktok');
                    btnText = 'Tonton di TikTok';
                    btnIconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.89-4.49V8.62a8.27 8.27 0 0 0 4.88 1.57V6.74a4.88 4.88 0 0 1-1-.05z"/>
                    </svg>`;
                } else if (platform === 'youtube') {
                    modalProjectUrl.classList.add('btn-platform-youtube');
                    btnText = 'Tonton di YouTube';
                    btnIconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>`;
                } else if (platform === 'design') {
                    btnText = 'Buka Prototipe & Desain';
                    btnIconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                        <path d="M3 9h18"></path>
                        <path d="M9 21V9"></path>
                    </svg>`;
                } else {
                    btnText = 'Lihat Proyek Asli';
                    btnIconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>`;
                }

                modalProjectUrl.innerHTML = `
                    <span class="platform-icon-wrap">${btnIconSvg}</span>
                    <span>${btnText}</span>
                    <svg class="external-arrow" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 4px;">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                `;
            } else {
                modalProjectUrl.style.display = 'none';
            }
        }

        // Render Tombol Tautan Platform Sejajar Kategori (Header Badge)
        if (modalProjectUrlBadge) {
            modalProjectUrlBadge.classList.remove('btn-platform-instagram', 'btn-platform-tiktok', 'btn-platform-youtube', 'btn-platform-default');
            if (targetLink && targetLink !== '#') {
                modalProjectUrlBadge.style.display = 'inline-flex';
                modalProjectUrlBadge.href = targetLink;
                modalProjectUrlBadge.target = '_blank';
                modalProjectUrlBadge.rel = 'noopener noreferrer';

                let badgeIcon = '';
                let badgeText = 'Buka Tautan';

                if (platform === 'instagram') {
                    modalProjectUrlBadge.classList.add('btn-platform-instagram');
                    badgeText = isCarousel ? 'Lihat Carousel di IG' : (isVisualDesignOrPhoto ? 'Lihat di Instagram' : 'Tonton di Instagram');
                    badgeIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>`;
                } else if (platform === 'tiktok') {
                    modalProjectUrlBadge.classList.add('btn-platform-tiktok');
                    badgeText = 'Tonton di TikTok';
                    badgeIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.89-4.49V8.62a8.27 8.27 0 0 0 4.88 1.57V6.74a4.88 4.88 0 0 1-1-.05z"/>
                    </svg>`;
                } else if (platform === 'youtube') {
                    modalProjectUrlBadge.classList.add('btn-platform-youtube');
                    badgeText = 'Tonton di YouTube';
                    badgeIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>`;
                } else if (platform === 'design') {
                    modalProjectUrlBadge.classList.add('btn-platform-default');
                    badgeText = 'Buka Desain';
                    badgeIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                        <path d="M3 9h18"></path>
                        <path d="M9 21V9"></path>
                    </svg>`;
                } else {
                    modalProjectUrlBadge.classList.add('btn-platform-default');
                    badgeText = 'Lihat Proyek';
                    badgeIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>`;
                }

                modalProjectUrlBadge.innerHTML = `
                    <span class="platform-badge-icon">${badgeIcon}</span>
                    <span class="platform-badge-text">${badgeText}</span>
                    <svg class="external-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                `;
            } else {
                modalProjectUrlBadge.style.display = 'none';
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
    };

    // Event Delegation: Ketika .project-card diklik
    const workElem = document.getElementById('work');
    if (workElem && projectModal) {
        workElem.addEventListener('click', (e) => {
            const card = e.target.closest('.project-card');
            if (!card) return;
            openProjectById(card.dataset.id);
        });
    }

    // Event Delegation: Buka modal dari tombol atau media lain dengan [data-open-project-id]
    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-open-project-id]');
        if (trigger) {
            e.preventDefault();
            openProjectById(trigger.dataset.openProjectId);
        }
    });

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

    // Pengiriman form kontak ke email iechantwiranata@gmail.com (Universal untuk Modal & Subpages)
    const initContactFormHandler = (formId, btnId, nameId, contactInfoId, msgId, serviceId = null, modalEl = null) => {
        const formEl = document.getElementById(formId);
        const submitBtn = document.getElementById(btnId);
        if (!formEl || !submitBtn) return;

        formEl.addEventListener('submit', async (e) => {
            e.preventDefault();

            const nameInput = document.getElementById(nameId);
            const contactInput = document.getElementById(contactInfoId);
            const msgInput = document.getElementById(msgId);
            const serviceInput = serviceId ? document.getElementById(serviceId) : null;

            const name = nameInput ? nameInput.value.trim() : '';
            const contactInfo = contactInput ? contactInput.value.trim() : '';
            const message = msgInput ? msgInput.value.trim() : '';
            const service = serviceInput ? serviceInput.value : '';

            if (!name || !contactInfo || !message) return;

            const originalBtnHTML = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Mengirim Pesan...</span>';

            const payload = {
                name: name,
                contact: contactInfo,
                message: message,
                _subject: `New Portfolio Message from ${name}${service ? ` (${service})` : ''}`,
                _template: 'table'
            };
            if (service) payload.service = service;

            try {
                const response = await fetch('https://formsubmit.co/ajax/iechantwiranata@gmail.com', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                const data = await response.json();

                if (response.ok || data.success === 'true' || data.success === true) {
                    submitBtn.classList.add('success-state');
                    submitBtn.innerHTML = '<span>✓ Pesan Terkirim Sukses!</span>';

                    setTimeout(() => {
                        if (modalEl) closeModal(modalEl);
                        formEl.reset();
                        submitBtn.classList.remove('success-state');
                        submitBtn.innerHTML = originalBtnHTML;
                        submitBtn.disabled = false;
                    }, 2000);
                } else {
                    throw new Error('Service response not ok');
                }
            } catch (err) {
                console.warn('FormSubmit API fallback triggered:', err);
                submitBtn.classList.add('success-state');
                submitBtn.innerHTML = '<span>Membuka Email Client...</span>';

                const mailtoUrl = `mailto:iechantwiranata@gmail.com?subject=${encodeURIComponent('Portfolio Inquiry from ' + name + (service ? ' [' + service + ']' : ''))}&body=${encodeURIComponent('Nama: ' + name + '\nKontak (Email/WA): ' + contactInfo + (service ? '\nLayanan: ' + service : '') + '\n\nPesan:\n' + message)}`;
                window.location.href = mailtoUrl;

                setTimeout(() => {
                    if (modalEl) closeModal(modalEl);
                    formEl.reset();
                    submitBtn.classList.remove('success-state');
                    submitBtn.innerHTML = originalBtnHTML;
                    submitBtn.disabled = false;
                }, 1800);
            }
        });
    };

    // 1. Home Contact Modal Form
    initContactFormHandler('contact-form', 'contact-submit-btn', 'contact-name', 'contact-email', 'contact-message', null, contactModal);

    // 2. Cinema Subpage Contact Form
    initContactFormHandler('cinema-contact-form', 'cinema-submit-btn', 'cinema-name', 'cinema-email', 'cinema-msg', 'cinema-service', null);

    // 3. Design Subpage Contact Form
    initContactFormHandler('design-contact-form', 'design-submit-btn', 'design-name', 'design-email', 'design-msg', 'design-service', null);

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
    // 7.5 INTERACTIVE BEFORE & AFTER COLOR GRADING SLIDER
    // =========================================
    const initColorGradingSlider = () => {
        const stage = document.getElementById('comparison-stage');
        const handle = document.getElementById('comparison-slider-handle');
        const imgBefore = document.getElementById('comparison-img-before');
        const imgAfter = document.getElementById('comparison-img-after');
        const tabBtns = document.querySelectorAll('.grading-tab-btn');

        if (!stage || !handle || !imgBefore || !imgAfter) return;

        let isDragging = false;
        let currentPos = 50;

        const sceneData = {
            drone: {
                raw: 'images/grade-sans-drone-raw.webp',
                graded: 'images/grade-sans-drone-graded.webp'
            },
            court: {
                raw: 'images/grade-court-raw.webp',
                graded: 'images/grade-court-graded.webp'
            },
            urban: {
                raw: 'images/grade-urban-raw.webp',
                graded: 'images/grade-urban-graded.webp'
            }
        };

        const updateSliderPosition = (percent) => {
            const clamped = Math.max(0, Math.min(100, percent));
            currentPos = clamped;
            stage.style.setProperty('--split-pos', `${clamped}%`);
            handle.setAttribute('aria-valuenow', Math.round(clamped));
        };

        const handlePointerMove = (clientX) => {
            const rect = stage.getBoundingClientRect();
            if (rect.width <= 0) return;
            const relativeX = clientX - rect.left;
            const percent = (relativeX / rect.width) * 100;
            updateSliderPosition(percent);
        };

        stage.addEventListener('mousedown', (e) => {
            isDragging = true;
            handlePointerMove(e.clientX);
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            handlePointerMove(e.clientX);
        });

        window.addEventListener('mouseup', () => {
            isDragging = false;
        });

        stage.addEventListener('touchstart', (e) => {
            if (e.touches && e.touches.length > 0) {
                isDragging = true;
                handlePointerMove(e.touches[0].clientX);
            }
        }, { passive: true });

        window.addEventListener('touchmove', (e) => {
            if (!isDragging || !e.touches || e.touches.length === 0) return;
            handlePointerMove(e.touches[0].clientX);
        }, { passive: true });

        window.addEventListener('touchend', () => {
            isDragging = false;
        });

        handle.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                updateSliderPosition(currentPos - 4);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                updateSliderPosition(currentPos + 4);
            }
        });

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const sceneKey = btn.dataset.scene;
                if (!sceneData[sceneKey]) return;

                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                stage.style.opacity = '0.4';
                setTimeout(() => {
                    imgBefore.src = sceneData[sceneKey].raw;
                    imgAfter.src = sceneData[sceneKey].graded;
                    stage.style.opacity = '1';
                }, 80);
            });
        });

        updateSliderPosition(50);
    };

    initColorGradingSlider();

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

    // --- Global: Tutup modal ketika tombol 'Escape' ditekan & navigasi slide carousel ---
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
        } else if (projectModal && projectModal.classList.contains('active') && currentCarouselSlides.length > 1) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                updateCarouselPosition(currentCarouselIndex - 1);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                updateCarouselPosition(currentCarouselIndex + 1);
            }
        }
    });
});
