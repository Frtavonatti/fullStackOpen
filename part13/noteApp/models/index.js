import Note from "./note.js";
import User from "./user.js";
import Team from "./team.js";
import Membership from "./membership.js";

// Define associations
User.hasMany(Note, { foreignKey: 'user_id' })
Note.belongsTo(User, { foreignKey: 'user_id' })

User.belongsToMany(Team, { through: Membership })
Team.belongsToMany(User, { through: Membership })

// No sync needed - migrations handle database schema
// Note.sync({ alter: true })
// User.sync({ alter: true })

export {
  Note, User, Team, Membership
}