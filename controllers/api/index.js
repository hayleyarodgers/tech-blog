/* This file specifies the paths for all api routes */

// Import express and create a new router module
const router = require('express').Router();

// User routes
const userRoutes = require('./userRoutes');
router.use('/user', userRoutes);

// Post routes
const postRoutes = require('./postRoutes');
router.use('/post', postRoutes);

// Comment routes
const commentRoutes = require('./commentRoutes');
router.use('/comment', commentRoutes);

// Export router module
module.exports = router;
