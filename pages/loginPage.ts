import { Page } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export class LoginPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async waitPageLoad() {
        console.log('Waiting for page to load...');
        await this.page.waitForLoadState('domcontentloaded');
        console.log('Page loaded.');
    }

    async navigateToLoginPage() {
        console.log('Navigating to login page...');
        try {
            await this.page.goto('https://e.csdd.lv/');
            await this.page.reload()
            console.log('1');


            await this.page.waitForURL('https://e.csdd.lv/');
            console.log('2');

            await this.page.reload()
            console.log('3');

            await this.page.goto('https://e.csdd.lv/');
            console.log('4');

            await this.page.reload()

            await this.page.waitForTimeout(15000); // Add a delay to ensure the page is fully loaded
            console.log('Page loaded: https://e.csdd.lv/');
            await this.page.getByText('Autorizēties uzziņai').click();
            console.log('Clicked on "Autorizēties uzziņai"');

        } catch (error) {
            console.error('Error navigating to login page:', error);
            const errorSummaryVisible = await this.page.locator('div.error-summary').isVisible();
            if (errorSummaryVisible) {
                console.error('Error summary detected on the page.');
            }
        }
    }

    async login(loginData: { email: string, password: string }) {
        console.log('Filling in login form...');
        console.log(`Email: ${loginData.email}`);
        await this.page.locator('id=email').fill(loginData.email);
        console.log('Email filled.');

        console.log('Filling in password...');
        await this.page.locator('id=psw').fill(loginData.password);
        console.log('Password filled.');

        console.log('Submitting login form...');
        await this.page.locator('id=doLogin').click();
        console.log('Login form submitted.');
    }

    async isLoggedIn() {
        console.log('Checking if user is logged in...');
        await this.page.waitForSelector('main#page-e-csdd-profile.site-container');
        const profileNavVisible = await this.page.locator('main#page-e-csdd-profile.site-container').isVisible();
        const currentInfoSectionVisible = await this.page.getByText('Aktuālā informācija').isVisible();
        const driverDocumentsSectionVisible = await this.page.getByText('Vadītāja dokumenti').isVisible();
        const penaltyPointsSectionVisible = await this.page.getByText('Pārkāpumu uzskaites punkti').isVisible();

        const isVisible = profileNavVisible && currentInfoSectionVisible && driverDocumentsSectionVisible && penaltyPointsSectionVisible;
        console.log(`User is ${isVisible ? '' : 'not '}logged in.`);
        return isVisible;
    }
}