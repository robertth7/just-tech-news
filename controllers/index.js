const router = require('express').Router();
// require 'home-routes.js'
const homeRoutes = require('./home-routes');
const apiRoutes = require('./api');


router.use('/api', apiRoutes);

// use 'homeRoutes'
router.use('/', homeRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;