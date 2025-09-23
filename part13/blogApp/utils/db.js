import { Sequelize } from 'sequelize'
import { SequelizeStorage, Umzug } from 'umzug'
import { DATABASE_URL } from './config.js'

export const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? { // Option to detect if is necessary to use SSL
      require: true,
      rejectUnauthorized: false
    } : false
  },
})

const migrationConf = {
  migrations: {
    glob: 'migrations/*.js'
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
}

export const runMigrations = async () => {
  const migrator = new Umzug(migrationConf)
  const migrations = await migrator.up()
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name) 
  })
}

export const runLatestMigration = async () => {
  const migrator = new Umzug(migrationConf)
  const [migration] = await migrator.up({ step: 1 })
  if (migration) {
    console.log('Ran migration:', migration.name)
  } else {
    console.log('No pending migrations.')
  }
}

export const rollBackMigrations = async () => {
  await sequelize.authenticate()
  const migrator = new Umzug(migrationConf)
  await migrator.down()
}

export const connectToDatabase = async () => {
  await sequelize.authenticate()
  console.log('Connected to the database')
  // await runMigrations()
}