const loginWith = async (page, username, password)  => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createNote = async (page, text) => {
  await page.getByRole('button', { name: 'Create new note' }).click()
  await page.getByRole('textbox').fill(text)
  await page.getByRole('button', { name: 'save' }).click()
  await page.getByText(text).waitFor()
}

export { loginWith, createNote }