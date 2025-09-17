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
      // validate: { isEmail: true }  // This doesnt work on migrations
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  })

  await queryInterface.sequelize.query(`
    ALTER TABLE users
    ADD CONSTRAINT username_email_check
    CHECK (username ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$')
  `)

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
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE' // or 'SET NULL' if you want to keep blogs
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    }
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

  // ####################################################
  // ####################################################
  // await queryInterface.addColumn('blogs', 'user_id', {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   references: { model: 'users', key: 'id' }
  // })

  // NOTE: We define foreign key columns directly in createTable instead of addColumn because:
  // 1. More robust: Everything executes in a single transaction
  // 2. Avoids consistency issues that can occur when adding FKs after table creation
  // 3. Ensures relationships are properly established before data insertion

  // While addColumn works for simple columns, it can be problematic with foreign keys
  // due to how database engines handle constraint validation during schema changes.

  // In the model layer, thanks to Blog.belongsTo(User) and underscored: true,
  // we use "userId" in JavaScript but it maps to "user_id" in the database.
}

export async function down({ context: queryInterface }) {
  await queryInterface.dropTable('blogs');
  await queryInterface.dropTable('users');
}