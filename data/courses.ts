export interface Course {
    id: string;
    slug: string;
    title: string;
    description: string;
    category: "Drilling" | "Reservoir" | "Production" | "HSE" | "LNG" | "Economics";
    level: "Beginner" | "Intermediate" | "Advanced";
    durationHours: number;
    language: "AR" | "EN" | "FR";
    price: number; // 0 for free
    thumbnail: string;
    instructor: {
        name: string;
        avatar: string;
        role: string;
    };
    rating: number;
    reviewsCount: number;
    enrolledCount: number;
    isPopular?: boolean;
    isNew?: boolean;
}

export const CATEGORY_COLORS = {
    Drilling: { bg: "bg-[#FF4500]/10", text: "text-[#FF4500]", border: "border-[#FF4500]/30" },
    Reservoir: { bg: "bg-teal-500/10", text: "text-teal-400", border: "border-teal-500/30" },
    Production: { bg: "bg-primary/10", text: "text-primary", border: "border-primary/30" },
    HSE: { bg: "bg-green-500/10", text: "text-green-400", border: "border-green-500/30" },
    LNG: { bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/30" },
    Economics: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/30" },
};

export const MOCK_COURSES: Course[] = [
    // Drilling
    {
        id: "c_drill_01",
        slug: "advanced-directional-drilling",
        title: "Advanced Directional Drilling Techniques",
        description: "Master complex well trajectories, rotary steerable systems (RSS), and real-time MWD/LWD data interpretation.",
        category: "Drilling",
        level: "Advanced",
        durationHours: 45,
        language: "AR",
        price: 299,
        thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800",
        instructor: {
            name: "Eng. Tariq H.",
            avatar: "https://i.pravatar.cc/150?u=tariq",
            role: "Senior Drilling Engineer, Saudi Aramco",
        },
        rating: 4.9,
        reviewsCount: 342,
        enrolledCount: 1250,
        isPopular: true,
    },
    {
        id: "c_drill_02",
        slug: "drilling-fluids-hydraulics",
        title: "Drilling Fluids & Well Hydraulics",
        description: "Comprehensive guide to mud systems, rheology, ECD management, and hole cleaning optimization.",
        category: "Drilling",
        level: "Intermediate",
        durationHours: 30,
        language: "EN",
        price: 199,
        thumbnail: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=800",
        instructor: {
            name: "Dr. Sarah M.",
            avatar: "https://i.pravatar.cc/150?u=sarah",
            role: "Fluids Specialist, Halliburton",
        },
        rating: 4.7,
        reviewsCount: 128,
        enrolledCount: 840,
    },

    // Reservoir
    {
        id: "c_res_01",
        slug: "reservoir-simulation-eclipse",
        title: "Reservoir Simulation with Eclipse",
        description: "Hands-on training building static and dynamic models, history matching, and forecasting using Schlumberger Eclipse.",
        category: "Reservoir",
        level: "Advanced",
        durationHours: 60,
        language: "AR",
        price: 349,
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
        instructor: {
            name: "Prof. Youssef B.",
            avatar: "https://i.pravatar.cc/150?u=youssef",
            role: "Lead Modeler, Sonatrach",
        },
        rating: 4.9,
        reviewsCount: 512,
        enrolledCount: 2100,
        isPopular: true,
    },
    {
        id: "c_res_02",
        slug: "well-testing-analysis",
        title: "Applied Well Testing Analysis (PTA)",
        description: "Interpret pressure transient data, identify flow regimes, and calculate reservoir parameters.",
        category: "Reservoir",
        level: "Intermediate",
        durationHours: 25,
        language: "FR",
        price: 0,
        thumbnail: "https://images.unsplash.com/photo-1613941328994-013fa0210fec?auto=format&fit=crop&q=80&w=800",
        instructor: {
            name: "Eng. Amine L.",
            avatar: "https://i.pravatar.cc/150?u=amine",
            role: "Reservoir Engineer",
        },
        rating: 4.6,
        reviewsCount: 89,
        enrolledCount: 3500,
    },

    // Production
    {
        id: "c_prod_01",
        slug: "artificial-lift-systems",
        title: "Artificial Lift Systems Design",
        description: "Design and optimization of ESP, Gas Lift, and Sucker Rod Pump systems for maximum recovery.",
        category: "Production",
        level: "Intermediate",
        durationHours: 40,
        language: "EN",
        price: 249,
        thumbnail: "https://images.unsplash.com/photo-1605553555234-750d0eb3f86e?auto=format&fit=crop&q=80&w=800",
        instructor: {
            name: "Eng. David C.",
            avatar: "https://i.pravatar.cc/150?u=david",
            role: "Production Technologist, BP",
        },
        rating: 4.8,
        reviewsCount: 210,
        enrolledCount: 950,
    },
    {
        id: "c_prod_02",
        slug: "nodal-analysis-pipesim",
        title: "Nodal Analysis using PIPESIM",
        description: "Identify bottlenecks in the production system and optimize well performance using steady-state simulation.",
        category: "Production",
        level: "Advanced",
        durationHours: 35,
        language: "AR",
        price: 279,
        thumbnail: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800",
        instructor: {
            name: "Eng. Khalid A.",
            avatar: "https://i.pravatar.cc/150?u=khalid",
            role: "Production Lead, ADNOC",
        },
        rating: 4.9,
        reviewsCount: 175,
        enrolledCount: 1120,
        isNew: true,
    },

    // HSE
    {
        id: "c_hse_01",
        slug: "process-safety-management",
        title: "Process Safety Management (PSM)",
        description: "Learn the 14 elements of OSHA PSM to prevent catastrophic releases of hazardous chemicals.",
        category: "HSE",
        level: "Beginner",
        durationHours: 15,
        language: "AR",
        price: 99,
        thumbnail: "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?auto=format&fit=crop&q=80&w=800",
        instructor: {
            name: "Dr. Fatima Z.",
            avatar: "https://i.pravatar.cc/150?u=fatima",
            role: "HSE Director, KOC",
        },
        rating: 4.7,
        reviewsCount: 420,
        enrolledCount: 2800,
    },
    {
        id: "c_hse_02",
        slug: "blowout-prevention-well-control",
        title: "Blowout Prevention & Well Control",
        description: "IWCF level equivalent training on kick detection, shut-in procedures, and well kill methods.",
        category: "HSE",
        level: "Intermediate",
        durationHours: 50,
        language: "EN",
        price: 399,
        thumbnail: "https://images.unsplash.com/photo-1534398079543-7ae6d016b86a?auto=format&fit=crop&q=80&w=800",
        instructor: {
            name: "Eng. Mike R.",
            avatar: "https://i.pravatar.cc/150?u=mike",
            role: "Well Control Specialist",
        },
        rating: 4.9,
        reviewsCount: 890,
        enrolledCount: 4100,
        isPopular: true,
    },

    // LNG
    {
        id: "c_lng_01",
        slug: "lng-plant-operations",
        title: "LNG Plant Operations & Safety",
        description: "Understand the liquefaction process, cryogenic equipment, handling, and export operations.",
        category: "LNG",
        level: "Intermediate",
        durationHours: 30,
        language: "AR",
        price: 199,
        thumbnail: "https://images.unsplash.com/photo-1580974582390-d5a239b98ab4?auto=format&fit=crop&q=80&w=800",
        instructor: {
            name: "Eng. Ali F.",
            avatar: "https://i.pravatar.cc/150?u=ali",
            role: "Facilities Engineer, QatarGas",
        },
        rating: 4.6,
        reviewsCount: 112,
        enrolledCount: 650,
    },
    {
        id: "c_lng_02",
        slug: "cryogenic-materials-engineering",
        title: "Cryogenic Materials & Equipment",
        description: "Material selection, insulation, and maintenance of pumps, compressors, and tanks at -162°C.",
        category: "LNG",
        level: "Advanced",
        durationHours: 25,
        language: "FR",
        price: 149,
        thumbnail: "https://images.unsplash.com/photo-1621612984920-aa8fc11c75c8?auto=format&fit=crop&q=80&w=800",
        instructor: {
            name: "Dr. Jean-Paul D.",
            avatar: "https://i.pravatar.cc/150?u=jean",
            role: "Materials Scientist, TotalEnergies",
        },
        rating: 4.8,
        reviewsCount: 56,
        enrolledCount: 320,
        isNew: true,
    },

    // Economics
    {
        id: "c_eco_01",
        slug: "petroleum-project-economics",
        title: "Petroleum Project Economics & Risk",
        description: "Calculate NPV, IRR, payout time, and perform Monte Carlo simulations for investment decisions.",
        category: "Economics",
        level: "Intermediate",
        durationHours: 20,
        language: "AR",
        price: 149,
        thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800",
        instructor: {
            name: "Prof. Nabil K.",
            avatar: "https://i.pravatar.cc/150?u=nabil",
            role: "Financial Analyst, OAPEC",
        },
        rating: 4.8,
        reviewsCount: 189,
        enrolledCount: 1400,
    },
    {
        id: "c_eco_02",
        slug: "oil-gas-contracts-psa",
        title: "Oil & Gas Contracts (PSA/PSC)",
        description: "Deep dive into Production Sharing Agreements, concessions, and cost recovery mechanisms.",
        category: "Economics",
        level: "Advanced",
        durationHours: 18,
        language: "EN",
        price: 0,
        thumbnail: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800",
        instructor: {
            name: "Eng. Susan W.",
            avatar: "https://i.pravatar.cc/150?u=susan",
            role: "Legal Counsel",
        },
        rating: 4.5,
        reviewsCount: 300,
        enrolledCount: 4200,
    }
];
