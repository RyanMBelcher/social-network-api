// You got this bro

// getUsers,
// .find()
// getSingleUser,
// .findOne()
// createUser,
// .create()
// deleteUser,
// .findOneAndRemove()
// addFriend,
// .findOneAndUpdate() ??? { $addToSet }
// removeFriend,
// .findOneAndUpdate() ??? { $pull }

const User = require('../models');

module.exports = {
    async getUsers(req, res) {
        try {
            const userResponse = await User.find()
            return res.json(userResponse);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    async getSingleUser(req, res) {
        try {
            const singleUser = await User.findOne({ _id: req.params.userId });
            return !singleUser
                ? res.status(404).json({ message: 'No user with this id!' })
                : res.json(singleUser)
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    async createUser(req, res) {
        try {
            const userCreate = await User.create(req.body)
            return res.json(userCreate);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    async deleteUser(req, res) {
        try {
            const userDelete = await User.findOneAndRemove({ _id: req.params.userId });
            return res.json(userDelete);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // async addFriend(req, res) {
    //     try {
    //         const newFriend = await User.create();
    //     } catch (error) {
    //         return res.status(500).json(error);
    //     }
    // },
};