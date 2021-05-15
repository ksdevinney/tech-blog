// starter code from class
const router = require('express').Router();
const apiRoutes = require('./api/');
const blogRoutes = require('./blogRoutes');
const adminRoutes = require('./adminRoutes');

router.use('/dashboard', adminRoutes);
router.use('/api', apiRoutes);
router.use('/posts', blogRoutes);

module.exports = router;