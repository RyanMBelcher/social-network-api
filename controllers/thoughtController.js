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
    },

    // updateThought()

    async updateThought(req, res) {
        try {
            const thoughtUpdate = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            )
            return !thoughtUpdate
                ? res.status(404).json({ message: 'No thought this this id!' })
                : res.json(thoughtUpdate)
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // deleteThought()

    async deleteThought(req, res) {
        try {
            const thoughtDelete = await Thought.findOneAndRemove({ _id: req.params.userId });
            return res.json(thoughtDelete);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // addReaction

    async addReaction(req, res) {
        try {
            const reactionAdd = await Thought.findOneandUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            )
            return !reactionAdd
                ? res.status(404).json({ message: 'No thought with this id!' })
                : res.json(video)
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // removeReaction

    async removeReaction(req, res) {
        try {
            const reactionRemove = await Thought.findOneandUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            )
            return !reactionRemove
                ? res.status(404).json({ message: 'No reaction with this id!' })
                : res.json(video)
        } catch (error) {
            return res.status(500).json(error);
        }
    }
};