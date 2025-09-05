import { Sequelize } from 'sequelize'
import { DATABASE_URL } from './config.js'

export const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? { // Option to detect if is necessary to use SSL
      require: true,
      rejectUnauthorized: false
    } : false
  },
})

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('connected to the database')
  } catch (err) {
    console.log('failed to connect to the database')
    return process.exit(1)
  }

  return null
}