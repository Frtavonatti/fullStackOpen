import supertest from 'supertest'
import { describe, it, before, beforeEach, after } from 'node:test'

import app from '../index.js'
import { sequelize } from '../utils/db.js'
import { Session, User, Blog } from '../models/index.js'

const api = supertest(app)

let token
let user

before(async () => {
  // Create a test user
  user = await User.create({ username: 'sessionuser@mail.com', name: 'Session User', password: 'secret' })
})

beforeEach(async () => {
  // Clean up blogs before each test
  await Blog.destroy({ where: {} })
})

after(async () => {
  // Clean up sessions and users, then close the DB connection
  await Session.destroy({ where: {} })
  await User.destroy({ where: {} })
  await sequelize.close()
})

describe('Server-side session functionality', () => {
  it('should create a session and allow access with a valid token', async () => {
    // Login to get token and create session
    const loginRes = await api
      .post('/api/login')
      .send({ username: 'sessionuser@mail.com', password: 'secret' })
      .expect(200)

    token = loginRes.body.token

    // Access a protected route
    const res = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Session Blog', author: 'Session', url: 'http://session.com', year: 2020 })

    if (res.status !== 201) throw new Error('Should allow access with valid session')
  })

  it('should not allow access if the session is inactive even with a valid token', async () => {
    // Mark the session as inactive
    await Session.update({ active: false }, { where: { token } })

    // Try to access a protected route
    const res = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Edge Blog', author: 'Edge', url: 'http://edge.com', year: 2020 })

    if (res.status !== 401) throw new Error('Should not allow access with inactive session')
    if (res.body.error !== 'session is inactive') throw new Error('Error message should be "session is inactive"')
  })
})
