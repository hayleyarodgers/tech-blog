// This file specifies the relationships between the User, Post and Comment tables

// Import tables
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

/* Relationship between users and posts */

// A user can have many posts
User.hasMany(Post, {
	foreignKey: 'user_id',
	onDelete: 'CASCADE',
});

// A post belongs to a single user
Post.belongsTo(User, {
	foreignKey: 'user_id',
});

/* Relationship between users and comments */

// A user can make many comments
User.hasMany(Comment, {
	foreignKey: 'user_id',
	onDelete: 'CASCADE',
});

// A comment belongs to a single user
Comment.belongsTo(User, {
	foreignKey: 'user_id',
});

/* Relationship between posts and comments */

// A post can have many comments
Post.hasMany(Comment, {
	foreignKey: 'post_id',
	onDelete: 'CASCADE',
});

// A comment belongs to a single post
Comment.belongsTo(Post, {
	foreignKey: 'post_id',
});

module.exports = { User, Post, Comment };
