// data.js - Centralized Data for Multi-Page Dual-Concentration Portfolio

// =========================================================================
// SERVICES DATA (Cinema & Media vs Graphic & UI/UX Design)
// =========================================================================

export const cinemaServices = [
    {
        id: "cs1",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="6" width="14" height="12" rx="2"/>
            <path d="m22 8-4 4 4 4V8z"/>
            <line x1="6" y1="10" x2="6" y2="14"/>
            <line x1="9" y1="10" x2="9" y2="14"/>
        </svg>`,
        badge: "SHORT FORM & REELS",
        color: "cyan",
        title: "Video Editing & Motion Rhythms",
        description: "Mengolah video mentah menjadi tontonan berdaya pikat tinggi. Meliputi pacing ritmis, kinetic motion graphic, sound design immersif, dan adaptasi format vertikal (9:16) maupun widescreen (16:9).",
        category: "Video Editing",
        tools: ["Premiere Pro", "CapCut Pro", "After Effects"],
        link: "cinema.html#work"
    },
    {
        id: "cs2",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2a4 4 0 0 1 4 4"/>
            <path d="M8 6a4 4 0 0 1 4-4"/>
            <path d="M6.5 10A5.5 5.5 0 0 0 12 15.5 5.5 5.5 0 0 0 17.5 10"/>
            <path d="M12 15.5V20"/>
            <path d="M8 20h8"/>
            <circle cx="12" cy="10" r="2"/>
        </svg>`,
        badge: "AERIAL & 4K FOOTAGE",
        color: "sky",
        title: "Videography & Drone Cinematics",
        description: "Pengambilan gambar video 4K berkelas sinematik untuk kebutuhan komersial, dokumenter, profil korporasi, hingga aerial cinematography spektakuler menggunakan drone.",
        category: "Videography",
        tools: ["DJI Drone", "Sony 4K", "Gimbal Stabilizer"],
        link: "cinema.html#work"
    },
    {
        id: "cs3",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
            <circle cx="12" cy="13" r="3"/>
        </svg>`,
        badge: "PHOTO & RETOUCH",
        color: "emerald",
        title: "Photography & Creative Retouching",
        description: "Mengabadikan momen, produk, dan portret dengan komposisi dramatis. Didukung color grading profesional dan retouching mendalam menggunakan Adobe Lightroom & Photoshop.",
        category: "Photography",
        tools: ["Adobe Lightroom", "Photoshop", "High-End Retouch"],
        link: "cinema.html#work"
    },
    {
        id: "cs4",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 2a7 7 0 0 0 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 0 7-7z"/>
            <circle cx="12" cy="9" r="2.5"/>
        </svg>`,
        badge: "FILMIC COLOR & SOUND",
        color: "purple",
        title: "Color Grading & Soundscapes",
        description: "Menghidupkan atmosfer visual lewat palet warna terkalibrasi filmic (LUTs kustom, tone curve, skin-tone isolation) serta tata suara berlapis untuk memicu emosi penonton.",
        category: "Color & Sound",
        tools: ["DaVinci Resolve", "Color Science", "SFX Soundscapes"],
        link: "cinema.html#work"
    }
];

export const designServices = [
    {
        id: "ds1",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <path d="M3 9h18"/>
            <path d="M9 21V9"/>
        </svg>`,
        badge: "DIGITAL SYSTEMS",
        color: "indigo",
        title: "UI/UX & Interactive Design",
        description: "Merancang pengalaman digital dan antarmuka web/mobile yang intuitif, estetis, dan fungsional. Meliputi wireframing, interactive prototyping, dan pembuatan design system berskala.",
        category: "UI/UX Design",
        tools: ["Figma", "Design System", "Interactive Prototyping"],
        link: "design.html#work"
    },
    {
        id: "ds2",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="m12 19 7-7 3 3-7 7-3-3z"/>
            <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
            <path d="m2 2 7.586 7.586"/>
            <circle cx="11" cy="11" r="2"/>
        </svg>`,
        badge: "BRAND ARCHITECTURE",
        color: "amber",
        title: "Brand Identity & Visual Systems",
        description: "Membangun identitas visual brand yang kokoh dari nol. Mulai dari logo craft, palet warna berkarakter, panduan tipografi, hingga brand guideline book siap pakai.",
        category: "Brand Identity",
        tools: ["Illustrator", "Brand Guidelines", "Vector Craft"],
        link: "design.html#work"
    },
    {
        id: "ds3",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
            <circle cx="8" cy="8" r="1.5"/>
            <path d="M14 13l-3-3-5 5"/>
        </svg>`,
        badge: "SEAMLESS CAROUSEL",
        color: "rose",
        title: "Social Media Carousel Content",
        description: "Mendesain carousel edukatif dan promosi berslide banyak dengan visual hook kuat, alur baca terstruktur (*seamless swipe*), dan konversi tinggi bagi audiens Instagram & LinkedIn.",
        category: "Social Carousel",
        tools: ["Photoshop", "Canva Pro", "Content Hooks"],
        link: "design.html#work"
    },
    {
        id: "ds4",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 4h16v16H4z"/>
            <path d="M4 12h16"/>
            <path d="M12 4v16"/>
            <circle cx="8" cy="8" r="1.5"/>
        </svg>`,
        badge: "SWISS & MODERN POSTER",
        color: "teal",
        title: "Poster & Editorial Typography",
        description: "Eksplorasi tata letak poster komersial dan eksperimental bergaya Neo-Brutalism, Swiss Typography, maupun modern cyberpunk untuk konser musik, exhibition, dan promosi event.",
        category: "Poster Design",
        tools: ["CorelDraw", "Photoshop", "Editorial Layout"],
        link: "design.html#work"
    }
];

export const servicesData = [...cinemaServices, ...designServices];

// =========================================================================
// PROJECTS DATA (Cinema & Media Track vs Graphic & UI/UX Track)
// =========================================================================

export const cinemaProjects = [
    {
        id: 1,
        title: "Promosi Video & Reels Falisha Laundry",
        category: "Video Editing",
        subCategory: "Reels & Short Form",
        tag: "SHORT FORM CONTENT",
        client: "Falisha Laundry & Care",
        image: "images/project-laundry.jpg",
        videoType: "video",
        videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        aspectRatio: "9/16",
        description: "Editing video vertikal ritmis cepat dengan motion grafik kinetik dan sound design punchy untuk kampanye media sosial klien.",
        tags: ["CapCut Pro", "Premiere Pro", "Sound Design", "Reels"],
        specs: {
            software: "CapCut Pro & Premiere",
            format: "9:16 Vertical Reel (1080x1920)",
            scope: "Beat-Sync, Motion & SFX"
        },
        link: "https://www.instagram.com/san_mhmd17/",
        liveUrl: "https://www.instagram.com/san_mhmd17/"
    },
    {
        id: 2,
        title: "Dokumentasi Sinematik & Drone Kotagede",
        category: "Videography",
        subCategory: "Videography & Drone",
        tag: "COMMERCIAL / DRONE",
        client: "Dinas Pariwisata & Budaya",
        image: "images/project-drone.jpg",
        videoType: "youtube",
        youtubeId: "5qap5aO4i9A",
        aspectRatio: "16/9",
        description: "Pengambilan video udara menggunakan drone 4K dan color grading sinematik untuk proyek kultural warisan arsitektur kuno Kotagede.",
        tags: ["DJI Drone", "Videography", "DaVinci Resolve", "4K Footage"],
        specs: {
            software: "DaVinci Resolve & Premiere",
            format: "16:9 Widescreen (4K UHD)",
            scope: "Aerial Drone & Color Grade"
        },
        link: "https://www.youtube.com/watch?v=5qap5aO4i9A",
        liveUrl: "https://www.youtube.com/watch?v=5qap5aO4i9A"
    },
    {
        id: 3,
        title: "Commercial Product Reels - Fashion Streetwear",
        category: "Video Editing",
        subCategory: "Commercial & Fashion",
        tag: "COMMERCIAL REELS",
        client: "Urban Pulse Apparel",
        image: "images/project-fashion.jpg",
        videoType: "video",
        videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        aspectRatio: "9/16",
        description: "Video promosi produk fashion streetwear dengan transisi speed-ramp dinamis, typography kinetic, dan beat sync yang adiktif.",
        tags: ["Premiere Pro", "Beat Sync", "Commercial", "Streetwear"],
        specs: {
            software: "Adobe Premiere Pro",
            format: "9:16 Vertical Reel",
            scope: "Speed Ramp & Kinetic Type"
        },
        link: "https://www.instagram.com/san_mhmd17/",
        liveUrl: "https://www.instagram.com/san_mhmd17/"
    },
    {
        id: 4,
        title: "Company Profile & Event Highlight Batik Heritage",
        category: "Videography",
        subCategory: "Videography & Drone",
        tag: "COMPANY PROFILE",
        client: "Yayasan Batik Nusantara",
        image: "images/project-event.jpg",
        videoType: "youtube",
        youtubeId: "5qap5aO4i9A",
        aspectRatio: "16/9",
        description: "Liputan video sinematik pameran kebudayaan dan profil workshop batik dengan wawancara narasumber serta aerial b-roll berkelas.",
        tags: ["Videography", "Cinematic", "Event Highlight", "Color Grade"],
        specs: {
            software: "Premiere Pro & After Effects",
            format: "16:9 Cinematic (4K UHD)",
            scope: "Full Production & Interview"
        },
        link: "https://www.youtube.com/watch?v=5qap5aO4i9A",
        liveUrl: "https://www.youtube.com/watch?v=5qap5aO4i9A"
    },
    {
        id: 5,
        title: "Dokumentasi Landscape & Human Interest",
        category: "Photography",
        subCategory: "Photography & Retouch",
        tag: "PHOTO STORY",
        client: "Editorial Cultural Project",
        image: "images/project-photography.jpg",
        videoType: "image",
        aspectRatio: "16/9",
        description: "Sesi foto lanskap pesisir dan potret aktivitas pengrajin lokal dengan color retouching hangat dan berkarakter menggunakan Lightroom.",
        tags: ["Photography", "Lightroom", "Human Interest", "Color Retouch"],
        specs: {
            software: "Adobe Lightroom Classic",
            format: "RAW to High-Res JPEG",
            scope: "Composition & Warm Retouch"
        },
        link: "https://www.instagram.com/san_mhmd17/",
        liveUrl: "https://www.instagram.com/san_mhmd17/"
    },
    {
        id: 6,
        title: "Cinematic Mood & Urban Night Retouching",
        category: "Photography",
        subCategory: "Photography & Retouch",
        tag: "COLOR RETOUCH",
        client: "Personal Editorial Series",
        image: "images/project-branding.jpg",
        videoType: "image",
        aspectRatio: "16/9",
        description: "Eksplorasi fotografi malam kota dengan penekanan pada neon reflections, moody contrast curves, dan koreksi warna kulit natural.",
        tags: ["Photoshop", "Lightroom", "Night Portrait", "Color Grading"],
        specs: {
            software: "Lightroom & Photoshop",
            format: "Sony RAW High-Dynamic",
            scope: "Cyberpunk Mood Grading"
        },
        link: "https://www.instagram.com/san_mhmd17/",
        liveUrl: "https://www.instagram.com/san_mhmd17/"
    }
];

export const designProjects = [
    {
        id: 101,
        title: "Maslahah Mobile App UI/UX & Finance Dashboard",
        category: "UI/UX Design",
        subCategory: "UI/UX Design",
        tag: "MOBILE APP / PRODUCT",
        client: "Maslahah Financial Tech",
        image: "images/Mockup maslahah.png",
        videoType: "image",
        aspectRatio: "16/9",
        description: "Perancangan UI/UX aplikasi keuangan berbasis syariah yang bersih dan inklusif. Dilengkapi design system komprehensif, arsitektur informasi teruji, dan prototipe interaktif.",
        tags: ["Figma", "Design System", "Mobile UX", "Financial Tech"],
        specs: {
            software: "Figma & ProtoPie",
            format: "Interactive Prototype & Mobile Screen",
            scope: "End-to-End UI/UX & Token System"
        },
        link: "https://www.instagram.com/san_mhmd17/",
        liveUrl: "https://www.instagram.com/san_mhmd17/"
    },
    {
        id: 102,
        title: "Branding Visual & Social Media Kit Kopi Senja",
        category: "Brand Identity",
        subCategory: "Brand Identity",
        tag: "BRAND IDENTITY",
        client: "Kopi Senja Artisan Cafe",
        image: "images/project-branding.jpg",
        videoType: "image",
        aspectRatio: "16/9",
        description: "Desain identitas brand visual, feed Instagram aesthetic, banner promosi, dan packaging ramah lingkungan untuk kedai kopi artisan modern.",
        tags: ["Photoshop", "CorelDraw", "Brand Guidelines", "Packaging"],
        specs: {
            software: "Photoshop & CorelDraw",
            format: "Vector & High-Res PNG",
            scope: "Logo, Brand Guidelines & Feed"
        },
        link: "https://www.instagram.com/san_mhmd17/",
        liveUrl: "https://www.instagram.com/san_mhmd17/"
    },
    {
        id: 103,
        title: "High-Engagement Educational Carousel Series",
        category: "Social Carousel",
        subCategory: "Social Media Carousel",
        tag: "CAROUSEL DESIGN",
        client: "Digital Growth Academy",
        image: "images/project-fashion.jpg",
        videoType: "image",
        aspectRatio: "9/16",
        description: "Rangkaian carousel 7-slide dengan micro-copywriting menarik, tipografi tebal terstruktur, dan ilustrasi modern yang menaikkan save & share hingga 300%.",
        tags: ["Canva Pro", "Photoshop", "Carousel", "Social Media"],
        specs: {
            software: "Adobe Photoshop & Canva Pro",
            format: "4:5 Portrait Carousel (1080x1350)",
            scope: "Hook Title, Body Slides & CTA End"
        },
        link: "https://www.instagram.com/san_mhmd17/",
        liveUrl: "https://www.instagram.com/san_mhmd17/"
    },
    {
        id: 104,
        title: "Neo-Brutalist Music & Art Festival Poster Series",
        category: "Poster Design",
        subCategory: "Poster & Editorial",
        tag: "POSTER DESIGN",
        client: "Indie Soundwave Festival",
        image: "images/project-event.jpg",
        videoType: "image",
        aspectRatio: "9/16",
        description: "Eksplorasi poster bergaya Neo-Brutalism dengan kontras tinggi, grid asimetris, dan kombinasi font sans-serif & serif modern untuk promosi konser musik.",
        tags: ["Photoshop", "Illustrator", "Typography", "Poster"],
        specs: {
            software: "Adobe Photoshop & Illustrator",
            format: "A3 High-Res Print & Digital Web",
            scope: "Custom Layout & Typography"
        },
        link: "https://www.instagram.com/san_mhmd17/",
        liveUrl: "https://www.instagram.com/san_mhmd17/"
    },
    {
        id: 105,
        title: "Visual Identity System & Collateral for Studio Arch",
        category: "Brand Identity",
        subCategory: "Brand Identity",
        tag: "BRAND IDENTITY",
        client: "Studio Arch Atelier",
        image: "images/project-drone.jpg",
        videoType: "image",
        aspectRatio: "16/9",
        description: "Pembuatan sistem identitas visual minimalis untuk biro arsitektur terkemuka: logo mark geometris, kartu nama eksklusif, kop surat, dan company deck.",
        tags: ["CorelDraw", "Illustrator", "Corporate Identity"],
        specs: {
            software: "CorelDraw & Adobe Illustrator",
            format: "Vector SVG, PDF & Print Assets",
            scope: "Logo Suite & Business Stationery"
        },
        link: "https://www.instagram.com/san_mhmd17/",
        liveUrl: "https://www.instagram.com/san_mhmd17/"
    },
    {
        id: 106,
        title: "Clean E-Commerce Checkout Experience & UI Kit",
        category: "UI/UX Design",
        subCategory: "UI/UX Design",
        tag: "UI/UX / WEB APP",
        client: "Luxe Retail Store",
        image: "images/project-laundry.jpg",
        videoType: "image",
        aspectRatio: "16/9",
        description: "Redesain alur checkout dan product detail page untuk brand ritel guna mereduksi cart abandonment dan menyajikan pengalaman belanja mewah.",
        tags: ["Figma", "User Journey", "Conversion UX", "Micro-Interactions"],
        specs: {
            software: "Figma",
            format: "Auto-layout UI Kit & Component Library",
            scope: "Checkout Flow & Responsive Layout"
        },
        link: "https://www.instagram.com/san_mhmd17/",
        liveUrl: "https://www.instagram.com/san_mhmd17/"
    }
];

// Curated 6 projects for Gateway Landing Page
export const projectsData = [
    cinemaProjects[0], // Falisha Laundry (Video Reels)
    designProjects[0], // Maslahah App UI/UX
    cinemaProjects[1], // Kotagede Drone & Cinematic
    designProjects[1], // Kopi Senja Brand Identity
    cinemaProjects[2], // Fashion Commercial Reels
    designProjects[2]  // Social Media Carousel
];

// =========================================================================
// STATS & TESTIMONIALS
// =========================================================================

export const statsData = [
    { label: "Projects Completed", value: "25+" },
    { label: "Years Experience", value: "3+" },
    { label: "Client Satisfaction", value: "99%" }
];

export const statsDataCinema = [
    { label: "Video Projects Delivered", value: "30+" },
    { label: "Total Views Generated", value: "1.2M+" },
    { label: "Cinematic 4K Productions", value: "15+" }
];

export const statsDataDesign = [
    { label: "Brand Systems Designed", value: "18+" },
    { label: "UI/UX Screens & Flows", value: "120+" },
    { label: "Posters & Carousels Created", value: "50+" }
];

export const testimonialsDataCinema = [
    {
        id: "tc1",
        quote: "Hasil editing Reels dari Mas Ikhsan luar biasa dinamis! Transisi rapi, ritme audio dan motion grafik pas banget dengan karakter brand kami. Engagement naik signifikan.",
        name: "Rian Pratama",
        role: "Brand Owner & Creator Falisha",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    },
    {
        id: "tc2",
        quote: "Kualitas pengambilan video dan aerial drone-nya bener-bener sinematik. Angle-nya berkelas dan proses koordinasi revisi sangat komunikatif dan cepat.",
        name: "Dimas Setiawan",
        role: "Event & Commercial Producer",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    }
];

export const testimonialsDataDesign = [
    {
        id: "td1",
        quote: "Sangat puas dengan desain visual dan branding-nya. Komposisi warna dan estetikanya modern, benar-benar mengeksekusi konsep yang kami butuhkan.",
        name: "Anisa Maharani",
        role: "Marketing Lead UMKM",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
    },
    {
        id: "td2",
        quote: "Desain UI/UX Maslahah rapi banget! Alur flow jelas, prototipe interaktifnya memudahkan tim developer, dan tampilannya sangat clean & profesional.",
        name: "Fajar Hidayat",
        role: "Product Manager Tech Startup",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
    }
];

export const testimonialsData = [
    testimonialsDataCinema[0],
    testimonialsDataDesign[0],
    testimonialsDataCinema[1]
];
