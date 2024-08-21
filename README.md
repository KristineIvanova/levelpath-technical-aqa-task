# Automated tests for e-CSDD system

This repository contains automated tests to ensure the e-CSDD system functions correctly. The tests are created using Playwright and TypeScript.

## Tests overview

The test suite includes three tests to check different aspects of the system.

### Test 1: User profile verification

1.Log into the e-CSDD system.
2.Navigate to the profile page by clicking on the profile icon or avatar and selecting "Edit Profile."
3.Verify that the page displays the email address used during login.

### Test 2: Vehicle registry search

1.Log into the e-CSDD system.
2.Access the Vehicle Registry page.
3.Perform a vehicle search using the following filters: Brand (Citroen), Model (C3), Fuel Type (Petrol), Transmission Type (Manual), and Price Range (500-10,000).
4.Confirm that the search results match the specified criteria.
5.Click on the first result and check if the car details page displays accurate information.

### Bonus test: Negative case

1. Test the behavior of the system when the search returns no results.

## To get started:

1. Clone this repository to a local machine.
2. Install the necessary dependencies by running `npm install`
3. Install Playwright by running `npx playwright install`
4. Create a `.env` file in the root of the project and set environment variables `EMAIL` and `PASSWORD` with your e-CSDD system credentials. 
5. Run the tests with `npx playwright test`
6. View the test report with `npx playwright show-report`

## Additional Information

- **Playwright Documentation:** [https://playwright.dev/docs/intro](https://playwright.dev/docs/intro)
- **TypeScript Documentation:** [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)
