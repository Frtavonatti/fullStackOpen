import Blog from "./blog.js"
import User from "./user.js"
import Reading_List from "./readingList.js"

// Define associations between models
User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: Reading_List, as: 'readings' })
Blog.belongsToMany(User, { through: Reading_List, as: 'user_reading' })

// User.hasMany(Reading_List, { foreignKey: 'userId' })
// Reading_List.belongsTo(User, { foreignKey: 'userId' })

// Blog.hasMany(Reading_List, { foreignKey: 'blogId' })
// Reading_List.belongsTo(Blog, { foreignKey: 'blogId' })

// Synchronize models with the database
// Blog.sync({ alter: true })
// User.sync({ alter: true })

export {
  Blog,
  User,
  Reading_List
}