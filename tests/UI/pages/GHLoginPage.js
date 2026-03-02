export class GHLoginPage {
    constructor(page) {
        this.page = page;

        // Locators as properties
        // Username field locator
        this.usernameField = page.locator('#login_field');

        // Password field locator
        this.passwordField = page.locator('#password');

        // Sign In button locator
        this.signInButton = page.locator(`input[name='commit']`);

        // Dashboard page Hamburger Menu locator after login
        this.hamburgerMenu = page.locator('.octicon-three-bars');

        // Issues option from hamburger menu locator on dashboard page
        //this.issuesTab = page.getByTestId('side-nav-menu-item-ISSUES');
        //this.issuesTab = page.locator('a[data-testid="side-nav-menu-item-ISSUES"]');
        this.repoLink = page.getByRole('link', { name: 'suhasmangulkar/MyRepository' });

        // Incorrect username or password error message locator
        //this.incorrectLoginAlert = page.locator('div').filter({ hasText: 'Incorrect username or' }).nth(5);
        this.incorrectLoginAlert = page.getByRole('alert');

        this.home = page.locator("//h2[text()='Home']");

        // All repositories dropdown locator on dashboard page after login
        //this.allRepoDropdown = page.getByRole('button', { name: 'All repositories' });
        //this.allRepoDropdown = page.locator('details[aria-label="Select a repository"]');
        //this.allRepoDropdown = page.locator('//button[@id="_r_d_"]');
        //this.allRepoDropdown = page.locator(`button[aria-label="Select a repository"]`);
        //this.allRepoDropdown = page.locator(`button:has-text("All repositories")`);
        this.allRepoDropdown = page.getByRole('button', { name: 'Select repositories to attach' });
        
        //this.myRepoOption = page.getByRole('option', { name: 'suhasmangulkar/MyRepository' });
        this.myRepoOption = page.getByTestId('item-picker-root').locator('div').filter({ hasText: /^suhasmangulkar\/MyRepository$/ })
    }

    async navigateTo(url) {
        await this.page.goto(url, { waitUntil: 'domcontentloaded' });
        await this.page.setViewportSize({ width: 1280, height: 800 });
    }

    async login(username, password) {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.signInButton.click();
    }

    async getCurrentUrl() {
        return await this.page.url();
    }


}