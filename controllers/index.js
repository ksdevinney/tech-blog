// starter code from class
const router = require('express').Router();
const apiRoutes = require('./api/');
const blogRoutes = require('./blogRoutes.js');
const adminRoutes = require('./adminRoutes.js');

router.use(adminRoutes);
router.use('/api', apiRoutes);
router.use('/posts', blogRoutes);

module.exports = router;