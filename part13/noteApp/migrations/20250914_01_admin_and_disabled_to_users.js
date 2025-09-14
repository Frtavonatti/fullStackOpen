import { DataTypes } from "sequelize";

export async function up({ context: queryInterface }) {
  await queryInterface.addColumn('users', 'admin', {
    type: DataTypes.BOOLEAN,
    default: false,
  })

  await queryInterface.addColumn('users', 'disabled', {
    type: DataTypes.BOOLEAN,
    default: false,
  })
}

export async function down({ context: queryInterface }) {
  await queryInterface.removeColumn('users', 'admin')
  await queryInterface.removeColumn('users', 'isActive', {
  })
}