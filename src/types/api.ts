export interface ApiResponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    data: T;
}

export interface Blog {
    _id: string;
    title: string;
    writer: string;
    readingTime: string;
    details: string;
    tags: string[];
    image: string;
    createdAt: string;
    updatedAt?: string;
    slug?: string; // For frontend compatibility if needed
}

export interface Portfolio {
    _id: string;
    title: string;
    client: string;
    category: string;
    technology: string[];
    activeUsers: string;
    image: string;
    liveLink: string;
    createdAt: string;
    description?: string; // For frontend mapping
}

export interface Product {
    _id: string;
    name: string;
    description: string;
    features: string[];
    pricing: number;
    demoLink: string;
    images: string[];
    category: string;
    createdAt: string;
    tagline?: string; // For frontend mapping
}

export interface Service {
    _id: string;
    title: string;
    description: string;
    icon: string;
    features: string[];
    images: string[];
    createdAt: string;
    subcategories?: string[]; // For frontend mapping
}

export interface CaseStudy {
    _id: string;
    title: string;
    client: string;
    category: string;
    challenge: string;
    solution: string;
    result: string;
    image: string;
    link: string;
    createdAt: string;
}

export interface Career {
    _id: string;
    jobTitle: string;
    jobType: string;
    location: string;
    description: string;
    requirements: string[];
    responsibilities: string[];
    salaryRange: string;
    deadline: string;
    applicationEmail: string;
    createdAt: string;
}
