import { test, expect } from "@playwright/test";

test("Sanity test for Login and Checkout Flow", async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  const userNameInput = page.locator('#user-name');
  const passwordInput = page.locator('#password');
  const loginButton = page.locator('#login-button');

  await userNameInput.fill('standard_user');
  await passwordInput.fill('secret_sauce');
  await loginButton.click();

  
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await expect(page).toHaveTitle('Swag Labs');

  
  await page.locator('text=Sauce Labs Backpack').click(); 
  await page.locator('text=Add to cart').click();       
  await page.locator('text=Back to products').click();   

  await page.locator('text=Sauce Labs Bike Light').click();
  await page.locator('text=Add to cart').click();          
  await page.locator('text=Back to products').click();     

  
  const cartItemCount = await page.locator('.shopping_cart_badge').textContent();  
  const cartItemCountText = cartItemCount.trim(); 
  await expect(cartItemCountText).toEqual('2');  

  await page.locator('.shopping_cart_link').click();

  await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
  await expect(page).toHaveTitle('Swag Labs');
  
  
  const cartItems = page.locator('.cart_item'); 
  const cartItemCountInCart = await cartItems.count(); 
  await expect(cartItemCountInCart).toEqual(2);  

  await page.locator('[data-test="checkout"]').click();

  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
  await expect(page).toHaveTitle('Swag Labs');

  await page.fill('#first-name', 'John');    
  await page.fill('#last-name', 'Doe');     
  await page.fill('#postal-code', '12345'); 
  await page.locator('[data-test="continue"]').click();

  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
  await expect(page).toHaveTitle('Swag Labs');


  const overviewItems = page.locator('.cart_item'); 
  const overviewItemCount = await overviewItems.count(); 
  await expect(overviewItemCount).toEqual(2);  

  await page.locator('[data-test="finish"]').click();

  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
  await expect(page).toHaveTitle('Swag Labs');

  const completeText1 = await page.locator('.complete-header').textContent(); 
  const completeText2 = await page.locator('.complete-text').textContent(); 
  

  await expect(completeText1.trim()).toEqual('Thank you for your order!'); 
  await expect(completeText2.trim()).toEqual('Your order has been dispatched, and will arrive just as fast as the pony can get there!'); // استخدام trim()

  await page.locator('[data-test="back-to-products"]').click();

  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await expect(page).toHaveTitle('Swag Labs');
});
