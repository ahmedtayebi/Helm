// ============================================
// HELM Academy — TypeScript Interfaces
// ============================================

// ── User & Auth ──

export interface User {
    id: string;
    email: string;
    name: string;
    nameAr?: string;
    avatar?: string;
    role: "student" | "instructor" | "admin" | "company";
    bio?: string;
    company?: string;
    jobTitle?: string;
    country?: string;
    language: "en" | "ar" | "fr";
    enrollments: Enrollment[];
    certificates: Certificate[];
    createdAt: Date;
    updatedAt: Date;
}

export interface UserProfile extends User {
    phone?: string;
    linkedin?: string;
    skills: string[];
    experience: number; // years
    specialization?: PetroleumDomain;
}

// ── Courses ──

export type PetroleumDomain =
    | "drilling"
    | "reservoir"
    | "production"
    | "hse"
    | "lng"
    | "petroleum-economics"
    | "geoscience"
    | "completions"
    | "pipelines"
    | "refining";

export type CourseLevel = "beginner" | "intermediate" | "advanced" | "expert";

export interface Course {
    id: string;
    title: string;
    titleAr?: string;
    slug: string;
    description: string;
    descriptionAr?: string;
    thumbnail: string;
    coverImage?: string;
    instructor: Instructor;
    domain: PetroleumDomain;
    level: CourseLevel;
    duration: number; // hours
    modules: Module[];
    price: number;
    currency: "USD" | "DZD" | "EUR";
    discountPrice?: number;
    rating: number;
    reviewCount: number;
    enrollmentCount: number;
    isFeatured: boolean;
    isPublished: boolean;
    tags: string[];
    prerequisites: string[];
    learningOutcomes: string[];
    language: "en" | "ar" | "fr";
    certificate: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Module {
    id: string;
    courseId: string;
    title: string;
    titleAr?: string;
    description?: string;
    order: number;
    lessons: Lesson[];
    duration: number; // minutes
}

export interface Lesson {
    id: string;
    moduleId: string;
    title: string;
    titleAr?: string;
    type: "video" | "article" | "quiz" | "simulation" | "lab";
    content?: string;
    videoUrl?: string;
    duration: number; // minutes
    order: number;
    isFree: boolean;
    resources: Resource[];
}

export interface Resource {
    id: string;
    title: string;
    type: "pdf" | "slides" | "dataset" | "code" | "spreadsheet" | "link";
    url: string;
    size?: number; // bytes
}

// ── Instructors ──

export interface Instructor {
    id: string;
    name: string;
    nameAr?: string;
    avatar: string;
    title: string;
    company?: string;
    bio: string;
    expertise: PetroleumDomain[];
    courseCount: number;
    studentCount: number;
    rating: number;
    linkedin?: string;
}

// ── Library / Books ──

export interface Book {
    id: string;
    title: string;
    titleAr?: string;
    author: string;
    cover: string;
    description: string;
    domain: PetroleumDomain;
    isbn?: string;
    pages: number;
    year: number;
    publisher: string;
    language: "en" | "ar" | "fr";
    format: "pdf" | "epub" | "hardcover";
    downloadUrl?: string;
    price?: number;
    isFree: boolean;
    rating: number;
    tags: string[];
}

// ── Certificates ──

export interface Certificate {
    id: string;
    userId: string;
    courseId: string;
    courseName: string;
    issueDate: Date;
    expiryDate?: Date;
    credentialId: string;
    verificationUrl: string;
    grade?: string;
    skills: string[];
}

// ── Jobs & Companies ──

export interface Job {
    id: string;
    title: string;
    company: Company;
    location: string;
    type: "full-time" | "part-time" | "contract" | "internship";
    remote: boolean;
    domain: PetroleumDomain;
    level: "entry" | "mid" | "senior" | "lead" | "executive";
    salary?: {
        min: number;
        max: number;
        currency: string;
    };
    description: string;
    requirements: string[];
    benefits: string[];
    applicationUrl: string;
    deadline?: Date;
    postedAt: Date;
    isActive: boolean;
}

export interface Company {
    id: string;
    name: string;
    nameAr?: string;
    logo: string;
    coverImage?: string;
    description: string;
    descriptionAr?: string;
    website: string;
    industry: string;
    size: "startup" | "small" | "medium" | "large" | "enterprise";
    location: string;
    country: string;
    founded?: number;
    jobCount: number;
    isPartner: boolean;
}

// ── Enrollments ──

export interface Enrollment {
    id: string;
    userId: string;
    courseId: string;
    enrolledAt: Date;
    progress: number; // 0–100
    completedLessons: string[];
    currentLessonId?: string;
    status: "active" | "completed" | "paused" | "expired";
    completedAt?: Date;
}

// ── Reviews ──

export interface Review {
    id: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    courseId: string;
    rating: number; // 1–5
    title?: string;
    comment: string;
    createdAt: Date;
    helpful: number;
}

// ── Categories ──

export interface Category {
    id: string;
    name: string;
    nameAr?: string;
    slug: string;
    description?: string;
    icon: string;
    courseCount: number;
    color?: string;
}

// ── Community ──

export interface ForumPost {
    id: string;
    authorId: string;
    authorName: string;
    authorAvatar?: string;
    title: string;
    content: string;
    domain: PetroleumDomain;
    tags: string[];
    likes: number;
    replies: number;
    views: number;
    isPinned: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// ── Navigation ──

export interface NavItem {
    label: string;
    labelAr?: string;
    href: string;
    icon?: string;
    children?: NavItem[];
    badge?: string;
}

// ── API Responses ──

export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message?: string;
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
