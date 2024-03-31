import nodeFetch from "node-fetch";

class PublicAPIService {
    domain: string;
    constructor(domain: string) {
        this.domain = domain;
    }

    async getAllEntries(): Promise<{ data?: any, error?: string }> {
        try {
            const response = await nodeFetch(`${this.domain}/entries`);
            const data = await response.json();
            return { data }
        } catch (error: any) {
            return { error: 'Failed to fetch entries' }
        }
    }

    async getEntriesBasedOnCategory(category: string): Promise<{ data?: any, error?: string }> {
        try {
            const response = await nodeFetch(`${this.domain}/random?category=${category}`);
            const { entries } = await response.json();
            return { data: entries }
        } catch (error: any) {
            return { error: `Category ${category} is not available` }
        }
    }

    async getAllCategories(): Promise<{ data?: any, error?: string }> {
        try {
            const response = await nodeFetch(`${this.domain}/categories`);
            const { categories } = await response.json();
            return { data: categories }
        } catch (error: any) {
            return { error: 'Failed to fetch categories' }
        }
    }
}

export const publicAPIService = new PublicAPIService('https://api.publicapis.org');