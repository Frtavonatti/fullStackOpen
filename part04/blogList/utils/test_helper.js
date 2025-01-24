const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcryptjs')

const User = require('../models/user')

const getAuthToken = async (username, password) => {
  const loginResponse = await api
    .post('/api/login')
    .send({ username: 'testuser', password: 'password' })
    .expect(200)
    .expect('Content-Type', /application\/json/)

  return loginResponse.body.token
}

const createTestUser = async () => {
  const passwordHash = await bcrypt.hash('password', 10)
  const user = new User({ username: 'testuser', passwordHash })
  await user.save()
}

module.exports = { getAuthToken, createTestUser }