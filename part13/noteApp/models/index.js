import Note from "./note.js";
import User from "./user.js";

// Define associations
User.hasMany(Note, { foreignKey: 'user_id' })
Note.belongsTo(User, { foreignKey: 'user_id' })

// No sync needed - migrations handle database schema
// Note.sync({ alter: true }) // this updates the table to match the model
// User.sync({ alter: true })

export {
  Note, User
}