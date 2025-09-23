import { User, Blog, Reading_List } from '../models/index.js'
import { sequelize } from '../utils/db.js'

async function main() {
  await sequelize.sync({ force: true }) // Borra y recrea todas las tablas

  const alice = await User.create({
    name: 'Alice Example',
    username: 'alice@example.com'
  })

  const blogs = await Blog.bulkCreate([
    {
      author: 'Alice Example',
      url: 'https://example.com/blog1',
      title: 'First Blog Post',
      likes: 10,
      userId: alice.id,
      year: 2000
    },
    {
      author: 'Alice Example',
      url: 'https://example.com/blog2',
      title: 'Second Blog Post',
      likes: 5,
      userId: alice.id,
      year: 1991
    },
    {
      author: 'Tech Insights',
      url: 'https://techinsights.com/rest-apis-nodejs',
      title: 'Understanding REST APIs in Node.js',
      likes: 5,
      userId: alice.id,
      year: 2025
    }
  ])

  for (const blog of blogs.slice(0, 2)) {
    await Reading_List.create({
      userId: alice.id,
      blogId: blog.id,
      read: false
    })
  }

  await sequelize.close()
}

main().then(() => {
  console.log('Database populated successfully.')
}).catch((err) => {
  console.error('Error populating database:', err)
})