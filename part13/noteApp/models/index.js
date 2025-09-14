import Note from "./note.js";
import User from "./user.js";

// Define associations
User.hasMany(Note)
Note.belongsTo(User)

// No sync needed - migrations handle database schema
// Note.sync({ alter: true }) // this updates the table to match the model
// User.sync({ alter: true })

export {
  Note, User
}