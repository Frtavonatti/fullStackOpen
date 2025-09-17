import { sequelize } from '../utils/db.js'
import { User, Blog } from '../models/index.js'

const seed = async () => {
  // await sequelize.sync({ force: true })
  const now = new Date()

  const user = await User.create({
    name: 'Alice Example',
    username: 'alice@example.com',
    created_at: now,
    updated_at: now
  })

  await Blog.create({
    author: 'Alice Example',
    url: 'https://example.com/blog1',
    title: 'First Blog Post',
    likes: 10,
    year: 2000,
    userId: user.dataValues.id,  // Cambiado de user_id a userId
    created_at: now,
    updated_at: now
  })

  await Blog.create({
    author: 'Alice Example',
    url: 'https://example.com/blog2',
    title: 'Second Blog Post',
    likes: 5,
    year: 1991,
    userId: user.dataValues.id,  // Cambiado de user_id a userId
    created_at: now,
    updated_at: now
  })

  console.log('Seed completed')
  await sequelize.close()
}

seed()