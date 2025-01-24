const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createNote } = require('./helper')

describe('Note app', () => {
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

  test('front page can be opened', async ({ page }) => {
    const locator = await page.getByText('Note App')
    await expect(locator).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
  })
  
  test('login fails with wrong password', async ({ page }) => {
    await loginWith(page, 'wronguser', 'wrongpswd')
    const errorDiv = await page.locator('.error')
    await expect(errorDiv).toContainText('invalid usr or psw')
    await expect(page.getByText('Logout')).not.toBeVisible()
  })

  test('user can login', async ({ page }) => {    
    await loginWith(page, 'testuser', 'testpswd')
    await expect(page.getByText('Logout')).toBeVisible()
  })

  describe('when logged in', () => {
    beforeEach(async({ page }) => {
      await loginWith(page, 'testuser', 'testpswd')
    })
    
    test('a new note can be created', async ({ page }) => {
      await createNote(page, 'a note created by playwright')
      await expect(page.getByText('a note created by playwright')).toBeVisible()
    })

    describe('and several notes exists', () => {
      beforeEach(async ({ page }) => {
        await createNote(page, 'first note')      
        await createNote(page, 'second note')    
        await createNote(page, 'third note')
      })
  
      test('importance can be changed', async ({ page }) => {
        await page.pause()
        const otherNoteText = await page.getByText('second note')  
        const otherNoteElement = await otherNoteText.locator('..') // fn locator allow us to use Xpath selector to get access to the parent of an element

        await otherNoteElement.getByRole('button', { name: 'make important' }).click()
        await expect(otherNoteElement.getByText('make not important')).toBeVisible()
      })
    })
  })

})