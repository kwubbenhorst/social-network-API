const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomUsername, getRandomThoughts } = require('./data');

const seedDatabase = async (callback) => {
  connection.on('error', (err) => err);

  connection.once('open', async () => {
    console.log('connected');

    // Delete the collections if they exist
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
      await connection.dropCollection('users');
    }

    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
      await connection.dropCollection('thoughts');
    }

    // Create an empty array to hold the users and thoughts
    const users = [];
    const thoughts = [];

    // Get the usernames array from data.js
    const usernames = [
      'DrPhil', 'KingCharles', 'GenghisKhan', 'JeanLucPicard', 'MrSnuffaluphagus', 'MisterRogers',
      'SherlockHolmes', 'AlbusDumbledore', 'HannibalLecter', 'DocOck', 'JamesBond', 'MissMoneypenny',
      'FriendlyGiant', 'BarenakedLady', 'PeppermintPatty', 'BarneyRubble', 'SnidleyWhiplash', 'FrodoBaggins',
      'AnonymousWombat', 'DiscreteDiva', 'HappyWanderer', 'JuliaChild', 'LittleMermaid', 'VillainousKitten'
    ];

    // Loop through the usernames array and add thoughts to the thoughts array
    for (let i = 0; i < usernames.length; i++) {
      const username = usernames[i];

      const userThoughts = getRandomThoughts(3);

      thoughts.push(...userThoughts);

      users.push({
        username: username,
        thoughts: userThoughts.map(thought => thought._id),
      });
    }

    // Add users to the collection and await the results
    await User.collection.insertMany(users);

    // Add thoughts to the collection and await the results
    await Thought.collection.insertMany(thoughts);

    // Log out the seed data to indicate what should appear in the database
    console.table(users);
    console.table(thoughts);
    console.info('Seeding complete! 🌱');

    // Invoke the callback to signal completion (adding a callback here was part of a bug fix. See note in index.js where the seedDatabase function is called.)
    if (typeof callback === 'function') {
      callback();
    }
  });
};

module.exports = seedDatabase;

  

