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

        // Repository link locator on dashboard page after login
        this.repoLink = page.getByRole('link', { name: 'suhasmangulkar/MyRepository' });

        // Incorrect username or password error message locator
        this.incorrectLoginAlert = page.getByRole('alert');

        // All repositories dropdown locator on dashboard page after login
        this.allRepoDropdown = page.getByRole('button', { name: 'Select repositories to attach' });
        
        // My repository option locator in all repositories dropdown on dashboard page after login
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