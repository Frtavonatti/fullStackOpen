import Blog from "./blog.js"
import User from "./user.js"
import Reading_List from "./readingList.js";

// Define associations between models
User.hasMany(Blog, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: Reading_List })
Blog.belongsToMany(User, { through: Reading_List })

// Synchronize models with the database
// Blog.sync({ alter: true })
// User.sync({ alter: true })

export {
  Blog,
  User,
  Reading_List
}