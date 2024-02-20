// This file defines the business logic (functions) for handling various thought-related operations (getAllThoughts, getThoughtById, createThought, updateThought, deleteThought). There are also functions here which create a reaction to a thought and delete a reaction to a thought by its _id. The reaction schema is a subdocument schema of the Thought model. Each function corresponds to a specific end point. End points are defined in routes/api/thoughtRoutes.js
// Applications that use the MongoDB driver directly should require in ObjectId here because it is needed if you want to query or manipulate documents based on their _id, each _id for documents being of type ObjectId by default. However in Mongoose the conversion between string and ObjectId when querying documents by _id happens automatically, so we are not requiring in ObjectId here 
const { Thought, User } = require('../models');

module.exports = {
  // Get all thoughts
  async getAllThoughts(req, res) {
    try {
      // const thoughts = await Thought.find()
      // .populate({
      //   path: 'username',
      //   select: 'username',
      // })
      // .populate({
      //   path: 'reactions',
      //   select: 'reactionBody username createdAt',
      // });
      const thoughts = await Thought.find()
       .populate({
          path: 'reactions',
          select: 'reactionBody username createdAt',
      });
  return res.json(thoughts);
      // Fetch usernames separately
      // const usernames = await User.find({}, 'username');
  
      // // Map usernames to thoughts
      // const thoughtsWithUsernames = thoughts.map((thought) => {
      //   const reactionsWithUsernames = thought.reactions.map((reaction) => {
      //     const { username } = usernames.find((user) => user.id === reaction.username);
      //     return { ...reaction.toObject(), username };
      //   });
  
      //   return {
      //     ...thought.toObject(),
      //     reactions: reactionsWithUsernames,
      //   };
      // });
      // res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a single thought document by its _id
  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
      .populate({
        path: 'username',
        select: 'username',
      })
      .populate({
        path: 'reactions',
        select: 'reactionBody username createdAt',
      });
      
        if (!thought) {
          return res.status(404).json({ message: 'No thought with that ID' });
        }

          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
  },

  // Create (POST) a new thought
  async createThought(req, res) {
  try {
    // Check if the user exists
    const existingUser = await User.findOne({ username: req.body.username });

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create the thought
    const thought = await Thought.create(req.body);

    // Add thought to the associated user's thoughts array field
    const updatedUser = await User.findOneAndUpdate(
      { _id: existingUser._id },
      { $addToSet: { thoughts: thought._id } },
      { new: true }
    );

    res.json(thought);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
},


  // Update (PUT) a thought document by its _id
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { 
          runValidators: true, 
          new: true 
        } 
      );
      if (!thought) {
        res.status(404).json({ message: 'No thought with this ID' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Remove (DELETE) a thought document by its _id
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
      if (!thought) {
        res.status(404).json({ message: 'No thought with this ID' });
      }
      // Remove the thought from the associated user's thoughts array field
      await User.findOneAndUpdate(
        { _id: thought.userId },
        { $pull: { thoughts: thought._id } }
      );
      res.json({ message: 'Thought and associated user reference deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //FUNCTIONS RELATING THE REACTION SCHEMA WHICH IS A SUBDOCUMENT SCHEMA ON THE THOUGHT MODEL

  // Create (POST) a reaction for a thought
  async createReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { new: true }
      );
      if (!thought) {
        res.status(404).json({ message: 'No thought with this ID' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Remove (DELETE) a reaction from a thought by its reactionId
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );
      if (!thought) {
        res.status(404).json({ message: 'No thought with this ID' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};