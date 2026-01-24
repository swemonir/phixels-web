import { Briefcase, FileText, Home, Layers, Sparkles, Users } from "lucide-react";
import { Smartphone, Globe, Code, Brain, Blocks, Building2, Zap } from 'lucide-react';

// Mock booked slots
export const BOOKED_SLOTS = [
    { date: 'Monday, January 26', time: '10:00 AM' },
    { date: 'Wednesday, January 28', time: '02:00 PM' }
];

// Comprehensive country codes with flags
export const COUNTRY_CODES = [
    { code: '+1', country: 'US', flag: '🇺🇸', name: 'United States' },
    { code: '+1', country: 'CA', flag: '🇨🇦', name: 'Canada' },
    { code: '+7', country: 'RU', flag: '🇷🇺', name: 'Russia' },
    { code: '+20', country: 'EG', flag: '🇪🇬', name: 'Egypt' },
    { code: '+27', country: 'ZA', flag: '🇿🇦', name: 'South Africa' },
    { code: '+30', country: 'GR', flag: '🇬🇷', name: 'Greece' },
    { code: '+31', country: 'NL', flag: '🇳🇱', name: 'Netherlands' },
    { code: '+32', country: 'BE', flag: '🇧🇪', name: 'Belgium' },
    { code: '+33', country: 'FR', flag: '🇫🇷', name: 'France' },
    { code: '+34', country: 'ES', flag: '🇪🇸', name: 'Spain' },
    { code: '+36', country: 'HU', flag: '🇭🇺', name: 'Hungary' },
    { code: '+39', country: 'IT', flag: '🇮🇹', name: 'Italy' },
    { code: '+40', country: 'RO', flag: '🇷🇴', name: 'Romania' },
    { code: '+41', country: 'CH', flag: '🇨🇭', name: 'Switzerland' },
    { code: '+43', country: 'AT', flag: '🇦🇹', name: 'Austria' },
    { code: '+44', country: 'GB', flag: '🇬🇧', name: 'United Kingdom' },
    { code: '+45', country: 'DK', flag: '🇩🇰', name: 'Denmark' },
    { code: '+46', country: 'SE', flag: '🇸🇪', name: 'Sweden' },
    { code: '+47', country: 'NO', flag: '🇳🇴', name: 'Norway' },
    { code: '+48', country: 'PL', flag: '🇵🇱', name: 'Poland' },
    { code: '+49', country: 'DE', flag: '🇩🇪', name: 'Germany' },
    { code: '+51', country: 'PE', flag: '🇵🇪', name: 'Peru' },
    { code: '+52', country: 'MX', flag: '🇲🇽', name: 'Mexico' },
    { code: '+53', country: 'CU', flag: '🇨🇺', name: 'Cuba' },
    { code: '+54', country: 'AR', flag: '🇦🇷', name: 'Argentina' },
    { code: '+55', country: 'BR', flag: '🇧🇷', name: 'Brazil' },
    { code: '+56', country: 'CL', flag: '🇨🇱', name: 'Chile' },
    { code: '+57', country: 'CO', flag: '🇨🇴', name: 'Colombia' },
    { code: '+58', country: 'VE', flag: '🇻🇪', name: 'Venezuela' },
    { code: '+60', country: 'MY', flag: '🇲🇾', name: 'Malaysia' },
    { code: '+61', country: 'AU', flag: '🇦🇺', name: 'Australia' },
    { code: '+62', country: 'ID', flag: '🇮🇩', name: 'Indonesia' },
    { code: '+63', country: 'PH', flag: '🇵🇭', name: 'Philippines' },
    { code: '+64', country: 'NZ', flag: '🇳🇿', name: 'New Zealand' },
    { code: '+65', country: 'SG', flag: '🇸🇬', name: 'Singapore' },
    { code: '+66', country: 'TH', flag: '🇹🇭', name: 'Thailand' },
    { code: '+81', country: 'JP', flag: '🇯🇵', name: 'Japan' },
    { code: '+82', country: 'KR', flag: '🇰🇷', name: 'South Korea' },
    { code: '+84', country: 'VN', flag: '🇻🇳', name: 'Vietnam' },
    { code: '+86', country: 'CN', flag: '🇨🇳', name: 'China' },
    { code: '+90', country: 'TR', flag: '🇹🇷', name: 'Turkey' },
    { code: '+91', country: 'IN', flag: '🇮🇳', name: 'India' },
    { code: '+92', country: 'PK', flag: '🇵🇰', name: 'Pakistan' },
    { code: '+93', country: 'AF', flag: '🇦🇫', name: 'Afghanistan' },
    { code: '+94', country: 'LK', flag: '🇱🇰', name: 'Sri Lanka' },
    { code: '+95', country: 'MM', flag: '🇲🇲', name: 'Myanmar' },
    { code: '+98', country: 'IR', flag: '🇮🇷', name: 'Iran' },
    { code: '+212', country: 'MA', flag: '🇲🇦', name: 'Morocco' },
    { code: '+213', country: 'DZ', flag: '🇩🇿', name: 'Algeria' },
    { code: '+216', country: 'TN', flag: '🇹🇳', name: 'Tunisia' },
    { code: '+218', country: 'LY', flag: '🇱🇾', name: 'Libya' },
    { code: '+220', country: 'GM', flag: '🇬🇲', name: 'Gambia' },
    { code: '+221', country: 'SN', flag: '🇸🇳', name: 'Senegal' },
    { code: '+222', country: 'MR', flag: '🇲🇷', name: 'Mauritania' },
    { code: '+223', country: 'ML', flag: '🇲🇱', name: 'Mali' },
    { code: '+224', country: 'GN', flag: '🇬🇳', name: 'Guinea' },
    { code: '+225', country: 'CI', flag: '🇨🇮', name: 'Ivory Coast' },
    { code: '+226', country: 'BF', flag: '🇧🇫', name: 'Burkina Faso' },
    { code: '+227', country: 'NE', flag: '🇳🇪', name: 'Niger' },
    { code: '+228', country: 'TG', flag: '🇹🇬', name: 'Togo' },
    { code: '+229', country: 'BJ', flag: '🇧🇯', name: 'Benin' },
    { code: '+230', country: 'MU', flag: '🇲🇺', name: 'Mauritius' },
    { code: '+231', country: 'LR', flag: '🇱🇷', name: 'Liberia' },
    { code: '+232', country: 'SL', flag: '🇸🇱', name: 'Sierra Leone' },
    { code: '+233', country: 'GH', flag: '🇬🇭', name: 'Ghana' },
    { code: '+234', country: 'NG', flag: '🇳🇬', name: 'Nigeria' },
    { code: '+235', country: 'TD', flag: '🇹🇩', name: 'Chad' },
    { code: '+236', country: 'CF', flag: '🇨🇫', name: 'Central African Republic' },
    { code: '+237', country: 'CM', flag: '🇨🇲', name: 'Cameroon' },
    { code: '+238', country: 'CV', flag: '🇨🇻', name: 'Cape Verde' },
    { code: '+239', country: 'ST', flag: '🇸🇹', name: 'Sao Tome and Principe' },
    { code: '+240', country: 'GQ', flag: '🇬🇶', name: 'Equatorial Guinea' },
    { code: '+241', country: 'GA', flag: '🇬🇦', name: 'Gabon' },
    { code: '+242', country: 'CG', flag: '🇨🇬', name: 'Republic of the Congo' },
    { code: '+243', country: 'CD', flag: '🇨🇩', name: 'Democratic Republic of the Congo' },
    { code: '+244', country: 'AO', flag: '🇦🇴', name: 'Angola' },
    { code: '+245', country: 'GW', flag: '🇬🇼', name: 'Guinea-Bissau' },
    { code: '+246', country: 'IO', flag: '🇮🇴', name: 'British Indian Ocean Territory' },
    { code: '+248', country: 'SC', flag: '🇸🇨', name: 'Seychelles' },
    { code: '+249', country: 'SD', flag: '🇸🇩', name: 'Sudan' },
    { code: '+250', country: 'RW', flag: '🇷🇼', name: 'Rwanda' },
    { code: '+251', country: 'ET', flag: '🇪🇹', name: 'Ethiopia' },
    { code: '+252', country: 'SO', flag: '🇸🇴', name: 'Somalia' },
    { code: '+253', country: 'DJ', flag: '🇩🇯', name: 'Djibouti' },
    { code: '+254', country: 'KE', flag: '🇰🇪', name: 'Kenya' },
    { code: '+255', country: 'TZ', flag: '🇹🇿', name: 'Tanzania' },
    { code: '+256', country: 'UG', flag: '🇺🇬', name: 'Uganda' },
    { code: '+257', country: 'BI', flag: '🇧🇮', name: 'Burundi' },
    { code: '+258', country: 'MZ', flag: '🇲🇿', name: 'Mozambique' },
    { code: '+260', country: 'ZM', flag: '🇿🇲', name: 'Zambia' },
    { code: '+261', country: 'MG', flag: '🇲🇬', name: 'Madagascar' },
    { code: '+262', country: 'RE', flag: '🇷🇪', name: 'Reunion' },
    { code: '+263', country: 'ZW', flag: '🇿🇼', name: 'Zimbabwe' },
    { code: '+264', country: 'NA', flag: '🇳🇦', name: 'Namibia' },
    { code: '+265', country: 'MW', flag: '🇲🇼', name: 'Malawi' },
    { code: '+266', country: 'LS', flag: '🇱🇸', name: 'Lesotho' },
    { code: '+267', country: 'BW', flag: '🇧🇼', name: 'Botswana' },
    { code: '+268', country: 'SZ', flag: '🇸🇿', name: 'Eswatini' },
    { code: '+269', country: 'KM', flag: '🇰🇲', name: 'Comoros' },
    { code: '+290', country: 'SH', flag: '🇸🇭', name: 'Saint Helena' },
    { code: '+291', country: 'ER', flag: '🇪🇷', name: 'Eritrea' },
    { code: '+297', country: 'AW', flag: '🇦🇼', name: 'Aruba' },
    { code: '+298', country: 'FO', flag: '🇫🇴', name: 'Faroe Islands' },
    { code: '+299', country: 'GL', flag: '🇬🇱', name: 'Greenland' },
    { code: '+350', country: 'GI', flag: '🇬🇮', name: 'Gibraltar' },
    { code: '+351', country: 'PT', flag: '🇵🇹', name: 'Portugal' },
    { code: '+352', country: 'LU', flag: '🇱🇺', name: 'Luxembourg' },
    { code: '+353', country: 'IE', flag: '🇮🇪', name: 'Ireland' },
    { code: '+354', country: 'IS', flag: '🇮🇸', name: 'Iceland' },
    { code: '+355', country: 'AL', flag: '🇦🇱', name: 'Albania' },
    { code: '+356', country: 'MT', flag: '🇲🇹', name: 'Malta' },
    { code: '+357', country: 'CY', flag: '🇨🇾', name: 'Cyprus' },
    { code: '+358', country: 'FI', flag: '🇫🇮', name: 'Finland' },
    { code: '+359', country: 'BG', flag: '🇧🇬', name: 'Bulgaria' },
    { code: '+370', country: 'LT', flag: '🇱🇹', name: 'Lithuania' },
    { code: '+371', country: 'LV', flag: '🇱🇻', name: 'Latvia' },
    { code: '+372', country: 'EE', flag: '🇪🇪', name: 'Estonia' },
    { code: '+373', country: 'MD', flag: '🇲🇩', name: 'Moldova' },
    { code: '+374', country: 'AM', flag: '🇦🇲', name: 'Armenia' },
    { code: '+375', country: 'BY', flag: '🇧🇾', name: 'Belarus' },
    { code: '+376', country: 'AD', flag: '🇦🇩', name: 'Andorra' },
    { code: '+377', country: 'MC', flag: '🇲🇨', name: 'Monaco' },
    { code: '+378', country: 'SM', flag: '🇸🇲', name: 'San Marino' },
    { code: '+380', country: 'UA', flag: '🇺🇦', name: 'Ukraine' },
    { code: '+381', country: 'RS', flag: '🇷🇸', name: 'Serbia' },
    { code: '+382', country: 'ME', flag: '🇲🇪', name: 'Montenegro' },
    { code: '+383', country: 'XK', flag: '🇽🇰', name: 'Kosovo' },
    { code: '+385', country: 'HR', flag: '🇭🇷', name: 'Croatia' },
    { code: '+386', country: 'SI', flag: '🇸🇮', name: 'Slovenia' },
    { code: '+387', country: 'BA', flag: '🇧🇦', name: 'Bosnia and Herzegovina' },
    { code: '+389', country: 'MK', flag: '🇲🇰', name: 'North Macedonia' },
    { code: '+420', country: 'CZ', flag: '🇨🇿', name: 'Czech Republic' },
    { code: '+421', country: 'SK', flag: '🇸🇰', name: 'Slovakia' },
    { code: '+423', country: 'LI', flag: '🇱🇮', name: 'Liechtenstein' },
    { code: '+500', country: 'FK', flag: '🇫🇰', name: 'Falkland Islands' },
    { code: '+501', country: 'BZ', flag: '🇧🇿', name: 'Belize' },
    { code: '+502', country: 'GT', flag: '🇬🇹', name: 'Guatemala' },
    { code: '+503', country: 'SV', flag: '🇸🇻', name: 'El Salvador' },
    { code: '+504', country: 'HN', flag: '🇭🇳', name: 'Honduras' },
    { code: '+505', country: 'NI', flag: '🇳🇮', name: 'Nicaragua' },
    { code: '+506', country: 'CR', flag: '🇨🇷', name: 'Costa Rica' },
    { code: '+507', country: 'PA', flag: '🇵🇦', name: 'Panama' },
    { code: '+508', country: 'PM', flag: '🇵🇲', name: 'Saint Pierre and Miquelon' },
    { code: '+509', country: 'HT', flag: '🇭🇹', name: 'Haiti' },
    { code: '+590', country: 'GP', flag: '🇬🇵', name: 'Guadeloupe' },
    { code: '+591', country: 'BO', flag: '🇧🇴', name: 'Bolivia' },
    { code: '+592', country: 'GY', flag: '🇬🇾', name: 'Guyana' },
    { code: '+593', country: 'EC', flag: '🇪🇨', name: 'Ecuador' },
    { code: '+594', country: 'GF', flag: '🇬🇫', name: 'French Guiana' },
    { code: '+595', country: 'PY', flag: '🇵🇾', name: 'Paraguay' },
    { code: '+596', country: 'MQ', flag: '🇲🇶', name: 'Martinique' },
    { code: '+597', country: 'SR', flag: '🇸🇷', name: 'Suriname' },
    { code: '+598', country: 'UY', flag: '🇺🇾', name: 'Uruguay' },
    { code: '+599', country: 'CW', flag: '🇨🇼', name: 'Curacao' },
    { code: '+670', country: 'TL', flag: '🇹🇱', name: 'Timor-Leste' },
    { code: '+672', country: 'AQ', flag: '🇦🇶', name: 'Antarctica' },
    { code: '+673', country: 'BN', flag: '🇧🇳', name: 'Brunei' },
    { code: '+674', country: 'NR', flag: '🇳🇷', name: 'Nauru' },
    { code: '+675', country: 'PG', flag: '🇵🇬', name: 'Papua New Guinea' },
    { code: '+676', country: 'TO', flag: '🇹🇴', name: 'Tonga' },
    { code: '+677', country: 'SB', flag: '🇸🇧', name: 'Solomon Islands' },
    { code: '+678', country: 'VU', flag: '🇻🇺', name: 'Vanuatu' },
    { code: '+679', country: 'FJ', flag: '🇫🇯', name: 'Fiji' },
    { code: '+680', country: 'PW', flag: '🇵🇼', name: 'Palau' },
    { code: '+681', country: 'WF', flag: '🇼🇫', name: 'Wallis and Futuna' },
    { code: '+682', country: 'CK', flag: '🇨🇰', name: 'Cook Islands' },
    { code: '+683', country: 'NU', flag: '🇳🇺', name: 'Niue' },
    { code: '+684', country: 'AS', flag: '🇦🇸', name: 'American Samoa' },
    { code: '+685', country: 'WS', flag: '🇼🇸', name: 'Samoa' },
    { code: '+686', country: 'KI', flag: '🇰🇮', name: 'Kiribati' },
    { code: '+687', country: 'NC', flag: '🇳🇨', name: 'New Caledonia' },
    { code: '+688', country: 'TV', flag: '🇹🇻', name: 'Tuvalu' },
    { code: '+689', country: 'PF', flag: '🇵🇫', name: 'French Polynesia' },
    { code: '+690', country: 'TK', flag: '🇹🇰', name: 'Tokelau' },
    { code: '+691', country: 'FM', flag: '🇫🇲', name: 'Micronesia' },
    { code: '+692', country: 'MH', flag: '🇲🇭', name: 'Marshall Islands' },
    { code: '+850', country: 'KP', flag: '🇰🇵', name: 'North Korea' },
    { code: '+852', country: 'HK', flag: '🇭🇰', name: 'Hong Kong' },
    { code: '+853', country: 'MO', flag: '🇲🇴', name: 'Macau' },
    { code: '+855', country: 'KH', flag: '🇰🇭', name: 'Cambodia' },
    { code: '+856', country: 'LA', flag: '🇱🇦', name: 'Laos' },
    { code: '+880', country: 'BD', flag: '🇧🇩', name: 'Bangladesh' },
    { code: '+886', country: 'TW', flag: '🇹🇼', name: 'Taiwan' },
    { code: '+960', country: 'MV', flag: '🇲🇻', name: 'Maldives' },
    { code: '+961', country: 'LB', flag: '🇱🇧', name: 'Lebanon' },
    { code: '+962', country: 'JO', flag: '🇯🇴', name: 'Jordan' },
    { code: '+963', country: 'SY', flag: '🇸🇾', name: 'Syria' },
    { code: '+964', country: 'IQ', flag: '🇮🇶', name: 'Iraq' },
    { code: '+965', country: 'KW', flag: '🇰🇼', name: 'Kuwait' },
    { code: '+966', country: 'SA', flag: '🇸🇦', name: 'Saudi Arabia' },
    { code: '+967', country: 'YE', flag: '🇾🇪', name: 'Yemen' },
    { code: '+968', country: 'OM', flag: '🇴🇲', name: 'Oman' },
    { code: '+970', country: 'PS', flag: '🇵🇸', name: 'Palestine' },
    { code: '+971', country: 'AE', flag: '🇦🇪', name: 'UAE' },
    { code: '+972', country: 'IL', flag: '🇮🇱', name: 'Israel' },
    { code: '+973', country: 'BH', flag: '🇧🇭', name: 'Bahrain' },
    { code: '+974', country: 'QA', flag: '🇶🇦', name: 'Qatar' },
    { code: '+975', country: 'BT', flag: '🇧🇹', name: 'Bhutan' },
    { code: '+976', country: 'MN', flag: '🇲🇳', name: 'Mongolia' },
    { code: '+977', country: 'NP', flag: '🇳🇵', name: 'Nepal' },
    { code: '+992', country: 'TJ', flag: '🇹🇯', name: 'Tajikistan' },
    { code: '+993', country: 'TM', flag: '🇹🇲', name: 'Turkmenistan' },
    { code: '+994', country: 'AZ', flag: '🇦🇿', name: 'Azerbaijan' },
    { code: '+995', country: 'GE', flag: '🇬🇪', name: 'Georgia' },
    { code: '+996', country: 'KG', flag: '🇰🇬', name: 'Kyrgyzstan' },
    { code: '+998', country: 'UZ', flag: '🇺🇿', name: 'Uzbekistan' }
];


// Nav link 
export const navLinks = [{
    name: 'Services',
    path: '/services',
    hasMegaMenu: true
}, {
    name: 'Products',
    path: '/products',
    hasMegaMenu: true
}, {
    name: 'Works',
    path: '/work',
    hasMegaMenu: true
}, {
    name: 'About',
    path: '/about'
}, {
    name: 'Career',
    path: '/career'
}, {
    name: 'Blog',
    path: '/blog'
}, {
    name: 'Contact',
    path: '/contact'
}];

//workCategories
export const workCategories = [{
    title: 'Portfolio',
    description: 'Browse our complete collection of projects',
    icon: Briefcase,
    link: '/portfolio',
    color: 'from-red-500 to-orange-500',
    hoverColor: 'hover:border-[color:var(--bright-red)]',
    iconBg: 'group-hover:bg-[color:var(--bright-red)]',
    textColor: 'group-hover:text-[color:var(--bright-red)]'
}, {
    title: 'Case Studies',
    description: 'Deep dives into our most impactful work',
    icon: FileText,
    link: '/case-studies',
    color: 'from-green-500 to-emerald-500',
    hoverColor: 'hover:border-[color:var(--vibrant-green)]',
    iconBg: 'group-hover:bg-[color:var(--vibrant-green)]',
    textColor: 'group-hover:text-[color:var(--vibrant-green)]'
}];


// Service
export const services = [{
    name: 'Mobile App Development',
    icon: Smartphone
}, {
    name: 'Website Development',
    icon: Globe
}, {
    name: 'Software Development',
    icon: Code
}, {
    name: 'Artificial Intelligence',
    icon: Brain
}, {
    name: 'Blockchain Development',
    icon: Blocks
}, {
    name: 'Enterprise Solution',
    icon: Building2
}, {
    name: 'On-Demand Solutions',
    icon: Zap
}];

// service 2
export const Services = [{
    id: 'mobile',
    icon: Smartphone,
    title: 'Mobile App Development',
    desc: 'Native and cross-platform mobile applications built with Swift, Kotlin, Flutter, and React Native.',
    color: 'text-blue-400',
    gradient: 'from-blue-500/20 to-blue-500/0'
}, {
    id: 'web',
    icon: Globe,
    title: 'Website Development',
    desc: 'Modern web applications with cutting-edge frameworks like React, Next.js, Laravel, and WordPress.',
    color: 'text-cyan-400',
    gradient: 'from-cyan-500/20 to-cyan-500/0'
}, {
    id: 'software',
    icon: Code,
    title: 'Software Development',
    desc: 'Enterprise-grade software solutions including SaaS, ERP, LMS, and custom desktop applications.',
    color: 'text-green-400',
    gradient: 'from-green-500/20 to-green-500/0'
}, {
    id: 'ai',
    icon: Brain,
    title: 'Artificial Intelligence',
    desc: 'AI/ML solutions with chatbots, computer vision, NLP, and predictive analytics for various industries.',
    color: 'text-purple-400',
    gradient: 'from-purple-500/20 to-purple-500/0'
}, {
    id: 'blockchain',
    icon: Blocks,
    title: 'Blockchain Development',
    desc: 'Decentralized applications, smart contracts, NFT marketplaces, and cryptocurrency solutions.',
    color: 'text-orange-400',
    gradient: 'from-orange-500/20 to-orange-500/0'
}, {
    id: 'enterprise',
    icon: Building2,
    title: 'Enterprise Solution',
    desc: 'Cloud consulting, Salesforce, SAP, Microsoft Azure, game development, and digital marketing services.',
    color: 'text-red-400',
    gradient: 'from-red-500/20 to-red-500/0'
}, {
    id: 'ondemand',
    icon: Zap,
    title: 'On-Demand Solutions',
    desc: 'Custom on-demand platforms for delivery, booking, streaming, and marketplace applications.',
    color: 'text-yellow-400',
    gradient: 'from-yellow-500/20 to-yellow-500/0'
}];

// service 3 
export const Services3 = [{
    id: 'mobile',
    name: 'Mobile App Development',
    icon: Smartphone,
    description: 'Native & Cross-platform solutions for iOS and Android.',
    subcategories: ['Mobile App Development', 'Android App Development', 'iOS App Development', 'React Native App Development', 'Flutter App Development', 'Mobile App Maintenance', 'Wearable App Development', 'PWA Development', 'AR/VR App Development', 'Startup App Development']
}, {
    id: 'web',
    name: 'Website Development',
    icon: Globe,
    description: 'Scalable web applications using modern frameworks.',
    subcategories: ['Website Development', 'Laravel Development', 'eCommerce Development', 'Magento Development', 'Full Stack Development', 'NodeJS Development', 'ReactJS Development', 'Web Designing', 'Shopify Development', 'CMS Development', 'WordPress Development']
}, {
    id: 'software',
    name: 'Software Development',
    icon: Code,
    description: 'Custom software tailored to your business needs.',
    subcategories: ['Software Development', 'SaaS Development', 'POS Development', 'Desktop App Development', 'Software Maintenance', 'ERP Development', 'LMS Development', 'Enterprise Software Development']
}, {
    id: 'ai',
    name: 'AI Development',
    icon: Brain,
    description: 'Intelligent solutions powering the future.',
    subcategories: ['AI Development', 'AI Chatbot Development', 'Generative AI Development', 'AI Agent Development', 'LLM Development', 'Computer Vision Development', 'NLP Development Services', 'ML Development']
}, {
    id: 'blockchain',
    name: 'Blockchain Development',
    icon: Blocks,
    description: 'Decentralized apps and smart contract solutions.',
    subcategories: ['Blockchain Development', 'Ethereum Development', 'Metaverse Development', 'NFT Marketplace Development', 'Smart Contract Development', 'DeFi Development']
}, {
    id: 'enterprise',
    name: 'Enterprise Solution',
    icon: Building2,
    description: 'Robust solutions for large-scale organizations.',
    subcategories: ['Microsoft Power BI Consulting', 'Microsoft Azure Consulting', 'SAP Consulting Services', 'Amazon Web Services', 'Salesforce Consulting', 'IT Staff Augmentation']
}, {
    id: 'ondemand',
    name: 'On-Demand Solutions',
    icon: Zap,
    description: 'Uber-like apps for various service industries.',
    subcategories: ['Food Delivery', 'Taxi Booking', 'Grocery Delivery', 'eWallet', 'Doctor Booking', 'Handyman Services', 'Logistics & Delivery']
}];

// review 
export const reviews = [{
    id: 1,
    name: 'Sarah Mitchell',
    role: 'CEO, TechVenture Inc.',
    image: "/sarah-mitchell.webp",
    text: 'Phixels transformed our legacy system into a modern powerhouse. Revenue increased by 40% in just 3 months after launch. Their engineering team is world-class.',
    rating: 5
}, {
    id: 2,
    name: 'Michael Chen',
    role: 'Founder, FinanceFlow',
    image: "/michael-chen.webp",
    text: 'The AI integration they built for our diagnostic tool is revolutionary. We secured Series A funding solely based on the MVP Phixels delivered.',
    rating: 5
}, {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Marketing Director, GrowthLabs',
    image: "/elena-rodiguezr.webp",
    text: 'Scalability was our biggest issue. Phixels re-architected our backend to handle 10M+ concurrent users without a glitch during Black Friday.',
    rating: 5
}, {
    id: 4,
    name: 'David Park',
    role: 'CTO, HealthTech Solutions',
    image: "/david-park.webp",
    text: 'Their understanding of Smart Contracts and DeFi protocols is unmatched. They delivered a secure, audited platform ahead of schedule.',
    rating: 5
}, {
    id: 5,
    name: 'Jessica Lee',
    role: 'CEO, OnDemand App',
    image: "/jessica.webp",
    text: 'From concept to app store in 12 weeks. The UI/UX is stunning, and user retention is up 200% compared to our old app.',
    rating: 5
}, {
    id: 6,
    name: 'Robert Anderson',
    role: 'Director, EduTech Academy',
    image: "/robert-anderson.webp",
    text: 'We needed a partner who could understand complex IoT requirements. Phixels delivered a robust solution that connects thousands of devices seamlessly.',
    rating: 5
}, {
    id: 7,
    name: 'Amanda Foster',
    role: 'Founder, StyleHub',
    image: "/amanda-foster.webp",
    text: 'Their web development team is incredible. Our new site is blazing fast, SEO optimized, and conversion rates have doubled.',
    rating: 5
}];


// review 2 
// Mock Data
export const Review = [{
    name: 'Sarah Mitchell',
    role: 'CEO, TechVenture Inc',
    image: "/sarah-mitchell.webp",
    rating: 5,
    review: 'Working with this team transformed our digital presence completely. They delivered a sophisticated e-commerce platform that increased our conversion rate by 145% within the first quarter. Their attention to detail and commitment to our success was exceptional.',
    project: 'E-commerce Platform Development',
    budget: '$35,000',
    duration: '3 months',
    summary: 'Custom React-based e-commerce solution with advanced inventory management, payment gateway integration, and real-time analytics dashboard.'
}, {
    name: 'Michael Chen',
    role: 'Founder, FinanceFlow',
    image: "/michael-chen.webp",
    rating: 5,
    review: 'The mobile app they built exceeded all our expectations. The user experience is seamless, and our customer engagement has tripled since launch. They understood our vision perfectly and delivered a product that truly stands out in the market.',
    project: 'Financial Management Mobile App',
    budget: '$42,000',
    duration: '4 months',
    summary: 'Cross-platform mobile application with secure authentication, real-time transaction tracking, budget planning tools, and comprehensive financial reporting.'
}, {
    name: 'Emily Rodriguez',
    role: 'Marketing Director, GrowthLabs',
    image: "/emily-rodriguez.webp",
    rating: 5,
    review: "Their strategic approach to our SaaS platform redesign was impressive. Not only did they modernize our interface, but they also improved our user retention by 67%. The team's expertise in both design and development is truly world-class.",
    project: 'SaaS Platform Redesign & Optimization',
    budget: '$28,500',
    duration: '2.5 months',
    summary: 'Complete UI/UX overhaul with modern design system, performance optimization, new onboarding flow, and integration of advanced analytics features.'
}, {
    name: 'David Park',
    role: 'CTO, HealthTech Solutions',
    image: "/david-park.webp",
    rating: 5,
    review: 'Building a HIPAA-compliant healthcare platform required expertise and precision. This team delivered both flawlessly. The system handles thousands of patient records securely, and our clients trust it completely. Outstanding work from start to finish.',
    project: 'Healthcare Management System',
    budget: '$48,000',
    duration: '5 months',
    summary: 'HIPAA-compliant patient management platform with secure data encryption, appointment scheduling, telemedicine integration, and comprehensive reporting tools.'
}, {
    name: 'Davis Lee',
    role: 'VP Operations, LogisticsPro',
    image: "/davis-lee.webp",
    rating: 5,
    review: 'The logistics tracking system they developed revolutionized our operations. Real-time tracking, automated reporting, and intuitive dashboards have saved us countless hours. Their technical expertise and project management were exceptional throughout.',
    project: 'Logistics & Supply Chain Platform',
    budget: '$38,500',
    duration: '4 months',
    summary: 'Real-time logistics tracking system with GPS integration, automated inventory management, route optimization, and comprehensive analytics dashboard.'
}, {
    name: 'Robert Anderson',
    role: 'Director, EduTech Academy',
    image: "/robert-anderson.webp",
    rating: 5,
    review: "Our online learning platform needed to scale to support 50,000+ students. They architected a solution that's not only robust but also incredibly user-friendly. Student engagement increased by 89%, and our instructors love the new tools.",
    project: 'Online Learning Management System',
    budget: '$45,000',
    duration: '4.5 months',
    summary: 'Scalable LMS with video streaming, interactive assessments, progress tracking, discussion forums, and comprehensive course management tools.'
}, {
    name: 'Amanda Foster',
    role: 'Founder, StyleHub',
    image: "/amanda-foster.webp",
    rating: 5,
    review: 'The fashion marketplace they created is stunning and functional. The AR try-on feature they implemented was a game-changer for our business. Sales increased by 210% in the first six months. Truly innovative work.',
    project: 'Fashion E-commerce with AR Features',
    budget: '$32,000',
    duration: '3.5 months',
    summary: 'Modern e-commerce platform with AR virtual try-on, personalized recommendations, social shopping features, and seamless checkout experience.'
}, {
    name: 'James Wilson',
    role: 'CEO, PropertyMatch',
    image: "/james-wilson.webp",
    rating: 5,
    review: 'Our real estate platform needed sophisticated search capabilities and virtual tour integration. They delivered beyond expectations. The 3D property tours and AI-powered matching system have set us apart from competitors. Exceptional quality.',
    project: 'Real Estate Platform with Virtual Tours',
    budget: '$41,500',
    duration: '4 months',
    summary: 'Comprehensive real estate platform with 3D virtual tours, advanced property search, AI-powered matching, mortgage calculator, and agent management system.'
}];


// Products
export const products = [{
    id: 'devmark',
    name: 'DevMark',
    description: 'Code snippet manager & markdown editor.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
    platform: 'Web',
    link: 'https://devmark.app',
    icon: Globe,
    color: 'from-blue-500 to-cyan-500'
}, {
    id: 'masterapp',
    name: 'MasterApp',
    description: 'All-in-one productivity suite for teams.',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=600&q=80',
    platform: 'Android',
    link: 'https://play.google.com/store',
    icon: Smartphone,
    color: 'from-green-500 to-emerald-500'
}, {
    id: 'myfamily',
    name: 'My Family',
    description: 'Private family network & organizer.',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=600&q=80',
    platform: 'iOS',
    link: 'https://apps.apple.com',
    icon: Smartphone,
    color: 'from-pink-500 to-rose-500'
}];


// Steps

export const steps = [{
    num: '01',
    title: 'Discovery',
    desc: 'We dive deep into your business goals, user needs, and market landscape.',
    color: 'border-blue-500',
    text: 'text-blue-500'
}, {
    num: '02',
    title: 'Design',
    desc: 'Creating intuitive, high-fidelity prototypes that visualize the final product.',
    color: 'border-yellow-500',
    text: 'text-yellow-500'
}, {
    num: '03',
    title: 'Development',
    desc: 'Agile engineering with weekly sprints and transparent code delivery.',
    color: 'border-red-500',
    text: 'text-red-500'
}, {
    num: '04',
    title: 'Launch',
    desc: 'Rigorous testing, deployment, and post-launch growth support.',
    color: 'border-green-500',
    text: 'text-green-500'
}];

// Review 3 
export const reviews3 = [{
    id: 1,
    name: 'Sarah Jenkins',
    role: 'CTO, TechFlow',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
    content: "The attention to detail and technical expertise Phixels brought to our project was unmatched. They didn't just build a product; they engineered a solution.",
    rating: 5
}, {
    id: 2,
    name: 'David Chen',
    role: 'Founder, StartUp Inc',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    content: 'Incredible workflow and communication. The team felt like a true extension of our own. The final delivery exceeded all our expectations.',
    rating: 5
}, {
    id: 3,
    name: 'Elena Rodriguez',
    role: 'Product Lead, Innovate',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80',
    content: "We've worked with many agencies, but Phixels stands out. Their design-first approach combined with robust engineering is a game changer.",
    rating: 5
}, {
    id: 4,
    name: 'Michael Chang',
    role: 'Director, FutureScale',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
    content: 'Professional, timely, and incredibly talented. They transformed our vague requirements into a polished, market-ready platform.',
    rating: 5
}, {
    id: 5,
    name: 'Jessica Thompson',
    role: 'CEO, CreativeMinds',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
    content: "The ROI we've seen since launching the new platform has been phenomenal. Phixels understands both business goals and user needs.",
    rating: 5
}, {
    id: 6,
    name: 'Robert Wilson',
    role: 'VP Engineering, SoftSys',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
    content: "Clean code, scalable architecture, and stunning UI. It's rare to find a team that excels at both frontend and backend so seamlessly.",
    rating: 5
}, {
    id: 7,
    name: 'Amanda White',
    role: 'Marketing Head, GrowthX',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80',
    content: 'They helped us rebrand and launch in record time. The feedback from our customers has been overwhelmingly positive.',
    rating: 5
}, {
    id: 8,
    name: 'Thomas Anderson',
    role: 'Co-founder, MatrixSol',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80',
    content: 'A partnership that truly drives value. Phixels is not just a vendor; they are strategic partners in our success story.',
    rating: 5
}];

// featuredPosts
export const featuredPosts = [{
    id: 1,
    title: 'The Future of AI in Mobile App Development',
    excerpt: 'How artificial intelligence is revolutionizing the way we build and interact with mobile applications.',
    category: 'AI & ML',
    date: 'Jan 15, 2026',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
    slug: 'future-of-ai-mobile-dev'
}, {
    id: 2,
    title: 'Building Scalable Microservices Architecture',
    excerpt: 'Best practices for designing and implementing microservices that can handle millions of users.',
    category: 'Software',
    date: 'Jan 12, 2026',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    slug: 'scalable-microservices'
}, {
    id: 'web3',
    title: 'Web3 and the Decentralized Future',
    excerpt: "Understanding blockchain technology and how it's reshaping the internet as we know it.",
    category: 'Blockchain',
    date: 'Jan 10, 2026',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80',
    slug: 'web3-decentralized-future'
}];


// cases
export const cases = [{
    id: 1,
    client: 'Global Logistics Co',
    industry: 'Supply Chain',
    title: 'Optimizing Last-Mile Delivery with AI',
    challenge: 'Inefficient route planning leading to high fuel costs and delayed deliveries.',
    solution: 'Developed an AI-powered routing engine integrated with driver mobile apps.',
    result: '30% Reduction in Fuel Costs',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80'
}, {
    id: 2,
    client: 'HealthFirst',
    industry: 'Healthcare',
    title: 'Telemedicine Platform for Remote Care',
    challenge: 'Lack of accessible healthcare during pandemic restrictions.',
    solution: 'HIPAA-compliant video consultation platform with EMR integration.',
    result: '50K+ Consultations/Month',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80'
}, {
    id: 3,
    client: 'RetailMax',
    industry: 'E-Commerce',
    title: 'Personalized Shopping with ML',
    challenge: 'Low conversion rates and high cart abandonment.',
    solution: 'Machine learning recommendation engine with behavioral analysis.',
    result: '180% Increase in Sales',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&w=800&q=80'
}, {
    id: 4,
    client: 'FinSecure Bank',
    industry: 'FinTech',
    title: 'Fraud Detection System',
    challenge: 'Rising fraud incidents costing millions annually.',
    solution: 'Real-time fraud detection using deep learning and behavioral patterns.',
    result: '95% Fraud Prevention',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80'
}, {
    id: 5,
    client: 'EduLearn',
    industry: 'Education',
    title: 'Adaptive Learning Platform',
    challenge: 'One-size-fits-all approach failing diverse student needs.',
    solution: 'AI-powered adaptive learning paths with real-time progress tracking.',
    result: '40% Better Outcomes',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80'
}, {
    id: 6,
    client: 'GreenEnergy Co',
    industry: 'Energy',
    title: 'Smart Grid Management',
    challenge: 'Inefficient energy distribution and high operational costs.',
    solution: 'IoT-based smart grid with predictive maintenance and load balancing.',
    result: '25% Energy Savings',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80'
}, {
    id: 7,
    client: 'TravelHub',
    industry: 'Travel',
    title: 'Dynamic Pricing Engine',
    challenge: 'Static pricing missing revenue optimization opportunities.',
    solution: 'AI-driven dynamic pricing based on demand, seasonality, and competition.',
    result: '60% Revenue Growth',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80'
}, {
    id: 8,
    client: 'ManufacturePro',
    industry: 'Manufacturing',
    title: 'Predictive Maintenance System',
    challenge: 'Unexpected equipment failures causing production delays.',
    solution: 'IoT sensors with ML models predicting failures before they occur.',
    result: '70% Less Downtime',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'
}, {
    id: 9,
    client: 'FoodChain',
    industry: 'Food & Beverage',
    title: 'Supply Chain Traceability',
    challenge: 'Lack of transparency in food sourcing and quality control.',
    solution: 'Blockchain-based traceability system from farm to table.',
    result: '100% Transparency',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80'
}, {
    id: 10,
    client: 'RealEstate Pro',
    industry: 'Real Estate',
    title: 'Virtual Property Tours',
    challenge: 'Limited physical viewings during pandemic.',
    solution: '3D virtual tours with VR support and AI-powered property matching.',
    result: '3x More Viewings',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80'
}];
export const industries = ['All', 'Supply Chain', 'Healthcare', 'E-Commerce', 'FinTech', 'Education', 'Energy', 'Travel', 'Manufacturing', 'Food & Beverage', 'Real Estate'];


// Job data structure
export const jobsData = {
    1: {
        title: 'Senior React Native Engineer',
        type: 'Engineering',
        location: 'Remote / Dhaka',
        salary: '$80k - $120k',
        description: 'We are looking for a Senior React Native Engineer to join our mobile development team. You will be responsible for building high-performance, scalable mobile applications that serve millions of users worldwide.',
        requirements: [
            '5+ years of React Native development experience',
            'Strong knowledge of JavaScript/TypeScript',
            'Experience with state management (Redux, Context API)',
            'Familiarity with native iOS/Android development',
            'Experience with RESTful APIs and GraphQL',
            'Knowledge of CI/CD pipelines and automated testing'
        ],
        benefits: [
            'Competitive salary + equity',
            'Remote work flexibility',
            'Learning & development budget',
            'Health insurance coverage',
            'Flexible working hours',
            'Latest MacBook Pro + equipment'
        ]
    },
    2: {
        title: 'Backend Architect (Node.js/Go)',
        type: 'Engineering',
        location: 'Remote / Global',
        salary: '$90k - $140k',
        description: 'Join our backend team as a Backend Architect specializing in Node.js and Go. You will design and implement scalable, secure, and high-performance backend systems that power our mobile and web applications.',
        requirements: [
            '7+ years of backend development experience',
            'Expert knowledge of Node.js and Go',
            'Experience with microservices architecture',
            'Strong understanding of databases (PostgreSQL, MongoDB, Redis)',
            'Knowledge of cloud platforms (AWS, GCP, Azure)',
            'Experience with Docker and Kubernetes',
            'Familiarity with message queues and event-driven architecture'
        ],
        benefits: [
            'Competitive salary + equity',
            'Remote work flexibility',
            'Learning & development budget',
            'Health insurance coverage',
            'Flexible working hours',
            'Latest development equipment'
        ]
    },
    3: {
        title: 'Senior UI/UX Designer',
        type: 'Design',
        location: 'Hybrid / Dhaka',
        salary: '$60k - $90k',
        description: 'We are seeking a Senior UI/UX Designer to create exceptional user experiences for our mobile and web applications. You will work closely with our development team to design intuitive, beautiful, and user-friendly interfaces.',
        requirements: [
            '4+ years of UI/UX design experience',
            'Proficiency in Figma, Sketch, or Adobe Creative Suite',
            'Strong portfolio demonstrating mobile and web design skills',
            'Experience with user research and usability testing',
            'Knowledge of design systems and component libraries',
            'Understanding of mobile-first and responsive design principles'
        ],
        benefits: [
            'Competitive salary + equity',
            'Hybrid work model',
            'Design tools and software budget',
            'Health insurance coverage',
            'Flexible working hours',
            'Creative work environment'
        ]
    },
    4: {
        title: 'Technical Project Manager',
        type: 'Product',
        location: 'Remote / Global',
        salary: '$70k - $100k',
        description: 'As a Technical Project Manager, you will oversee the planning, execution, and delivery of complex software projects. You will bridge the gap between technical teams and stakeholders, ensuring projects are delivered on time and meet quality standards.',
        requirements: [
            '5+ years of project management experience in tech',
            'Experience managing software development projects',
            'Strong understanding of Agile/Scrum methodologies',
            'Excellent communication and leadership skills',
            'Knowledge of project management tools (Jira, Asana, etc.)',
            'Technical background or understanding of software development'
        ],
        benefits: [
            'Competitive salary + equity',
            'Remote work flexibility',
            'Professional development opportunities',
            'Health insurance coverage',
            'Flexible working hours',
            'Leadership growth opportunities'
        ]
    }
};
// Project Data
export const projects = [
    {
        id: 1,
        title: "FinTech Super App",
        category: "Mobile Apps",
        client: "NeoBank",
        image:
            "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
        stats: "1M+ Active Users",
        stack: ["Flutter", "Node.js", "AWS", "MongoDB"],
        description:
            "A comprehensive digital banking solution with AI-powered financial insights, instant transfers, and investment tracking.",
        link: "https://neobank.example.com",
    },
    {
        id: 2,
        title: "AI Diagnostic Platform",
        category: "AI/ML",
        client: "MediTech Solutions",
        image:
            "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
        stats: "99.2% Accuracy Rate",
        stack: ["Python", "TensorFlow", "React", "PostgreSQL"],
        description:
            "Medical imaging analysis platform using deep learning to assist radiologists in early disease detection.",
        link: "https://meditech.example.com",
    },
    {
        id: 3,
        title: "NFT Marketplace",
        category: "Blockchain",
        client: "CryptoArt",
        image:
            "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
        stats: "$50M Trading Volume",
        stack: ["Solidity", "React", "Web3.js", "IPFS"],
        description:
            "Decentralized marketplace for digital art with smart contract-based royalties and gas-optimized transactions.",
        link: "https://cryptoart.example.com",
    },
    {
        id: 4,
        title: "E-Commerce Platform",
        category: "Web Apps",
        client: "ShopFlow",
        image:
            "https://images.unsplash.com/photo-1472851294608-415522f96318?auto=format&fit=crop&w=800&q=80",
        stats: "+250% Revenue Growth",
        stack: ["Next.js", "Shopify", "Stripe", "Vercel"],
        description:
            "High-performance e-commerce platform with personalized recommendations and seamless checkout experience.",
        link: "https://shopflow.example.com",
    },
    {
        id: 5,
        title: "Food Delivery App",
        category: "On-Demand",
        client: "QuickBite",
        image:
            "https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=800&q=80",
        stats: "20min Avg Delivery",
        stack: ["React Native", "Firebase", "Google Maps", "Stripe"],
        description:
            "Real-time food delivery platform with live tracking, smart routing, and integrated payment processing.",
        link: "https://quickbite.example.com",
    },
    {
        id: 6,
        title: "Enterprise ERP System",
        category: "Enterprise",
        client: "GlobalCorp",
        image:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        stats: "10K+ Employees",
        stack: ["Java", "Spring Boot", "Angular", "Oracle"],
        description:
            "Comprehensive ERP solution managing inventory, HR, finance, and supply chain operations.",
        link: "https://globalcorp.example.com",
    },
    {
        id: 7,
        title: "Telemedicine Platform",
        category: "Mobile Apps",
        client: "HealthConnect",
        image:
            "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
        stats: "50K+ Consultations",
        stack: ["React Native", "WebRTC", "Node.js", "AWS"],
        description:
            "HIPAA-compliant video consultation platform with EMR integration and prescription management.",
        link: "https://healthconnect.example.com",
    },
    {
        id: 8,
        title: "Smart Home IoT App",
        category: "Mobile Apps",
        client: "HomeAI",
        image:
            "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80",
        stats: "500K+ Devices",
        stack: ["Swift", "Kotlin", "MQTT", "AWS IoT"],
        description:
            "Unified control system for smart home devices with AI-powered automation and energy optimization.",
        link: "https://homeai.example.com",
    },
    {
        id: 9,
        title: "Crypto Trading Bot",
        category: "Blockchain",
        client: "TradeAI",
        image:
            "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=800&q=80",
        stats: "85% Win Rate",
        stack: ["Python", "Binance API", "ML", "Docker"],
        description:
            "Algorithmic trading bot with machine learning-based market prediction and risk management.",
        link: "https://tradeai.example.com",
    },
    {
        id: 10,
        title: "Learning Management System",
        category: "Enterprise",
        client: "EduTech Pro",
        image:
            "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80",
        stats: "100K+ Students",
        stack: ["Laravel", "Vue.js", "MySQL", "AWS"],
        description:
            "Comprehensive LMS with live classes, assessments, progress tracking, and certification management.",
        link: "https://edutech.example.com",
    },
    {
        id: 11,
        title: "Ride Sharing Platform",
        category: "On-Demand",
        client: "RideNow",
        image:
            "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80",
        stats: "2M+ Rides",
        stack: ["React Native", "Node.js", "MongoDB", "Socket.io"],
        description:
            "Real-time ride-hailing platform with dynamic pricing, driver matching, and in-app navigation.",
        link: "https://ridenow.example.com",
    },
    {
        id: 12,
        title: "Social Media Analytics",
        category: "AI/ML",
        client: "SocialInsights",
        image:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        stats: "1B+ Posts Analyzed",
        stack: ["Python", "NLP", "React", "BigQuery"],
        description:
            "AI-powered social media monitoring and sentiment analysis tool for brand management.",
        link: "https://socialinsights.example.com",
    },
    {
        id: 13,
        title: "Real Estate Portal",
        category: "Web Apps",
        client: "PropertyHub",
        image:
            "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
        stats: "50K+ Listings",
        stack: ["Next.js", "Prisma", "PostgreSQL", "Mapbox"],
        description:
            "Modern real estate platform with 3D virtual tours, mortgage calculator, and AI-based property recommendations.",
        link: "https://propertyhub.example.com",
    },
    {
        id: 14,
        title: "Fitness Tracking App",
        category: "Mobile Apps",
        client: "FitLife",
        image:
            "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80",
        stats: "300K+ Users",
        stack: ["Flutter", "Firebase", "HealthKit", "Google Fit"],
        description:
            "Comprehensive fitness app with workout plans, nutrition tracking, and AI personal trainer.",
        link: "https://fitlife.example.com",
    },
    {
        id: 15,
        title: "Supply Chain Management",
        category: "Enterprise",
        client: "LogiFlow",
        image:
            "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
        stats: "30% Cost Reduction",
        stack: ["Java", "Microservices", "Kafka", "Kubernetes"],
        description:
            "End-to-end supply chain visibility platform with predictive analytics and automated procurement.",
        link: "https://logiflow.example.com",
    },
];
export const categories = [
    "All",
    "Mobile Apps",
    "Web Apps",
    "Enterprise",
    "Blockchain",
    "AI/ML",
    "On-Demand",
];


//Service data
export const servicesData = [{
    id: 'mobile',
    name: 'Mobile App Development',
    icon: Smartphone,
    description: 'Native & Cross-platform solutions for iOS and Android.',
    longDesc: 'We build world-class mobile applications that deliver seamless user experiences across all devices. From native iOS and Android apps to efficient cross-platform solutions.',
    subcategories: ['Mobile App Development', 'Android App Development', 'iOS App Development', 'React Native App Development', 'Flutter App Development', 'Mobile App Maintenance', 'Wearable App Development', 'PWA Development', 'AR/VR App Development', 'Startup App Development']
}, {
    id: 'web',
    name: 'Website Development',
    icon: Globe,
    description: 'Scalable web applications using modern frameworks.',
    longDesc: 'Create a powerful online presence with our custom web development services. We build fast, secure, and scalable web applications using the latest technologies.',
    subcategories: ['Website Development', 'Laravel Development', 'eCommerce Development', 'Magento Development', 'Full Stack Development', 'NodeJS Development', 'ReactJS Development', 'Web Designing', 'Shopify Development', 'CMS Development', 'WordPress Development']
}, {
    id: 'software',
    name: 'Software Development',
    icon: Code,
    description: 'Custom software tailored to your business needs.',
    longDesc: 'Transform your business operations with custom software solutions. We design and develop robust software tailored to your specific enterprise requirements.',
    subcategories: ['Software Development', 'SaaS Development', 'POS Development', 'Desktop App Development', 'Software Maintenance', 'ERP Development', 'LMS Development', 'Enterprise Software Development']
}, {
    id: 'ai',
    name: 'AI Development',
    icon: Brain,
    description: 'Intelligent solutions powering the future.',
    longDesc: 'Leverage the power of Artificial Intelligence to automate processes, gain insights, and create intelligent user experiences.',
    subcategories: ['AI Development', 'AI Chatbot Development', 'Generative AI Development', 'AI Agent Development', 'LLM Development', 'Computer Vision Development', 'NLP Development Services', 'ML Development']
}, {
    id: 'blockchain',
    name: 'Blockchain Development',
    icon: Blocks,
    description: 'Decentralized apps and smart contract solutions.',
    longDesc: 'Build the future of decentralized technology with our blockchain expertise. From smart contracts to full-scale dApps and NFT marketplaces.',
    subcategories: ['Blockchain Development', 'Ethereum Development', 'Metaverse Development', 'NFT Marketplace Development', 'Smart Contract Development', 'DeFi Development']
}, {
    id: 'enterprise',
    name: 'Enterprise Solution',
    icon: Building2,
    description: 'Robust solutions for large-scale organizations.',
    longDesc: 'Scale your enterprise with our comprehensive digital solutions. We provide consulting and development for major enterprise platforms.',
    subcategories: ['Microsoft Power BI Consulting', 'Microsoft Azure Consulting', 'SAP Consulting Services', 'Amazon Web Services', 'Salesforce Consulting', 'IT Staff Augmentation']
}, {
    id: 'ondemand',
    name: 'On-Demand Solutions',
    icon: Zap,
    description: 'Uber-like apps for various service industries.',
    longDesc: 'Launch your on-demand business quickly with our proven solution frameworks for delivery, booking, and service marketplaces.',
    subcategories: ['Food Delivery', 'Taxi Booking', 'Grocery Delivery', 'eWallet', 'Doctor Booking', 'Handyman Services', 'Logistics & Delivery']
}];

// service data 2
export const servicesData2 = [{
    id: 'mobile',
    name: 'Mobile App Development',
    icon: Smartphone,
    description: 'Native & Cross-platform solutions for iOS and Android.',
    color: 'from-blue-500 to-cyan-500',
    subcategories: ['Mobile App Development', 'Android App Development', 'iOS App Development', 'React Native App Development', 'Flutter App Development', 'Mobile App Maintenance', 'Wearable App Development', 'PWA Development', 'AR/VR App Development', 'Startup App Development']
}, {
    id: 'web',
    name: 'Website Development',
    icon: Globe,
    description: 'Scalable web applications using modern frameworks.',
    color: 'from-green-500 to-emerald-500',
    subcategories: ['Website Development', 'Laravel Development', 'eCommerce Development', 'Magento Development', 'Full Stack Development', 'NodeJS Development', 'ReactJS Development', 'Web Designing', 'Shopify Development', 'CMS Development', 'WordPress Development']
}, {
    id: 'software',
    name: 'Software Development',
    icon: Code,
    description: 'Custom software tailored to your business needs.',
    color: 'from-purple-500 to-pink-500',
    subcategories: ['Software Development', 'SaaS Development', 'POS Development', 'Desktop App Development', 'Software Maintenance', 'ERP Development', 'LMS Development', 'Enterprise Software Development']
}, {
    id: 'ai',
    name: 'AI Development',
    icon: Brain,
    description: 'Intelligent solutions powering the future.',
    color: 'from-yellow-500 to-orange-500',
    subcategories: ['AI Development', 'AI Chatbot Development', 'Generative AI Development', 'AI Agent Development', 'LLM Development', 'Computer Vision Development', 'NLP Development Services', 'ML Development']
}, {
    id: 'blockchain',
    name: 'Blockchain Development',
    icon: Blocks,
    description: 'Decentralized apps and smart contract solutions.',
    color: 'from-indigo-500 to-purple-500',
    subcategories: ['Blockchain Development', 'Ethereum Development', 'Metaverse Development', 'NFT Marketplace Development', 'Smart Contract Development', 'DeFi Development']
}, {
    id: 'enterprise',
    name: 'Enterprise Solution',
    icon: Building2,
    description: 'Robust solutions for large-scale organizations.',
    color: 'from-red-500 to-pink-500',
    subcategories: ['Microsoft Power BI Consulting', 'Microsoft Azure Consulting', 'SAP Consulting Services', 'Amazon Web Services', 'Salesforce Consulting', 'IT Staff Augmentation']
}, {
    id: 'ondemand',
    name: 'On-Demand Solutions',
    icon: Zap,
    description: 'Uber-like apps for various service industries.',
    color: 'from-teal-500 to-cyan-500',
    subcategories: ['Food Delivery', 'Taxi Booking', 'Grocery Delivery', 'eWallet', 'Doctor Booking', 'Handyman Services', 'Logistics & Delivery']
}];

// sitemapData
export const sitemapData = [{
    category: 'Main Pages',
    icon: Home,
    color: 'from-red-500 to-orange-500',
    links: [{
        name: 'Home',
        path: '/'
    }, {
        name: 'About Us',
        path: '/about'
    }, {
        name: 'Contact',
        path: '/contact'
    }]
}, {
    category: 'Services',
    icon: Layers,
    color: 'from-blue-500 to-cyan-500',
    links: [{
        name: 'All Services',
        path: '/services'
    }, {
        name: 'Mobile App Development',
        path: '/services/mobile'
    }, {
        name: 'Website Development',
        path: '/services/web'
    }, {
        name: 'Software Development',
        path: '/services/software'
    }, {
        name: 'AI Development',
        path: '/services/ai'
    }, {
        name: 'Blockchain Development',
        path: '/services/blockchain'
    }, {
        name: 'Enterprise Solutions',
        path: '/services/enterprise'
    }, {
        name: 'On-Demand Solutions',
        path: '/services/ondemand'
    }]
}, {
    category: 'Products',
    icon: Sparkles,
    color: 'from-purple-500 to-pink-500',
    links: [{
        name: 'All Products',
        path: '/products'
    }, {
        name: 'DevMark',
        path: 'https://devmark.app',
        external: true
    }, {
        name: 'MasterApp',
        path: 'https://play.google.com/store',
        external: true
    }, {
        name: 'My Family',
        path: 'https://apps.apple.com',
        external: true
    }]
}, {
    category: 'Works',
    icon: Briefcase,
    color: 'from-green-500 to-emerald-500',
    links: [{
        name: 'Portfolio',
        path: '/portfolio'
    }, {
        name: 'Case Studies',
        path: '/case-studies'
    }]
}, {
    category: 'Company',
    icon: Users,
    color: 'from-yellow-500 to-orange-500',
    links: [{
        name: 'Careers',
        path: '/career'
    }, {
        name: 'Blog',
        path: '/blog'
    }]
}, {
    category: 'Legal',
    icon: FileText,
    color: 'from-indigo-500 to-purple-500',
    links: [{
        name: 'Privacy Policy',
        path: '/privacy'
    }, {
        name: 'Terms & Conditions',
        path: '/terms'
    }]
}];


//projects2

export const projects2 = [{
    title: 'NeoBank Pro',
    cat: 'FinTech',
    result: '+40% Revenue'
}, {
    title: 'MediConnect',
    cat: 'Health',
    result: '2M Users'
}, {
    title: 'RideFast',
    cat: 'On-Demand',
    result: 'Global Scale'
}, {
    title: 'CryptoVault',
    cat: 'Web3',
    result: 'Secure Wallet'
}, {
    title: 'InvestMate',
    cat: 'FinTech',
    result: 'AI Analytics'
}, {
    title: 'DocTalk',
    cat: 'Health',
    result: 'Telemedicine'
}];