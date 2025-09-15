import { Model, DataTypes } from 'sequelize'

import { sequelize } from '../utils/db.js'

class Note extends Model {}

Note.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    important: {
      type: DataTypes.BOOLEAN,
    },
    date: {
      type: DataTypes.DATE,
    },
    user_id: { // This was not included on the original project
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true, // column names use snake_case (e.g., created_at instead of createdAt). Tablenames are the model name in plural (Note -> notes)
    timestamps: false, // disables automatic createdAt and updatedAt fields
    modelName: 'note', // sets the model name for sequelize
  }
)

export default Note