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
  
  await page.getByText(title, author).waitFor() //validar si puede recibir 2 params
}

export { loginWith, createBlog }