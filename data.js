// data.js

const servicesData = [
    {
        id: "s1",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="6" width="14" height="12" rx="2"/>
            <path d="m22 8-4 4 4 4V8z"/>
            <line x1="6" y1="10" x2="6" y2="14"/>
            <line x1="9" y1="10" x2="9" y2="14"/>
        </svg>`,
        title: "Video Editing & Motion",
        description: "Mengolah video mentah menjadi konten visual ritmis yang menarik. Meliputi color grading, sound design, transisi halus, dan animasi motion grafik untuk media sosial maupun video format panjang.",
        category: "Video Editing",
        link: "https://www.instagram.com/san_mhmd17/"
    },
    {
        id: "s2",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2a4 4 0 0 1 4 4"/>
            <path d="M8 6a4 4 0 0 1 4-4"/>
            <path d="M6.5 10A5.5 5.5 0 0 0 12 15.5 5.5 5.5 0 0 0 17.5 10"/>
            <path d="M12 15.5V20"/>
            <path d="M8 20h8"/>
            <circle cx="12" cy="10" r="2"/>
        </svg>`,
        title: "Videography & Drone Filming",
        description: "Pengambilan gambar video berkualitas tinggi untuk kebutuhan promosi, dokumenter, hingga pengambilan sudut pandang udara sinematik menggunakan drone.",
        category: "Videography",
        link: "https://www.instagram.com/san_mhmd17/"
    },
    {
        id: "s3",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <path d="m12 19 7-7 3 3-7 7-3-3z"/>
            <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
            <path d="m2 2 7.586 7.586"/>
            <circle cx="11" cy="11" r="2"/>
        </svg>`,
        title: "Graphic Design & Branding",
        description: "Merancang identitas visual brand yang kuat, aset media sosial, poster promosi, dan materi grafis yang estetis serta konsisten.",
        category: "Graphic Design",
        link: "https://www.instagram.com/san_mhmd17/"
    },
    {
        id: "s4",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
            <circle cx="12" cy="13" r="3"/>
        </svg>`,
        title: "Photography & Color Retouching",
        description: "Mengabadikan momen dan produk dengan komposisi yang kuat dan estetis. Dilengkapi dengan retouching profesional menggunakan Lightroom dan Photoshop.",
        category: "Photography",
        link: "https://www.instagram.com/san_mhmd17/"
    }
];

const projectsData = [
    {
        id: 1,
        title: "Promosi Video & Reels Falisha Laundry",
        category: "Video Editing",
        tag: "SHORT FORM CONTENT",
        client: "Falisha Laundry & Care",
        image: "images/project-laundry.jpg",
        videoType: "video",
        videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        aspectRatio: "9/16",
        description: "Mengedit video pendek ritmis cepat dengan motion grafik dan sound design untuk kampanye media sosial klien.",
        tags: ["CapCut", "Reels", "Sound Design", "Motion Graphics"],
        specs: {
            software: "CapCut Pro & Premiere",
            format: "9:16 Vertical Reel (1080x1920)",
            scope: "Beat-Sync, Motion & SFX"
        },
        link: "https://www.instagram.com/reel/contoh-link-reels-klien",
        liveUrl: "https://www.instagram.com/reel/contoh-link-reels-klien"
    },
    {
        id: 2,
        title: "Dokumentasi Sinematik & Drone Kotagede",
        category: "Videography",
        tag: "COMMERCIAL / DRONE",
        client: "Dinas Pariwisata & Budaya",
        image: "images/project-drone.jpg",
        videoType: "youtube",
        youtubeId: "5qap5aO4i9A",
        aspectRatio: "16/9",
        description: "Pengambilan video udara menggunakan drone dan color grading sinematik untuk proyek video kultural dan promosi warisan sejarah.",
        tags: ["Drone", "Videography", "Color Grading", "4K Footage"],
        specs: {
            software: "DaVinci Resolve & Premiere",
            format: "16:9 Widescreen (4K UHD)",
            scope: "Aerial Drone & Color Grade"
        },
        link: "https://www.youtube.com/watch?v=contoh-link-youtube",
        liveUrl: "https://www.youtube.com/watch?v=contoh-link-youtube"
    },
    {
        id: 3,
        title: "Branding Visual & Social Media Kit Kopi Senja",
        category: "Graphic Design",
        tag: "BRAND IDENTITY",
        client: "Kopi Senja Artisan Cafe",
        image: "images/project-branding.jpg",
        videoType: "image",
        aspectRatio: "16/9",
        description: "Desain identitas brand visual, feed Instagram aesthetic, banner promosi, dan packaging untuk kedai kopi artisan.",
        tags: ["Photoshop", "CorelDraw", "Brand Identity", "Social Kit"],
        specs: {
            software: "Photoshop & CorelDraw",
            format: "Vector & High-Res PNG",
            scope: "Logo, Brand Guidelines & Feed"
        },
        link: "https://www.instagram.com/p/contoh-link-branding-kopi",
        liveUrl: "https://www.instagram.com/p/contoh-link-branding-kopi"
    },
    {
        id: 4,
        title: "Dokumentasi Landscape & Human Interest",
        category: "Photography",
        tag: "PHOTO STORY",
        client: "Editorial & Cultural Project",
        image: "images/project-photography.jpg",
        videoType: "image",
        aspectRatio: "16/9",
        description: "Sesi foto lanskap pesisir dan potret aktivitas pengrajin lokal dengan color retouching hangat dan berkarakter.",
        tags: ["Photography", "Lightroom", "Human Interest", "Color Retouch"],
        specs: {
            software: "Adobe Lightroom Classic",
            format: "RAW to High-Res JPEG",
            scope: "Composition & Warm Retouch"
        },
        link: "https://www.instagram.com/p/contoh-link-photo-story",
        liveUrl: "https://www.instagram.com/p/contoh-link-photo-story"
    },
    {
        id: 5,
        title: "Commercial Product Reels - Fashion Streetwear",
        category: "Video Editing",
        tag: "COMMERCIAL REELS",
        client: "Urban Pulse Apparel",
        image: "images/project-fashion.jpg",
        videoType: "video",
        videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        aspectRatio: "9/16",
        description: "Editing video promosi produk streetwear dengan transisi dinamis, beat sync, dan tipografi modern yang engaging.",
        tags: ["Premiere Pro", "Beat Sync", "Commercial", "Streetwear"],
        specs: {
            software: "Adobe Premiere Pro",
            format: "9:16 Vertical Reel",
            scope: "Speed Ramp & Kinetic Type"
        },
        link: "https://www.instagram.com/reel/contoh-link-fashion-reels",
        liveUrl: "https://www.instagram.com/reel/contoh-link-fashion-reels"
    },
    {
        id: 6,
        title: "Company Profile & Event Highlight Batik Heritage",
        category: "Videography",
        tag: "COMPANY PROFILE",
        client: "Yayasan Batik Nusantara",
        image: "images/project-event.jpg",
        videoType: "youtube",
        youtubeId: "5qap5aO4i9A",
        aspectRatio: "16/9",
        description: "Liputan video sinematik pameran budaya dan profil workshop batik dengan wawancara serta aerial b-roll.",
        tags: ["Videography", "Cinematic", "Event Highlight", "B-Roll"],
        specs: {
            software: "Premiere Pro & After Effects",
            format: "16:9 Cinematic (4K UHD)",
            scope: "Full Production & Interview"
        },
        link: "https://www.youtube.com/watch?v=contoh-link-company-profile",
        liveUrl: "https://www.youtube.com/watch?v=contoh-link-company-profile"
    }
];

const statsData = [
    { label: "Projects Completed", value: "25+" },
    { label: "Years Experience", value: "3+" },
    { label: "Client Satisfaction", value: "99%" }
];

const testimonialsData = [
    {
        id: "t1",
        quote: "Hasil editing Reels dari Mas Ikhsan luar biasa dinamis! Transisi rapi, ritme audio dan motion grafik pas banget dengan karakter brand kami. Engagement naik signifikan.",
        name: "Rian Pratama",
        role: "Brand Owner & Creator",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    },
    {
        id: "t2",
        quote: "Kualitas pengambilan video dan aerial drone-nya bener-bener sinematik. Angle-nya berkelas dan proses koordinasi revisi sangat komunikatif dan cepat.",
        name: "Dimas Setiawan",
        role: "Event & Commercial Producer",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    {
        id: "t3",
        quote: "Sangat puas dengan desain visual dan branding-nya. Komposisi warna dan estetikanya modern, benar-benar mengeksekusi konsep yang kami butuhkan.",
        name: "Anisa Maharani",
        role: "Marketing Lead UMKM",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
    }
];

// Ekspor data untuk digunakan di file main.js atau index.js nantinya
export { servicesData, projectsData, statsData, testimonialsData };
