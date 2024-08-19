import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { LoginData } from '../pages/loginData';
import { CarSearchPage } from '../pages/carSearchPage';
import { HomePage } from '../pages/homePage';

test('Verify the car info page shows empty results for invalid search criteria', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const carSearchPage = new CarSearchPage(page);

    await test.step('Navigate to home page', async () => {
        await homePage.navigateToHomePage();
        const homePageLoaded = await homePage.isHomePageLoaded();
        expect(homePageLoaded).toBe(true);
    });

    await test.step('Navigate to login page and login', async () => {
        await loginPage.navigateToLoginPage();
        await loginPage.login(LoginData);
    });

    await test.step('Navigate to car search page and perform invalid search', async () => {
        await carSearchPage.navigateToCarSearchPage();
        await carSearchPage.performInvalidSearch();
    });

    await test.step('Verify search results are empty', async () => {
        const searchResults = await carSearchPage.getSearchResults();
        await expect(searchResults).toHaveCount(0);
    });
});