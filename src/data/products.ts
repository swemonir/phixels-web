import { Globe, Smartphone, Chrome, LucideIcon } from 'lucide-react';

export interface Product {
    id: string;
    name: string;
    tagline: string;
    description: string;
    longDescription?: string;
    image: string;
    platform: string;
    link: string;
    icon: LucideIcon;
    color: string;
    stats: {
        users: string;
        rating: number;
        downloads: string;
    };
    features: string[];
    category: string;
}

export const allProducts: Product[] = [
    {
        id: 'devmark',
        name: 'DevMark',
        tagline: 'Code snippet manager & markdown editor',
        description: 'The ultimate tool for developers to organize, share, and collaborate on code snippets with built-in markdown support and syntax highlighting.',
        longDescription: 'DevMark revolutionizes how developers manage and share code snippets. With powerful syntax highlighting, real-time collaboration features, and seamless cloud synchronization, it has become the go-to tool for development teams worldwide. Whether you are working solo or with a team, DevMark ensures your code snippets are always organized, accessible, and beautifully formatted.',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
        platform: 'Web',
        link: 'https://devmark.app',
        icon: Globe,
        color: 'from-blue-500 to-cyan-500',
        stats: {
            users: '50K+',
            rating: 4.8,
            downloads: '100K+'
        },
        features: ['Syntax Highlighting for 100+ Languages', 'Real-time Team Collaboration', 'Cloud Sync Across Devices', 'Version Control Integration', 'Markdown Editor with Live Preview', 'Code Organization with Tags & Folders', 'Search & Filter Capabilities', 'Export to Multiple Formats'],
        category: 'Developer Tools'
    },
    {
        id: 'masterapp',
        name: 'MasterApp',
        tagline: 'All-in-one productivity suite',
        description: 'Streamline your workflow with our comprehensive productivity platform featuring task management, time tracking, and team collaboration tools.',
        longDescription: 'MasterApp brings together everything you need to stay productive in one powerful platform. From task management and time tracking to team collaboration and analytics, MasterApp helps individuals and teams achieve more with less effort. Built with modern technology and designed for efficiency.',
        image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80',
        platform: 'Android',
        link: 'https://play.google.com/store',
        icon: Smartphone,
        color: 'from-green-500 to-emerald-500',
        stats: {
            users: '200K+',
            rating: 4.9,
            downloads: '500K+'
        },
        features: ['Advanced Task Management', 'Time Tracking & Reports', 'Team Collaboration Tools', 'Analytics Dashboard', 'Calendar Integration', 'File Sharing & Storage', 'Mobile & Desktop Apps', 'Third-party Integrations'],
        category: 'Productivity'
    },
    {
        id: 'myfamily',
        name: 'My Family',
        tagline: 'Private family network & organizer',
        description: 'Keep your family connected with a secure, private social network designed for sharing moments, coordinating schedules, and staying in touch.',
        longDescription: 'My Family creates a safe, private space for families to connect, share, and organize their lives together. With features designed specifically for family needs, from shared calendars to private photo albums, it brings families closer no matter the distance.',
        image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80',
        platform: 'iOS',
        link: 'https://apps.apple.com',
        icon: Smartphone,
        color: 'from-pink-500 to-rose-500',
        stats: {
            users: '150K+',
            rating: 4.7,
            downloads: '300K+'
        },
        features: ['Private Family Network', 'Shared Calendar & Events', 'Photo & Video Albums', 'Location Sharing', 'Group Messaging', 'Task & Chore Management', 'Emergency Contacts', 'Privacy Controls'],
        category: 'Social'
    },
    {
        id: 'taskflow',
        name: 'TaskFlow Pro',
        tagline: 'AI-powered task prioritization',
        description: 'Smart task management that learns from your habits and automatically prioritizes your work for maximum productivity.',
        longDescription: 'TaskFlow Pro uses advanced AI algorithms to understand your work patterns and automatically prioritize your tasks. It learns from your behavior, adapts to your workflow, and helps you focus on what matters most. With intelligent scheduling and smart reminders, you\'ll never miss a deadline again.',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
        platform: 'Chrome',
        link: 'https://chrome.google.com/webstore',
        icon: Chrome,
        color: 'from-purple-500 to-violet-500',
        stats: {
            users: '75K+',
            rating: 4.6,
            downloads: '150K+'
        },
        features: ['AI-Powered Task Prioritization', 'Browser Integration', 'Smart Reminders & Notifications', 'Focus Mode & Time Blocking', 'Habit Tracking', 'Team Collaboration', 'Cross-Platform Sync', 'Productivity Analytics'],
        category: 'Productivity'
    },
    {
        id: 'financeai',
        name: 'FinanceAI',
        tagline: 'Smart personal finance tracker',
        description: 'Take control of your finances with AI-powered insights, budget tracking, and investment recommendations tailored to your goals.',
        longDescription: 'FinanceAI combines cutting-edge AI technology with comprehensive financial management tools. Track your spending, create budgets, monitor investments, and receive personalized recommendations to help you achieve your financial goals. With bank-level security and real-time insights, managing your money has never been easier.',
        image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=80',
        platform: 'Web',
        link: 'https://financeai.app',
        icon: Globe,
        color: 'from-yellow-500 to-orange-500',
        stats: {
            users: '120K+',
            rating: 4.8,
            downloads: '250K+'
        },
        features: ['Budget Tracking & Planning', 'Investment Portfolio Analysis', 'Bill Reminders & Alerts', 'Expense Analytics & Reports', 'AI Financial Advisor', 'Multi-Currency Support', 'Bank Integration', 'Tax Optimization Tips'],
        category: 'Finance'
    },
    {
        id: 'healthmate',
        name: 'HealthMate',
        tagline: 'Wellness tracking with AI coach',
        description: 'Your personal health companion with AI-powered coaching, fitness tracking, and personalized wellness recommendations.',
        longDescription: 'HealthMate is your all-in-one wellness companion that combines fitness tracking, nutrition planning, and AI-powered coaching. Get personalized workout plans, meal recommendations, and health insights tailored to your goals. Track your progress, stay motivated, and achieve your health objectives with intelligent guidance every step of the way.',
        image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
        platform: 'Android',
        link: 'https://play.google.com/store',
        icon: Smartphone,
        color: 'from-red-500 to-pink-500',
        stats: {
            users: '300K+',
            rating: 4.9,
            downloads: '600K+'
        },
        features: ['AI Health Coach', 'Fitness & Activity Tracking', 'Meal Planning & Nutrition', 'Sleep Analysis & Insights', 'Heart Rate Monitoring', 'Workout Programs', 'Progress Tracking', 'Community Challenges'],
        category: 'Health'
    },
    {
        id: 'cryptosync',
        name: 'CryptoSync',
        tagline: 'Real-time portfolio aggregator',
        description: 'Track all your crypto investments in one place with real-time updates, portfolio analytics, and market insights.',
        longDescription: 'CryptoSync aggregates all your cryptocurrency holdings from multiple exchanges and wallets into one comprehensive dashboard. Monitor your portfolio in real-time, track market trends, set price alerts, and make informed investment decisions with advanced analytics and insights.',
        image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=1200&q=80',
        platform: 'Web',
        link: '#',
        icon: Globe,
        color: 'from-indigo-500 to-purple-500',
        stats: {
            users: '90K+',
            rating: 4.5,
            downloads: '180K+'
        },
        features: ['Multi-Exchange Support', 'Real-time Price Tracking', 'Tax Reports & Export', 'Price Alerts & Notifications', 'Portfolio Analytics', 'Market News & Insights', 'Wallet Integration', 'Profit/Loss Tracking'],
        category: 'Finance'
    },
    {
        id: 'edulearn',
        name: 'EduLearn',
        tagline: 'Interactive learning for kids',
        description: 'Make learning fun with interactive lessons, games, and progress tracking designed specifically for young learners.',
        longDescription: 'EduLearn transforms education into an engaging adventure for children. With interactive lessons, educational games, and adaptive learning paths, kids stay motivated while mastering essential skills. Parents can track progress, set learning goals, and celebrate achievements together.',
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80',
        platform: 'iOS',
        link: '#',
        icon: Smartphone,
        color: 'from-orange-500 to-red-500',
        stats: {
            users: '250K+',
            rating: 4.9,
            downloads: '500K+'
        },
        features: ['Interactive Lessons', 'Progress Tracking', 'Parental Controls', 'Offline Mode', 'Educational Games', 'Adaptive Learning', 'Achievement System', 'Multi-Subject Coverage'],
        category: 'Education'
    },
    {
        id: 'travelmate',
        name: 'TravelMate',
        tagline: 'AI travel planning assistant',
        description: 'Plan your perfect trip with AI-powered recommendations, itinerary management, and real-time travel updates.',
        longDescription: 'TravelMate is your intelligent travel companion that helps you plan, organize, and enjoy your trips. Get personalized destination recommendations, create detailed itineraries, book accommodations, and receive real-time updates. Whether you\'re a solo traveler or planning a family vacation, TravelMate makes travel planning effortless.',
        image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
        platform: 'Web',
        link: '#',
        icon: Globe,
        color: 'from-teal-500 to-cyan-500',
        stats: {
            users: '180K+',
            rating: 4.7,
            downloads: '350K+'
        },
        features: ['AI Recommendations', 'Itinerary Builder', 'Booking Integration', 'Offline Maps', 'Travel Guides', 'Expense Tracking', 'Weather Updates', 'Local Tips & Insights'],
        category: 'Travel'
    },
    {
        id: 'musicpro',
        name: 'MusicPro',
        tagline: 'Professional music production',
        description: 'Create, edit, and produce professional-quality music with our comprehensive DAW and audio editing suite.',
        longDescription: 'MusicPro is a complete digital audio workstation that brings professional music production to your browser. Record, edit, mix, and master your tracks with industry-standard tools and effects. Collaborate with other musicians in real-time and bring your musical vision to life.',
        image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80',
        platform: 'Chrome',
        link: '#',
        icon: Chrome,
        color: 'from-violet-500 to-purple-500',
        stats: {
            users: '95K+',
            rating: 4.6,
            downloads: '200K+'
        },
        features: ['Multi-track Recording', 'VST Plugin Support', 'Audio Effects Library', 'Cloud Collaboration', 'MIDI Support', 'Mixing & Mastering Tools', 'Sample Library', 'Export to Multiple Formats'],
        category: 'Creative'
    },
    {
        id: 'petcare',
        name: 'PetCare Plus',
        tagline: 'Complete pet health management',
        description: "Track your pet's health, schedule vet appointments, and get personalized care recommendations.",
        longDescription: 'PetCare Plus is the ultimate companion for pet owners who want the best for their furry friends. Track health records, schedule vet visits, set medication reminders, and connect with a community of pet lovers. Get personalized care tips and ensure your pet lives a happy, healthy life.',
        image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1200&q=80',
        platform: 'Android',
        link: '#',
        icon: Smartphone,
        color: 'from-amber-500 to-orange-500',
        stats: {
            users: '220K+',
            rating: 4.8,
            downloads: '450K+'
        },
        features: ['Health Record Tracking', 'Vet Appointment Scheduling', 'Medication Reminders', 'Pet Community & Forums', 'Vaccination Tracking', 'Weight & Activity Monitoring', 'Emergency Contacts', 'Care Tips & Guides'],
        category: 'Lifestyle'
    },
    {
        id: 'homechef',
        name: 'HomeChef AI',
        tagline: 'Smart recipe & meal planning',
        description: 'Discover recipes, plan meals, and get cooking instructions with AI-powered personalization based on your preferences.',
        longDescription: 'HomeChef AI revolutionizes home cooking with intelligent recipe recommendations, automated meal planning, and step-by-step cooking guidance. Discover new dishes, manage your pantry, create shopping lists, and cook like a pro with personalized suggestions tailored to your tastes and dietary needs.',
        image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80',
        platform: 'iOS',
        link: '#',
        icon: Smartphone,
        color: 'from-rose-500 to-pink-500',
        stats: {
            users: '280K+',
            rating: 4.9,
            downloads: '550K+'
        },
        features: ['Recipe Discovery', 'Meal Planning Calendar', 'Smart Shopping Lists', 'Nutrition Tracking', 'Cooking Instructions', 'Pantry Management', 'Dietary Preferences', 'Save Favorites'],
        category: 'Lifestyle'
    }
];

export const categories = ['All', 'Developer Tools', 'Productivity', 'Social', 'Finance', 'Health', 'Education', 'Travel', 'Creative', 'Lifestyle'];
