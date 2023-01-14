// thoughtText
//     String
//     Required
//     Must be between 1 and 280 characters

// createdAt
//     Date
//     Set default value to the current timestamp
//     Use a getter method to format the timestamp on query

// username (The user that created this thought)
//     String
//     Required

// reactions (These are like replies)
//     Array of nested documents created with the reactionSchema


const { Schema, model } = require('mongoose');


const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min: 1,
            max: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [Reaction],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought