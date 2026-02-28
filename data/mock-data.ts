// ── HELM Academy Mock Data ──
// Placeholder data for UI development

import { Category, Course, Instructor, Company, Job, Book } from "@/types";

export const categories: Category[] = [
    {
        id: "drilling",
        name: "Drilling Engineering",
        nameAr: "هندسة الحفر",
        slug: "drilling",
        description: "Well design, drilling fluids, bit selection, and directional drilling.",
        icon: "Flame",
        courseCount: 12,
        color: "#F5C518",
    },
    {
        id: "reservoir",
        name: "Reservoir Engineering",
        nameAr: "هندسة المكامن",
        slug: "reservoir",
        description: "Reservoir simulation, well testing, and enhanced oil recovery.",
        icon: "Droplets",
        courseCount: 9,
        color: "#2DD4BF",
    },
    {
        id: "production",
        name: "Production Engineering",
        nameAr: "هندسة الإنتاج",
        slug: "production",
        description: "Artificial lift, well completions, and production optimization.",
        icon: "BarChart3",
        courseCount: 8,
        color: "#D4A017",
    },
    {
        id: "hse",
        name: "HSE & Safety",
        nameAr: "الصحة والسلامة والبيئة",
        slug: "hse",
        description: "Health, safety, and environmental management in oil & gas.",
        icon: "Shield",
        courseCount: 6,
        color: "#22C55E",
    },
    {
        id: "lng",
        name: "LNG Technology",
        nameAr: "تكنولوجيا الغاز المسال",
        slug: "lng",
        description: "Liquefied natural gas processing, storage, and transport.",
        icon: "GraduationCap",
        courseCount: 5,
        color: "#2DD4BF",
    },
    {
        id: "economics",
        name: "Petroleum Economics",
        nameAr: "اقتصاديات البترول",
        slug: "petroleum-economics",
        description: "Economic evaluation, risk analysis, and project finance.",
        icon: "BookOpen",
        courseCount: 7,
        color: "#F5C518",
    },
];

export const featuredInstructor: Instructor = {
    id: "inst-1",
    name: "Dr. Ahmed Benali",
    nameAr: "د. أحمد بن علي",
    avatar: "/assets/avatars/instructor-1.jpg",
    title: "Senior Reservoir Engineer",
    company: "Sonatrach",
    bio: "20+ years of experience in reservoir simulation and enhanced oil recovery across North Africa.",
    expertise: ["reservoir", "production"],
    courseCount: 8,
    studentCount: 3200,
    rating: 4.9,
    linkedin: "https://linkedin.com/in/ahmed-benali",
};

export const partnerCompanies: Partial<Company>[] = [
    { id: "c1", name: "Sonatrach", logo: "/assets/logos/sonatrach.svg", country: "Algeria" },
    { id: "c2", name: "Total Energies", logo: "/assets/logos/total.svg", country: "France" },
    { id: "c3", name: "Schlumberger", logo: "/assets/logos/slb.svg", country: "USA" },
    { id: "c4", name: "Halliburton", logo: "/assets/logos/halliburton.svg", country: "USA" },
    { id: "c5", name: "ADNOC", logo: "/assets/logos/adnoc.svg", country: "UAE" },
    { id: "c6", name: "Saudi Aramco", logo: "/assets/logos/aramco.svg", country: "Saudi Arabia" },
];
