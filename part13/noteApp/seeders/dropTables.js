import { sequelize } from '../utils/db.js'

async function dropTables() {
  await sequelize.getQueryInterface().dropTable('notes')
  await sequelize.getQueryInterface().dropTable('users')
  await sequelize.getQueryInterface().dropTable('migrations')
  console.log('Tables dropped!')
  await sequelize.close()
}

dropTables()