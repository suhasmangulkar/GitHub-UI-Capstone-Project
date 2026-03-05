import {test, expect} from '@playwright/test';
import dotenv from 'dotenv';
import { GHLoginPage } from '../pages/GHLoginPage.js';
dotenv.config();

test.describe('GitHub Login Tests using POM', () => {
    // Positive login test case
    test.skip('Test 1 GitHub Login test positive scenario', async ({page}) => {
        const url = process.env.GITHUB_URL;
        const loginUrl = process.env.GITHUB_LOGIN_URL;
        const username = process.env.GITHUB_USERNAME;
        const password = process.env.GITHUB_PASSWORD;
        const loginPage = new GHLoginPage(page);

        // Navigate directly to GitHub login page
        await loginPage.navigateTo(loginUrl);
        await expect(page).toHaveTitle(/Sign in to GitHub/i);
        console.log("Page title: ", await page.title());
        console.log("Current URL: ", page.url());

        // Login method to perform login
        await loginPage.login(username, password);

        // Validate successful login by checking URL or page title
        const currentUrl = await loginPage.getCurrentUrl();
        console.log("URL after login:", currentUrl);
        console.log("Page title: ", await page.title());
        expect(page.url()).toMatch(url);
        console.log("Test 2 passed");
    });

    // Negative login test case with incorrect username
    test.skip('Test 2 GitHub login test negative scenario', async ({page}) => {
        const loginUrl = process.env.GITHUB_LOGIN_URL;
        const incorrectUsername = process.env.GITHUB_INCORRECT_USERNAME;
        const password = process.env.GITHUB_PASSWORD;
        const loginPage = new GHLoginPage(page);

        // Navigate directly to GitHub login page
        await loginPage.navigateTo(loginUrl);

        // Login method to perform login
        await loginPage.login(incorrectUsername, password);

        // Verify incorrect username or password error message alert is displayed
        const currentUrl = await loginPage.getCurrentUrl();
        console.log("URL after login:", currentUrl);
        console.log("Page title: ", await page.title());
        await expect(loginPage.incorrectLoginAlert).toBeVisible();
        console.log("Test 3 passed");
    });

    // All repositories dropdown visibility test
    test.skip('Test 3 All repositories dropdown visibility test', async ({page}) => {
        //const url = process.env.GITHUB_URL;
        const loginUrl = process.env.GITHUB_LOGIN_URL;
        const username = process.env.GITHUB_USERNAME;
        const password = process.env.GITHUB_PASSWORD;
        
        const loginPage = new GHLoginPage(page);
    
        // Navigate directly to GitHub login page
        await loginPage.navigateTo(loginUrl);

        // Login method to perform login
        await loginPage.login(username, password);

        // Select my repository from all repositories dropdown on dashboard page after login
        await loginPage.allRepoDropdown.click();
        
        // Select one of the repositories option from the dropdown
        await loginPage.myRepoOption.click();
        await loginPage.allRepoDropdown.click(); // Click outside the dropdown to close it
        
        //verify my repository text is visible in the dropdown after selection
        await expect(loginPage.allRepoDropdown).toHaveText(/suhasmangulkar\/MyRepository/i);
        console.log("Test 3 passed");
    });
});