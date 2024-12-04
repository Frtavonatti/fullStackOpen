const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Note app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('front page can be opened', async ({ page }) => {
    const locator = await page.getByText('Note App')
    await expect(locator).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
  })

  test('user can login', async ({ page }) => {    
    // await page.getByRole('textbox').first().fill('testing auth')
    // await page.getByRole('textbox').last().fill('passwd')

    // const textboxes = await page.getByRole('textbox').all()    
    // await textboxes[0].fill('testing auth')    
    // await textboxes[1].fill('passwd')

    // This way they do not depend on a specific order within the page
    await page.getByTestId('username').fill('testing auth')
    await page.getByTestId('password').fill('passwd')
    await page.getByRole('button', { name: 'login' }).click()
  
    await expect(page.getByText('Logout')).toBeVisible()
  })

  describe('when logged in', () => {
    beforeEach(async({ page }) => {
      await page.getByTestId('username').fill('testing auth')
      await page.getByTestId('password').fill('passwd')
      await page.getByRole('button', { name: 'login' }).click()
    })
    
    test('a new note can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'Create new note' }).click()
      await page.getByRole('textbox').fill('a note created by playwright')
      await page.getByRole('button', { name: 'save' }).click()
      await expect(page.getByText('a note created by playwright')).toBeVisible()
    })
  })
  
})