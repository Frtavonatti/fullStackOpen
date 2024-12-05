const { test, describe, beforeEach, expect } = require('@playwright/test');
const { loginWith, createBlog, clickAmmount } = require('./helper');

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

    test('if user its the creator its possible to delete them', async ({ page }) => {
      page.on('dialog', dialog => dialog.accept()) // window.confirm handling
      await page.getByRole('button', {name: 'Delete'}).click()
      await expect(page.getByText('Blog deleted successfully')).toBeVisible() // its going to be visible only for 3 secs
      await expect(page.getByText('blog to be edited')).not.toBeVisible()
    })

    describe('When multiple blogs exists', () => {
      beforeEach(async ({ page })=> {
        await createBlog(page, 'new blog 2', 'testuser')
        await createBlog(page, 'new blog 3', 'testuser')
        await createBlog(page, 'new blog 4', 'testuser')
      })

      test.only('blogs are ordered according to the ammount of likes they had', async ({ page }) => {
        await page.pause()
        const locator2LikeButton =  getByRole('button', { name: '👍' }).nth(1)
        clickAmmount(locator2LikeButton, 2)
        
        // await locator2.getByRole('button', {name: 'Show'}).click()
        getByRole('button', { name: 'Show' }).nth(1).click()

        const locator2 = page.getByText('new blog 2')
        expect(locator2.getByText('Likes: 2'))

        // const locator3 = page.getByText('new blog 3')
        // const locator3LikeButton =  getByRole('button', { name: '👍' }).nth(2)
        // clickAmmount(locator3LikeButton, 3)
        // await locator3.getByRole('button', {name: 'Show'}).click()
        // expect(locator3.getByText('Likes: 3'))
      })
    })
    
    
    describe('When user its not the creator', () => {
      beforeEach(async ({ request }) => {
        await request.post('/api/users', {
          data: {
            name: 'another',
            username: 'anotheruser',
            password: 'anotherpswd'
          }
        })
      })

      test('if user its not the creator, delete button its not visible', async ({ page, request }) => {
        await page.getByRole('button', {name: 'Logout'}).click()
        await loginWith(page, 'anotheruser', 'anotherpswd')
        const locator = page.getByRole('button', {name: 'Delete'})
        await expect(locator).not.toBeVisible()
      })
    })
  })
})
