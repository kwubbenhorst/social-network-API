// It might be considered a more modular approach to define the reaction subdocument schema in a separate file, but because it is closely tied to the Thought schema (its parent) and I don't think will be reused elsewhere in the code, I am going to define it here in Thought.js
const { Schema, model, Types } = require('mongoose');
const moment = require('moment'); // using moment to format dates

const reactionSchema = new Schema(
  {
    // Uses Mongoose's ObjectId data type. Default value is set to new ObjectId
    reactionId: { 
      type: Schema.Types.ObjectId, 
      default: () => new Types.ObjectId() 
    },
    reactionBody: { 
      type: String, 
      required: true,
      minlength: 1, // specs for reactionBody were to set maxlength only to 280 but it makes sense that if you want to constrain thoughts to having at least one character, you would also want to constrain reactions to have at least one character  
      maxlength: 280 
    },
    username: { 
      type: String, 
      required: true 
    },
    createdAt: { 
      type: Date, 
      default: () => moment().format('MMM D, YYYY [at] h:mm a'), // sets default value to current formatted timestamp
      get: (createdAt) => moment(createdAt).format('MMM D, YYYY [at] h:mm a') //applies a getter method to format the timestamp on query
    },
  },
  // setting that specifies how object is serialized to JSON, setting getters to true ensures that any getters, like the one formatting the timestamp, are applied when converting the document to JSON. id: false excludes the _id field from the JSON output
  {
    toJSON: { 
      getters: true 
    },
    id: false,
  }
);

const thoughtSchema = new Schema(
  {
    thoughtText: { 
      type: String, 
      required: true,
      minlength: 1, 
      maxlength: 280 
    },
    createdAt: { 
      type: Date, 
      default: Date.now, // sets default value to current formatted timestamp
      get: (createdAt) => moment(createdAt).format('MMM D, YYYY [at] h:mm a') //applies a getter method to format the timestamp on query
    },
    username: {  //the user who created this thought
      type: String, 
      required: true 
    },
    // like replies, will appear as an array of nested documents created with the reactionSchema (defined above)
    reactions: [reactionSchema],
});

// Explicit toJSON setting is not needed because Mongoose includes virtual properties by default in the JSON output when calling toJSON() on an object. I opted to define the virtual locally in Thought.js for the specific property rather than applying global virtuals settings because I know the default behaviour will cover it and because the virtual property (reactionCount) is closely tied to the Thought model, calculating the length of the reactions array.  
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
