import { User, Blog, Reading_List } from '../models/index.js'
import { sequelize } from '../utils/db.js'

async function main() {
  await sequelize.sync({ force: true })

  // Users
  const alice = await User.create({
    id: 1,
    name: 'Alice Example',
    username: 'alice@example.com',
    createdAt: '2025-09-19T22:03:38.449Z',
    updatedAt: '2025-09-20T20:13:42.468Z'
  })

  const user2 = await User.create({
    id: 2,
    name: 'updated',
    username: 'user2@mail.com',
    createdAt: '2025-09-20T10:43:01.842Z',
    updatedAt: '2025-09-20T20:13:59.275Z'
  })

  // Blogs
  const blog1 = await Blog.create({
    id: 1,
    author: 'Alice Example',
    url: 'https://example.com/blog1',
    title: 'First Blog Post',
    likes: 10,
    year: 2000,
    userId: alice.id,
    createdAt: '2025-09-19T22:03:38.457Z',
    updatedAt: '2025-09-19T22:03:38.457Z'
  })

  const blog2 = await Blog.create({
    id: 2,
    author: 'Alice Example',
    url: 'https://example.com/blog2',
    title: 'Second Blog Post',
    likes: 5,
    year: 1991,
    userId: alice.id,
    createdAt: '2025-09-19T22:03:38.457Z',
    updatedAt: '2025-09-19T22:03:38.457Z'
  })

  const blog3 = await Blog.create({
    id: 3,
    author: 'Tech Insights',
    url: 'https://techinsights.com/rest-apis-nodejs',
    title: 'Understanding REST APIs in Node.js',
    likes: 5,
    year: 2025,
    userId: alice.id,
    createdAt: '2025-09-19T22:03:38.457Z',
    updatedAt: '2025-09-19T22:03:38.457Z'
  })

  // Reading List
  await Reading_List.bulkCreate([
    {
      id: 1,
      read: true,
      userId: 1,
      blogId: 1,
      createdAt: '2025-09-19T22:03:38.462Z',
      updatedAt: '2025-09-20T20:54:47.857Z'
    },
    {
      id: 2,
      read: false,
      userId: 1,
      blogId: 2,
      createdAt: '2025-09-19T22:03:38.466Z',
      updatedAt: '2025-09-19T22:03:38.466Z'
    },
    {
      id: 3,
      read: false,
      userId: 2,
      blogId: 1,
      createdAt: '2025-09-20T10:44:21.470Z',
      updatedAt: '2025-09-20T10:44:21.470Z'
    },
    {
      id: 4,
      read: false,
      userId: 2,
      blogId: 2,
      createdAt: '2025-09-20T10:45:22.458Z',
      updatedAt: '2025-09-20T10:45:22.458Z'
    },
    {
      id: 8,
      read: true,
      userId: 2,
      blogId: 3,
      createdAt: '2025-09-20T10:54:52.806Z',
      updatedAt: '2025-09-20T10:54:52.806Z'
    }
  ])

  await sequelize.close()
}

main().then(() => {
  console.log('Database replicated successfully.')
}).catch((err) => {
  console.error('Error replicating database:', err)
})
