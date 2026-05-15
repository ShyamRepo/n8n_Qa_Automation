// Import required modules
const { test, expect } = require('@playwright/test');

// Define reusable locators
const loginPageUrl = 'https://example.com/login';
const usernameInput = 'input[name="username"]';
const passwordInput = 'input[name="password"]';
const submitButton = 'button[type="submit"]';
const forgotPasswordLink = 'a[href="/forgot-password"]';
const errorMessage = 'div.error-message';

// Test suite
test.describe('Login Scenarios', () => {
  // Test 1: Navigate to login page
  test('Navigate to Login Page', async ({ page }) => {
    // Navigate to login page
    await page.goto(loginPageUrl);
    // Verify page title
    await expect(page).toContainText('Login');
  });

  // Test 2: Login with valid email/mobile and password
  test('Login with Valid Credentials', async ({ page }) => {
    // Navigate to login page
    await page.goto(loginPageUrl);
    // Fill username and password
    await page.fill(usernameInput, 'valid_username');
    await page.fill(passwordInput, 'valid_password');
    // Click submit button
    await page.click(submitButton);
    // Verify successful login
    await expect(page).toContainText('Dashboard');
  });

  // Test 3: Login with invalid password
  test('Login with Invalid Password', async ({ page }) => {
    // Navigate to login page
    await page.goto(loginPageUrl);
    // Fill username and password
    await page.fill(usernameInput, 'valid_username');
    await page.fill(passwordInput, 'invalid_password');
    // Click submit button
    await page.click(submitButton);
    // Verify error message
    await expect(page.locator(errorMessage)).toContainText('Invalid username or password');
  });

  // Test 4: Login with empty email/mobile
  test('Login with Empty Email/Mobile', async ({ page }) => {
    // Navigate to login page
    await page.goto(loginPageUrl);
    // Fill password
    await page.fill(passwordInput, 'valid_password');
    // Click submit button
    await page.click(submitButton);
    // Verify error message
    await expect(page.locator(errorMessage)).toContainText('Username is required');
  });

  // Test 5: Login with empty password
  test('Login with Empty Password', async ({ page }) => {
    // Navigate to login page
    await page.goto(loginPageUrl);
    // Fill username
    await page.fill(usernameInput, 'valid_username');
    // Click submit button
    await page.click(submitButton);
    // Verify error message
    await expect(page.locator(errorMessage)).toContainText('Password is required');
  });

  // Test 6: Verify Forgot Password link
  test('Verify Forgot Password Link', async ({ page }) => {
    // Navigate to login page
    await page.goto(loginPageUrl);
    // Click forgot password link
    await page.click(forgotPasswordLink);
    // Verify forgot password page
    await expect(page).toContainText('Forgot Password');
  });

  // Test 7: Verify password field is masked
  test('Verify Password Field is Masked', async ({ page }) => {
    // Navigate to login page
    await page.goto(loginPageUrl);
    // Fill password
    await page.fill(passwordInput, 'valid_password');
    // Verify password field is masked
    await expect(page.locator(passwordInput)).toHaveAttribute('type', 'password');
  });

  // Test 8: Verify error message for invalid credentials
  test('Verify Error Message for Invalid Credentials', async ({ page }) => {
    // Navigate to login page
    await page.goto(loginPageUrl);
    // Fill invalid username and password
    await page.fill(usernameInput, 'invalid_username');
    await page.fill(passwordInput, 'invalid_password');
    // Click submit button
    await page.click(submitButton);
    // Verify error message
    await expect(page.locator(errorMessage)).toContainText('Invalid username or password');
  });
});