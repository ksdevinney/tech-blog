// starter code from class
const router = require('express').Router();
const adminRoutes = require('./adminRoutes.js');
const blogRoutes = require('./blogRoutes.js');
const apiRoutes = require('./api/');

router.use(adminRoutes);
router.use('/posts', blogRoutes);
router.use('/api', apiRoutes);

module.exports = router;