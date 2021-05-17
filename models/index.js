// from mini-project starter code
const User = require('./User');
const Post = require('./post');
const Comment = require('./comment');

Post.hasMany(Comment, {
  foreignKey: 'postId',
  onDelete: 'CASCADE'
})

Post.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

module.exports = { User, Post, Comment };
