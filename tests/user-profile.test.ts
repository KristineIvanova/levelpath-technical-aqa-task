import { expect, test } from '@playwright/test';
import { LoginData } from '../pages/loginData';
import { HomePage } from '../pages/homePage';
import { ProfilePage } from '../pages/profilePage';
import { LoginPage } from '../pages/loginPage';
import dotenv from 'dotenv';
import { PlaywrightTestConfig } from '@playwright/test';

dotenv.config();

test('Assert that page contains e-mail from log-in step', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const profilePage = new ProfilePage(page);

    await test.step('Navigate to home page', async () => {
        await homePage.navigateToHomePage();
        const homePageLoaded = await homePage.isHomePageLoaded();
        expect(homePageLoaded).toBe(true);
    });

    await test.step('Navigate to login page and login', async () => {
        await loginPage.waitPageLoad();
        await loginPage.navigateToLoginPage();
        await loginPage.login(LoginData);
    });

    await test.step('Verify user is logged in', async () => {
        const loggedIn = await loginPage.isLoggedIn();
        expect(loggedIn).toBe(true);
    });

    await test.step('Navigate to profile page', async () => {
        await profilePage.goToProfilePage();
        await profilePage.waitPageLoad();
    });

    await test.step('Verify email field value', async () => {
        const emailFieldValue = await profilePage.getEmailValue();
        expect(emailFieldValue).toBe(LoginData.email);
    });
});