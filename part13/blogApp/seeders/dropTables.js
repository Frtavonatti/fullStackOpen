import { sequelize } from "../utils/db.js"

async function dropTables() {
  await sequelize.getQueryInterface().dropAllTables()
  console.log('Tables dropped');
  await sequelize.close()
}

dropTables()