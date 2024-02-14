const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const moment = require('moment'); 

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

//Start the server
db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}!`);
    });
  });
