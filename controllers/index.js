// starter code from class
const router = require('express').Router();
const apiRoutes = require('./api');
const blogRoutes = require('./blogRoutes');

// router.use('/', adminRoutes);
router.use('/api', apiRoutes);
router.use('/api/posts', blogRoutes);

module.exports = router;