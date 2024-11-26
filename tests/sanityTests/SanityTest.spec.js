import { test, expect } from "@playwright/test";

test("Sanity test for Login and Checkout Flow", async ({ page }) => {
  
  await page.goto('https://www.saucedemo.com/');

  
  await page.fill('#user-name', 'standard_user');  
  await page.fill('#password', 'secret_sauce');    
  await page.locator('#login-button').click()            

  
  await page.waitForSelector('.inventory_list');   


  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await expect(page).toHaveTitle('Swag Labs');


  await page.locator('text=Sauce Labs Backpack').click(); 
  await page.locator('text=Add to cart').click();       
  await page.locator('text=Back to products').click();   

  await page.locator('text=Sauce Labs Bike Light').click();
  await page.locator('text=Add to cart').click();          
  await page.locator('text=Back to products').click();     

  
  const cartItemCount = await page.locator('.shopping_cart_badge').textContent();
  expect(cartItemCount).toBe('2'); 

  
  await page.locator('.shopping_cart_link').click()

  
  await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
  await expect(page).toHaveTitle('Swag Labs');

  
  const cartItems = await page.locator('.cart_item');
  const cartItemCountInCart = await cartItems.count();
  expect(cartItemCountInCart).toBe(2); 

  
  await page.locator('[data-test="checkout"]').click()

  
  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
  await expect(page).toHaveTitle('Swag Labs');

  
  await page.fill('#first-name', 'John');    
  await page.fill('#last-name', 'Doe');     
  await page.fill('#postal-code', '12345'); 
  await page.locator('[data-test="continue"]').click()

 
  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
  await expect(page).toHaveTitle('Swag Labs');

 
  const overviewItems = await page.locator('.cart_item');
  const overviewItemCount = await overviewItems.count();
  expect(overviewItemCount).toBe(2); 

  
  await page.locator('[data-test="finish"]'). click ()

 
  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
  await expect(page).toHaveTitle('Swag Labs');

  const completeText1 = await page.locator('.complete-header').textContent();
  const completeText2 = await page.locator('.complete-text').textContent();
  expect(completeText1).toBe('Thank you for your order!');
  expect(completeText2).toBe('Your order has been dispatched, and will arrive just as fast as the pony can get there!');

 
  await page.locator('[data-test="Back Home"]').click()


 
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await expect(page).toHaveTitle('Swag Labs');
});
