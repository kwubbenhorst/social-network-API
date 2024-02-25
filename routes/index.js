// This routes/index.js file is the entry-point file for routes. It imports the API routes and sets up the main router, directing requests to '/api' to the API routes and sending the message 'wrong route' for incorrect routes

const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => res.send('Wrong route!'));

module.exports = router;
