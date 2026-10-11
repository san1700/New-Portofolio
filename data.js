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
        title: "Fintech Dashboard Analytics",
        category: "Web Application",
        description: "Platform analitik keuangan real-time yang menampilkan data kompleks secara visual dan intuitif. Dibangun dengan React dan Chart.js untuk performa tinggi dan interaktivitas penuh.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
        tags: ["React", "Tailwind CSS", "Chart.js"],
        liveUrl: "https://github.com/san1700"
    },
    {
        id: "p2",
        title: "E-Commerce Mobile App",
        category: "Mobile App",
        description: "Aplikasi e-commerce mobile lintas platform dengan pengalaman belanja yang mulus, sistem cart cerdas, dan integrasi pembayaran real-time menggunakan Flutter dan Firebase.",
        image: "https://images.unsplash.com/photo-1512921571408-9df8bc70716c?auto=format&fit=crop&q=80&w=800",
        tags: ["Flutter", "Firebase", "UI/UX"],
        liveUrl: "https://github.com/san1700"
    },
    {
        id: "p3",
        title: "Modern SaaS Landing Page",
        category: "Web Design",
        description: "Landing page SaaS berkelas tinggi dengan animasi scroll yang mulus, desain glassmorphism, dan konversi-focused layout yang meningkatkan sign-up rate secara signifikan.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
        tags: ["HTML5", "CSS3", "JavaScript"],
        liveUrl: "https://github.com/san1700"
    },
    {
        id: "p4",
        title: "Health & Fitness Tracker",
        category: "Mobile App",
        description: "Aplikasi tracker kesehatan personal dengan fitur pemantauan aktivitas, kalori, dan jadwal olahraga. Diintegrasikan dengan sensor perangkat untuk data akurat secara real-time.",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
        tags: ["React Native", "Node.js"],
        liveUrl: "https://github.com/san1700"
    },
    {
        id: "p5",
        title: "Creative Agency Portfolio",
        category: "Web Development",
        description: "Portfolio digital agensi kreatif dengan animasi GSAP yang imersif, grid dinamis, dan pengalaman scroll storytelling yang memukau untuk menonjolkan karya terbaik.",
        image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&q=80&w=800",
        tags: ["Vanilla JS", "GSAP", "CSS Variables"],
        liveUrl: "https://github.com/san1700"
    },
    {
        id: "p6",
        title: "Brand Identity Redesign",
        category: "Branding",
        description: "Proyek rebrand lengkap mencakup logo system, color palette, tipografi, dan brand guidelines yang kohesif untuk memperkuat identitas visual brand di era digital.",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
        tags: ["Vue.js", "Python", "PostgreSQL"],
        liveUrl: "https://github.com/san1700"
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
