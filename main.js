import { servicesData, projectsData, statsData, testimonialsData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // 1. MOBILE MENU TOGGLE
    // =========================================
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    // We also select the contact button if we want to show it inside mobile menu
    const contactBtn = document.querySelector('.navbar > .container > .btn');

    mobileBtn.addEventListener('click', () => {
        mobileBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        if (contactBtn) contactBtn.classList.toggle('active');
    });

    // =========================================
    // SCROLL REVEAL — IntersectionObserver
    // (Dideklarasi di sini agar bisa dipakai oleh semua render di bawah)
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
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        });

        document.querySelectorAll('.reveal:not(.active)').forEach(el => {
            revealObserver.observe(el);
        });
    };

    // =========================================
    // 2. RENDER SERVICES SECTION
    // =========================================
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
        let servicesHTML = `
            <div class="section-header reveal flex-col items-center text-center gap-sm">
                <h2 class="section-title">Our <span class="text-accent">Services</span></h2>
                <p class="text-muted max-w-md">We offer a wide range of digital services to help your business grow and stand out in the digital landscape.</p>
            </div>
            <div class="grid grid-cols-2 gap-md services-grid mt-lg">
        `;

        servicesData.forEach((service, i) => {
            servicesHTML += `
                <div class="service-card reveal reveal-delay-${(i % 4) + 1} bg-card rounded-card">
                    <div class="service-icon text-accent">✦</div>
                    <h3 class="service-title">${service.title}</h3>
                    <p class="service-desc text-muted">${service.description}</p>
                    <a href="${service.link}" class="service-link text-accent">Learn more →</a>
                </div>
            `;
        });

        servicesHTML += `</div>`;
        servicesSection.innerHTML = servicesHTML;
    }

    // =========================================
    // 3. RENDER PROJECTS (WORK) SECTION WITH FILTERS
    // =========================================
    const workSection = document.getElementById('work');
    if (workSection) {
        workSection.innerHTML = `
            <div class="section-header reveal flex-col items-center text-center mt-xl mb-lg gap-sm">
                <h2 class="section-title">Projects We're <span class="text-accent">Proud Of</span></h2>
                <div class="project-filters flex gap-sm flex-wrap justify-center mt-md">
                    <button class="filter-btn active" data-filter="All">All</button>
                    <button class="filter-btn" data-filter="Web Design">Web Design</button>
                    <button class="filter-btn" data-filter="Development">Development</button>
                    <button class="filter-btn" data-filter="Branding">Branding</button>
                </div>
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
                    filteredData = projectsData.filter(p => {
                        // Gabungkan Web Application & Web Development ke Development
                        if (filterCategory === 'Development') {
                            return p.category.includes('Development') || p.category.includes('Application');
                        }
                        return p.category.includes(filterCategory);
                    });
                }

                projectsContainer.innerHTML = filteredData.map((project, i) => `
                    <div class="project-card reveal reveal-delay-${(i % 4) + 1} rounded-card" data-id="${project.id}" style="cursor: pointer;">
                        <div class="project-image-wrapper">
                            <img src="${project.image}" alt="${project.title}" class="project-image" loading="lazy">
                        </div>
                        <div class="project-content">
                            <span class="project-category text-accent">${project.category}</span>
                            <h3 class="project-title">${project.title}</h3>
                            <div class="project-tags flex gap-sm flex-wrap mt-sm">
                                ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
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
                e.target.classList.add('active');
                renderProjects(e.target.dataset.filter);
            });
        });
    }

    // =========================================
    // 4. RENDER IMPACT SECTION
    // =========================================
    const impactSection = document.getElementById('impact');
    if (impactSection) {
        let impactHTML = `
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
        gridEl.style.borderTop = "1px solid rgba(255,255,255,0.05)";
        gridEl.style.borderBottom = "1px solid rgba(255,255,255,0.05)";
        gridEl.style.paddingBlock = "60px";
    }

    // =========================================
    // 5. RENDER TESTIMONIALS SECTION
    // =========================================
    const testimonialsSection = document.getElementById('testimonials');
    if (testimonialsSection) {
        let trackHTML = testimonialsData.map(testi => `
            <div class="testimonial-card">
                <div class="quote-icon">"</div>
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
            <div class="section-header reveal flex-col items-center text-center mb-lg">
                <h2 class="section-title">Client <span class="text-accent">Testimonials</span></h2>
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
    document.querySelectorAll('.trusted-by, .cta-box').forEach(el => {
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
    if (projectsContainer && projectModal) {
        projectsContainer.addEventListener('click', (e) => {
            const card = e.target.closest('.project-card');
            if (!card) return;

            const projectId = card.dataset.id;
            const project = projectsData.find(p => p.id === projectId);
            if (!project) return;

            // Isi konten modal
            modalProjectImg.src = project.image;
            modalProjectImg.alt = project.title;
            modalProjectCategory.textContent = project.category;
            modalProjectTitle.textContent = project.title;
            modalProjectDesc.textContent = project.description || 'Proyek portofolio unggulan dengan arsitektur modern dan performa tinggi.';
            modalProjectUrl.href = project.liveUrl || '#';

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

    // Trigger tombol "Let's Talk" di navbar atau CTA banner
    document.querySelectorAll('a[href="#contact"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(contactModal);
        });
    });

    // Simulasi pengiriman form kontak
    if (contactForm && contactSubmitBtn) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Ubah state tombol ke proses pengiriman
            const originalText = contactSubmitBtn.innerHTML;
            contactSubmitBtn.disabled = true;
            contactSubmitBtn.innerHTML = '<span>Sending Message...</span>';

            setTimeout(() => {
                // Notifikasi sukses
                contactSubmitBtn.classList.add('success-state');
                contactSubmitBtn.innerHTML = '<span>✓ Message Sent Successfully!</span>';

                // Reset form & tutup modal setelah delay singkat
                setTimeout(() => {
                    closeModal(contactModal);
                    contactForm.reset();
                    contactSubmitBtn.classList.remove('success-state');
                    contactSubmitBtn.innerHTML = originalText;
                    contactSubmitBtn.disabled = false;
                }, 1800);
            }, 1000);
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
        }
    });
});
