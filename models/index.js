// This models/index.js file aggregates the Thought and User models and exports them for use in thoughtController.js, userController.js and seed.js

const User = require('./User');
const Thought = require('./Thought');

module.exports = { User, Thought };
