const router = require('express').Router();
// require 'home-routes.js'
const homeRoutes = require('./home-routes');
const dashboardRoutes = require('./dashboard-routes');
const apiRoutes = require('./api');


router.use('/api', apiRoutes);

// use 'homeRoutes'
router.use('/', homeRoutes);

// dashboard route
router.use('/dashboard', dashboardRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;