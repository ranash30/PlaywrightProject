import {test, expect} from '@playwright/test'

test.describe('Login Scenarios', () => {
  test('Login with locked_out_user and validate error message', async ({
    page,
  }) => {
    await page.goto('https://www.saucedemo.com/')

    await page.fill('#user-name', 'locked_out_user') // this type of action is deprecated. please follow my playwright presentation in the "Actions Subject". (Deprecated means that this way of doing an action is not in use anymore).
    await page.fill('#password', 'secret_sauce') // Same here
    await page.locator('#login-button').click()

    const errorMessage = await page // This is clearly now what i taught in the class. font use chatgpt anymore.
      .locator('.error-message-container')
      .textContent()
    expect(errorMessage).toBe( // toBe is validation for Jest framework. this is not a playwright assertion.
      'Epic sadface: Sorry, this user has been locked out.',
    )
  })

  const loginScenarios = [
    {
      username: 'standard_user',
      password: 'wrong_password',
      expectedMessage:
        'Epic sadface: Username and password do not match any user in this service',
    },
    {
      username: 'wrong_user',
      password: 'secret_sauce',
      expectedMessage:
        'Epic sadface: Username and password do not match any user in this service',
    },
    {
      username: 'wrong_user',
      password: 'wrong_password',
      expectedMessage:
        'Epic sadface: Username and password do not match any user in this service',
    },
    {
      username: '',
      password: 'secret_sauce',
      expectedMessage: 'Epic sadface: Username is required',
    },
    {
      username: 'standard_user',
      password: '',
      expectedMessage: 'Epic sadface: Password is required',
    },
    {
      username: '',
      password: '',
      expectedMessage: 'Epic sadface: Username is required',
    },
  ]

  for (const {username, password, expectedMessage} of loginScenarios) {
    test(`Login with username: ${username}, password: ${password}`, async ({
      page,
    }) => {
      await page.goto('https://www.saucedemo.com/')

      await page.fill('#user-name', username)  // this type of action is deprecated. please follow my playwright presentation in the "Actions Subject". (Deprecated means that this way of doing an action is not in use anymore).
      await page.fill('#password', password) // Same here
      await page.locator('#login-button').click()

      const errorMessage = await page // This is clearly now what i taught in the class. font use chatgpt anymore.
        .locator('.error-message-container')
        .textContent()
      expect(errorMessage).toBe(expectedMessage) // toBe is validation for Jest framework. this is not a playwright assertion.
    })
  }
})
