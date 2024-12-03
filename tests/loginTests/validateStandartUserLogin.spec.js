import { test, expect } from "@playwright/test";
// where is the test.describe as i asked?
test('test', async ({ page }) => { // what is this test case name?
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator("//span[@class='title']")).toHaveText("Products")
});
