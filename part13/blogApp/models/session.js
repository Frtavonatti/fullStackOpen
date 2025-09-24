import { Model, DataTypes } from "sequelize";
import { sequelize } from "../utils/db.js";

class Session extends Model {}

Session.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
}, {
  sequelize,
  underscored: true,
  modelName: "session"
})

export default Session