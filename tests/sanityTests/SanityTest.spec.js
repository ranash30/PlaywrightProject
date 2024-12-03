import { test, expect } from "@playwright/test";

test("Sanity test for Login and Checkout Flow", async ({ page }) => {
  
  await page.goto('https://www.saucedemo.com/');

  
  await page.fill('#user-name', 'standard_user');   // this type of action is deprecated. please follow my playwright presentation in the "Actions Subject". (Deprecated means that this way of doing an action is not in use anymore).
  await page.fill('#password', 'secret_sauce');    // Same here
  await page.locator('#login-button').click()            

  
  await page.waitForSelector('.inventory_list');   // Why you need to wait for a locator to be presented in the html ?


  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await expect(page).toHaveTitle('Swag Labs');


  await page.locator('text=Sauce Labs Backpack').click(); 
  await page.locator('text=Add to cart').click();       
  await page.locator('text=Back to products').click();   

  await page.locator('text=Sauce Labs Bike Light').click();
  await page.locator('text=Add to cart').click();          
  await page.locator('text=Back to products').click();     

  
  const cartItemCount = await page.locator('.shopping_cart_badge').textContent();  // you don't need 'await' if you store the result in a variable
  expect(cartItemCount).toBe('2');  // toBe is validation for Jest framework. this is not a playwright assertion.

  
  await page.locator('.shopping_cart_link').click()

  
  await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
  await expect(page).toHaveTitle('Swag Labs');
  
  const cartItems = await page.locator('.cart_item'); // you don't need 'await' if you store the result in a variable
  const cartItemCountInCart = await cartItems.count(); // you don't need 'await' if you store the result in a variable
  expect(cartItemCountInCart).toBe(2);  // toBe is validation for Jest framework. this is not a playwright assertion.

  
  await page.locator('[data-test="checkout"]').click()

  
  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
  await expect(page).toHaveTitle('Swag Labs');

  
  await page.fill('#first-name', 'John');    
  await page.fill('#last-name', 'Doe');     
  await page.fill('#postal-code', '12345'); 
  await page.locator('[data-test="continue"]').click()

 
  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
  await expect(page).toHaveTitle('Swag Labs');

 
  const overviewItems = await page.locator('.cart_item'); // you don't need 'await' if you store the result in a variable
  const overviewItemCount = await overviewItems.count(); // you don't need 'await' if you store the result in a variable
  expect(overviewItemCount).toBe(2);  // toBe is validation for Jest framework. this is not a playwright assertion.

  
  await page.locator('[data-test="finish"]'). click ();

 
  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
  await expect(page).toHaveTitle('Swag Labs');

  const completeText1 = await page.locator('.complete-header').textContent(); // you don't need 'await' if you store the result in a variable
  const completeText2 = await page.locator('.complete-text').textContent(); // you don't need 'await' if you store the result in a variable
  expect(completeText1).toBe('Thank you for your order!'); // toBe is validation for Jest framework. this is not a playwright assertion.
  expect(completeText2).toBe('Your order has been dispatched, and will arrive just as fast as the pony can get there!'); // toBe is validation for Jest framework. this is not a playwright assertion.

  
  await page.locator('[data-test="back-to-products"]').click();


 
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await expect(page).toHaveTitle('Swag Labs');
});
