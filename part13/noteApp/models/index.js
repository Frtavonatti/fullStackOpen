import Note from "./note.js";
import User from "./user.js";

// Define associations
User.hasMany(Note)
Note.belongsTo(User)

// Sync models with the database
Note.sync({ alter: true }) // Use { alter: true } to update the table to match the model
User.sync({ alter: true })

export {
  Note, User
}