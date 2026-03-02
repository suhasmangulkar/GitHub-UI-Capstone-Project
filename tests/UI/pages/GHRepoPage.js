import { GHLoginPage } from './GHLoginPage.js';

export class GHRepoPage extends GHLoginPage {
    constructor(page) {
        super(page);
        this.page = page;
        
        // Locators as properties
        // Repository page title locator
        this.repoPageTitle = page.locator('.styles-module__contextCrumbLast__tI2e3');
        // Main branch dropdown locator on my repository page
        //this.mainBranchDropdown = page.getByRole('button', { name: 'main branch' });
        this.mainBranchDropdown = page.locator('//button[@data-testid="anchor-button"]');
        // Main branch dropdown input box locator on my repository page
        //this.mainBranchDropdownInput = page.locator('input[aria-label="Filter branches"]');
        this.mainBranchDropdownInput = page.getByPlaceholder('Find or create a branch...');
        // Main branch dropdown create branch button locator on my repository page
        //this.mainBranchDropdownCreateBranchButton = page.getByRole('button', { name: 'Create branch master from main' });
        this.mainBranchDropdownCreateBranchButton = page.getByRole('button', { name: 'Create branch master from main' });
        // Master branch dropdown locator on my repository page after creating new branch
        //this.masterBranchDropdown = page.locator('//button[@data-testid="anchor-button"]');
        this.masterBranchDropdown = page.getByText(' master');
    }

    async navigateTo(url) {
        await this.page.goto(url, { waitUntil: 'domcontentloaded' });
        await this.page.setViewportSize({ width: 1280, height: 800 });
    }

    async getRepoPageTitle() {
        return await this.repoPageTitle.textContent();
    }
}