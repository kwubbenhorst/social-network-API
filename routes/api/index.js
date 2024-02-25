// This routes/api/index.js file is the entry-point file for defining API-specific routes.
// It imports the userRoutes and thoughtRoutes, sets up the main API router and directs requests to '/api/users' to userRoutes and '/api/thoughts' to thoughtRoutes.

const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;
