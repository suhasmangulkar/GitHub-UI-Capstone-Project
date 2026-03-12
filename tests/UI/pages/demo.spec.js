import {test, expect} from '@playwright/test';

test('Demo test', async ({page}) => {
    await page.goto("https://google.com");
    await page.locator("//input[@name='q']").fill("Selenium");
    page.locator("//input[@name='btnk']").click();
    expect(page.title()).toContain("Selenium");
});