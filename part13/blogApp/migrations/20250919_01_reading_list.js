import { DataTypes } from "sequelize";

export async function up ({ context: queryInterface }) {
  await queryInterface.createTable('reading_list', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    },
    blog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'blogs', key: 'id' }
    }
  })
}

export async function down({ context: queryInterface }) {
  await queryInterface.dropTable('reading_list')
}