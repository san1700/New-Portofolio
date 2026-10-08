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
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
        tags: ["React", "Tailwind CSS", "Chart.js"]
    },
    {
        id: "p2",
        title: "E-Commerce Mobile App",
        category: "Mobile App",
        image: "https://images.unsplash.com/photo-1512921571408-9df8bc70716c?auto=format&fit=crop&q=80&w=800",
        tags: ["Flutter", "Firebase", "UI/UX"]
    },
    {
        id: "p3",
        title: "Modern SaaS Landing Page",
        category: "Web Design",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
        tags: ["HTML5", "CSS3", "JavaScript"]
    },
    {
        id: "p4",
        title: "Health & Fitness Tracker",
        category: "Mobile App",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
        tags: ["React Native", "Node.js"]
    },
    {
        id: "p5",
        title: "Creative Agency Portfolio",
        category: "Web Development",
        image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&q=80&w=800",
        tags: ["Vanilla JS", "GSAP", "CSS Variables"]
    },
    {
        id: "p6",
        title: "Real Estate Property Portal",
        category: "Web Application",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
        tags: ["Vue.js", "Python", "PostgreSQL"]
    }
];

const statsData = [
    {
        label: "Years of Experience",
        value: "5+"
    },
    {
        label: "Projects Completed",
        value: "120+"
    },
    {
        label: "Happy Clients",
        value: "85+"
    },
    {
        label: "Awards Won",
        value: "12"
    }
];

// Ekspor data untuk digunakan di file main.js atau index.js nantinya
export { servicesData, projectsData, statsData };
