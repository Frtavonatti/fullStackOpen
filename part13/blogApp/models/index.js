import Blog from "./blog.js"
import User from "./user.js"
import Reading_List from "./readingList.js"
import Session from "./session.js"

// Define associations between models
User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: Reading_List, as: 'readings' })
Blog.belongsToMany(User, { through: Reading_List, as: 'user_reading' })

User.hasMany(Session)
Session.belongsTo(User)

// Synchronize models with the database
// Blog.sync({ alter: true })
// User.sync({ alter: true })

export {
  Blog,
  User,
  Reading_List,
  Session
}