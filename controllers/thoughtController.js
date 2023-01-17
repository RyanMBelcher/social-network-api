const { Thought, User } = require('../models');


module.exports = {
    // gets all thoughts
    async getThoughts(req, res) {
        try {
            const thought = await Thought.find();
            return res.json(thought);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // gets a single thought by id
    async getSingleThought(req, res) {
        try {
            const singleThought = await Thought.findOne({ _id: req.params.thoughtId });
            return !singleThought
                ? res.status(404).json({ message: 'No thought with this id!' })
                : res.json(singleThought);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // creates a new thought 
    async createThought(req, res) {
        try {
            const thoughtCreate = await Thought.create(req.body);
            const thoughtUser = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thoughtCreate._id } },
                { new: true }
            )
            return res.json(thoughtUser);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // updates a thought by id
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

    // removes a though by id
    async deleteThought(req, res) {
        try {
            const thoughtDelete = await Thought.findOneAndRemove({ _id: req.params.thoughtId });
            return res.json(thoughtDelete);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // creates a reaction
    async addReaction(req, res) {
        try {
            const reactionAdd = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            )
            return !reactionAdd
                ? res.status(404).json({ message: 'No thought with this id!' })
                : res.json(reactionAdd)
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // removes a reaction
    async removeReaction(req, res) {
        try {
            const reactionRemove = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            )
            return !reactionRemove
                ? res.status(404).json({ message: 'No reaction with this id!' })
                : res.status(200).json(reactionRemove)
        } catch (error) {
            return res.status(500).json(error);
        }
    }
};