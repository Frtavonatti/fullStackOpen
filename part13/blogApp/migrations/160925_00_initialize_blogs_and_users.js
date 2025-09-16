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
      validate: {
        isEmail: true,
      }
    },
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
  })

  await queryInterface.addColumn('blogs', 'updated_at', {
    type: DataTypes.DATE,
  })

  await queryInterface.addColumn('blogs', 'user_id', {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' }
  })
}

export async function down({ context: queryInterface }) {
  await queryInterface.dropTable('users');
  await queryInterface.dropTable('blogs');
}