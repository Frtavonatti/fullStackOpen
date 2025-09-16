import { sequelize } from "../utils/db.js"

async function dropTables() {
  await sequelize.getQueryInterface().dropAllTables()
  // await sequelize.getQueryInterface().dropTable('blogs')
  // await sequelize.getQueryInterface().dropTable('users')
  console.log('Tables dropped');
  await sequelize.close()
}

dropTables()