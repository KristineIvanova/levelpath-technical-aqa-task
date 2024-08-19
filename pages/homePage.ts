import {chromium, Page} from '@playwright/test';

export class HomePage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToHomePage() {
        const browser = await chromium.launch({ headless: true });
        const context = await browser.newContext();
        const page = await context.newPage();
        console.log('Navigating to home page...');
        await this.page.goto('https://e.csdd.lv/');
        await this.page.reload();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('Navigated to home page.');
    }

    async isHomePageLoaded() {
        console.log('Checking if home page is loaded...');

        const authSectionVisible = await this.page.locator('.auth-section').isVisible();
        const titleVisible = await this.page.locator('h1.o-title', { hasText: 'Lieto CSDD pakalpojumus tiešsaistē' }).isVisible();
        const authAllActionsButtonVisible = await this.page.getByRole('button', { name: 'Autorizēties visām darbībām' }).isVisible();
        const authInquiryButtonVisible = await this.page.getByRole('button', { name: 'Autorizēties uzziņai' }).isVisible();

        const isVisible = authSectionVisible && titleVisible && authAllActionsButtonVisible && authInquiryButtonVisible;
        console.log(`Home page is ${isVisible ? '' : 'not '}loaded.`);
        return isVisible;
    }
}