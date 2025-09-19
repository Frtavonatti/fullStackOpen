import { Model, DataTypes } from "sequelize"

import { sequelize } from '../utils/db.js'

class Reading_List extends Model {}

Reading_List.init({
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
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'user', key: 'id' }
  },
  blogId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'blog', key: 'id' }
  }
}, {
  sequelize,
  underscored: true,
  modelName: 'reading_list',
  freezeTableName: true,
})

export default Reading_List