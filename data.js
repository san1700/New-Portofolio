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
            <circle cx="7" cy="6" r="3"/>
            <circle cx="15" cy="6" r="3"/>
            <rect x="3" y="10" width="14" height="10" rx="2"/>
            <path d="m17 13 5-3v8l-5-3"/>
            <circle cx="7" cy="6" r="1"/>
            <circle cx="15" cy="6" r="1"/>
        </svg>`,
        badge: "COMMERCIAL & 4K",
        color: "sky",
        title: "Commercial Videography",
        description: "Pengambilan gambar video 4K berkelas sinematik untuk kebutuhan komersial, dokumenter, profil korporasi, dan visual branding dengan komposisi terarah serta pencahayaan presisi.",
        category: "Videography",
        tools: ["Sony 4K", "Cinema Rig", "Gimbal Stabilizer"],
        link: "cinema.html#work"
    },
    {
        id: "cs-drone",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="6" height="6" rx="1.5"/>
            <circle cx="12" cy="12" r="1.2"/>
            <line x1="9.5" y1="9.5" x2="6.5" y2="6.5"/>
            <line x1="14.5" y1="9.5" x2="17.5" y2="6.5"/>
            <line x1="9.5" y1="14.5" x2="6.5" y2="17.5"/>
            <line x1="14.5" y1="14.5" x2="17.5" y2="17.5"/>
            <circle cx="5.5" cy="5.5" r="2.8"/>
            <circle cx="18.5" cy="5.5" r="2.8"/>
            <circle cx="5.5" cy="18.5" r="2.8"/>
            <circle cx="18.5" cy="18.5" r="2.8"/>
        </svg>`,
        badge: "AERIAL & 4K DRONE",
        color: "blue",
        title: "Drone Pilot",
        description: "Perekaman visual udara (aerial cinematography) dengan pergerakan kamera dinamis, lanskap spektakuler, dan resolusi 4K untuk perspektif sinematik yang megah dan berdaya pikat.",
        category: "Videography",
        tools: ["DJI Drone", "4K Aerial", "Flight Certified"],
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
        description: "Mendesain carousel edukatif dan promosi berslide banyak dengan visual hook kuat, alur baca terstruktur (seamless swipe), dan konversi tinggi bagi audiens Instagram & LinkedIn.",
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
        image: "images/project-laundry.webp",
        videoType: "reel",
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
        title: "Elevating Your Perspective",
        category: "Videography",
        subCategory: "Videography & Drone",
        tag: "DRONE SHOWREEL",
        client: "SANS DRONE (Sewa Drone Jogja)",
        image: "images/project-sans-drone.webp",
        videoType: "youtube",
        youtubeId: "n2xrFxwtfW0",
        aspectRatio: "16/9",
        description: "Highlight showreel sinematik visual udara untuk Sans Drone — penyedia jasa sewa drone profesional di Yogyakarta. Menampilkan sudut pandang lanskap megah, pergerakan kamera halus, dan grading warna filmis.",
        tags: ["DJI Drone", "Videography", "DaVinci Resolve", "CapCut Pro", "4K Footage"],
        specs: {
            software: "DaVinci Resolve & CapCut Pro",
            format: "16:9 Widescreen (4K UHD)",
            scope: "Aerial Drone, Editing & Color Grade"
        },
        link: "https://www.youtube.com/watch?v=n2xrFxwtfW0",
        liveUrl: "https://www.youtube.com/watch?v=n2xrFxwtfW0"
    },
    {
        id: 3,
        title: "Sharing Bisnis Buat Perintis",
        category: "Video Editing",
        subCategory: "Reels & Short Form",
        tag: "EVENT REELS",
        client: "Angkik.DY",
        image: "images/project-sharing-bisnis.webp",
        videoType: "video",
        videoUrl: "videos/project-sharing-bisnis.mp4",
        aspectRatio: "9/16",
        description: "Dokumentasi dan editing video vertikal (Reels) acara talkshow & sharing session 'Sharing Bisnis Buat Perintis' bersama Angkik.DY. Menghadirkan cuplikan insight bernas, alur dinamis, sound beat-sync yang engaging, serta visual storytelling yang menginspirasi para perintis usaha.",
        tags: ["CapCut Pro", "Event Highlight", "Reels", "Talkshow", "Short Form"],
        specs: {
            software: "CapCut Pro",
            format: "9:16 Vertical Reel (1080x1920)",
            scope: "Event Documentation, Beat-Sync & Reels Cut"
        },
        link: "https://www.instagram.com/reel/DYKNPsivjqj/",
        liveUrl: "https://www.instagram.com/reel/DYKNPsivjqj/"
    },
    {
        id: 4,
        title: "Dokumentasi Sinematik: Persidangan Semu",
        category: "Videography",
        subCategory: "Videography & Drone",
        tag: "MOOT COURT DOCUMENTARY",
        client: "Mahasiswa UAD (Lex Vindicata)",
        image: "images/project-persidangan-semu.webp",
        videoType: "video",
        videoUrl: "videos/project-persidangan-semu.mp4",
        aspectRatio: "16/9",
        description: "Dokumentasi video sinematik dan aftermovie kompetisi peradilan semu (Civil Procedure Moot Court Delegation) delegasi Lex Vindicata mahasiswa Universitas Ahmad Dahlan. Mengabadikan ketegangan ruang sidang dan momen berharga dengan transisi dinamis serta tata warna filmis.",
        tags: ["Premiere Pro", "DaVinci Resolve", "CapCut", "Event Highlight", "Cinematography"],
        specs: {
            software: "Premiere Pro, DaVinci & CapCut",
            format: "16:9 Widescreen Cinematic",
            scope: "Full Event Coverage & Aftermovie"
        },
        link: "https://www.instagram.com/reel/Db4Q0M2T7qT/",
        liveUrl: "https://www.instagram.com/reel/Db4Q0M2T7qT/"
    },
    {
        id: 7,
        title: "Dirgahayu Republik Indonesia ke-81",
        category: "Video Editing",
        subCategory: "Reels & Short Form",
        tag: "PATRIOTIC REELS",
        client: "Konten Pribadi",
        image: "images/project-dirgahayu-81.webp",
        videoType: "reel",
        aspectRatio: "9/16",
        description: "Video vertikal sinematik (Reels) memperingati Dirgahayu Kemerdekaan Republik Indonesia ke-81. Menyatukan color grading filmis bernuansa patriotik, dynamic pacing, dan sinkronisasi audio-visual yang mengobarkan semangat nasionalisme.",
        tags: ["DaVinci Resolve", "CapCut", "Reels", "Videography", "Cinematic Cut", "Dirgahayu RI"],
        specs: {
            software: "DaVinci Resolve & CapCut",
            format: "9:16 Vertical Reel (1080x1920)",
            scope: "Color Grading, Sound Design & Dynamic Reels Cut"
        },
        link: "https://www.instagram.com/reel/Db8Z06nT6u_/?vrfl=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==",
        liveUrl: "https://www.instagram.com/reel/Db8Z06nT6u_/?vrfl=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA=="
    },
    {
        id: 5,
        title: "Dokumentasi Landscape & Human Interest",
        category: "Photography",
        subCategory: "Photography & Retouch",
        tag: "PHOTO STORY",
        client: "Editorial Cultural Project",
        image: "images/project-photography.webp",
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
        image: "images/project-branding.webp",
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
    },
    {
        id: 8,
        title: "Dokumentasi Event DPP IMABA",
        category: "Photography",
        subCategory: "Photography & Retouch",
        tag: "EVENT RECAP & CAROUSEL",
        client: "DPP IMABA",
        image: "images/project-imaba.webp",
        slides: [
            "images/project-imaba-slide-1.jpg",
            "images/project-imaba-slide-2.jpg",
            "images/project-imaba-slide-3.jpg",
            "images/project-imaba-slide-4.jpg",
            "images/project-imaba-slide-5.jpg",
            "images/project-imaba-slide-6.jpg",
            "images/project-imaba-slide-7.jpg",
            "images/project-imaba-slide-8.jpg"
        ],
        videoType: "carousel",
        aspectRatio: "3/4",
        description: "Dokumentasi fotografi dan kurasi visual feed Instagram untuk kegiatan Kaderisasi Lanjut Mahasiswa Bata-Bata (KLMB) oleh DPP IMABA. Mengabadikan jalannya seminar, interaksi narasumber, serta presentasi materi secara profesional.",
        tags: ["Photoshop", "Lightroom", "Canva", "Event Photography", "Human Interest", "Carousel"],
        specs: {
            software: "Photoshop, Lightroom & Canva",
            format: "1080x1440 Multi-Slide Feed Carousel",
            scope: "Event Documentation, Photo Retouch & Editorial Design"
        },
        link: "https://www.instagram.com/dppimaba.official/",
        liveUrl: "https://www.instagram.com/dppimaba.official/"
    },
    {
        id: 9,
        title: "Grand Final Puteri Pendidikan 2025",
        category: "Photography",
        subCategory: "Photography & Retouch",
        tag: "PAGEANT & CAROUSEL",
        client: "Angkik.DY",
        image: "images/project-puteri-pendidikan.jpg?v=2",
        slides: [
            "images/project-puteri-slide-1.jpg?v=2",
            "images/project-puteri-slide-2.jpg",
            "images/project-puteri-slide-3.jpg"
        ],
        videoType: "carousel",
        aspectRatio: "3/4",
        description: "Dokumentasi fotografi panggung dan kurasi visual carousel Instagram untuk penampilan Angkik.DY di panggung Grand Final Puteri Pendidikan 2025. Mengabadikan keanggunan busana, gestur percaya diri, serta ekspresi panggung lewat tata warna retouching yang dramatis dan terkalibrasi.",
        tags: ["Photoshop", "Lightroom", "Stage Photography", "Color Retouch", "Carousel", "Pageant"],
        specs: {
            software: "Adobe Photoshop & Lightroom",
            format: "1080x1440 Multi-Slide Stage Carousel",
            scope: "Stage Coverage, Lighting Retouch & Feed Curation"
        },
        link: "https://www.instagram.com/p/DNu_y5CXnrk/?rpxt=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==",
        liveUrl: "https://www.instagram.com/p/DNu_y5CXnrk/?rpxt=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA=="
    },
    {
        id: 10,
        title: "Kelas Motivasi Mahasiswa Baru",
        category: "Photography",
        subCategory: "Photography & Retouch",
        tag: "MOTIVATION & TALKSHOW",
        client: "Angkik.DY",
        image: "images/project-kelas-motivasi.jpg",
        slides: [
            "images/project-kelas-motivasi-slide-1.jpg",
            "images/project-kelas-motivasi-slide-2.jpg",
            "images/project-kelas-motivasi-slide-3.jpg"
        ],
        videoType: "carousel",
        aspectRatio: "3/4",
        description: "Dokumentasi fotografi sesi seminar dan kurasi visual carousel Instagram pada acara Kelas Motivasi Mahasiswa Baru bersama Angkik.DY. Mengabadikan antusiasme audiens dan interaksi panggung lewat tata warna retouching yang hangat, tajam, dan inspiratif.",
        tags: ["Photoshop", "Lightroom", "Event Photography", "Color Retouch", "Carousel", "Public Speaking"],
        specs: {
            software: "Adobe Photoshop & Lightroom",
            format: "1080x1440 Multi-Slide Event Carousel",
            scope: "Seminar Coverage, Lighting Retouch & Feed Curation"
        },
        link: "https://www.instagram.com/p/DONF8-UD42U/?vrfl=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==",
        liveUrl: "https://www.instagram.com/p/DONF8-UD42U/?vrfl=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA=="
    },
    {
        id: 11,
        title: "Cakap Ngurus Bisnis",
        category: "Photography",
        subCategory: "Photography & Retouch",
        tag: "BUSINESS TALKSHOW & CAROUSEL",
        client: "Angkik.DY",
        image: "images/project-cakap-ngurus-bisnis.jpg",
        slides: [
            "images/project-cakap-bisnis-slide-1.jpg",
            "images/project-cakap-bisnis-slide-2.jpg",
            "images/project-cakap-bisnis-slide-3.jpg"
        ],
        videoType: "carousel",
        aspectRatio: "3/4",
        description: "Dokumentasi fotografi sesi seminar dan kurasi visual carousel Instagram untuk event 'Cakap Ngurus Bisnis' (Kolaborasi Kledo x ADY Foundation) bersama Angkik.DY. Mengabadikan insight praktisi manajemen bisnis lewat komposisi visual panggung yang profesional dan berkarakter.",
        tags: ["Photoshop", "Lightroom", "Event Photography", "Business Talkshow", "Color Retouch", "Carousel"],
        specs: {
            software: "Adobe Photoshop & Lightroom",
            format: "1080x1440 Multi-Slide Business Carousel",
            scope: "Seminar Coverage, Lighting Retouch & Feed Curation"
        },
        link: "https://www.instagram.com/p/DUsk_QNj9dD/?mdxt=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==",
        liveUrl: "https://www.instagram.com/p/DUsk_QNj9dD/?mdxt=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA=="
    }
];

export const designProjects = [
    {
        id: 102,
        title: "Branding Visual & Social Media Kit Kopi Senja",
        category: "Brand Identity",
        subCategory: "Brand Identity",
        tag: "BRAND IDENTITY",
        client: "Kopi Senja Artisan Cafe",
        image: "images/project-branding.webp",
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
        image: "images/project-fashion.webp",
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
        image: "images/project-event.webp",
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
        image: "images/project-drone.webp",
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
        image: "images/project-laundry.webp",
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
    },
    {
        id: 107,
        title: "Dokumentasi Event & Carousel DPP IMABA",
        category: "Social Carousel",
        subCategory: "Social Media Carousel",
        tag: "CAROUSEL & FEED DESIGN",
        client: "DPP IMABA",
        image: "images/project-imaba.webp",
        slides: [
            "images/project-imaba-slide-1.jpg",
            "images/project-imaba-slide-2.jpg",
            "images/project-imaba-slide-3.jpg",
            "images/project-imaba-slide-4.jpg",
            "images/project-imaba-slide-5.jpg",
            "images/project-imaba-slide-6.jpg",
            "images/project-imaba-slide-7.jpg",
            "images/project-imaba-slide-8.jpg"
        ],
        videoType: "carousel",
        aspectRatio: "3/4",
        description: "Perancangan carousel feed dan tata letak grafis multi-slide untuk kegiatan Kaderisasi Lanjut Mahasiswa Bata-Bata (KLMB). Memadukan fotografi acara dengan tipografi editorial yang terstruktur dan menarik perhatian di media sosial.",
        tags: ["Photoshop", "Lightroom", "Canva", "Carousel Design", "Event Branding", "Typography"],
        specs: {
            software: "Photoshop, Lightroom & Canva",
            format: "1080x1440 Multi-Slide Feed Carousel",
            scope: "Layout Design, Typography & Visual Identity"
        },
        link: "https://www.instagram.com/dppimaba.official/",
        liveUrl: "https://www.instagram.com/dppimaba.official/"
    },
    {
        id: 108,
        title: "Grand Final Puteri Pendidikan 2025",
        category: "Social Carousel",
        subCategory: "Social Media Carousel",
        tag: "CAROUSEL & STORYTELLING",
        client: "Angkik.DY",
        image: "images/project-puteri-pendidikan.jpg?v=2",
        slides: [
            "images/project-puteri-slide-1.jpg?v=2",
            "images/project-puteri-slide-2.jpg",
            "images/project-puteri-slide-3.jpg"
        ],
        videoType: "carousel",
        aspectRatio: "3/4",
        description: "Kurasi visual storytelling dan carousel multi-slide Instagram untuk kilas balik perjalanan Angkik.DY pada Grand Final Puteri Pendidikan 2025. Menggabungkan pemilihan foto berdaya emosional kuat, pacing visual, dan tata warna terkalibrasi.",
        tags: ["Photoshop", "Lightroom", "Carousel Design", "Visual Storytelling", "Pageant", "Social Media"],
        specs: {
            software: "Adobe Photoshop & Lightroom",
            format: "1080x1440 Instagram Feed & Carousel",
            scope: "Visual Curation, Photo Retouch & Carousel Sequencing"
        },
        link: "https://www.instagram.com/p/DNu_y5CXnrk/?rpxt=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==",
        liveUrl: "https://www.instagram.com/p/DNu_y5CXnrk/?rpxt=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA=="
    },
    {
        id: 109,
        title: "Kelas Motivasi Mahasiswa Baru",
        category: "Social Carousel",
        subCategory: "Social Media Carousel",
        tag: "CAROUSEL & TALKSHOW",
        client: "Angkik.DY",
        image: "images/project-kelas-motivasi.jpg",
        slides: [
            "images/project-kelas-motivasi-slide-1.jpg",
            "images/project-kelas-motivasi-slide-2.jpg",
            "images/project-kelas-motivasi-slide-3.jpg"
        ],
        videoType: "carousel",
        aspectRatio: "3/4",
        description: "Perancangan carousel visual feed Instagram dan kurasi alur foto bercerita untuk Kelas Motivasi Mahasiswa Baru bersama Angkik.DY. Menghadirkan cuplikan momen motivatif dengan tipografi quote yang kuat dan tata letak multi-slide engaging.",
        tags: ["Photoshop", "Lightroom", "Carousel Design", "Visual Storytelling", "Motivation", "Social Media"],
        specs: {
            software: "Adobe Photoshop & Lightroom",
            format: "1080x1440 Instagram Feed & Carousel",
            scope: "Visual Curation, Photo Retouch & Carousel Sequencing"
        },
        link: "https://www.instagram.com/p/DONF8-UD42U/?vrfl=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==",
        liveUrl: "https://www.instagram.com/p/DONF8-UD42U/?vrfl=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA=="
    },
    {
        id: 110,
        title: "Cakap Ngurus Bisnis",
        category: "Social Carousel",
        subCategory: "Social Media Carousel",
        tag: "CAROUSEL & BUSINESS",
        client: "Angkik.DY",
        image: "images/project-cakap-ngurus-bisnis.jpg",
        slides: [
            "images/project-cakap-bisnis-slide-1.jpg",
            "images/project-cakap-bisnis-slide-2.jpg",
            "images/project-cakap-bisnis-slide-3.jpg"
        ],
        videoType: "carousel",
        aspectRatio: "3/4",
        description: "Perancangan carousel visual feed Instagram dan kurasi alur foto bercerita untuk event 'Cakap Ngurus Bisnis' bersama Angkik.DY (Kledo x ADY Foundation). Menghadirkan materi edukasi manajemen bisnis dan arus kas dengan tipografi editorial yang lugas dan berdaya pikat.",
        tags: ["Photoshop", "Lightroom", "Carousel Design", "Visual Storytelling", "Business Management", "Social Media"],
        specs: {
            software: "Adobe Photoshop & Lightroom",
            format: "1080x1440 Instagram Feed & Carousel",
            scope: "Visual Curation, Photo Retouch & Carousel Sequencing"
        },
        link: "https://www.instagram.com/p/DUsk_QNj9dD/?mdxt=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==",
        liveUrl: "https://www.instagram.com/p/DUsk_QNj9dD/?mdxt=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA=="
    },
    {
        id: 111,
        title: "Dokumentasi Event & Poster DPP IMABA",
        category: "Poster Design",
        subCategory: "Poster & Editorial",
        tag: "EVENT POSTER & CAMPAIGN",
        client: "DPP IMABA",
        image: "images/project-poster-imaba.jpg?v=2",
        videoType: "image",
        aspectRatio: "3/4",
        description: "Perancangan desain poster visual publikasi resmi untuk kegiatan Kaderisasi Lanjut Mahasiswa Bata-Bata (KLMB) 2026 oleh DPP IMABA. Mengusung konsep kepemimpinan santri masa kini dengan hierarki tipografi tegas, tata letak informasi terstruktur, dan elemen grafis representatif.",
        tags: ["Photoshop", "Canva", "Poster Design", "Event Campaign", "Typography", "DPP IMABA"],
        specs: {
            software: "Adobe Photoshop & Canva",
            format: "1080x1440 Digital Poster & Social Feed",
            scope: "Key Visual, Typography Hierarchy & Social Media Campaign"
        },
        link: "https://www.instagram.com/p/DZ6yG_xk7d_/?rpxt=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==",
        liveUrl: "https://www.instagram.com/p/DZ6yG_xk7d_/?rpxt=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA=="
    }
];

// Curated projects for Gateway Landing Page
export const projectsData = [
    cinemaProjects[1], // Elevating Your Perspective (Sans Drone)
    designProjects[9], // Dokumentasi Event & Poster DPP IMABA
    cinemaProjects[4], // Dirgahayu Republik Indonesia ke-81 (Patriotic Reel)
    designProjects[5], // Dokumentasi Event & Carousel DPP IMABA
    designProjects[6], // Grand Final Puteri Pendidikan 2025 (Angkik.DY)
    designProjects[0], // Kopi Senja Brand Identity
    cinemaProjects[3], // Persidangan Semu: Lex Vindicata (Event Cinematic)
    cinemaProjects[2]  // Sharing Bisnis Buat Perintis (Angkik.DY)
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
        quote: "Desain visual dan poster grafisnya rapi banget! Alur visual jelas, tipografi presisi, dan eksekusi tampilannya sangat clean & profesional.",
        name: "Fajar Hidayat",
        role: "Creative Event Producer",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
    }
];

export const testimonialsData = [
    testimonialsDataCinema[0],
    testimonialsDataDesign[0],
    testimonialsDataCinema[1]
];
