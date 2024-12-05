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
  
  // await page.getByText(title, author).waitFor()
  await page.waitForSelector(`text=${title}`) // Esperar a que el nuevo blog aparezca en la página
}

const clickAmmount = (locator, ammountOfClicks) => {
  for (let index = 0; index < ammountOfClicks; index++) {
    locator.click()
  }
}

export { loginWith, createBlog, clickAmmount }