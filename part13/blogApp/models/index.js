import Blog from "./blog.js"
import User from "./user.js"

// Define associations between models
User.hasMany(Blog, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

Blog.belongsTo(User);

// Synchronize models with the database
// Blog.sync({ alter: true })
// User.sync({ alter: true })

export {
  Blog,
  User
}