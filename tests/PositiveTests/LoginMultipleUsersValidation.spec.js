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

    
    const inventoryList = page.locator('.inventory_list');

   
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    
    await expect(page).toHaveTitle('Swag Labs');
  });
});
