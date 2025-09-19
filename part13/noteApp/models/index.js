import Note from "./note.js";
import User from "./user.js";
import Team from "./team.js";
import Membership from "./membership.js";
import UserNotes from "./user_notes.js";

// Define associations
User.hasMany(Note, { foreignKey: 'user_id' })
Note.belongsTo(User, { foreignKey: 'user_id' })

User.belongsToMany(Team, { through: Membership })
Team.belongsToMany(User, { through: Membership })

User.belongsToMany(Note, { through: UserNotes, as: 'marked_notes' })
Note.belongsToMany(User, { through: UserNotes, as: 'users_marked' })

// No sync needed - migrations handle database schema
// Note.sync({ alter: true })
// User.sync({ alter: true })

export {
  Note, User, Team, Membership, UserNotes
}