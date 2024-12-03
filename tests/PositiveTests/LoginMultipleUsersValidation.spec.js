import { test, expect } from '@playwright/test';


const users = [
  { username: 'standard_user', password: 'secret_sauce' },
  { username: 'problem_user', password: 'secret_sauce' },
  { username: 'performance_glitch_user', password: 'secret_sauce' },
  { username: 'error_user', password: 'secret_sauce' },
  { username: 'visual_user', password: 'secret_sauce' }
];

users.forEach((user) => {
  test(`Login and validate URL and title of Inventory page for ${user.username}`, async ({ page }) => {
   
    await page.goto('https://www.saucedemo.com/');

    
    await page.fill('#user-name', user.username);  
    await page.fill('#password', user.password);    
    await page.locator('#login-button').click()            

    
    await page.waitForSelector('.inventory_list'); // why are you need to wait for a locator? please explain.

   
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    
    await expect(page).toHaveTitle('Swag Labs');
  });
});
