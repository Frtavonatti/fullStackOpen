import Blog from "./blog.js"
import User from "./user.js"

// Define associations between models
Blog.belongsTo(User)
User.hasMany(Blog)

// Synchronize models with the database
Blog.sync({ alter: true })
User.sync({ alter: true })

export {
  Blog,
  User
}