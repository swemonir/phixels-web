/// <reference types="vite/client" />
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Something went wrong');
    }
    const data = await response.json();
    return data;
}

export const apiService = {
    // Blogs
    getBlogs: () =>
        fetch(`${BASE_URL}/blogs`).then(res => handleResponse<any>(res)),
    getBlogById: (id: string) =>
        fetch(`${BASE_URL}/blogs/${id}`).then(res => handleResponse<any>(res)),

    // Portfolio
    getPortfolios: () =>
        fetch(`${BASE_URL}/portfolio`).then(res => handleResponse<any>(res)),
    getPortfolioById: (id: string) =>
        fetch(`${BASE_URL}/portfolio/${id}`).then(res => handleResponse<any>(res)),

    // Products
    getProducts: () =>
        fetch(`${BASE_URL}/products`).then(res => handleResponse<any>(res)),
    getProductById: (id: string) =>
        fetch(`${BASE_URL}/products/${id}`).then(res => handleResponse<any>(res)),

    // Services
    getServices: () =>
        fetch(`${BASE_URL}/services`).then(res => handleResponse<any>(res)),
    getServiceById: (id: string) =>
        fetch(`${BASE_URL}/services/${id}`).then(res => handleResponse<any>(res)),

    // Case Studies
    getCaseStudies: () =>
        fetch(`${BASE_URL}/case-studies`).then(res => handleResponse<any>(res)),
    getCaseStudyById: (id: string) =>
        fetch(`${BASE_URL}/case-studies/${id}`).then(res => handleResponse<any>(res)),

    // Careers
    getCareers: () =>
        fetch(`${BASE_URL}/careers`).then(res => handleResponse<any>(res)),
    getCareerById: (id: string) =>
        fetch(`${BASE_URL}/careers/${id}`).then(res => handleResponse<any>(res)),
};
