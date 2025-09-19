import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../utils/db.js'

class Blog extends Model {}

Blog.init(
  {
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
    year: {
      type: DataTypes.INTEGER, // Sync with migration
      defaultValue: new Date().getFullYear(),
      validate: {
        min: 1991,
        max: 2025
      }
    },
  }, {
    sequelize,
    underscored: true,
    modelName: 'blog',
  }
)

export default Blog