import {test, expect} from '@playwright/test';
import dotenv from 'dotenv';
import { GHLoginPage } from '../pages/GHLoginPage.js';
import { GHRepoPage } from '../pages/GHRepoPage.js';

dotenv.config();

test.describe('GitHub Repository Page Tests using POM', () => {
    test.skip('Test 1 GitHub Repository page name displayed', async ({page}) => {
        const loginUrl = process.env.GITHUB_LOGIN_URL;
        const username = process.env.GITHUB_USERNAME;
        const password = process.env.GITHUB_PASSWORD;
        const loginPage = new GHLoginPage(page);
        const repoPage = new GHRepoPage(page);

        // Navigate to login page
        await loginPage.navigateTo(loginUrl);

        // Login
        await loginPage.login(username, password);

        // Click on my repository link to navigate to repository page
        await loginPage.repoLink.click();

        // Verify selected repository page name is displayed on repository page
        const repoPageTitle = await repoPage.getRepoPageTitle();
        console.log("Repository page title: ", repoPageTitle);
        expect(repoPageTitle).toBe('MyRepository');
        console.log("Test passed");
    });

    test('Test 2 Create and verify new branch in selected repository', async ({page}) => {
        const loginUrl = process.env.GITHUB_LOGIN_URL;
        const username = process.env.GITHUB_USERNAME;
        const password = process.env.GITHUB_PASSWORD;
        const loginPage = new GHLoginPage(page);
        const repoPage = new GHRepoPage(page);

        // Navigate to login page
        await loginPage.navigateTo(loginUrl);

        // Login
        await loginPage.login(username, password);

        // Click on my repository link to navigate to repository page
        await loginPage.repoLink.click();

        // Click on main branch dropdown on my repository page
        await repoPage.mainBranchDropdown.click();
        await repoPage.mainBranchDropdownInput.click();
        await repoPage.mainBranchDropdownInput.fill('master');
        await repoPage.mainBranchDropdownCreateBranchButton.click();
        await page.pause();
        // Verify master branch is created and displayed in main branch dropdown
        await expect(repoPage.masterBranchDropdown).toBeVisible();
        console.log("Test passed");
    });
});