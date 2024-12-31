const loginWith = async (page, username, password) => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', {name: 'Login'}).click()
} 

const createBlog = async (page, title, author) => {
  await page.getByRole('button', {name: 'Create new Blog'}).click()
  await page.getByRole('textbox', {name:'title'}).fill(title)
  await page.getByRole('textbox', {name:'author'}).fill(author)
  await page.getByRole('button', {name: 'Create'}).click()
  await page.waitForSelector(`text=${title}`) // Wait for the new blog to appear on the page
}

const clickAmount = async (page, locator, amountOfClicks) => {
  for (let index = 0; index < amountOfClicks; index++) {
    await locator.waitFor({ state: 'visible' })
    await locator.click()
    await page.waitForTimeout(100) 
  }
}

const likeAndShowBlog = async (page, text, likes) => {
  const blogTitle = await page.getByText(text)
  const blogContainer = await blogTitle.locator('..').locator('..')
  
  await blogContainer.getByRole('button', {name: 'Show'}).click()
  const button = await blogContainer.locator('.blog-actions button:has-text("👍")')
  await clickAmount(page, button, likes)
}

export { loginWith, createBlog, likeAndShowBlog }