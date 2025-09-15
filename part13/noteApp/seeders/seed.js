import { sequelize } from '../utils/db.js'
import User from '../models/user.js'
import Note from '../models/note.js'

async function seed() {
  // await sequelize.sync({ force: true })

  const user = await User.create({
    username: 'testuser',
    name: 'Test User',
    admin: true,
    disabled: false
  })

  // const user = await User.findOne({ 
  //   where: { username: 'testuser' } 
  // })

  await Note.bulkCreate([
    {
      content: 'Learn advanced psql commands for better productivity.',
      important: false,
      date: new Date(),
      user_id: user.dataValues.id
    },
    {
      content: 'Remember to backup your database regularly.',
      important: true,
      date: new Date(),
      user_id: user.dataValues.id
    }
  ])

  console.log('Seed completed!')
  await sequelize.close()
}

seed()