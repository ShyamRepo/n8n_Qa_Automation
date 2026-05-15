// Import required modules
const { test, expect } = require('@playwright/test');

// Define reusable locators
const loginPageUrl = 'https://example.com/login';
const usernameInput = 'input[name="username"]';
const passwordInput = 'input[name="password"]';
const submitButton = 'button[type="submit"]';
const dashboardUrl = 'https://example.com/dashboard';
const forgotPasswordLink = 'text="Forgot Password"';
const passwordField = 'input[type="password"]';
const errorMessage = 'text="Invalid credentials"';

// Test suite
test.describe('Login Scenarios', () => {
  // Test case 1: Navigate to login page
  test('Navigate to Login Page', async ({ page }) => {
    // Navigate to login page
    await page.goto(loginPageUrl);
    // Verify page title
    await expect(page).toHaveTitle('Login Page');
  });

  // Test case 2: Login with valid email/mobile and password
  test('Login with Valid Credentials', async ({ page }) => {
    // Navigate to login page
    await page.goto(loginPageUrl);
    // Fill username and password
    await page.fill(usernameInput, 'valid_username');
    await page.fill(passwordInput, 'valid_password');
    // Click submit button
    await page.click(submitButton);
    // Verify redirect to dashboard
    await expect(page).toHaveURL(dashboardUrl);
  });

  // Test case 3: Login with invalid password
  test('Login with Invalid Password', async ({ page }) => {
    // Navigate to login page
    await page.goto(loginPageUrl);
    // Fill username and password
    await page.fill(usernameInput, 'valid_username');
    await page.fill(passwordInput, 'invalid_password');
    // Click submit button
    await page.click(submitButton);
    // Verify error message
    await expect(page.locator(errorMessage)).toBeVisible();
  });

  // Test case 4: Login with empty email/mobile
  test('Login with Empty Email/Mobile', async ({ page }) => {
    // Navigate to login page
    await page.goto(loginPageUrl);
    // Fill password
    await page.fill(passwordInput, 'valid_password');
    // Click submit button
    await page.click(submitButton);
    // Verify error message
    await expect(page.locator(errorMessage)).toBeVisible();
  });

  // Test case 5: Login with empty password
  test('Login with Empty Password', async ({ page }) => {
    // Navigate to login page
    await page.goto(loginPageUrl);
    // Fill username
    await page.fill(usernameInput, 'valid_username');
    // Click submit button
    await page.click(submitButton);
    // Verify error message
    await expect(page.locator(errorMessage)).toBeVisible();
  });

  // Test case 6: Verify Forgot Password link
  test('Verify Forgot Password Link', async ({ page }) => {
    // Navigate to login page
    await page.goto(loginPageUrl);
    // Verify forgot password link
    await expect(page.locator(forgotPasswordLink)).toBeVisible();
  });

  // Test case 7: Verify password field is masked
  test('Verify Password Field is Masked', async ({ page }) => {
    // Navigate to login page
    await page.goto(loginPageUrl);
    // Verify password field is masked
    await expect(page.locator(passwordField)).toHaveAttribute('type', 'password');
  });

  // Test case 8: Verify error message for invalid credentials
  test('Verify Error Message for Invalid Credentials', async ({ page }) => {
    // Navigate to login page
    await page.goto(loginPageUrl);
    // Fill invalid username and password
    await page.fill(usernameInput, 'invalid_username');
    await page.fill(passwordInput, 'invalid_password');
    // Click submit button
    await page.click(submitButton);
    // Verify error message
    await expect(page.locator(errorMessage)).toBeVisible();
  });
});