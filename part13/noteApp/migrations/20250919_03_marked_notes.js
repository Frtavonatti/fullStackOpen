import { DataTypes } from "sequelize";

export async function up({ context: queryInterface }) {
  await queryInterface.createTable('user_notes', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    },
    note_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'notes', key: 'id' }
    }
  }) 
}

export async function down ({ context: queryInterface }) {
  await queryInterface.dropTable('user_notes')
}