// This file specifies the paths for api vs non-api routes

//
const router = require('express').Router();

// If route path contains /api, go to api folder
const apiRoutes = require('./api');
router.use('/api', apiRoutes);

// If route path doesn't contain /api, use homeRoutes file
const homeRoutes = require('./homeRoutes');
router.use('/', homeRoutes);

module.exports = router;
