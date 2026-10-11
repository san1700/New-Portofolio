// data.js

const servicesData = [
    {
        id: "s1",
        title: "Web Development",
        description: "Membangun website modern, cepat, dan responsif dengan performa tinggi untuk bisnis Anda.",
        category: "Development",
        link: "#"
    },
    {
        id: "s2",
        title: "UI/UX Design",
        description: "Merancang antarmuka yang intuitif dan estetis, memberikan pengalaman pengguna yang tak terlupakan.",
        category: "Design",
        link: "#"
    },
    {
        id: "s3",
        title: "Mobile App Development",
        description: "Membuat aplikasi mobile lintas platform yang interaktif untuk iOS dan Android.",
        category: "Development",
        link: "#"
    },
    {
        id: "s4",
        title: "Brand Identity",
        description: "Membantu menciptakan identitas visual yang kuat agar brand Anda lebih menonjol di pasar digital.",
        category: "Branding",
        link: "#"
    }
];

const projectsData = [
    {
        id: "p1",
        title: "Cinematic Travel & Outdoor Short",
        category: "Videography",
        tag: "COMMERCIAL / DRONE",
        description: "Pengambilan gambar udara dan editing sinematik untuk konten perjalanan.",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1000",
        tags: ["Videography", "Drone", "Color Grading"],
        liveUrl: "https://www.instagram.com/san_mhmd17/"
    },
    {
        id: "p2",
        title: "Social Media Reels & Short Form Video",
        category: "Video Editing",
        tag: "SHORT FORM CONTENT",
        description: "Editing video ritmis cepat dengan motion grafik dan sound design menarik.",
        image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=1000",
        tags: ["CapCut", "Reels", "Sound Design"],
        liveUrl: "https://www.instagram.com/san_mhmd17/"
    },
    {
        id: "p3",
        title: "Brand Identity & Visual Social Assets",
        category: "Graphic Design",
        tag: "BRANDING",
        description: "Desain identitas brand, layout poster, dan aset grafis media sosial.",
        image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=1000",
        tags: ["Photoshop", "Canva", "CorelDraw"],
        liveUrl: "https://www.instagram.com/san_mhmd17/"
    },
    {
        id: "p4",
        title: "Landscape & Outdoor Photography",
        category: "Photography",
        tag: "COLLECTION",
        description: "Dokumentasi fotografi lanskap alam dan elemen visual bernuansa estetis.",
        image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=1000",
        tags: ["Photography", "Lightroom", "Outdoor"],
        liveUrl: "https://www.instagram.com/san_mhmd17/"
    }
];

const statsData = [
    { label: "Projects Done", value: "250+" },
    { label: "Happy Clients", value: "120+" },
    { label: "Satisfaction", value: "98%" }
];

const testimonialsData = [
    {
        id: "t1",
        quote: "Novacraft completely transformed our digital presence. Their attention to detail and modern design approach is unmatched.",
        name: "Sarah Jenkins",
        role: "CEO at TechFlow",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
    },
    {
        id: "t2",
        quote: "Working with them was a breeze. They understood our vision perfectly and delivered a product beyond our expectations.",
        name: "Michael Chen",
        role: "Founder of StartupX",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
    },
    {
        id: "t3",
        quote: "The branding and website they created for us helped increase our conversion rate by 40% in just two months.",
        name: "Emily Rodriguez",
        role: "Marketing Director",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80"
    }
];

// Ekspor data untuk digunakan di file main.js atau index.js nantinya
export { servicesData, projectsData, statsData, testimonialsData };
