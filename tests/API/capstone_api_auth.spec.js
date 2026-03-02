import {test, expect} from '@playwright/test';
import console from 'console';
import dotenv from 'dotenv';
import { UtilityMethods } from '../utility/UtilityMethods.js';

dotenv.config();

const token = process.env.GITHUB_API_TOKEN;
const owner = process.env.GITHUB_OWNER;
const repo = process.env.GITHUB_REPO;
const filePath = process.env.FILE_PATH;
const util = new UtilityMethods();
const jsonInputData = await util.readJsonFile('post_request_to_create_an_issue.json');
const baseURL = process.env.API_BASE_URL ?? 'https://api.github.com';

test.describe('GitHub API - Auth scenarios', () => {

    //Get request for Github REST API Issues endpoint
    test('Get request for Github REST API Issues endpoint', async ({request}) => {
        
        const apiVersion = process.env.GITHUB_API_VERSION ?? '2022-11-28';
        //const baseURL = process.env.API_BASE_URL ?? 'https://api.github.com';
        
        const headers = {
            Authorization: `token ${token}`,
            'X-GitHub-Api-Version': apiVersion,
            Accept: 'application/vnd.github.v3+json'
        };
        const res = await request.get(`${baseURL}/issues`, { headers });
        expect(res.status()).toBe(200);
        const jsonData = await res.json();
        console.log('Response JSON:', jsonData);
        // Validate repositoty full name in the response
        expect(jsonData[0].repository.full_name).toBe(`${owner}/${repo}`);
    });

    //Post request to create an issue
    test('Post request to create an issue', async ({ request }) => {
        //const baseURL = process.env.API_BASE_URL ?? 'https://api.github.com';
        const res = await request.post(`${baseURL}/repos/${owner}/${repo}/issues`, { 
            headers : { Authorization: `token ${token}` },
            data: { jsonInputData} 
        });
        expect(res.status()).toBe(201);
        const postJsonResponse = await res.json();
        //expect(postJsonResponse).toHaveProperty('login');
    });
});
