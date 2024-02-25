const { connect, connection } = require('mongoose');

// Leaving it flexible in case I want to create a front end and deploy later. Meanwhile the || option will connect the server locally 
const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/thought_share_db';

connect(connectionString);

// The connection defined here is exported and required in by index.js
module.exports = connection;