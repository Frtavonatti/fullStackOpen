import { DataTypes } from "sequelize";

export async function up({ context: queryInterface }) {
  await queryInterface.createTable('users', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      // validate: { // This doesnt work on migrations
      //   isEmail: true,
      // }
    },
  })

  await queryInterface.sequelize.query(`
    ALTER TABLE users
    ADD CONSTRAINT username_email_check
    CHECK (username ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$')
  `)

  await queryInterface.addColumn('users', 'created_at', {
    type: DataTypes.DATE,
    allowNull: false,
  })

  await queryInterface.addColumn('users', 'updated_at', {
    type: DataTypes.DATE,
    allowNull: false,
  })

  await queryInterface.createTable('blogs', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    }
  })

  await queryInterface.addColumn('blogs', 'created_at', {
    type: DataTypes.DATE,
    allowNull: false,
  })

  await queryInterface.addColumn('blogs', 'updated_at', {
    type: DataTypes.DATE,
    allowNull: false,
  })

  await queryInterface.addColumn('blogs', 'user_id', {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' }
  })

  await queryInterface.addColumn('blogs', 'year', {
    type: DataTypes.INTEGER,
  })

  await queryInterface.sequelize.query(`
     ALTER TABLE blogs
     ADD CONSTRAINT year_range_check
     CHECK (year >= 1991 AND year <= 2025)
  `)

  // await queryInterface.addConstraint('blogs', { // This doesnt work on migrations
  //   fields: ['year'],
  //   type: 'check',
  //   where: {
  //     year: {
  //       [Op.gte]: 1991,
  //       [Op.lte]: 2025
  //     }
  //   }
  // })
}

export async function down({ context: queryInterface }) {
  await queryInterface.dropTable('users');
  await queryInterface.dropTable('blogs');
}