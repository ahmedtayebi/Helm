export type JobType = "Full-time" | "Internship" | "Contract";
export type ExperienceLevel = "Entry-level" | "Mid-level" | "Senior" | "Executive";

export interface Job {
    id: string;
    title: string;
    company: string;
    companyLogo?: string;
    location: string;
    isRemote: boolean;
    type: JobType;
    specialization: string;
    experienceLevel: ExperienceLevel;
    postedDate: string; // ISO string
    deadline: string; // ISO string
    salary?: string;
    matchPercent?: number;
    isFeatured?: boolean;
    isHot?: boolean;
    description: string;
    requirements: string[];
    responsibilities: string[];
    benefits: string[];
    // Internship specific
    duration?: string;
    isPaid?: boolean;
    industry?: string;
}

export interface Mentor {
    id: string;
    name: string;
    avatar: string;
    currentRole: string;
    company: string;
    specialization: string;
    yearsExperience: number;
    availability: "Available" | "Limited" | "Unavailable";
    sessions: number;
    rating: number;
    bio: string;
    skills: string[];
}

export const JOB_TYPE_STYLES: Record<JobType, { bg: string; text: string; border: string }> = {
    "Full-time": { bg: "bg-primary/10", text: "text-primary", border: "border-primary/30" },
    "Internship": { bg: "bg-teal-500/10", text: "text-teal-400", border: "border-teal-500/30" },
    "Contract": { bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/30" },
};

export const MOCK_JOBS: Job[] = [
    {
        id: "j_001",
        title: "Senior Drilling Engineer",
        company: "Sonatrach",
        location: "Hassi Messaoud, Algeria",
        isRemote: false,
        type: "Full-time",
        specialization: "Drilling",
        experienceLevel: "Senior",
        postedDate: "2026-03-01T09:00:00Z",
        deadline: "2026-04-01T23:59:00Z",
        salary: "150,000 – 200,000 DZD/month",
        matchPercent: 92,
        isFeatured: true,
        isHot: true,
        description: "Lead drilling operations for complex horizontal wells in the Berkine Basin. You will oversee BHA design, bit selection, and real-time optimization of drilling parameters while ensuring QHSE compliance at all times.",
        requirements: [
            "B.Sc. or M.Sc. in Petroleum Engineering",
            "5+ years of directional drilling experience",
            "IWCF Well Control certification",
            "Proficiency in WellPlan / Landmark software",
            "Strong leadership and communication skills",
        ],
        responsibilities: [
            "Plan and execute directional well programs for horizontal wells",
            "Monitor real-time drilling data and optimize parameters remotely",
            "Coordinate with MWD/LWD service companies on wellsite",
            "Prepare detailed daily drilling reports and end-of-well reports",
            "Mentor junior drilling engineers",
        ],
        benefits: ["Housing allowance", "Medical insurance", "Annual bonus", "Flight repatriation"],
    },
    {
        id: "j_002",
        title: "Reservoir Engineer – Simulation",
        company: "TotalEnergies Algeria",
        location: "Alger, Algeria",
        isRemote: true,
        type: "Full-time",
        specialization: "Reservoir",
        experienceLevel: "Mid-level",
        postedDate: "2026-02-25T10:00:00Z",
        deadline: "2026-03-25T23:59:00Z",
        salary: "$90,000 – $120,000/year",
        matchPercent: 87,
        isFeatured: true,
        description: "Join our Algeria Asset team to build and maintain dynamic simulation models for our Tin Fouye Tabankort (TFT) field. You will run history-matching campaigns and generate production forecasts for field development scenarios.",
        requirements: [
            "M.Sc. in Petroleum Engineering or related field",
            "3+ years of hands-on reservoir simulation (Eclipse, tNavigator, or CMG)",
            "Understanding of geological modeling (Petrel preferred)",
            "Good knowledge of PVT analysis",
        ],
        responsibilities: [
            "Build and update full-field dynamic simulation models",
            "Perform history matching and uncertainty analysis",
            "Generate and present development scenarios to management",
            "Collaborate with geoscience and production teams",
        ],
        benefits: ["Competitive salary", "Hybrid work policy", "Annual leave to France", "Training budget"],
    },
    {
        id: "j_003",
        title: "Field Service Engineer – Wireline",
        company: "SLB",
        location: "Ouargla, Algeria",
        isRemote: false,
        type: "Full-time",
        specialization: "Drilling",
        experienceLevel: "Entry-level",
        postedDate: "2026-03-05T08:00:00Z",
        deadline: "2026-06-30T23:59:00Z",
        salary: "Competitive + Field Allowance",
        matchPercent: 74,
        isFeatured: false,
        isHot: true,
        description: "Operate and maintain wireline logging tools in both open and cased hole environments. You'll be responsible for surface-to-wellsite data quality and tool mobilization.",
        requirements: [
            "B.Sc. in Petroleum, Electrical, or Mechatronics Engineering",
            "Fresh graduates are welcome to apply",
            "Willingness to be deployed on-site on rotation basis (28/28)",
            "Valid driving license",
        ],
        responsibilities: [
            "Rig up and rig down wireline tools and surface equipment",
            "Perform open-hole and cased-hole logging services",
            "Ensure data quality and perform first-pass interpretation",
            "Complete all relevant HSE paperwork",
        ],
        benefits: ["Rotational work (28/28)", "Health insurance", "SLB learning path", "International mobility"],
    },
    {
        id: "j_004",
        title: "Production Technologist",
        company: "Halliburton",
        location: "Skikda, Algeria",
        isRemote: false,
        type: "Full-time",
        specialization: "Production",
        experienceLevel: "Mid-level",
        postedDate: "2026-02-20T09:00:00Z",
        deadline: "2026-04-15T23:59:00Z",
        salary: "$85,000 – $110,000/year",
        matchPercent: 81,
        isFeatured: false,
        description: "Support LNG and condensate production operations by optimizing NODAL analysis models and ESP run life predictions. You'll act as the primary interface between our company and the customer's production team.",
        requirements: [
            "B.Sc. in Petroleum or Chemical Engineering",
            "4+ years of production engineering experience",
            "PIPESIM / Prosper certification is a plus",
            "Experience with artificial lift systems",
        ],
        responsibilities: [
            "Perform well performance analysis using NODAL models",
            "Optimize ESP parameters for run life extension",
            "Recommend production enhancement opportunities",
            "Prepare technical proposals and project scopes",
        ],
        benefits: ["Competitive package", "Career development", "Medical plan", "Annual bonus"],
    },
    {
        id: "j_005",
        title: "HSE Officer",
        company: "BP Algeria",
        location: "In Salah, Algeria",
        isRemote: false,
        type: "Full-time",
        specialization: "HSE",
        experienceLevel: "Mid-level",
        postedDate: "2026-03-08T10:00:00Z",
        deadline: "2026-05-01T23:59:00Z",
        salary: "Competitive package",
        matchPercent: 79,
        isFeatured: false,
        isHot: false,
        description: "Ensure HSE compliance across all operational activities at the In Salah Gas facility. You will conduct audits, lead incident investigation teams, and develop safety improvement programs.",
        requirements: [
            "B.Sc. in HSE, Engineering, or related field",
            "NEBOSH IGC Certificate (mandatory)",
            "3+ years of onshore HSE experience",
            "Incident investigation experience (ICAM methodology)",
        ],
        responsibilities: [
            "Conduct daily HSE inspections and tour the work site",
            "Lead toolbox talks and HSE awareness programs",
            "Investigate incidents and prepare detailed reports",
            "Maintain legal compliance registers",
        ],
        benefits: ["Housing provided", "Medical coverage", "Annual flights", "Bonus scheme"],
    },
    {
        id: "j_006",
        title: "LNG Process Engineer",
        company: "GNL Arzew – Sonatrach",
        location: "Bethioua, Oran, Algeria",
        isRemote: false,
        type: "Full-time",
        specialization: "LNG",
        experienceLevel: "Senior",
        postedDate: "2026-03-02T08:00:00Z",
        deadline: "2026-04-30T23:59:00Z",
        salary: "200,000 – 260,000 DZD/month",
        matchPercent: 88,
        isFeatured: true,
        description: "Lead process engineering activities for the GL1Z liquefaction train, including debottlenecking studies, HAZOP reviews, and process optimization to maintain 9 MTPA throughput.",
        requirements: [
            "M.Sc. in Chemical or Process Engineering",
            "8+ years in LNG or gas processing",
            "Proficiency in HYSYS / UNISIM process simulators",
            "HAZOP facilitator certification preferred",
        ],
        responsibilities: [
            "Lead process optimization and debottlenecking studies",
            "Facilitate HAZOP and SIL reviews",
            "Evaluate and approve MOCs for process changes",
            "Mentor junior process engineers",
        ],
        benefits: ["Senior management package", "Housing", "Annual bonus", "International conferences"],
    },
    {
        id: "j_007",
        title: "Economist – Upstream Projects",
        company: "Sonatrach EP",
        location: "Alger (Hydra), Algeria",
        isRemote: false,
        type: "Full-time",
        specialization: "Economics",
        experienceLevel: "Mid-level",
        postedDate: "2026-02-28T09:00:00Z",
        deadline: "2026-04-28T23:59:00Z",
        salary: "130,000 – 170,000 DZD/month",
        matchPercent: 75,
        isFeatured: false,
        description: "Conduct economic evaluations for upstream exploration and development projects. You will develop financial models, perform DCF analysis, and present investment recommendations to senior management.",
        requirements: [
            "M.Sc. in Petroleum Economics, Finance, or Engineering",
            "3+ years of project economics experience",
            "Proficiency in @Risk / Crystal Ball for Monte Carlo simulation",
            "Strong Excel modeling skills",
        ],
        responsibilities: [
            "Build project economic models (NPV, IRR, break-even)",
            "Perform sensitivity and risk analysis",
            "Prepare investment memoranda for the Investment Committee",
            "Monitor and update project economics post-FID",
        ],
        benefits: ["Competitive salary", "Pension plan", "Training budget", "Flexible hours"],
    },
    {
        id: "j_008",
        title: "Subsurface Geologist",
        company: "Repsol Algeria",
        location: "Alger, Algeria",
        isRemote: true,
        type: "Contract",
        specialization: "Reservoir",
        experienceLevel: "Senior",
        postedDate: "2026-03-10T11:00:00Z",
        deadline: "2026-03-31T23:59:00Z",
        salary: "$1,500 – $2,000/day",
        matchPercent: 70,
        isFeatured: false,
        isHot: true,
        description: "12-month contract to support the appraisal phase of the Reggane Nord discovery. You will integrate seismic, well log, and core data to update the geological model.",
        requirements: [
            "M.Sc. in Geology or Geoscience",
            "10+ years of subsurface experience in North Africa",
            "Strong Petrel skills",
            "Deep understanding of Paleozoic carbonates",
        ],
        responsibilities: [
            "Integrate well data with 3D seismic interpretation",
            "Update the structural and stratigraphic model",
            "Estimate GIIP and uncertainty ranges",
            "Prepare CPR-ready documentation",
        ],
        benefits: ["High day rate", "Remote-friendly", "Business travel covered"],
    },
    {
        id: "j_009",
        title: "Drilling Engineering Intern",
        company: "SLB",
        location: "Ouargla, Algeria",
        isRemote: false,
        type: "Internship",
        specialization: "Drilling",
        experienceLevel: "Entry-level",
        postedDate: "2026-03-07T09:00:00Z",
        deadline: "2026-03-31T23:59:00Z",
        salary: "45,000 DZD/month",
        matchPercent: 68,
        isFeatured: false,
        isHot: true,
        duration: "6 months",
        isPaid: true,
        industry: "Oilfield Services",
        description: "Join SLB's Global Internship Program and work alongside experienced drilling engineers on real ongoing projects. You'll gain exposure to drilling optimization, BHA design, and wellsite operations.",
        requirements: [
            "3rd or 4th year Petroleum Engineering student",
            "GPA ≥ 3.2 / 4.0",
            "Available for 6 months (July – December 2026)",
            "Conversational English (required)",
        ],
        responsibilities: [
            "Support BHA selection and bit program design",
            "Prepare and review drilling programs",
            "Shadow wellsite supervisors during field visits",
            "Participate in post-well review sessions",
        ],
        benefits: ["Monthly stipend", "Mentorship program", "Conversion opportunity to full-time", "SLB certificate"],
    },
    {
        id: "j_010",
        title: "Reservoir Engineering Intern",
        company: "Sonatrach",
        location: "Alger, Algeria",
        isRemote: false,
        type: "Internship",
        specialization: "Reservoir",
        experienceLevel: "Entry-level",
        postedDate: "2026-03-03T09:00:00Z",
        deadline: "2026-04-15T23:59:00Z",
        salary: "30,000 DZD/month",
        matchPercent: 72,
        isFeatured: false,
        isHot: false,
        duration: "3 months",
        isPaid: true,
        industry: "National Oil Company",
        description: "Summer internship with the Reservoir Studies Division. You'll assist senior engineers in running sensitivity studies on the Hassi R'Mel giant gas field simulation model.",
        requirements: [
            "2nd, 3rd or 4th year Petroleum or Reservoir Engineering student",
            "Familiar with Petrel or Eclipse (basic level)",
            "Arabic or French communication skills",
        ],
        responsibilities: [
            "Assist with history matching runs",
            "Prepare sensitivity analysis graphs",
            "Write technical reports in French/Arabic",
            "Attend technical presentations",
        ],
        benefits: ["Monthly stipend", "Certificate of completion", "Exposure to giant field operations"],
    },
];

export const MOCK_MENTORS: Mentor[] = [
    {
        id: "m_001",
        name: "Eng. Tariq Haddad",
        avatar: "https://i.pravatar.cc/150?u=tariq_mentor",
        currentRole: "Senior Drilling Engineer",
        company: "Saudi Aramco",
        specialization: "Drilling",
        yearsExperience: 15,
        availability: "Available",
        sessions: 142,
        rating: 4.9,
        bio: "15 years designing and optimizing complex horizontal wells across the Middle East and North Africa. Specializing in rotary steerable systems and advanced stuck pipe prevention.",
        skills: ["Directional Drilling", "BHA Design", "Wellplan", "IADC Well Control"],
    },
    {
        id: "m_002",
        name: "Dr. Sarah Mansouri",
        avatar: "https://i.pravatar.cc/150?u=sarah_mentor",
        currentRole: "Reservoir Simulation Lead",
        company: "TotalEnergies",
        specialization: "Reservoir",
        yearsExperience: 12,
        availability: "Limited",
        sessions: 89,
        rating: 4.8,
        bio: "Specialized in building full-field dynamic models for giant carbonate fields. PhD from IFP School. Passionate about bridging the gap between academia and industry.",
        skills: ["Eclipse", "tNavigator", "Petrel", "History Matching", "Monte Carlo"],
    },
    {
        id: "m_003",
        name: "Eng. Khalid Amrani",
        avatar: "https://i.pravatar.cc/150?u=khalid_mentor",
        currentRole: "Production Lead",
        company: "ADNOC",
        specialization: "Production",
        yearsExperience: 10,
        availability: "Available",
        sessions: 210,
        rating: 5.0,
        bio: "Production optimization expert with a track record of increasing field output by 18% using NODAL analysis and smart artificial lift selection strategies.",
        skills: ["PIPESIM", "Prosper", "ESP Design", "Gas Lift", "Production Chemistry"],
    },
    {
        id: "m_004",
        name: "Dr. Fatima Zohra",
        avatar: "https://i.pravatar.cc/150?u=fatima_mentor",
        currentRole: "HSE Director",
        company: "Kuwait Oil Company",
        specialization: "HSE",
        yearsExperience: 18,
        availability: "Limited",
        sessions: 67,
        rating: 4.7,
        bio: "Senior HSE professional with NEBOSH Diploma and over 18 years managing PSM programs across 5 countries. Experienced HAZOP study leader and safety culture champion.",
        skills: ["PSM", "HAZOP", "NEBOSH", "Incident Investigation", "Risk Assessment"],
    },
    {
        id: "m_005",
        name: "Eng. Ali Farhat",
        avatar: "https://i.pravatar.cc/150?u=ali_mentor",
        currentRole: "Facilities & LNG Engineer",
        company: "QatarEnergy",
        specialization: "LNG",
        yearsExperience: 9,
        availability: "Available",
        sessions: 53,
        rating: 4.6,
        bio: "9 years of experience in LNG plant optimization and cryogenic facility design. Instrumental in the commissioning of two liquefaction trains at North Field.",
        skills: ["HYSYS", "LNG", "Cryogenic Systems", "Process Safety", "FEED Studies"],
    },
    {
        id: "m_006",
        name: "Prof. Nabil Khelil",
        avatar: "https://i.pravatar.cc/150?u=nabil_mentor",
        currentRole: "Financial Analyst & Professor",
        company: "OAPEC / Polytechnique Alger",
        specialization: "Economics",
        yearsExperience: 20,
        availability: "Unavailable",
        sessions: 310,
        rating: 4.9,
        bio: "Veteran petroleum economist and professor who has advised governments on PSA negotiations and modeled billion-dollar E&P investments. Author of two published textbooks.",
        skills: ["DCF Modeling", "Monte Carlo", "PSA Negotiation", "Excel", "@Risk"],
    },
];
