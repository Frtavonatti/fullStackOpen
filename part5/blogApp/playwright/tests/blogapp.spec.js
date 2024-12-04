const { test, describe, beforeEach, expect } = require('@playwright/test');
const {loginWith} = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'tester',
        username: 'testuser',
        password: 'testpswd'
      }
    })
    await page.goto('/')
  })

  test('login form is shown', async ({ page }) => {
    const locator = await page.getByRole('button', {name: 'Login'})
    await expect(locator).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'testuser', 'testpswd')
      const locator = await page.getByText('Logged in: testuser')
      await expect(locator).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'wronguser', 'wrongpswd')
      const locator = await page.getByText('Logged in:')
      await expect(locator).not.toBeVisible()
    })
  })
  
})