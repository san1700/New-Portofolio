import { servicesData, projectsData, statsData } from './data.js';

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
    // 2. RENDER SERVICES SECTION
    // =========================================
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
        let servicesHTML = `
            <div class="section-header flex-col items-center text-center gap-sm">
                <h2 class="section-title">Our <span class="text-accent">Services</span></h2>
                <p class="text-muted max-w-md">We offer a wide range of digital services to help your business grow and stand out in the digital landscape.</p>
            </div>
            <div class="grid grid-cols-2 gap-md services-grid mt-lg">
        `;
        
        servicesData.forEach(service => {
            servicesHTML += `
                <div class="service-card bg-card rounded-card">
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
    // 3. RENDER PROJECTS (WORK) SECTION
    // =========================================
    const workSection = document.getElementById('work');
    if (workSection) {
        let projectsHTML = `
            <div class="section-header flex items-center justify-between mt-xl mb-lg">
                <h2 class="section-title">Selected <span class="text-accent">Work</span></h2>
                <a href="#work" class="btn btn-secondary rounded-pill">View All</a>
            </div>
            <div class="grid grid-cols-2 gap-lg projects-grid">
        `;
        
        projectsData.forEach(project => {
            // Mapping tag array to span elements
            const tagsHTML = project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('');
            
            projectsHTML += `
                <div class="project-card rounded-card">
                    <div class="project-image-wrapper">
                        <img src="${project.image}" alt="${project.title}" class="project-image" loading="lazy">
                    </div>
                    <div class="project-content">
                        <span class="project-category text-accent">${project.category}</span>
                        <h3 class="project-title">${project.title}</h3>
                        <div class="project-tags flex gap-sm flex-wrap mt-sm">
                            ${tagsHTML}
                        </div>
                    </div>
                </div>
            `;
        });
        
        projectsHTML += `</div>`;
        workSection.innerHTML = projectsHTML;
    }
    
    // (Opsional) 4. RENDER STATS BISA DITAMBAHKAN DI SINI
});
