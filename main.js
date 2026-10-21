import { servicesData, projectsData, statsData, testimonialsData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // 0. LENIS SMOOTH SCROLLING (MOTIONSITES / FRAMER TOUCH)
    // =========================================
    let lenis = null;
    if (typeof Lenis !== 'undefined') {
        lenis = new Lenis({
            duration: 1.2,
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

        // Smooth scroll for internal anchor links (excluding showreel/modal triggers)
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href && href !== '#' && href !== '#showreel' && href !== '#contact' && !this.hasAttribute('data-showreel-trigger')) {
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        lenis.scrollTo(target, { offset: -24, duration: 1.2 });
                    }
                }
            });
        });
    }

    // =========================================
    // 1. MOBILE MENU TOGGLE
    // =========================================
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            mobileBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile drawer when clicking a navigation link
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileBtn.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

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
    };

    // Trigger immediate observer for hero & elements in initial viewport
    observeRevealElements();
    setTimeout(observeRevealElements, 80);

    // =========================================
    // 2. RENDER SERVICES SECTION (Ohio Agency Style)
    // =========================================
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
        let servicesHTML = `
            <div class="section-header-split reveal">
                <div class="section-header-left">
                    <div class="section-eyebrow">
                        <span class="eyebrow-num">03 //</span>
                        <span class="eyebrow-text">EXPERTISE &amp; CAPABILITIES</span>
                    </div>
                    <h2 class="section-title">Creative <span class="title-serif text-accent">Services</span></h2>
                </div>
                <div class="section-header-right">
                    <p class="section-lead-desc text-muted">
                        Layanan produksi visual terpadu — dari editing reels dinamis, pengambilan gambar drone sinematik, hingga identitas desain grafis berdaya saing global.
                    </p>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-md services-grid mt-lg">
        `;

        servicesData.forEach((service, i) => {
            const indexStr = String(i + 1).padStart(2, '0');
            servicesHTML += `
                <div class="service-card reveal reveal-delay-${(i % 4) + 1} bg-card rounded-card">
                    <div class="service-top-bar flex items-center justify-between">
                        <div class="service-icon">${service.icon || '✦'}</div>
                        <span class="service-index">// ${indexStr}</span>
                    </div>
                    <h3 class="service-title">${service.title}</h3>
                    <p class="service-desc text-muted">${service.description}</p>
                    <a href="${service.link}" target="_blank" rel="noopener" class="service-link text-accent">
                        Lihat Portofolio <span class="link-arrow">↗</span>
                    </a>
                </div>
            `;
        });

        servicesHTML += `</div>`;
        servicesSection.innerHTML = servicesHTML;
    }

    // =========================================
    // 3. RENDER PROJECTS (WORK) SECTION WITH FILTERS (Ohio Agency Style)
    // =========================================
    const workSection = document.getElementById('work');
    if (workSection) {
        const countAll = projectsData.length;
        const countVideoEditing = projectsData.filter(p => p.category === 'Video Editing').length;
        const countVideography = projectsData.filter(p => p.category === 'Videography').length;
        const countDesign = projectsData.filter(p => p.category === 'Graphic Design').length;
        const countPhoto = projectsData.filter(p => p.category === 'Photography').length;

        workSection.innerHTML = `
            <div class="section-header-split reveal mt-xl mb-lg">
                <div class="section-header-left">
                    <div class="section-eyebrow">
                        <span class="eyebrow-num">04 //</span>
                        <span class="eyebrow-text">CURATED PORTFOLIO</span>
                    </div>
                    <h2 class="section-title">Selected <span class="title-serif text-accent">Works</span></h2>
                </div>
                <div class="section-header-right">
                    <p class="section-lead-desc text-muted">
                        Koleksi karya visual pilihan berfokus pada storytelling ritmis, estetika sinematik, dan dampak engagement nyata bagi brand.
                    </p>
                </div>
            </div>
            <div class="project-filters flex gap-sm flex-wrap justify-start mb-lg">
                <button class="filter-btn active" data-filter="All">All <span class="filter-count">${countAll}</span></button>
                <button class="filter-btn" data-filter="Video Editing">Video Editing <span class="filter-count">${countVideoEditing}</span></button>
                <button class="filter-btn" data-filter="Videography">Videography <span class="filter-count">${countVideography}</span></button>
                <button class="filter-btn" data-filter="Graphic Design">Graphic Design <span class="filter-count">${countDesign}</span></button>
                <button class="filter-btn" data-filter="Photography">Photography <span class="filter-count">${countPhoto}</span></button>
            </div>
            <div class="grid grid-cols-2 gap-lg projects-grid" id="projects-container" style="transition: opacity 0.3s ease;"></div>
        `;

        const projectsContainer = document.getElementById('projects-container');
        const filterBtns = document.querySelectorAll('.filter-btn');

        const renderProjects = (filterCategory) => {
            // Fade out
            projectsContainer.style.opacity = 0;

            setTimeout(() => {
                let filteredData = projectsData;

                if (filterCategory !== 'All') {
                    filteredData = projectsData.filter(p => p.category === filterCategory);
                }

                projectsContainer.innerHTML = filteredData.map((project, i) => `
                    <div class="project-card reveal reveal-delay-${(i % 4) + 1} rounded-card" data-id="${project.id}" style="cursor: pointer;">
                        <div class="project-image-wrapper">
                            <img src="${project.image}" alt="${project.title}" class="project-image" loading="lazy" onerror="this.style.opacity='0';">
                            <span class="project-badge-tag">${project.tag || project.category}</span>
                            <div class="project-overlay-trigger">
                                <span class="trigger-circle">
                                    <span class="trigger-arrow">↗</span>
                                </span>
                            </div>
                        </div>
                        <div class="project-content">
                            <div class="project-meta-row flex items-center justify-between">
                                <span class="project-category text-accent">${project.category}</span>
                                <span class="project-year">// 2026</span>
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
                `).join('');

                // Re-observe newly injected .reveal elements
                observeRevealElements();

                // Fade in
                projectsContainer.style.opacity = 1;
            }, 300); // Waktu yang sama dengan transition CSS di atas
        };

        // Render awal semua projek
        renderProjects('All');

        // Logic ketika filter diklik
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filterBtns.forEach(b => b.classList.remove('active'));
                const targetBtn = e.target.closest('.filter-btn');
                if (targetBtn) {
                    targetBtn.classList.add('active');
                    renderProjects(targetBtn.dataset.filter);
                }
            });
        });
    }

    // =========================================
    // 4. RENDER IMPACT SECTION (Ohio Agency Style)
    // =========================================
    const impactSection = document.getElementById('impact');
    if (impactSection) {
        let impactHTML = `
            <div class="section-header-split reveal mb-lg">
                <div class="section-header-left">
                    <div class="section-eyebrow">
                        <span class="eyebrow-num">05 //</span>
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

        statsData.forEach(stat => {
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
        gridEl.style.borderTop = "1px solid rgba(255,255,255,0.08)";
        gridEl.style.borderBottom = "1px solid rgba(255,255,255,0.08)";
        gridEl.style.paddingBlock = "60px";
    }

    // =========================================
    // 5. RENDER TESTIMONIALS SECTION (Ohio Agency Style)
    // =========================================
    const testimonialsSection = document.getElementById('testimonials');
    if (testimonialsSection) {
        let trackHTML = testimonialsData.map(testi => `
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
                        <span class="eyebrow-num">06 //</span>
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

        let currentIndex = 0;
        const totalTestimonials = testimonialsData.length;

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
    const modalProjectImg = document.getElementById('modal-project-img');
    const modalProjectCategory = document.getElementById('modal-project-category');
    const modalProjectTitle = document.getElementById('modal-project-title');
    const modalProjectTags = document.getElementById('modal-project-tags');
    const modalProjectDesc = document.getElementById('modal-project-desc');
    const modalProjectUrl = document.getElementById('modal-project-url');

    if (closeProjectModalBtn && projectModal) {
        closeProjectModalBtn.addEventListener('click', () => closeModal(projectModal));

        // Tutup saat area luar modal (backdrop) diklik
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                closeModal(projectModal);
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
            const project = projectsData.find(p => String(p.id) === String(projectId));
            if (!project) return;

            // Isi konten modal
            modalProjectImg.src = project.image;
            modalProjectImg.alt = project.title;
            modalProjectCategory.textContent = project.category;
            modalProjectTitle.textContent = project.title;
            modalProjectDesc.textContent = project.description || 'Proyek portofolio unggulan dengan arsitektur modern dan performa tinggi.';

            // Render dinamis tombol tautan eksternal ("Lihat Postingan Klien")
            const targetLink = project.link || project.liveUrl || '';
            if (modalProjectUrl) {
                if (targetLink && targetLink !== '#') {
                    modalProjectUrl.style.display = 'inline-flex';
                    modalProjectUrl.href = targetLink;
                    modalProjectUrl.target = '_blank';
                    modalProjectUrl.rel = 'noopener noreferrer';

                    // Label tombol dinamis sesuai platform atau kategori
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

            modalProjectTags.innerHTML = (project.tags || [])
                .map(tag => `<span class="project-tag">${tag}</span>`)
                .join('');

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

    // Trigger tombol "Let's Talk" di navbar, CTA banner, atau tombol lainnya
    document.addEventListener('click', (e) => {
        const contactTrigger = e.target.closest('a[href="#contact"]');
        if (contactTrigger) {
            e.preventDefault();
            openModal(contactModal);
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
                closeModal(projectModal);
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
