import {test, expect} from '@playwright/test';
import console from 'console';
import dotenv from 'dotenv';

dotenv.config();

const baseURL = process.env.API_BASE_URL ?? 'https://api.github.com';

test.describe('GitHub API - No Auth scenarios', () => {
    test('Get api root exposes standard links with no auth', async ({ request, baseURL}) => {
    
        //const baseURL = process.env.API_BASE_URL ?? 'https://api.github.com';
        const res = await request.get(`${baseURL}/`);
        expect(res.status()).toBe(200);
        const body = await res.json();
        expect(body).toMatchObject({
            current_user_url: expect.any(String),
            repository_url: expect.any(String)
        });

        // Rate-limit headers exist even without auth
        const headers = res.headers();
        expect(headers).toHaveProperty('x-ratelimit-limit');

        const jsonData = await res.json();
        console.log('Response JSON:', jsonData);
        // Validate current_user_url and repository_url in the response
        expect(jsonData).toHaveProperty('current_user_url', `${baseURL}/user`);
        expect(jsonData).toHaveProperty('repository_url', `${baseURL}/repositories`);
    });

    test('Get github api feeds with no auth', async ({ request, baseURL }) => {
        //const baseURL = process.env.API_BASE_URL ?? 'https://api.github.com';
        const response =await request.get(`${baseURL}/feeds`);
        expect(response.status()).toBe(200);
        const jsonData = await response.json();
        console.log('Response JSON:', jsonData);
        expect(jsonData).toHaveProperty('timeline_url');
    });

    test('GitHub API users endpoint error validation with no auth', async ({request, baseURL}) => {
        //const baseURL = process.env.API_BASE_URL ?? 'https://api.github.com';
        const response = await request.get(`${baseURL}/user`);
        expect(response.status()).toBe(401);
        const jsonData = await response.json();
        console.log('Response body:', jsonData);
        expect(jsonData).toHaveProperty('documentation_url');
    });

    test('GitHub API public user endpoint with no auth', async ({request, baseURL}) => {
        //const baseURL = process.env.API_BASE_URL ?? 'https://api.github.com';
        const response = await request.get(`${baseURL}/users/octocat`);
        expect(response.status()).toBe(200);
        const jsonData = await response.json();
        console.log('Response JSON:', jsonData);
        expect(jsonData).toHaveProperty('login', 'octocat');
        expect(jsonData).toHaveProperty('name', 'The Octocat');
    });

    test('GitHub API user endpoint invalid user validation with no auth', async ({request, baseURL}) => {
        //const baseURL = process.env.API_BASE_URL ?? 'https://api.github.com';
        const response = await request.get(`${baseURL}/users/invaliduser`);
        console.log('Response status:', response.status());
        expect(response.status()).toBe(404);
    });
});

