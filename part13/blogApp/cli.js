import 'dotenv/config'
import { Sequelize, QueryTypes } from 'sequelize'

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? { // Option to detect if is necessary to use SSL
      require: true,
      rejectUnauthorized: false
    } : false
  },
})

const main = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')

    const blogs = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT });
    if (blogs.length > 0) {
      blogs.forEach(blog => 
        console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`))
    }
    
    sequelize.close()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

main()
