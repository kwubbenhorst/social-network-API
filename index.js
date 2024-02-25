// This index.js file is the main entry point for the application.
// It sets up Express server, connects to the database, and defines middleware.
// It calls the seedDatabase function to populate the database with initial data and starts the server after seeding is complete.

const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const moment = require('moment');
const seedDatabase = require('./utils/seed'); 

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Call the seedDatabase function with a callback to start the server after seeding
// This approach with callback (see invokation of the callback at bottom of seed.js script) was a bug fix. Initially the code I had started the server immediately after calling seedDatabase(), but that caused the asynchronous nature of the seeding to interfere with the server connection. This fix adds a callback to the seedDatabase function in seed.js and calls it once the seeding is complete, ensuring that the server does not start until the seeding process is fully done.
seedDatabase(() => {
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
  });
});
