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
      defaultValue: new Date().getFullYear()
    },
    user_id: { 
      type: DataTypes.INTEGER, // Sync with migration
      allowNull: false,
    },
  }, {
    sequelize,
    underscored: true,
    // timestamps: false,
    modelName: 'blog',
  }
)

export default Blog