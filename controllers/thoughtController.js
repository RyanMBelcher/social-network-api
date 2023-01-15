// I believe in you

// getThoughts,
//  .find()
// getSingleThought,
//  .findOne()
// createThought,
// .create()
// updateThought,
// .findOneAndUpdate()
// deleteThought,
// .findOneAndRemove()
// addReaction,
// .findOneAndUpdate() ??? { $addToSet }
// removeReaction,
// .findOneAndUpdate() ??? { $pull }

const { Thought } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thought = await Thought.find();
            console.log(thought);
            return res.json(thought);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    async getSingleThought(req, res) {
        try {
            const singleThought = await Thought.findOne();
            return !singleThought
                ? res.status(404).json({ message: 'No thought with this id!' })
                : res.json(singleThought);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    async createThought(req, res) {
        try {
            const thoughtCreate = await Thought.create(req.body);
            return res.json(thoughtCreate);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
};