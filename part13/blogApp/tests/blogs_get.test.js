import supertest from 'supertest'
import { describe, it, after } from 'node:test'

import app from '../index.js'
import { sequelize } from '../utils/db.js'

const api = supertest(app)

describe('GET /api/blogs', () => {
  it('should return an array of blogs', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    if (!Array.isArray(response.body)) {
      throw new Error('Response body is not an array')
    }
  })
})

// Close the DB connection after all tests
after(async () => {
  await sequelize.close()
})
