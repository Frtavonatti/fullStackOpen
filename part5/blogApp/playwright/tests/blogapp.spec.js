const { test, describe, beforeEach, expect } = require('@playwright/test');
const { loginWith, createBlog } = require('./helper');
const exp = require('constants');

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

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'testuser', 'testpswd')
      await createBlog(page, 'new blog created from playwright', 'testuser')
    })
  
    test('a new blog can be created', async ({ page }) => {
      await expect(page.getByText('new blog created from playwright')).toBeVisible()
    })

    test('its possible to give blogs a like', async ({ page }) => {
      await page.getByText('👍').click()
      await page.getByText('Show').click()
      await expect(page.getByText('Likes: 1')).toBeVisible()
    })

    test.only('its possible to delete them', async ({ page }) => {
      page.on('dialog', dialog => dialog.accept()) // window.confirm handling
      await page.getByRole('button', {name: 'Delete'}).click()
      await expect(page.getByText('Blog deleted successfully')).toBeVisible() // its going to be visible only for 3 secs
      await expect(page.getByText('blog to be edited')).not.toBeVisible()
    })
  })

})
