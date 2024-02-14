// This file defines the business logic (functions) for handling various user-related operations (getAllUsers, getUserById, createUser, updateUser, deleteUser, addFriend, and removeFriend). Each function corresponds to a specific end point. End points are defined in routes/api/userRoutes.js
const { User, Thought } = require('../models');

module.exports = {
    // Get all users
    async getAllUsers(req, res) {
      try {
        const users = await User.find();
        res.json(users);
      } catch (err) {
        res.status(500).json(err);
      }
    },

    // Get a single user document by its _id, populated to include thought and friend data
    async getSingleUser(req, res) {
      try {
        const user = await User.findOne({ _id: req.params.userId })
          .populate({
            path: 'thoughts',
            select: '-__v',
          })
          .populate({
            path: 'friends',
            select: '-__v',
          });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },

    // Create (POST) a new user
    async createUser(req, res) {
        try {
          const user = await User.create(req.body);
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
    },

    // Update (PUT) a user document by its _id
    async updateUser(req, res) {
        try {
          const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
          );
    
          if (!user) {
            res.status(404).json({ message: 'No user with this ID' });
          }
    
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
    },

    // Remove (DELETE) a user document by its _id (and associated thoughts)
    async deleteUser(req, res) {
        try {
          const user = await User.findOneAndDelete({ _id: req.params.userId });
    
          if (!user) {
            res.status(404).json({ message: 'No user with this ID' });
          }
    
          // Delete associated thoughts
          await Thought.deleteMany({ username: user.username });
    
          res.json({ message: 'User and associated thoughts deleted!' });
        } catch (err) {
          res.status(500).json(err);
        }
    },
    
    // Add a new friend to a user's friend list
    async addFriend(req, res) {
        try {
          const userId = req.params.userId;
          const friendId = req.params.friendId;
    
          // Check if the user and friend exist
          const [user, friend] = await Promise.all([
            User.findById(userId),
            User.findById(friendId),
          ]);
    
          if (!user || !friend) {
            return res.status(404).json({ message: 'User or friend not found' });
          }
    
          // Given a user and friend that are both in user collection, add friend to user's friend list
          user.friends.push(friendId);
          await user.save();
    
          res.json(user);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    
    // Remove a friend from a user's friend list
    async removeFriend(req, res) {
        try {
          const userId = req.params.userId;
          const friendId = req.params.friendId;
    
          // Check if the user exists
          const user = await User.findById(userId);
    
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
    
          // Given a user that exists, remove friend from user's friend list
          user.friends.pull(friendId);
          await user.save();
    
          res.json(user);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

